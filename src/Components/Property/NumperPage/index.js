import styles from "./NumperPage.module.css";

const NumperPage = () => {
  return (
    <select className={styles.choosePage}>
      <option value="Chọn số mặt trên một tờ">Chọn số mặt trên một tờ</option>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  );
};

export default NumperPage;
