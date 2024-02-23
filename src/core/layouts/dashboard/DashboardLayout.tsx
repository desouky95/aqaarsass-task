import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import styles from "./DashboardLayout.module.css";
const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className={styles.header}>
        <div className="w-14">
          <img alt="logo" src="/logo.webp" />
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
