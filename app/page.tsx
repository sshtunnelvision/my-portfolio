import Header from "@/components/header";
import WorkProduct from "@/components/WorkProduct";

export default function Home() {
  return (
    <div className="flex flex-col h-full py-8">
      <Header />
      <WorkProduct />
    </div>
  );
}
