import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import Portfolio from "../components/blog/portfolio";

const Home = () => {
  return (
    <>
      <HeaderSix />
      <main>
        <BreadcrumbTwo title={"Read our blogs"} innertitle={"Blog Grid Classic"} />
        <Portfolio />

      </main>
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default Home;