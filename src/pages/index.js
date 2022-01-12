import * as React from "react";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = ({ data }) => {
  const {
    allTrendingTvShows: { nodes },
  } = data;
  console.log(nodes);

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <h1>Trending TV Shows</h1>
        {nodes.map((show, index) => (
          <div key={show.id}>
            <p>{show.name}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={show.name}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query TVQuery {
    allTrendingTvShows {
      nodes {
        name
        id
        poster_path
      }
    }
  }
`;
