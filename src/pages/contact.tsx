// @ts-nocheck
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import ContactFormAddress from "../components/ContactFormAddress";
import Layout from "../components/Layout";
import Helper from "../components/Helper";
import { H1 } from "../components/Typography";

const ContactInputLazy = React.lazy(
  () => import("../components/ContactFormInput")
);

const ContactPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes="mb-3">{t("contactUs")}</H1>
        <div className="row">
          <div className="col-12 col-md-4">
            <ContactFormAddress />
          </div>
          <div className="col-12 col-md-8">
            <ContactInputLazy />
          </div>
        </div>
      </div>
      <Helper />
    </Layout>
  );
};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index", "contact"] }, language: { eq: $language } }
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

export default ContactPage;

export const Head: HeadFC = () => <title>Contact Page</title>;
