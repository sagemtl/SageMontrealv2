require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Sage Montreal`,
    description: `ONLINE FLEA MARKET. REPPIN ASIA ONE CULTURE AT A TIME. SAGE MONTREAL.`,
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
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/sage-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-mongodb',
      options: {
        dbName: 'heroku_8pxd36bk',
        collection: ['moodboards', 'stickers', 'products'],
        server: {
          address: 'ds163764.mlab.com',
          port: 63764,
        },
        auth: {
          user: process.env.GATSBY_DB_USER,
          password: process.env.GATSBY_DB_PASSWORD,
        },
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
      options: {
        // Add any options here
      },
    },
    {
      resolve: '@mkitio/gatsby-theme-password-protect',
      options: {
        partialMatching: true,
        password: process.env.GATSBY_PASSWORD, // delete or `undefined` to disable password protection
        pagePaths: ['/cms'],
      },
    },
  ],
};
