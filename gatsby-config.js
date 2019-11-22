require('dotenv').config();
module.exports = {
  siteMetadata: {
    title: `Snpptwrld`,
    description: `Snpptwrld discription.`,
    author: 'Hassib Ashouri'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
  ]
}
