import About from "./components/about";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Projects from "./components/projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Navbar />

      <About />
      <Projects />
    </main>
  );
}
