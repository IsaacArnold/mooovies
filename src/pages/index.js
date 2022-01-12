import * as React from "react";

import Seo from "../components/seo";
import TrendingTVShows from "../components/TrendingTVShows";

const IndexPage = () => {
  return (
    <>
      <Seo title="Home" />
      <div>
        <TrendingTVShows />
      </div>
    </>
  );
};

export default IndexPage;
