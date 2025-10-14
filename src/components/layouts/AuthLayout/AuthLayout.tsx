import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = ({ children, title }: PropTypes) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
      <PageHead title={title} />
      <section className="3xl:container">{children}</section>
    </div>
  );
};
export default AuthLayout;
