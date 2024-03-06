import React from "react";
import { Link } from "react-router-dom";

export default function Country({
  flags,
  name,
  population,
  region,
  subregion,
}) {
  return (
    <>
      <Link to={`/${name.common}`}>
        <div className="country-card dark:bg-gray-700 dark:text-gray-400 rounded-md">
          <img src={flags.svg} alt="Flag" className="object-cover h-48 w-96" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-900 mb-2 dark:text-gray-400">
              {name.common}
            </h2>
            <ul className="flex flex-col items-start justify-start gap-2">
              <li>Population: {population.toLocaleString()}</li>
              <li>Region: {region}</li>
              <li>Subregion: {subregion}</li>
            </ul>
          </div>
        </div>
      </Link>
    </>
  );
}
