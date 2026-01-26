import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = ({ title, children }: PropTypes) => {
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
        {children}
      </div>
    </Fragment>
  );
};

export default LandingPageLayout;
