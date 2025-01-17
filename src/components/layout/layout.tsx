import { FC } from "react";
import Header from "./header";

interface LayoutProps {
  children: JSX.Element;
  isHeader?: boolean;
  isBorderBlock?: boolean;
  //   isFooter: boolean
}

const Layout: FC<LayoutProps> = ({
  children,
  isHeader = true,
  isBorderBlock = true,
}) => {
  return (
    <div className="min-h-screen bg-zinc-900">
      {isHeader && <Header isBorderBlock={isBorderBlock} />}
      {children}
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
