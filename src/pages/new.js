import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import CtaArea from "../components/contact/cta-area";
import MainNavigation from "../components/blog/MainNavigation";

const NewPage = () => {
  return (
    <>
      <HeaderSix />
      <main>
        <BreadcrumbTwo title={"New Content"} innertitle={"Latest Updates"} />
        <MainNavigation />
        <div className="container mt-5 mb-5">
          <h2>New Content</h2>
          <p>Explore our latest additions and updates. Stay informed about the newest features and content available on our platform.</p>
          {/* Add more content specific to the New page here */}
        </div>
        <CtaArea />
      </main>
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default NewPage;