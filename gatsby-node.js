exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });
};

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const fetch = require("node-fetch");

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.MOVIE_API_V3}`
  );

  const data = await response.json();
  // console.log(data);

  data.results.forEach((item) => {
    createNode({
      ...item,
      id: item.id.toString(),
      internal: {
        type: "TrendingTVShows",
        contentDigest: createContentDigest(item),
      },
    });
  });
};

exports.createPages = async function ({ actions, graphql }) {
  const {
    data: {
      allTrendingTvShows: { nodes },
    },
  } = await graphql(`
    query {
      allTrendingTvShows {
        nodes {
          name
          id
          poster_path
          backdrop_path
          overview
        }
      }
    }
  `);
  nodes.forEach((show) => {
    // Creates a slug using the show id, so the page can be found easily
    const slug = `tv/${show.id}`;
    // Uses the id in pageContext so it can be used as a query variable in the template page query
    const id = show.id;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/TrendingTVShow.js`),
      context: { id: id },
    });
  });
};
