import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const TrendingTVShows = () => {
  const data = useStaticQuery(graphql`
    query TVQuery {
      allTrendingTvShows {
        nodes {
          name
          id
          poster_path
        }
      }
    }
  `);

  const {
    allTrendingTvShows: { nodes },
  } = data;

  return (
    <>
      <div>
        <h1>Trending TV Shows</h1>
        {nodes.map((show) => (
          <div key={show.id}>
            <p>{show.name}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={show.name}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TrendingTVShows;
