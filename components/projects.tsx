import Link from "next/link";

export default function Projects() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link href="/softsolutions">
            <li className="bg-amber-50/90 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-40 flex items-center justify-center">
              <div>Soft Solutions</div>
            </li>
          </Link>
          <Link href="/pokerclub">
            <li className="bg-amber-50/90 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-40 flex items-center justify-center">
              <div>Poker Club</div>
            </li>
          </Link>
          <li className="bg-amber-50/90 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-40 flex items-center justify-center">
            <div>Project 3</div>
          </li>
        </ul>
      </div>
    </section>
  );
}
