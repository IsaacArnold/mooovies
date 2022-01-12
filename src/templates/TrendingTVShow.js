import { graphql } from "gatsby";
import React from "react";

const TrendingTVShow = ({ data: { show } }) => {
  return (
    <div>
      <h1>{show.name}</h1>
      <p>{show.overview}</p>
    </div>
  );
};

export default TrendingTVShow;

// Uses the id variable from 'gatsby-node' to query and get the data for specific show
export const query = graphql`
  query ($id: String) {
    show: trendingTvShows(id: { eq: $id }) {
      name
      id
      poster_path
      backdrop_path
      overview
    }
  }
`;
