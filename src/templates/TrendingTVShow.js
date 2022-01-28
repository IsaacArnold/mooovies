import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import fetch from "cross-fetch";
import { BsPersonCircle } from "react-icons/bs";
import moment from "moment";

const TrendingTVShow = ({ data: { show } }) => {
  const [details, setDetails] = useState();
  const [cast, setCast] = useState();
  const [rating, setRating] = useState();
  const [watchProviders, setWatchProviders] = useState();
  const [recommendations, setRecommendations] = useState();

  // Fetch more detailed data for the specified show
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${show.id}?api_key=353e0f45e349128efd51a2733d9f44f6`;
    const castURL = `https://api.themoviedb.org/3/tv/${show.id}/aggregate_credits?api_key=353e0f45e349128efd51a2733d9f44f6`;
    const ratingURL = `https://api.themoviedb.org/3/tv/${show.id}/content_ratings?api_key=353e0f45e349128efd51a2733d9f44f6`;
    const providersURL = `https://api.themoviedb.org/3/tv/${show.id}/watch/providers?api_key=353e0f45e349128efd51a2733d9f44f6`;
    const recURL = `https://api.themoviedb.org/3/tv/${show.id}/recommendations?api_key=353e0f45e349128efd51a2733d9f44f6`;
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
    fetch(providersURL)
      .then((Wresponse) => Wresponse.json())
      .then((watchRes) => setWatchProviders(watchRes))
      .catch((Werror) => console.log(Werror));
    fetch(recURL)
      .then((RecResponse) => RecResponse.json())
      .then((recRes) => setRecommendations(recRes))
      .catch((RecError) => console.log(RecError));
  }, [
    setDetails,
    show.id,
    setCast,
    setRating,
    setWatchProviders,
    setRecommendations,
  ]);

  // console.log(details);
  // console.log(cast);
  // console.log(rating);
  // console.log(watchProviders);
  // console.log(recommendations);

  let AUProvider;

  if (watchProviders) {
    AUProvider = watchProviders.results.AU;
    // console.log(AUProvider);
  } else {
    console.log("////// LOADING //////");
  }

  return (
    <Layout>
      {details && cast && rating && watchProviders && recommendations && (
        <main className="font-Poppins bg-light-bg">
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
              {details.name}{" "}
              <span className="text-sm text-gray-700 lg:text-xl">
                {"("}
                {details.first_air_date.slice(0, 4)}
                {")"}
              </span>
            </h1>

            {/* Secondary show information */}
            <div className="my-2">
              <div className="text-center">
                <p className="text-gray-500 border border-gray-500 px-1 inline rounded-lg text-xs lg:text-base">
                  {rating.results[1].rating}
                </p>
                <span className="text-xs text-gray-500 lg:text-base"> | </span>
                <p className="inline text-xs text-gray-500 lg:text-base">
                  Average episode run time:{" "}
                  {details.episode_run_time.reduce((a, b) => a + b, 0) /
                    details.episode_run_time.length || 0}
                  m
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

            {/* Show overview */}
            <div className="my-5">
              <h2 className="font-medium my-2 lg:text-2xl">Overview</h2>
              <p className="italic text-gray-700 text-xs lg:text-base">
                {details.tagline}
              </p>
              <p className="text-sm font-normal my-2 max-w-[700px] lg:text-lg">
                {details.overview}
              </p>
              <div className={details.created_by[0]?.name ? "block" : "hidden"}>
                <h3 className="font-medium text-xs mt-4 lg:text-base">
                  {details.created_by[0]?.name}
                </h3>
                <p className="text-xs font-light lg:text-base">Creator</p>
              </div>
            </div>

            {/* Watch providers */}
            {/* TODO: Get the location of the user - then loop through the WatchProviders and find the matching region and display the respective provider for their location */}
            <div className="my-5">
              <h2 className="font-medium my-2 lg:text-2xl">Watch on:</h2>
              <p className={AUProvider === undefined ? "block" : "hidden"}>
                Unfortunately you can't watch this show in Australia
              </p>
              <a
                className={AUProvider === undefined ? "hidden" : "inline"}
                href={AUProvider?.link}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${AUProvider?.flatrate[0].logo_path}`}
                  alt={AUProvider?.flatrate[0].provider_name}
                  className="object-cover w-8 rounded-lg md:w-12"
                />
              </a>
            </div>

            {/* Cast information */}
            <h2 className="font-medium mt-2 lg:text-2xl">Series Cast</h2>
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
                    <div className="rounded-lg shadow-md w-[85%] md:w-96 max-w-[200px] h-[174px] md:h-[300px] bg-dark-bg flex justify-center items-center">
                      <BsPersonCircle className="fill-white w-[50px] h-[50px]" />
                    </div>
                  )}

                  <div className="ml-2 mr-6 mt-2">
                    <p className="font-medium text-sm lg:text-lg">
                      {member.name}
                    </p>
                    <p className="text-gray-700 text-sm lg:text-lg">
                      {member.roles[0].character}
                    </p>
                    <p className="text-gray-500 text-xs lg:text-base">
                      {member.total_episode_count} Episodes
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Season Information */}
            <div className="mb-10">
              <h2 className="font-medium mt-7 lg:text-2xl">
                Seasons{" "}
                <span className="text-sm lg:text-lg">
                  {"("}
                  {details.seasons.length}
                  {")"}
                </span>
              </h2>
              <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mt-5 pb-5">
                {details.seasons.map((season) => (
                  <div
                    key={season.id}
                    className="flex-none w-[75%] md:w-1/3 mr-[15px] md:pb-4 rounded-lg h-auto shadow-md bg-dark-bg"
                  >
                    <div className="ml-2 mr-6 mt-2 pb-2 pl-2 text-white">
                      <p className="font-medium text-sm lg:text-lg">
                        {season.name}
                      </p>
                      <p className="text-light-bg text-xs inline lg:text-base">
                        {season.air_date.slice(0, 4)}
                      </p>
                      <span className="text-xs text-light-bg lg:text-base">
                        {" "}
                        |{" "}
                      </span>
                      <p className="text-light-bg text-xs inline lg:text-base">
                        {season.episode_count} Episodes
                      </p>
                      <p className="text-light-bg text-xs lg:text-base">
                        {season.name} of {details.name} premiered on{" "}
                        {moment(season.air_date).format("D MMMM YYYY")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <section
              className={
                recommendations.results.length > 0 ? "block" : "hidden"
              }
            >
              <h2 className="font-medium mt-2 lg:text-2xl">
                You may also like
              </h2>
              <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mt-5 pb-5">
                {recommendations.results.slice(0, 10).map((recommendation) => (
                  <div
                    key={recommendation.id}
                    className="flex-none w-2/5 md:w-[30%] mr-0 md:pb-4 rounded-lg h-auto lg:w-[23%] xl:w-[18%] 2xl:max-w-[15%]"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${recommendation.backdrop_path}`}
                      alt={recommendation.name}
                      className="rounded-lg shadow-md w-[85%] md:w-96 max-w-[200px]"
                    />
                    <div className="ml-2 mr-6 mt-2">
                      <p className="font-medium text-sm lg:text-lg">
                        {recommendation.name}
                      </p>
                      <p className="text-gray-700 text-sm lg:text-lg">
                        {recommendation.first_air_date.slice(0, 4)}
                      </p>
                      <p className="text-gray-500 text-xs lg:text-base">
                        {recommendation.total_episode_count} Episodes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      )}
    </Layout>
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
      first_air_date(formatString: "D MMMM YYYY")
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
