const HomePage = () => {
  return (
    <div className="bg-black text-gold text-center">
      {/* Hero Section */}
      <section className="py-16">
        <h1 className="text-3xl md:text-5xl font-bold">KW Kenya Awards</h1>
        <h2 className="text-4xl md:text-6xl font-bold mt-2">2025</h2>

        <div className="mt-6 flex justify-center gap-4">
          <a href="/vote" className="px-6 py-2 rounded-lg text-white font-bold">Vote for Nominees</a>
          <a href="/register" className="px-6 py-2 rounded-lg text-white font-bold">Register as Nominee</a>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <h3 className="text-3xl font-bold">Our Mission</h3>
        <div className="bg-gold-dark p-6 rounded-lg mt-4 max-w-4xl mx-auto">
          <img src="/mission-image.png" alt="Our Mission" className="w-full rounded-lg" />
          <h4 className="text-xl font-bold mt-4">What We Value</h4>
          <p className="text-gray-300 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sodales eget eros.
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12">
        <h3 className="text-3xl font-bold">Our Partners</h3>
        <div className="flex justify-center gap-6 mt-6">
          {[...Array(4)].map((_, index) => (
            <img key={index} src="/partner-icon.png" alt="Partner" className="w-20 h-20 rounded-full" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
