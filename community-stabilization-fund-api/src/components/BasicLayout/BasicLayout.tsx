import type { ReactNode } from "react";

import { BasicNavigation } from "../BasicNavigation";
import { Footer } from "../BasicFooter/Footer";

import styles from "./BasicLayout.module.css";

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => (
  <div>
    <BasicNavigation />
      <div className={styles.container}>
        {children}
      </div>
    <Footer />
  </div>
);

export { BasicLayout };
