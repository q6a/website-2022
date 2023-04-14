import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

import { H2 } from "./Typography";

const HomeClients = ({ partners, clients }: any) => {
  const { t } = useTranslation();

  return (
    <>
      {partners && (
        <div className="section-sm bg-brand-light">
          <div className="container text-center">
            <H2 classes="text-gray" hasSeparator>
              {t("partnerSectionTitle")}
            </H2>
            <div className="row mt-5">
              {partners.map(({ id, attributes }: any) => (
                <div key={id} className="col-6 col-md-4 px-5">
                  <img
                    src={attributes?.url}
                    alt={attributes?.alternativeText}
                    className="px-4 py-2 logo-item"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {clients && (
        <div className="section-sm bg-brand-light">
          <div className="container text-center">
            <H2 classes="text-gray" hasSeparator>
              {t("clientSectionTitle")}
            </H2>
            <div className="row mt-5">
              {clients.map(({ id, attributes }: any) => (
                <div key={id} className="col-6 col-md-4 px-5">
                  <img
                    src={attributes?.url}
                    alt={attributes?.alternativeText}
                    className="px-4 py-2 logo-item"
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
