const TopButtons = ({ setQuery, selectedCity }) => {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Sydney",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Toronto",
    },
    {
      id: 5,
      title: "Paris",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => setQuery({ q: city.title })}
          className={`text-white text-lg font-medium transition ease-out hover:scale-125 ${
            selectedCity === city.title ? "text-xl font-bold" : "text-lg"
          }`}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
