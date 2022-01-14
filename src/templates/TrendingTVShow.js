import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import fetch from "cross-fetch";

const TrendingTVShow = ({ data: { show } }) => {
  const [details, setDetails] = useState();
  const [cast, setCast] = useState();
  const [rating, setRating] = useState();

  // Fetch more detailed data for the specified show
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${show.id}?api_key=${process.env.MOVIE_API_V3}`;
    const castURL = `https://api.themoviedb.org/3/tv/${show.id}/aggregate_credits?api_key=${process.env.MOVIE_API_V3}`;
    const ratingURL = `https://api.themoviedb.org/3/tv/${show.id}/content_ratings?api_key=${process.env.MOVIE_API_V3}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => setDetails(result))
      .catch((err) => console.log(err));
    fetch(castURL)
      .then((response) => response.json())
      .then((castRes) => setCast(castRes.cast))
      .catch((error) => console.log(error));
    fetch(ratingURL)
      .then((Rresponse) => Rresponse.json())
      .then((ratRes) => setRating(ratRes))
      .catch((Rerror) => console.log(Rerror));
  }, [setDetails, show.id, setCast, setRating]);

  console.log(details);
  // console.log(cast);
  // console.log(rating);

  return (
    <>
      {details && cast && rating && (
        <section className="font-Poppins">
          <div className="flex w-full">
            {/* Backdrop image */}
            <img
              src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
              alt={details.name}
              className="object-fill w-96"
              id="backdrop"
            />
          </div>
          <div className="flex flex-col w-full px-4 mx-auto">
            <h1 className="text-center">
              {details.name} <span>{details.first_air_date.slice(0, 4)}</span>
            </h1>

            {/* Secondary show information */}
            <div>
              <div>
                <p>{rating.results[1].rating}</p>
                <p>
                  Average episode run time:{" "}
                  {details.episode_run_time.reduce((a, b) => a + b, 0) /
                    details.episode_run_time.length || 0}
                  m
                </p>
                {details.genres.map((genre) => (
                  <p key={genre.name}>{genre.name}</p>
                ))}
              </div>
            </div>

            {/* Show overview */}
            <div>
              <p>{details.tagline}</p>
              <h2>Overview</h2>
              <p>{details.overview}</p>
              <h3>{details.created_by[0].name}</h3>
              <p>Creator</p>
            </div>

            {/* Cast information */}
            <h2>Series Cast</h2>
            <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mt-5 pb-3">
              {cast.slice(0, 10).map((member) => (
                <div
                  key={member.id}
                  className="flex-none w-1/2 md:w-1/3 mr-8 md:pb-4 rounded-lg h-auto"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                    className="w-full rounded-lg shadow-md"
                  />
                  <p>{member.name}</p>
                  <p>{member.roles[0].character}</p>
                  <p>{member.total_episode_count} Episodes</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
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
      first_air_date(formatString: "D MMM YYYY")
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
