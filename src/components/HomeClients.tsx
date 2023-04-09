import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { H2 } from "./Typography";

const HomeClients = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <>
      {data && (
        <div className="section-sm bg-brand-light">
          <div className="container text-center">
            <H2 classes="text-gray" hasSeparator>
              {t("partnerSectionTitle")}
            </H2>
            <div className="row mt-5">
              {data.map(({ id, attributes }: any) => (
                <div key={id} className="col-6 col-md-4 col-lg-3">
                  <img
                    src={attributes?.url}
                    alt={attributes?.alternativeText}
                    className="p-4 logo-item"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeClients;
