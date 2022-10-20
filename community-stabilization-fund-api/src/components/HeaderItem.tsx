import { HeaderName, HeaderMenuItem } from "carbon-components-react";
import Link from "next/link";

interface HeaderItemProps {
    route: {
      PAGE_TITLE: string;
      PATH: string;
    }
    changeSelectedPage?: (selectedPage: string) => void;
    selectedPage?: string;
    prefix?: string | null;
  };

const HeaderItem = ({ route, selectedPage, changeSelectedPage, prefix}: HeaderItemProps) => (
  <Link href={route.PATH} passHref>
    {
      prefix 
        ? (
          <HeaderName prefix={prefix} >
            {route.PAGE_TITLE}
          </HeaderName> 
        )
        : (
          <HeaderMenuItem
            onClick={() => changeSelectedPage && changeSelectedPage(route.PAGE_TITLE)}
            isCurrentPage={route.PAGE_TITLE === selectedPage}
          >
            {route.PAGE_TITLE}
          </HeaderMenuItem> 
        )
    }
  </ Link>
);

export { HeaderItem };