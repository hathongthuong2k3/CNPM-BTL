import PropertyContent from "../PropertyContent";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./PropertyPage.module.css";
function PropertyPage() {
    return (
        <div className={styles.wrapper}>
            <Header
                className={styles.Header}
                currentPage={"In tài liệu"}
                username={"Thai Bao Long"}
            />
            <PropertyContent className={styles.content} />
            <Footer className={styles.footer} />
        </div>
    );
}

export default PropertyPage;