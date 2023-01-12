import React, { useState } from "react";
import { Link, withPrefix } from "gatsby";

import Navigation from "./Navigation";

const Navbar = () => {
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
          <Navigation />
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
