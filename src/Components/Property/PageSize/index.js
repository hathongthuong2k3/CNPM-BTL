import styles from "./PageSize.module.css";

const PageSize = () => {
  return (
      <select className={styles.choosePageSize}>
      <option value="Chọn khổ giấy in">Chọn khổ giấy in</option>
      <option value="A0">A0</option>
      <option value="A1">A1</option>
      <option value="A2">A2</option>
      <option value="A3">A3</option>
    </select>
  );
};

export default PageSize;
