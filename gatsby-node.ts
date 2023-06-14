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
            allStrapiBlog(sort: { postedDate: DESC }) {
              group(field: { locale: SELECT }, limit: 1000) {
                nodes {
                  id
                  slug
                  blogCategories {
                    categoryName
                  }
                  locale
                  localizations {
                    data {
                      id
                      attributes {
                        locale
                        slug
                      }
                    }
                  }
                }
              }
            }
            pages: allStrapiCustomPage {
              group(field: { locale: SELECT }) {
                nodes {
                  id
                  pageName
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

        const blogGroup = result.data.allStrapiBlog.group;
        const pageGroup = result.data.pages.group;

        blogGroup.forEach(({ nodes: blogs }) => {
          // Blog single page
          blogs.forEach(
            ({ id, slug, blogCategories, locale, localizations }) => {
              const categories = blogCategories.map(
                (category) => category?.categoryName
              );

              createPage({
                path:
                  locale === "en" ? `/blog/${slug}` : `/${locale}/blog/${slug}`,
                component: path.resolve("src/templates/blog-single.tsx"),
                context: {
                  id: id,
                  language: locale,
                  category:
                    categories[Math.floor(Math.random() * categories.length)],
                },
              });

              // Redirect from previous path '/news' to new path '/blog'
              if (locale === "en") {
                createRedirect({
                  fromPath: `/news/${slug}`,
                  toPath: `/blog/${slug}`,
                });
              } else {
                createRedirect({
                  fromPath: `/news/${slug}`,
                  toPath: `/${locale}/blog/${slug}`,
                });
                // Workaround issues when language changed on blog single page
                createRedirect({
                  fromPath: `/${locale}/${locale}/blog/${slug}`,
                  toPath: `/${locale}/blog/${slug}`,
                });
              }

              // Handle fallback redirection for each language
              const localize = localizations?.data;
              if (localize.length > 0) {
                localize.map(({ attributes: attr }) => {
                  console.info(`/blog/${slug} => /blog/${attr.slug}`);
                  console.info(
                    `/${locale}/blog/${attr.slug} => /${locale}/blog/${slug}`
                  );
                  createRedirect({
                    fromPath: `/blog/${slug}`,
                    toPath: `/blog/${attr.slug}`,
                  });
                  createRedirect({
                    fromPath: `/${locale}/blog/${attr.slug}`,
                    toPath: `/${locale}/blog/${slug}`,
                  });
                });
              }
            }
          );
        });

        pageGroup.forEach(({ nodes: pages }) => {
          pages.forEach(({ id, pageName, locale }) => {
            createPage({
              path:
                locale === "en"
                  ? `/page/${pageName}`
                  : `/${locale}/page/${pageName}`,
              component: path.resolve("src/templates/custom-page.tsx"),
              context: {
                id: id,
                page: pageName,
                language: locale,
              },
            });

            createRedirect({
              fromPath: `/${pageName}`,
              toPath: `/page/${pageName}`,
            });
          });
        });

        // Redirect free-trial page to contact-us
        createRedirect({
          fromPath: `/free-trial`,
          toPath: `/contact`,
        });
      })
    );
  });
};
