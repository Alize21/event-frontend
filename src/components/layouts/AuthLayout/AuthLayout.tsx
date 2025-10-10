import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = ({ children, title }: PropTypes) => {
  return (
    <Fragment>
      <PageHead title={title} />
      <section className="3xl:container">{children}</section>
    </Fragment>
  );
};
export default AuthLayout;
