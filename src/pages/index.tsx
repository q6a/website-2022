import * as React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
import HomeHero from "../components/HomeHero";
import HomeBlog from "../components/HomeBlog";
import HomeContents from "../components/HomeContents";
import HomeClients from "../components/HomeClients";
import BottomCta from "../components/BottomCta";
// import HomeDemo from "../components/HomeDemo";

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
  const blogPosts = data?.blogPostData?.nodes;
  const caseStudies = data?.caseStudies?.nodes;
  const partnerLogos = data?.strapiPartnerLogo?.partnerLogos;
  const clientLogos = data?.strapiPartnerLogo?.clientLogos;

  return (
    <Layout>
      <HomeHero />
      <HomeBlog data={blogPosts} />
      <HomeContents data={caseStudies} />
      <HomeClients partners={partnerLogos} clients={clientLogos} />
      <BottomCta />
      <Helper isHome />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
        description
        keywords
      }
    }
    blogPostData: allStrapiBlog(
      filter: { locale: { eq: $language } }
      sort: { postedDate: DESC }
      limit: 6
    ) {
      nodes {
        id
        title
        slug
        description
        cover {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        coverAlt
        postedDate(formatString: "MMM DD, YYYY")
      }
    }
    caseStudies: allStrapiCaseStudyAlt(filter: { locale: { eq: $language } }) {
      nodes {
        blog {
          id
          title
          slug
          description
          cover {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          coverAlt
          postedDate(formatString: "MMM DD, YYYY")
        }
      }
    }
    strapiPartnerLogo {
      partnerLogos {
        id
        localFile {
          childImageSharp {
            gatsbyImageData
          }
          name
        }
      }
      clientLogos {
        id
        localFile {
          childImageSharp {
            gatsbyImageData
          }
          name
        }
      }
    }
  }
`;

export const Head: HeadFC = ({ data }: any) => <Seo />;
