import React from "react";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";

import EnterpriseBox from "./EnterpriseBox";
import { H2 } from "./Typography";

const EnterpriseSection = () => {
  const { t } = useTranslation();
  const data = [
    {
      id: 1,
      title: t("enterpriseSafety"),
      icon: "images/safety.png",
      link: "/enterprise/safety",
      bg: "images/safety-bg-sm.webp",
    },
    {
      id: 2,
      title: t("enterpriseEducation"),
      icon: "images/education.png",
      link: "/enterprise/education",
      bg: "images/education-bg-sm.webp",
    },
    {
      id: 3,
      title: t("enterpriseAI Agency"),
      icon: "images/ai.png",
      link: null,
      bg: "images/custom-bg-sm.webp",
    },
    {
      id: 4,
      title: t("enterpriseHealthcare"),
      icon: "images/doctors-bag.png",
      link: null,
      bg: "images/healthcare-bg-sm.webp",
    },
  ];

  return (
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
};

export default EnterpriseSection;
