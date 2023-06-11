import { ReactNode } from "react";
import BasicNavigation from "../BasicNavigation";
import styles from "./BasicLayout.module.css";

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <div>
      <BasicNavigation />
      <main className={styles.container}>{children}</main>
    </div>
  );
};

export default BasicLayout;
