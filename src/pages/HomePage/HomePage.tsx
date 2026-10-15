import Header from "../../shared/ui/Header/Header";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>Логотип, меню, настройки</aside>
      <div className={styles["main-wrapper"]}>
        <Header></Header>
        <main className={styles.content}>Виджеты</main>
      </div>
    </div>
  );
};

export default HomePage;
