const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/files", express.static("files"));
app.use(cookieParser("JHGJKLKLGFLJK"));
app.use(session({ cookie: { maxAge: 60000 } }));
const jwt = require("jsonwebtoken");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
//mongodb connection----------------------------------------------

mongoose
  .connect(
    "mongodb+srv://root:123@cnpm.hvtewz8.mongodb.net/CNPM?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//multer------------------------------------------------------------
const multer = require("multer");
const { generateRandomString } = require("./helpers/generate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

const formDataSchema = new mongoose.Schema({
  code: String,
  selectedNumPage: String,
  selectedPrinter: String,
  selectedPage: String,
  selectedPageSize: String,
});
const FormData = mongoose.model("FormData", formDataSchema);

app.use(express.json());

app.post("/saveFormData", async (req, res) => {
  const { selectedNumPage, selectedPrinter, selectedPage, selectedPageSize } =
    req.body;

  try {
    const newFormData = new FormData({
      selectedNumPage,
      selectedPrinter,
      selectedPage,
      selectedPageSize,
    });
    await newFormData.save();

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/getFormData", async (req, res) => {
  try {
    // Sắp xếp theo thời gian giảm dần để lấy dữ liệu mới nhất trước
    const formData = await FormData.find({}).sort({ timestamp: -1 });
    res.status(200).json({ status: "ok", data: formData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const CodeSchema = new mongoose.Schema({
  code: String,
});

const CodeModel = mongoose.model("Code", CodeSchema);

app.post("/save-code", async (req, res) => {
  const { code } = req.body;
  const newCode = new CodeModel({ code });

  try {
    await newCode.save();
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error saving code:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  tokenAuth: String,
  numberOfPage: [
    {
      Khogiay: {
        type: String,
        default: "A0",
      },
      number: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    const randomTokenAuth = generateRandomString(20);
    if (user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { tokenAuth: randomTokenAuth },
        { new: true }
      );
      updatedUser.save();
      req.session.user = { tokenAuth: randomTokenAuth };
      res.cookie("tokenAuth", randomTokenAuth);
      res.json({
        success: true,
        username: updatedUser.username,
        tokenAuth: randomTokenAuth,
      });
      return;
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
//[GET] get/token
app.post("/buy/paper", async (req, res) => {
  const newdata = req.body;
  newdata.tokenAuth = req.cookies.tokenAuth;
  const Khogiay = req.body.size;
  const newnumber = parseInt(req.body.quantity);
  newdata.quantity = newnumber;
  const updatedUser = await User.findOne({ tokenAuth: req.cookies.tokenAuth });
  let query;
  let update;
  const existingPage = updatedUser.numberOfPage.find(
    (page) => page.Khogiay === Khogiay
  );
  if (existingPage) {
    query = {
      tokenAuth: req.cookies.tokenAuth,
      "numberOfPage.Khogiay": Khogiay,
    };
    update = { $inc: { "numberOfPage.$.number": newnumber } };
  } else {
    query = { tokenAuth: req.cookies.tokenAuth };
    update = {
      $addToSet: { numberOfPage: { Khogiay, number: newnumber } },
    };
  }

  const newUser = await User.findOneAndUpdate(query, update, { new: true });
  res.json(newUser);
});

app.get("/logout", async (req, res) => {
  res.clearCookie("tokenAuth");
  res.redirect("/");
});

app.get("/buy/paper", async (req, res) => {
  try {
    const user = await User.findOne({ tokenAuth: req.cookies.tokenAuth });
    res.json(user.numberOfPage);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/userdata", async (req, res) => {
  try {
    // Check if the user is authenticated
    if (req.session.user) {
      res.json({ success: true, userData: req.session.user });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(3001, () => {
  console.log("Server Started");
});
