import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = ({ title, children }: PropTypes) => {
  return (
    <>
      <PageHead title={title} />
      <section className="3xl:container">{children}</section>
    </>
  );
};
export default AuthLayout;
