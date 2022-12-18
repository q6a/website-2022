import React from "react";
import { Link } from "gatsby";

import { BodyText } from "../components/Typography";

const BottomCta = () => {
  return (
    <div className="section-md join text-white text-center">
      <div className="container py-5">
        <div className="fs-2 fw-semibold">
          Join <span className="text-brand-green fw-900">10,000+</span> fellow
          content creators
        </div>
        <BodyText classes="my-3">
          That produce engaging and accessible <br />
          materials with <span className="fw-semibold">videotranslator.ai</span>
        </BodyText>
        <Link className="btn btn-primary mt-3" to="/">
          Start Creating
        </Link>
      </div>
    </div>
  );
};

export default BottomCta;
