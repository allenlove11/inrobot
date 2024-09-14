import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import CtaArea from "../components/contact/cta-area";
import MainNavigation from "../components/blog/MainNavigation";

const AppsPage = () => {
  return (
    <>
      <HeaderSix />
      <main>
        <BreadcrumbTwo title={"Apps"} innertitle={"Our Applications"} />
        <MainNavigation currentPath="/apps" />
        <div className="container mt-5 mb-5">
          <h2>Apps and Integrations</h2>
          <p>Discover our suite of apps and integrations designed to enhance your experience and productivity. Find tools that seamlessly connect with our platform.</p>
          {/* Add more content specific to the Apps page here */}
        </div>
        <CtaArea />
      </main>
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default AppsPage;