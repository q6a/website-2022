// @ts-nocheck
import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

import { H2 } from "./Typography";

const HomeClients = ({ partners, clients }: any) => {
  const { t } = useTranslation();

  return (
    <>
      {clients && (
        <div className="section-sm bg-brand-light">
          <div className="container text-center">
            <H2 classes="text-gray" hasSeparator>
              {t("clientSectionTitle")}
            </H2>
            <div className="row mt-5 logo-marquee">
              <Splide
                options={{
                  perPage: 3,
                  arrows: false,
                  pagination: false,
                  breakpoints: {
                    768: {
                      perPage: 2,
                    },
                    576: {
                      perPage: 1,
                    },
                  },
                  autoScroll: {
                    speed: 1,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    rewind: true,
                  },
                }}
                extensions={{ AutoScroll }}
                aria-label="Clients"
              >
                {clients.map(({ id, localFile }: any) => {
                  const image = getImage(localFile);
                  return (
                    <SplideSlide key={`client-${id}`}>
                      <div className="px-5 h-100 d-flex align-items-center">
                        <GatsbyImage
                          image={image}
                          alt={localFile?.name}
                          className="px-4 py-2 logo-item"
                          height={532}
                          width="auto"
                          objectFit="contain"
                        />
                      </div>
                    </SplideSlide>
                  );
                })}
              </Splide>
            </div>
          </div>
        </div>
      )}
      {partners && (
        <div className="section-sm bg-brand-light">
          <div className="container text-center">
            <H2 classes="text-gray" hasSeparator>
              {t("partnerSectionTitle")}
            </H2>
            <div className="row mt-5 logo-marquee">
              <Splide
                options={{
                  perPage: 3,
                  arrows: false,
                  pagination: false,
                  breakpoints: {
                    768: {
                      perPage: 2,
                    },
                    576: {
                      perPage: 1,
                    },
                  },
                  autoScroll: {
                    speed: -1,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    rewind: true,
                  },
                }}
                extensions={{ AutoScroll }}
                aria-label="Clients"
              >
                {partners.map(({ id, localFile }: any) => {
                  const image = getImage(localFile);
                  return (
                    <SplideSlide key={`partner-${id}`}>
                      <div className="px-5 h-100 d-flex align-items-center">
                        <GatsbyImage
                          image={image}
                          alt={localFile?.name}
                          className="px-4 py-2 logo-item"
                        />
                      </div>
                    </SplideSlide>
                  );
                })}
              </Splide>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeClients;
