import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BasicLayout } from "../BasicLayout";
import { UserLayout } from "../UserLayout";
import { BasicHead } from "../BasicHead";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  const { pathname } = useRouter();
  const hiddenPaths = [
    '/',
    '/forms/groceries-and-supplies',
    '/rent-mortgage-utilities-support',
    '/about/pittsburgh-collaborative',
    '/about/community-movement-builders',
    '/about/swope-dreams',
    '/donate',
  ];

  if(hiddenPaths.includes(pathname)) {
    return (
      <>
        <BasicHead />
        <BasicLayout>
          {children}
        </BasicLayout>
        </>
    )
  }

  return (
    <>
      <BasicHead />
      <UserLayout>
        {children}
      </UserLayout>
    </>
  )

};

export { Layout };