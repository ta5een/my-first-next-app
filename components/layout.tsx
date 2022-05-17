import styles from "./layout.module.css";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
