import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { BsPersonCircle } from "react-icons/bs";

const TrendingMovie = ({ data: { movie } }) => {
  const [details, setDetails] = useState();
  const [cast, setCast] = useState();
  const [rating, setRating] = useState();

  // Fetch more detailed data for the specified movie
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=353e0f45e349128efd51a2733d9f44f6`;
    const castURL = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=353e0f45e349128efd51a2733d9f44f6`;
    const ratingURL = `http://api.themoviedb.org/3/movie/${movie.id}?api_key=353e0f45e349128efd51a2733d9f44f6&append_to_response=release_dates`;

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
      .then((ratRes) =>
        setRating(
          ratRes.release_dates.results.filter(
            (entry) => entry.iso_3166_1 === "US"
          )
        )
      )
      .catch((Rerror) => console.log(Rerror));
  }, [setDetails, movie.id, setCast, setRating]);

  // console.log(details);
  // console.log(cast);

  return (
    <Layout>
      {details && cast && (
        <section className="font-Poppins bg-light-bg">
          <div className="flex w-full">
            {/* Backdrop image */}
            <img
              src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
              alt={details.name}
              className="object-cover w-full max-h-[300px]"
              id="backdrop"
            />
          </div>
          <div className="flex flex-col w-full px-4 mx-auto my-5">
            <h1 className="text-center text-lg font-medium lg:text-2xl">
              {details.title}{" "}
              <span className="text-sm text-gray-700 lg:text-xl">
                {"("}
                {details.release_date.slice(0, 4)}
                {")"}
              </span>
            </h1>

            {/* Secondary show information */}
            <div className="my-2">
              <div className="text-center">
                {/* <p className="text-gray-500 border border-gray-500 px-1 inline rounded-lg text-xs lg:text-base">
                  M
                </p>
                <span className="text-xs text-gray-500 lg:text-base"> | </span> */}
                <p className="inline text-xs text-gray-500 lg:text-base">
                  Runtime: {details.runtime}m
                </p>
                <div>
                  {details.genres.map((genre, index) => (
                    <p
                      key={genre.name}
                      className="inline text-xs text-gray-500 lg:text-base"
                    >
                      {genre.name}
                      {index < details.genres.length - 1 ? ", " : ""}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Movie overview */}
            <div className="my-5">
              <h2 className="font-medium my-2 lg:text-2xl">Overview</h2>
              <p className="italic text-gray-700 text-xs lg:text-base">
                {details.tagline}
              </p>
              <p className="text-sm font-normal my-2 max-w-[700px] lg:text-lg">
                {details.overview}
              </p>
              <div
                className={
                  details.production_companies[0]?.name ? "block" : "hidden"
                }
              >
                <p className="text-xs font-medium lg:text-base mt-4">
                  Produced By:
                </p>
                <h3 className="font-medium text-xs lg:text-base">
                  {details.production_companies.map((company, id) => (
                    <p
                      key={company.name}
                      className="inline text-xs text-gray-500 lg:text-base"
                    >
                      {company.name}
                      {id < details.production_companies.length - 1 ? ", " : ""}
                    </p>
                  ))}
                </h3>
              </div>
            </div>

            {/* Cast information */}
            <h2 className="font-medium mt-2 lg:text-2xl">Movie Cast</h2>
            <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mt-5 pb-5">
              {cast.slice(0, 10).map((member) => (
                <div
                  key={member.id}
                  className="flex-none w-2/5 md:w-[30%] mr-0 md:pb-4 rounded-lg h-auto lg:w-[23%] xl:w-[18%] 2xl:max-w-[15%]"
                >
                  {member.profile_path != null ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                      className="rounded-lg shadow-md w-[85%] md:w-96 max-w-[200px]"
                      alt={member.name}
                    />
                  ) : (
                    <div className="w-[117px] h-[175px] rounded-lg shadow-md bg-dark-bg flex justify-center items-center">
                      <BsPersonCircle className="fill-white w-[50px] h-[50px]" />
                    </div>
                  )}

                  <div className="ml-2 mr-6 mt-2">
                    <p className="font-medium text-sm lg:text-lg">
                      {member.name}
                    </p>
                    <p className="text-gray-700 text-sm lg:text-lg">
                      {member.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
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
