import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

import EnterpriseBox from "./EnterpriseBox";
import { H2 } from "./Typography";

const data = [
  {
    id: 1,
    title: "Safety",
    desc: "Voluptate deserunt anim nisi veniam eu officia.",
    icon: "images/safety.png",
    link: "/enterprise/safety",
  },
  {
    id: 2,
    title: "Education",
    desc: "Lorem adipisicing aliqua proident do pariatur commodo.",
    icon: "images/education.png",
    link: null,
  },
  {
    id: 3,
    title: "Pricing",
    desc: "Esse incididunt sint sint proident laborum est.",
    icon: "images/price.png",
    link: null,
  },
  {
    id: 4,
    title: "Healthcare",
    desc: "Occaecat pariatur excepteur eiusmod et eiusmod.",
    icon: "images/doctors-bag.png",
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
