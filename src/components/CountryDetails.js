import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function CountryDetails() {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const resp = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await resp.json();
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCountryDetails();
  }, [name]);

  return (
    <>
      <div className="dark:bg-gray-800">
        <section className="max-w-7xl mx-auto p-8 lg:py-0 lg:h-screen justify-center flex flex-col">
          <Link to="/">
            <span>
              <button className="text-gray-700 dark:text-gray-400 flex justify-center items-center inline-block mb-8 bg-white dark:bg-gray-700 py-2 pl-6 pr-10 rounded-md shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-4 stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                <span className="ml-2">back</span>
              </button>
            </span>
          </Link>
          {country &&
            country.length > 0 &&
            country.map((item) => (
              <div
                key={item.population}
                className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:place-items-center"
              >
                <div>
                  <img alt="flag" src={item.flags.svg} />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-4xl mb-8 dark:text-gray-400">
                    {item.name.official}
                  </h1>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 dark:text-gray-400">
                    <div>
                      <ul className="flex flex-col items-start justify-start gap-2">
                        <li>
                          <span className="font-bold">Native Name:</span>{" "}
                          {
                            item.name.nativeName[
                              Object.keys(item.name.nativeName)[0]
                            ].official
                          }
                        </li>
                        <li>
                          <span className="font-bold">Population: </span>
                          {item.population.toLocaleString()}
                        </li>
                        <li>
                          <span className="font-bold">Region: </span>
                          {item.region}
                        </li>
                        <li>
                          <span className="font-bold">Sub Region: </span>
                          {item.subregion}
                        </li>
                        <li>
                          <span className="font-bold">Capital: </span>
                          {item.capital}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="flex flex-col items-start justify-start gap-2">
                        <li>
                          <span className="font-bold">Top Level Domain: </span>{" "}
                          {item.tld.join(", ")}
                        </li>
                        <li>
                          <span className="font-bold">Currencies: </span>{" "}
                          {Object.values(item.currencies)
                            .map((currency) => currency.name)
                            .join(", ")}
                        </li>
                        <li>
                          <span className="font-bold">Languages: </span>{" "}
                          {Object.values(item.languages)
                            .map((language) => language)
                            .join(", ")}
                        </li>
                      </ul>
                    </div>
                    <div className="lg:flex">
                      <h3 className="font-bold">Borders</h3>
                      {item.borders && item.borders.length > 0 && (
                        <ul className="flex">
                          {item.borders.map((border, index) => {
                            return (
                              <li
                                className="bg-white dark:bg-gray-800 dark:text-gray-400 border-2 px-5 lg:mx-2 mr-3 border-gray-200 shadow"
                                key={index}
                              >
                                {border}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </div>
    </>
  );
}
