import React from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import availableLanguage from "../common/languages";

const Helper = () => {
  const { language, changeLanguage } = useI18next();
  const selectedLang = availableLanguage.find(
    ({ value }) => value === language
  );

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
            {availableLanguage
              .filter(({ showInHelper }) => showInHelper)
              .map(({ name, flag, value }) => (
                <li key={value}>
                  <button
                    className="dropdown-item d-flex align-items-center gap-1"
                    type="button"
                    onClick={() => changeLanguage(value)}
                  >
                    <span className={`fi fi-${flag}`}></span>
                    {name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        {/* <Link
          to="/faqs"
          className="bg-secondary text-white fs-5 px-3 py-2 rounded-2"
          title="Help"
        >
          <FontAwesomeIcon icon={faQuestion} />
        </Link> */}
      </div>
    </div>
  );
};

export default Helper;
