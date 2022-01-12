import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const TrendingTVShows = () => {
  const data = useStaticQuery(graphql`
    query TVQuery {
      allTrendingTvShows(limit: 10) {
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
      <div className="font-Poppins container px-4 flex-grow w-full py-4 sm:py-16 mx-auto">
        <h1>Trending TV Shows</h1>
        <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8">
          {nodes.map((show) => (
            <div
              key={show.id}
              className="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg h-96"
            >
              <div>
                <p>{show.name}</p>
                <Link to={`/tv/${show.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                    alt={show.name}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingTVShows;
