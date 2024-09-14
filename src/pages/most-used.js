import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import CtaArea from "../components/contact/cta-area";
import MainNavigation from "../components/blog/MainNavigation";

const MostUsedPage = () => {
  return (
    <>
      <HeaderSix />
      <main>
        <BreadcrumbTwo title={"Most Used"} innertitle={"Frequently Accessed"} />
        <MainNavigation currentPath="/most-used" />
        <div className="container mt-5 mb-5">
          <h2>Most Used Content</h2>
          <p>Explore the features and content that our users interact with most frequently. This section highlights the most popular aspects of our platform.</p>
          {/* Add more content specific to the Most Used page here */}
        </div>
        <CtaArea />
      </main>
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default MostUsedPage;