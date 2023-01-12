import { graphql, useStaticQuery } from "gatsby";

const useFooterResourcesNavigation = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiNavigation(
        sort: { order: ASC }
        filter: { key: { eq: "footerResourcesMenu" } }
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

export default useFooterResourcesNavigation;
