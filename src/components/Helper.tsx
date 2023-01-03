import React, { useState } from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const languages = [
  {
    id: "lang-1",
    name: "English",
    flag: "gb",
    value: "en",
  },
  {
    id: "lang-2",
    name: "Italiano",
    flag: "it",
    value: "it",
  },
  {
    id: "lang-3",
    name: "Espanol",
    flag: "es",
    value: "es",
  },
];

const Helper = () => {
  const [lang, setLang] = useState("en");
  const selectedLang = languages.find(({ value }) => value === lang);

  return (
    <div className="sticky-bottom">
      <div className="mx-3 py-3 d-none d-lg-flex justify-content-between align-items-center">
        <div className="btn-group dropup shadow">
          <button
            type="button"
            className="btn btn-outline-light bg-white text-dark dropdown-toggle d-flex align-items-center gap-1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className={`fi fi-${selectedLang?.flag}`}></span>
            {selectedLang?.name}
          </button>
          <ul className="dropdown-menu">
            {languages.map(({ id, name, flag, value }) => (
              <li key={id}>
                <button
                  className="dropdown-item d-flex align-items-center gap-1"
                  type="button"
                  onClick={() => setLang(value)}
                >
                  <span className={`fi fi-${flag}`}></span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/faqs"
          className="bg-secondary text-white fs-5 px-3 py-2 rounded-2"
          title="Help"
        >
          <FontAwesomeIcon icon={faQuestion} />
        </Link>
      </div>
    </div>
  );
};

export default Helper;
