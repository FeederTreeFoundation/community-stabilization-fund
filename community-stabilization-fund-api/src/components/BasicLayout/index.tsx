import BasicNavigation from "../BasicNavigation";

import type { ReactNode } from "react";


import styles from "./BasicLayout.module.css";

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => (
  <div>
    <BasicNavigation />
    <main className={styles.container}>{children}</main>
  </div>
);

export default BasicLayout;
