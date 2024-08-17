import About from "./components/about";
import Assistant from "./components/assistant";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Projects from "./components/projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-4 sm:px-6 md:px-8 lg:px-12 pt-4">
      <Navbar />
      <Header />
      <div className="w-full max-w-8xl mx-auto">
        <Assistant />
      </div>
    </main>
  );
}
