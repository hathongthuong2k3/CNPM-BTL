const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/files", express.static("files"));
//mongodb connection----------------------------------------------

mongoose
  .connect("mongodb+srv://root:123@cnpm.hvtewz8.mongodb.net/CNPM?retryWrites=true&w=majority", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//multer------------------------------------------------------------
const multer = require("multer");

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
  selectedNumPage: String,
  selectedNumofPage: String,
  selectedPage: String,
  selectedPageSize: String,
});
const FormData = mongoose.model('FormData', formDataSchema);

app.use(express.json());

app.post('/saveFormData', async (req, res) => {
  const { selectedNumPage, selectedNumofPage, selectedPage, selectedPageSize } =
    req.body;

  try {
    const newFormData = new FormData({
      selectedNumPage,
      selectedNumofPage,
      selectedPage,
      selectedPageSize,
    });
    await newFormData.save();

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/getFormData', async (req, res) => {
  try {
    const formData = await FormData.find({});
    res.status(200).json({ status: 'ok', data: formData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(5001, () => {
  console.log("Server Started");
});
