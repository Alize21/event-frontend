import PageHead from "@/components/commons/PageHead";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col  items-center justify-between p-24">
        <PageHead title="Home" />
        <Button color="primary">Button</Button>;
      </main>
    </div>
  );
}
