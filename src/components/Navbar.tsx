import React, { useState } from "react";
import { Link, withPrefix } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import useHeaderNavigation from "../hooks/useHeaderNavigation";

const Navbar = () => {
  const navigation = useHeaderNavigation();
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={withPrefix("images/logo.svg")} alt="VideoTranslator.AI" />
        </Link>
        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showNav ? "show" : ""}`}
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            {navigation &&
              navigation.length > 0 &&
              navigation.map(({ node }: any) => {
                const hasChild = node?.items.length > 0;
                return (
                  <li
                    key={node?.id}
                    className={`nav-item ${hasChild ? "dropdown" : ""}`}
                  >
                    {hasChild ? (
                      <Link
                        className="nav-link d-flex align-items-center gap-1"
                        activeClassName="text-primary"
                        to={node?.path}
                      >
                        {node?.title}
                        <FontAwesomeIcon icon={faChevronDown} />
                      </Link>
                    ) : (
                      <Link
                        className="nav-link"
                        activeClassName="text-primary"
                        aria-current="page"
                        to={node?.path}
                      >
                        {node?.title}
                      </Link>
                    )}
                  </li>
                );
              })}
          </ul>
          <div className="d-flex flex-column flex-lg-row gap-3">
            <button className="btn btn-link text-decoration-none" type="button">
              Login
            </button>
            <button className="btn btn-primary" type="button">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
