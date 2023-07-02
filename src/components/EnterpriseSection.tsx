import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

import EnterpriseBox from "./EnterpriseBox";
import { H2 } from "./Typography";

const data = [
  {
    id: 1,
    title: "Safety",
    icon: "images/safety.webp",
    link: "/enterprise/safety",
  },
  {
    id: 2,
    title: "Education",
    icon: "images/education.webp",
    link: null,
  },
  {
    id: 3,
    title: "Custom",
    icon: "images/custom.webp",
    link: null,
  },
  {
    id: 4,
    title: "Healthcare",
    icon: "images/healthcare.webp",
    link: null,
  },
];

const EnterpriseSection = () => (
  <div className="section-sm bg-brand-light">
    <div className="container">
      <H2 classes="text-gray text-center" hasSeparator>
        <Trans i18nKey="enterpriseSectionTitle" components={[<br />]} />
      </H2>
      <div className="mt-5">
        <div className="row">
          {data &&
            data.map((item: any) => (
              <div
                key={`enterprise-${item?.id}`}
                className="col-12 col-md-6 mb-4"
              >
                <EnterpriseBox {...item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

export default EnterpriseSection;
