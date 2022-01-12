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
