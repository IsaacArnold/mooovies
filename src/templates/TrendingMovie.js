import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

const TrendingMovie = ({ data: { movie } }) => {
  const [details, setDetails] = useState();

  // Fetch more detailed data for the specified movie
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.MOVIE_API_V3}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => setDetails(result))
      .catch((err) => console.log(err));
  }, [setDetails, movie.id]);

  console.log(details);

  return (
    <>
      {details && (
        <div className="font-Poppins">
          <div className="flex w-full">
            {/* Backdrop image */}
            <img
              src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
              alt={details.name}
              className="object-fill w-96"
            />
          </div>
          <h1>{movie.name}</h1>
          <p>{movie.overview}</p>
          <div>
            {details.genres.map((genre) => (
              <p key={genre.name}>{genre.name}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingMovie;

// Uses the id variable from 'gatsby-node' to query and get the data for specific show
export const query = graphql`
  query ($id: String) {
    movie: trendingMovies(id: { eq: $id }) {
      title
      id
      poster_path
      backdrop_path
      overview
      release_date(formatString: "D MMM YYYY")
    }
  }
`;

// export async function getServerData() {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/tv/85552?api_key=${process.env.MOVIE_API_V3}`
//   );
//   const data = await res.json();
//   return {
//     props: {
//       backdrop: data.backdrop_path,
//     },
//   };
// }
