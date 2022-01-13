import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { FaStar } from "react-icons/fa";

const TrendingMovies = () => {
  const data = useStaticQuery(graphql`
    query MovieQuery {
      allTrendingMovies(limit: 10) {
        nodes {
          title
          id
          poster_path
          release_date(formatString: "D MMM YYYY")
          vote_average
        }
      }
    }
  `);

  const {
    allTrendingMovies: { nodes },
  } = data;

  console.log(nodes);

  return (
    <>
      <section className="font-Poppins container px-4 flex-grow w-full pt-8">
        <h1 className="font-semibold">Today's Trending Movies</h1>
        <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8 mt-5 pb-3">
          {nodes.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-1/2 md:w-1/3 mr-8 md:pb-4 rounded-lg h-auto"
            >
              <div>
                <Link to={`/movie/${movie.id}-${movie.title}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-md"
                  />
                </Link>
              </div>
              <div className="mt-3 mx-2">
                <div className="w-full flex items-center justify-between">
                  <p className="font-medium">{movie.title}</p>
                  <div className="flex items-center justify-items-center">
                    <FaStar className="fill-gray-500 mr-1 w-[15px] h-[15px]" />
                    <p className="text-gray-500 text-sm">
                      {movie.vote_average}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-700">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TrendingMovies;
