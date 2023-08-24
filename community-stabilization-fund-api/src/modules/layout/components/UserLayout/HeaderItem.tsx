import { HeaderName, HeaderMenuItem } from "carbon-components-react";
import Link from "next/link";

interface HeaderItemProps {
    route: {
      PAGE_TITLE: string;
      PATH: string;
    }
    hidden?: boolean;
    prefix?: string | null;
    selectedPage?: string;
    changeSelectedPage?: (selectedPage: string) => void;
  }

const HeaderItem = ({ 
  route, 
  hidden = false,
  prefix = null,
  selectedPage, 
  changeSelectedPage
}: HeaderItemProps) => (
  <Link href={route.PATH} passHref hidden={hidden}>
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