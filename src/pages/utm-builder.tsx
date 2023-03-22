import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Select from "react-select";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
import { H1 } from "../components/Typography";

const UtmBuilderPage: React.FC<PageProps> = ({ data }: any) => {
  const { t } = useTranslation();
  const blogPostData = data?.blogPostData?.blogs?.data.map(
    ({ attributes }: any) => ({
      value: attributes?.slug,
      label: attributes?.title,
    })
  );

  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes={`mb-3 text-left`}>UTM Builder</H1>
        <div className="custom-page-content fw-light lh-lg py-3">
          <div className="row">
            <div className="col-8">
              {blogPostData && <Select options={blogPostData} />}
            </div>
          </div>
        </div>
      </div>
      <Helper />
    </Layout>
  );
};

export default UtmBuilderPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index", "blog"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    blogPostData: strapiQueries {
      blogs(
        locale: "all"
        publicationState: LIVE
        pagination: { limit: 1000 }
        sort: "title"
      ) {
        data {
          id
          attributes {
            title
            slug
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <Seo title="UTM Builder">
    <meta name="robots" content="noindex, nofollow" />
  </Seo>
);
