import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import { H1 } from "../components/Typography";
import FaqItem from "../components/FaqItem";

const FaqPage: React.FC<PageProps> = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes="mb-3 text-center">{t("faqSectionTitle")}</H1>
        <div className="custom-page-content fw-light lh-lg py-3">
          <div className="accordion accordion-flush" id="faqs">
            {data.allStrapiFaq.edges.map(({ node }: any) => (
              <FaqItem key={node.id} node={node} />
            ))}
          </div>
        </div>
      </div>
      <Helper />
    </Layout>
  );
};

export const query = graphql`
  query ($language: String!) {
    allStrapiFaq {
      edges {
        node {
          id
          Question
          Answer {
            data {
              Answer
            }
          }
        }
      }
    }
    locales: allLocale(
      filter: { ns: { in: ["index", "faq"] }, language: { eq: $language } }
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

export default FaqPage;

export const Head: HeadFC = () => <title>FAQ's Page</title>;
