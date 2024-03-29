import React from "react";
import { withPrefix } from "gatsby";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";

import Newsletter from "./Newsletter";
import { H1, BodyText } from "./Typography";

const HomeHero = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-light pt-3">
      <div className="section-sm bg-hero text-white rounded-2 mx-3">
        <div className="container">
          <div className="row">
            <div className="col-12 bg-focus-hero d-flex flex-column align-items-center justify-content-center gap-5">
              {/* <img
                src={withPrefix("images/img-hero.png")}
                alt="Play video"
                className="img-hero"
                loading="lazy"
              /> */}
              <h1 className="hero-title text-center fs-1 fw-bold">
                <Trans i18nKey="heroTitle" components={[<span />]} />
              </h1>
              <BodyText classes="text-center">
                <Trans i18nKey="heroDescription" components={[<br />]} />
              </BodyText>
              <div className="d-flex flex-column flex-lg-row gap-3">
                <div className="hero-newsletter">
                  <Newsletter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
