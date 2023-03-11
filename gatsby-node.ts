// @ts-nocheck
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          query {
            allBlogPosts: strapiQueries {
              blogs(
                publicationState: LIVE
                locale: "all"
                pagination: { limit: 1000 }
                sort: "createdAt"
              ) {
                data {
                  id
                  attributes {
                    slug
                    locale
                    blogCategories {
                      data {
                        attributes {
                          categoryName
                        }
                      }
                    }
                  }
                }
              }
            }
            pages: allStrapiCustomPage {
              edges {
                node {
                  id
                  pageName
                  title
                  align
                  content {
                    data {
                      content
                    }
                  }
                  locale
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          throw result.errors;
        }

        const blogs = result.data.allBlogPosts.blogs.data;
        const pages = result.data.pages;

        blogs.forEach(({ id, attributes }) => {
          const categories = attributes?.blogCategories?.data.map(
            (category) => category.attributes.categoryName
          );

          createPage({
            path:
              attributes.locale === "en"
                ? `/blog/${attributes.slug}`
                : `/${attributes.locale}/blog/${attributes.slug}`,
            component: path.resolve("src/templates/blog-single.tsx"),
            context: {
              id: id,
              language: attributes.locale,
              category:
                categories[Math.floor(Math.random() * categories.length)],
            },
          });
        });

        pages.edges.forEach(({ node }) => {
          createPage({
            path: `/page/${node.pageName}`,
            component: path.resolve("src/templates/custom-page.tsx"),
            context: {
              page: node.pageName,
              language: node.locale,
            },
          });
        });
      })
    );
  });
};
