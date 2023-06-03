// @ts-nocheck
import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteUrl = process.env.SITE_URL || `https://videotranslator.ai`;
const strapiUrl = process.env.STRAPI_API_URL || "http://127.0.0.1:1337";
const strapiToken = process.env.STRAPI_TOKEN || "";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `VideoTranslatorAI`,
    description: `Video Translator provides a real time AI transcription, translation and dubbing. Transform your text, image, audio and video content with support for 150+ dialects and 60+ languages. Pricing starts at 15 cents/minute.`,
    keywords: `video translation,video translator,caption maker,closed captioning software,open captioning software,add captions to video,video captions,subtitle maker,subtitles for video,embed subtitles in video,subtitles video,ai transcription,ai translation,ai dubbing,ai reader,`,
    siteUrl,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`, `id`],
        defaultLanguage: `en`,
        siteUrl: siteUrl,
        trailingSlash: "always",
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: "/:lang?/blog/:slug",
            getLanguageFromPath: true,
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: "gatsby-source-strapi-plugin-navigation-v2",
      options: {
        apiURL: strapiUrl,
        navigationIdsOrSlugs: {
          headerMenu: `api/navigation/render/header`,
          footerCompanyMenu: `api/navigation/render/footer-company`,
          footerProductMenu: `api/navigation/render/footer-product`,
          footerResourcesMenu: `api/navigation/render/footer-resources`,
        },
        type: `TREE`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: strapiUrl,
        accessToken: strapiToken,
        collectionTypes: [
          {
            singularName: `blog`,
            pluginOptions: {
              i18n: {
                locale: "all",
              },
            },
          },
          {
            singularName: `blog-category`,
          },
          {
            singularName: `blog-tag`,
          },
          {
            singularName: `custom-page`,
            pluginOptions: {
              i18n: {
                locale: "all",
              },
            },
          },
          {
            singularName: `faq`,
            pluginOptions: {
              i18n: {
                locale: "all",
              },
            },
          },
          {
            singularName: `available-language`,
          },
        ],
        singleTypes: [`pricing`, `social-link`],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "STRAPI",
        fieldName: "strapiQueries",
        url: `${strapiUrl}/graphql`,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GTM_ID || "",
        includeInDevelopment: false,
      },
    },
  ],
};

export default config;
