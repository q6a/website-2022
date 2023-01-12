import { graphql, useStaticQuery } from "gatsby";

const useHeaderNavigation = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiNavigation(
        sort: { order: ASC }
        filter: { key: { eq: "headerMenu" } }
      ) {
        edges {
          node {
            id
            title
            path
            items {
              id
              title
              path
            }
          }
        }
      }
    }
  `);

  return data?.allStrapiNavigation?.edges;
};

export default useHeaderNavigation;
