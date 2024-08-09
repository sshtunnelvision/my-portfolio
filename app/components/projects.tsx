const Projects = () => {
  return (
    <section className="py-8 ">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {" "}
          {/* Increased gap between tiles */}
          <li className="bg-amber-50/90 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
            {" "}
            {/* Increased padding for larger tiles */}
            <div>Soft Solutions</div>
          </li>
          <li className="bg-amber-50/90 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
            {" "}
            {/* Increased padding for larger tiles */}
            <div>Project 2</div>
          </li>
          <li className="bg-amber-50/90 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
            {" "}
            {/* Increased padding for larger tiles */}
            <div>Project 3</div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Projects;
