import * as React from "react";
import Layout from "../components/Layout";

import Seo from "../components/seo";
import TrendingMovies from "../components/TrendingMovies";
import TrendingTVShows from "../components/TrendingTVShows";

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Mooovies" />
      <TrendingTVShows />
      <TrendingMovies />
    </Layout>
  );
};

export default IndexPage;
