import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import CtaArea from "../components/contact/cta-area";
import MainNavigation from "../components/blog/MainNavigation";

const DiscordOfAIPage = () => {
  return (
    <>
      <HeaderSix />
      <main>
        <BreadcrumbTwo title={"Discord of AI"} innertitle={"AI Community"} />
        <MainNavigation currentPath="/discord-of-ai" />
        <div className="container mt-5 mb-5">
          <h2>Discord of AI</h2>
          <p>Join our AI community discussion on Discord. Connect with other AI enthusiasts, share ideas, and stay updated on the latest AI trends.</p>
          {/* Add more content specific to the Discord of AI page here */}
        </div>
        <CtaArea />
      </main>
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default DiscordOfAIPage;