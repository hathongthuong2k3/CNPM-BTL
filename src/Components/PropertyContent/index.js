import PageSize from "../Property/PageSize";
import Pages from "../Property/Pages";
import NumofPage from "../Property/NumofPage";
import NumperPage from "../Property/NumperPage";
import styles from "./PropertyContent.module.css";

function PropertyPage () {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h2 className={styles.chooseSize}>CHỌN KHỔ GIẤY</h2>
                <section className={styles.uploadArea}>
                    <PageSize />
                    <Pages />
                    <NumofPage />
                    <NumperPage />
                </section>
                <button className={styles.cancelButton}>
                    <div className={styles.cancel}>HỦY</div>
                </button>
                <button className={styles.confirmButton}>
                    <div className={styles.confirm}>XÁC NHẬN</div>
                </button>
            </div>
        </div>
    );
};

export default PropertyPage;
