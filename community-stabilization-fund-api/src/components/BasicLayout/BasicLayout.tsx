import type { ReactNode } from "react";

import { BasicNavigation } from "../BasicNavigation";

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

export { BasicLayout };
