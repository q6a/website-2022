import React from "react";
import { Link, withPrefix } from "gatsby";

const HomeHero = () => {
  return (
    <div className="section bg-hero text-white">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center gap-3">
            <h1 className="hero-title fs-2 fw-bold">
              Your partner in <span>video marketing</span>
            </h1>
            <p className="fs-5 fw-light">
              Transcribe, translate and dub videos in few sample steps
              <br />
              Try it now. No account required!
            </p>
            <div className="d-flex gap-3">
              <Link className="btn btn-light text-primary" to="/">
                Login
              </Link>
              <Link className="btn btn-primary" to="/">
                Sign up
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-6 bg-focus-hero d-flex align-items-center justify-content-center">
            <img
              src={withPrefix("images/img-hero.png")}
              alt="Play video"
              width={420}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
