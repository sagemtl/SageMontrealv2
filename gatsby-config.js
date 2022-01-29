require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const DATADOG_ENABLE = process.env.GATSBY_DATADOG === 'TRUE';

module.exports = {
  siteMetadata: {
    title: `Sage Montreal`,
    description: `ONLINE FLEA MARKET. SAGE MONTREAL.`,
    author: `@sagetech`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `src/images/sage-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-stripe',
      options: {
        objects: ['Sku', 'Product'],
        secretKey: process.env.GATSBY_STRIPE_SECRET,
        downloadFiles: true,
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_TRACKING_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-datadog',
      options: {
        rum: {
          applicationId: '00a96a5e-791b-448e-bda1-2103edba330d',
          clientToken: 'pub0c5a5f338933acd6d50464cc92e7c214',
          site: 'datadoghq.com',
          service: 'Sage Montreal',
          sampleRate: 100,
          enabled: DATADOG_ENABLE,
        },
        logs: {
          clientToken: 'pub0c5a5f338933acd6d50464cc92e7c214',
          site: 'datadoghq.com',
          service: 'Sage Montreal',
          sampleRate: 100,
        },
      },
    },
  ],
};
