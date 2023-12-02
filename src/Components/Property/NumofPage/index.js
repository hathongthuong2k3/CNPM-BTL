import styles from "./NumofPage.module.css";

const NumofPage = () => {
  return (
    <select className={styles.chooseNumPage} required={true} id="4">
      <option value="1">Chọn sô trang trên 1 mặt</option>
      <option value="1">1</option>
      <option value="4">4</option>
    </select>
  );
};

export default NumofPage;
