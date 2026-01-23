import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = ({ title, children }: PropTypes) => {
  return (
    <Fragment>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
        {children}
      </div>
    </Fragment>
  );
};

export default LandingPageLayout;
