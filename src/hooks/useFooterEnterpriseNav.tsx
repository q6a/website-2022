import { graphql, useStaticQuery } from "gatsby";

const useFooterEnterpriseNavigation = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiNavigation(
        sort: { order: ASC }
        filter: { key: { eq: "footerEnterpriseMenu" } }
      ) {
        edges {
          node {
            id
            title
            path
            menuAttached
          }
        }
      }
    }
  `);

  return data?.allStrapiNavigation?.edges;
};

export default useFooterEnterpriseNavigation;
