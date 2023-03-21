import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import { H1 } from "../components/Typography";

const PricingPage: React.FC<PageProps> = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes="mb-3 text-center">Pricing</H1>
        <div className="pricing-content text-center text-white my-5 p-5 rounded-2">
          <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <span className="fs-5 text-uppercase">
              <Trans i18nKey="pricingSectionTitle" components={[<br />]} />
            </span>
            <div className="fs-1 fw-bold">
              {`${data?.strapiPricing?.price} ${data?.strapiPricing?.currency}`}
              <span className="fs-3">{`/${data?.strapiPricing?.units}`}</span>
            </div>
            <button className="btn btn-primary px-5" type="button">
              {t("pricingTryNow")}
            </button>
          </div>
        </div>
        <div className="text-center">
          {t("pricingTranscribeTranslate")}
          <br />
          <Link to="/available-languages">{t("pricingFindOut")}</Link>
        </div>
      </div>
      <Helper />
    </Layout>
  );
};

export const query = graphql`
  query ($language: String!) {
    strapiPricing {
      price
      currency
      units
    }
    locales: allLocale(
      filter: { ns: { in: ["index", "pricing"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default PricingPage;

export const Head: HeadFC = () => <title>Pricing Page</title>;
