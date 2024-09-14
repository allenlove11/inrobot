import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import CtaArea from "../components/contact/cta-area";
import MainNavigation from "../components/blog/MainNavigation";

const MostSavedPage = () => {
  return (
    <>
      <HeaderSix />
      <main>
        <BreadcrumbTwo title={"Most Saved"} innertitle={"Popular Content"} />
        <MainNavigation currentPath="/most-saved" />
        <div className="container mt-5 mb-5">
          <h2>Most Saved Content</h2>
          <p>Discover the content that our users find most valuable. These are the most frequently saved items across our platform.</p>
          {/* Add more content specific to the Most Saved page here */}
        </div>
        <CtaArea />
      </main>
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default MostSavedPage;