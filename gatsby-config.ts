// @ts-nocheck
import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteUrl = process.env.SITE_URL || `https://videotranslator.ai`;

const config: GatsbyConfig = {
  siteMetadata: {
    title: `VideoTranslatorAI`,
    siteUrl,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
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
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.STRAPI_API_URL,
        collectionTypes: [
          {
            singularName: `custom-page`,
          },
          {
            singularName: `faq`,
          },
        ],
        singleTypes: [`pricing`],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
  ],
};

export default config;
