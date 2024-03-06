import { useEffect, useState } from "react";
import Country from "./Country";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const regions = [
    { name: "Africa" },
    { name: "America" },
    { name: "Asia" },
    { name: "Europe" },
    { name: "Oceania" },
  ];

  useEffect(() => {
    const getCountries = async () => {
      try {
        const resp = await fetch("https://restcountries.com/v3.1/all");
        const data = await resp.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, []);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    searchCountry();
  };

  const searchCountry = async () => {
    try {
      const resp = await fetch(
        `https://restcountries.com/v3.1/name/${searchInput}`
      );
      const data = await resp.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterByRegion = (e) => {
    filterByRegion(e.target.value);
  };

  const filterByRegion = async (region) => {
    try {
      const resp = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await resp.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="dark:bg-gray-800">
        <section className="container mx-auto p-16 ">
          <div className="flex flex-col lg:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form
              onSubmit={handleSearchInput}
              autoComplete="off"
              className="max-w-4xl"
            >
              <input
                value={searchInput}
                onChange={handleSearchInput}
                className="px-8 py-2.5 mb-8 text-gray-600 placeholder-gray-600 dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-700 w-full shadow rounded outline-none"
                type="text"
                name="search"
                id="search"
                placeholder="Search for a Country..."
                required
              />
            </form>

            <form onSubmit={handleFilterByRegion}>
              <select
                className="w-52 p-2.5 mb-8 outline-none rounded shadow text-gray-600 dark:text-gray-400 dark:bg-gray-700"
                name="filter-by-region"
                id="filter-by-id"
                value={regions.name}
                onChange={handleFilterByRegion}
              >
                {regions.map((region, index) => {
                  return (
                    <option
                      className="text-gray-600 dark:text-gray-400"
                      key={index}
                      value={region.name}
                    >
                      {region.name}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countries &&
              countries.length > 0 &&
              countries.map((country) => {
                return <Country key={country.name.common} {...country} />;
              })}
          </div>
        </section>
      </div>
    </>
  );
}
