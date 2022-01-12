import * as React from "react";
import Layout from "../components/layout";

import Seo from "../components/seo";
import TrendingTVShows from "../components/TrendingTVShows";

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Mooovies" />
      <TrendingTVShows />
    </Layout>
  );
};

export default IndexPage;
