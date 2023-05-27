// @ts-nocheck
const path = require("path");
const fetch = require("node-fetch");

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
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
                    richContent
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

          if (attributes.locale === "en") {
            createRedirect({
              fromPath: `/news/${attributes.slug}`,
              toPath: `/blog/${attributes.slug}`,
            });
          } else {
            createRedirect({
              fromPath: `/news/${attributes.slug}`,
              toPath: `/${attributes.locale}/blog/${attributes.slug}`,
            });
          }
        });

        pages.forEach(({ id, attributes }) => {
          createPage({
            path:
              attributes.locale === "en"
                ? `/page/${attributes.pageName}`
                : `/${attributes.locale}/page/${attributes.pageName}`,
            component: path.resolve("src/templates/custom-page.tsx"),
            context: {
              id: id,
              page: attributes.pageName,
              language: attributes.locale,
            },
          });

          createRedirect({
            fromPath: `/${attributes.pageName}`,
            toPath: `/page/${attributes.pageName}`,
          });
        });

        // Handle fallback redirection for each language
        fetch(
          `${process.env.STRAPI_API_URL}/api/blogs?locale=id&populate=localizations`
        )
          .then((response) => response.json())
          .then(({ data }) => {
            if (data.length > 0) {
              data
                .filter(({ attributes }) => {
                  const localizations = attributes.localizations.data;
                  return localizations.length > 0;
                })
                .map(({ attributes }) => {
                  const localizations = attributes.localizations.data;
                  localizations.map(({ attributes: attr }) => {
                    createRedirect({
                      fromPath: `/blog/${attributes.slug}`,
                      toPath: `/blog/${attr.slug}`,
                    });
                    createRedirect({
                      fromPath: `/blog/${attr.slug}`,
                      toPath: `/blog/${attributes.slug}`,
                    });
                  });
                });
            }
          })
          .catch((error) => console.warn(error));
      })
    );
  });
};
