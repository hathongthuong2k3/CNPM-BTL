import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./BuyContent.module.scss";
import axios from "axios";
import BasicTable from "./BasicTable";
const cx = classNames.bind(styles);
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function BuyContent() {
  const [size, setSize] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [dataFromRes, setDataFromRes] = React.useState([]);
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/buy/paper", {
        withCredentials: true,
      });

      setDataFromRes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handleSubmit = async (e) => {
    try {
      axios
        .post(
          "http://localhost:3001/buy/paper",
          { size, quantity },
          { withCredentials: true }
        )
        .then(function (response) {
          setDataFromRes(response.data.numberOfPage);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };
  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  return (
    <div className={cx("wrapper")}>
      <BasicTable dataFromRes={dataFromRes} />
      <div className={cx("inputBuy")}>
        <h2 className={cx("title")}>
          Mua thêm giấy in.
          <br />
          Mua càng nhiều, ưu đãi càng cao
        </h2>
        <FormControl
          sx={{ m: 5, minWidth: 100 }}
          variant="standard"
          className={cx("form-buycontent")}
        >
          <InputLabel
            htmlFor="demo-customized-select-native"
            style={{ fontSize: 20 }}
          >
            Khổ giấy
          </InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={size}
            onChange={handleChangeSize}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            <option value={"A4"}>A4</option>
            <option value={"A3"}>A3</option>
            <option value={"A2"}>A2</option>
            <option value={"A1"}>A1</option>
            <option value={"A0"}>A0</option>
          </NativeSelect>
        </FormControl>
        <FormControl
          sx={{ m: 5, minWidth: 100 }}
          variant="standard"
          className={cx("form-buycontent")}
        >
          <InputLabel
            htmlFor="demo-customized-select-native"
            style={{ color: "white", fontSize: 20 }}
          >
            Số lượng giấy
          </InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={quantity}
            onChange={handleChangeQuantity}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
          </NativeSelect>
        </FormControl>
        <Button size="large" variant="contained" onClick={handleSubmit}>
          Mua
        </Button>
      </div>
    </div>
  );
}
