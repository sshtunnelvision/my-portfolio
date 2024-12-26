import Header from "@/components/header";
import WorkProduct from "@/components/WorkProduct";
import PixelTrail from "@/components/PixelTrail";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/bg-gradient.png')] bg-cover bg-fixed bg-no-repeat" />
        <div className="absolute inset-0 bg-zinc-900/60" />
      </div>
      <div className="fixed inset-0 -z-5">
        <PixelTrail
          pixelSize={20}
          delay={100}
          fadeDuration={400}
          pixelClassName="bg-yellow-300"
        />
      </div>
      <div className="w-full pb-16 relative z-10">
        <Header />
        <WorkProduct />
      </div>
    </>
  );
}
