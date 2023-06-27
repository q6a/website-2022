// @ts-nocheck
const path = require("path");
const fetch = require("node-fetch");

const availableLang = ["en", "id"];

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

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
            blogCategories: allStrapiBlog(limit: 1000) {
              distinct(field: { blogCategories: { categoryName: SELECT } })
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
        const blogCategories = result.data.blogCategories.distinct;
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
                createRedirect({
                  fromPath: `/en/blog/${slug}`,
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

        blogCategories.forEach((categoryName) => {
          availableLang.forEach((locale) => {
            createPage({
              path:
                locale === "en"
                  ? `/blog/category/${slugify(categoryName)}`
                  : `/${locale}/blog/category/${slugify(categoryName)}`,
              component: path.resolve("src/templates/blog-category.tsx"),
              context: {
                category: categoryName,
                language: locale,
              },
            });
          });

          createRedirect({
            fromPath: `/categories/${slugify(categoryName)}`,
            toPath: `/blog/category/${slugify(categoryName)}`,
          });
          createRedirect({
            fromPath: `/en/categories/${slugify(categoryName)}`,
            toPath: `/blog/category/${slugify(categoryName)}`,
          });
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

            if (locale === "en") {
              createRedirect({
                fromPath: `/en/${pageName}`,
                toPath: `/page/${pageName}`,
              });
            }
          });
        });

        // Redirect free-trial page to contact-us
        createRedirect({
          fromPath: `/free-trial`,
          toPath: `/contact`,
        });

        // Redirect old news path to blog
        createRedirect({
          fromPath: `/news`,
          toPath: `/blog`,
        });
        createRedirect({
          fromPath: `/en/blog`,
          toPath: `/blog`,
        });
      })
    );
  });
};
