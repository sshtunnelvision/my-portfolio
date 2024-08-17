import About from "./components/about";
import Assistant from "./components/assistant";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Projects from "./components/projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-60 pt-4">
      <Navbar />
      <Header />
      <About />
      <Projects />
      <Assistant />
    </main>
  );
}
