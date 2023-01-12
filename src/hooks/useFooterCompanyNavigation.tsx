import { graphql, useStaticQuery } from "gatsby";

const useFooterCompanyNavigation = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiNavigation(
        sort: { order: ASC }
        filter: { key: { eq: "footerCompanyMenu" } }
      ) {
        edges {
          node {
            id
            title
            path
          }
        }
      }
    }
  `);

  return data?.allStrapiNavigation?.edges;
};

export default useFooterCompanyNavigation;
