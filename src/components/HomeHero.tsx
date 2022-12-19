import React from "react";
import { Link, withPrefix } from "gatsby";

import { H1, BodyText } from "./Typography";

const HomeHero = () => {
  return (
    <div className="bg-brand-light pt-3">
      <div className="section-sm bg-hero text-white rounded-2 mx-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center gap-3 text-center">
              <H1>
                Your partner in <span>video marketing</span>
              </H1>
              <BodyText>
                Transcribe, translate and dub videos in few sample steps
                <br />
                Try it now. No account required!
              </BodyText>
              <div className="d-flex justify-content-center gap-3">
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
                className="img-hero"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
