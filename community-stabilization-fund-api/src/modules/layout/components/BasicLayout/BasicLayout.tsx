import type { ReactNode } from "react";

import { Footer } from "../BasicFooter";
import { BasicNavigation } from "./BasicNavigation";

import styles from "../../styles/BasicLayout.module.css";

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout = ({ children,  }: BasicLayoutProps) => (
  <div className={styles.basic_layout}>
    <BasicNavigation />
    <div className={styles.container}>
      {children}
    </div>
    <Footer />
  </div>
);

export { BasicLayout };
