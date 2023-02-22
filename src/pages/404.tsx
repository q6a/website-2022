import * as React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";
import Helper from "../components/Helper";

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="container my-5 text-center">
        <div className="d-flex flex-column align-items-center justify-content-center gap-3 min-h-page">
          <span className="text-404 fw-bold">404</span>
          <span className="fs-4">{t("oops")}</span>
          <Link to="/">
            <button className="btn btn-link" type="button">
              {t("backToHomepage")}
            </button>
          </Link>
        </div>
      </div>
      <Helper />
    </Layout>
  );
};

export default NotFoundPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {
        ns: { in: ["index", "not-found"] }
        language: { eq: $language }
      }
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

export const Head: HeadFC = () => <title>Not found</title>;
