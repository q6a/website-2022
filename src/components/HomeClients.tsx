// @ts-nocheck
import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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
              {partners.map(({ id, localFile }: any) => {
                const image = getImage(localFile);
                return (
                  <div key={id} className="col-6 col-md-4 px-5">
                    <GatsbyImage
                      image={image}
                      alt={localFile?.name}
                      className="px-4 py-2 logo-item"
                    />
                  </div>
                );
              })}
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
              {clients.map(({ id, localFile }: any) => {
                const image = getImage(localFile);
                return (
                  <div key={id} className="col-6 col-md-4 px-5">
                    <GatsbyImage
                      image={image}
                      alt={localFile?.name}
                      className="px-4 py-2 logo-item"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeClients;
