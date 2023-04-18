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
            pages: strapiQueries {
              customPages(publicationState: LIVE, locale: "all") {
                data {
                  id
                  attributes {
                    pageName
                    title
                    align
                    content
                    locale
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

        const blogs = result.data.allBlogPosts.blogs.data;
        const pages = result.data.pages.customPages.data;

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

        pages.forEach((node) => {
          createPage({
            path: `/page/${node.attributes.pageName}`,
            component: path.resolve("src/templates/custom-page.tsx"),
            context: {
              id: node.id,
              page: node.attributes.pageName,
              language: node.attributes.locale,
            },
          });
        });
      })
    );
  });
};
