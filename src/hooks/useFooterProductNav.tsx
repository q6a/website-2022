import { graphql, useStaticQuery } from "gatsby";

const useFooterProductNavigation = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiNavigation(
        sort: { order: ASC }
        filter: { key: { eq: "footerProductMenu" } }
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

export default useFooterProductNavigation;
