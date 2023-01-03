// @ts-nocheck
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          query {
            pages: allStrapiCustomPage {
              edges {
                node {
                  id
                  title
                  slug
                  align
                  content {
                    data {
                      content
                    }
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          throw result.errors;
        }

        const pages = result.data.pages;

        pages.edges.forEach(({ node }) => {
          const component = path.resolve("src/templates/custom-page.tsx");
          createPage({
            path: `/page/${node.slug}`,
            component,
            context: {
              id: node.id,
            },
          });
        });
      })
    );
  });
};
