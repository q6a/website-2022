import React, { useState } from "react";
import { Link, withPrefix } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={withPrefix("images/logo.svg")} alt="VideoTranslator.AI" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showNav ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                className="nav-link"
                activeClassName="text-primary"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                activeClassName="text-primary"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link d-flex align-items-center gap-1"
                activeClassName="text-primary"
                to="/learn"
              >
                Learn
                <FontAwesomeIcon icon={faChevronDown} />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                activeClassName="text-primary"
                to="/pricing"
              >
                Pricing
              </Link>
            </li>
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
