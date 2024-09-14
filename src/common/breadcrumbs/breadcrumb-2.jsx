import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useTitleAnimation from "@/src/hooks/useTitleAnimation";
import useBreadcrumbTitleAnime from "@/src/hooks/useBreadcrumbTitleAnime";
import Search from "../../components/Search";

import shape_1 from "../../../public/assets/img/breadcrumb/breadcrumb-shape-1.png";
import shape_3 from "../../../public/assets/img/breadcrumb/breadcrumb-3.png";
import shape_4 from "../../../public/assets/img/breadcrumb/breadcrumb-sub-1.png";

const BreadcrumbTwo = ({ title, innertitle, team_details, career_details }) => {
  const { animeRef } = useBreadcrumbTitleAnime();
  let subtitleRef = useRef(null);

  useTitleAnimation(subtitleRef);

  // 定义内联样式
  const titleStyle = {
    textAlign: 'center',
    color: 'white',
    margin: 0,
    marginBottom: '20px'  // 大标题与小标题之间的留白
  };

  const largeTitleStyle = {
    ...titleStyle,
    fontSize: '2.5rem',
    fontWeight: 'bold'
  };

  const subtitleStyle = {
    ...titleStyle,
    fontSize: '1.5rem',
    fontWeight: 'normal',
    marginBottom: '30px'  // 小标题与下面组件之间的留白
  };

  return (
    <>
      <div className="breadcrumb__area breadcrumb-height p-relative blue-bg-2">
        <div className="breadcrumb__shape-1">
          <Image src={shape_1} alt="theme-pure" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="breadcrumb__content">
                {/* 添加大标题和普通标题，应用内联样式 */}
                <h1 style={largeTitleStyle}>Discover The Best AI Websites & Tools</h1>
                <h2 style={subtitleStyle}>19709 AIs and 233 categories in the best AI tools directory. AI tools list & GPTs store are updated daily by ChatGPT.</h2>
                
                {/* 搜索组件 */}
                <Search />
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-lg-4 text-center text-md-end">
              <div className="breadcrumb__img p-relative text-start z-index">
                <Image className="z-index-3" src={shape_3} alt="theme-pure" />
                <div
                  className="breadcrumb__sub-img wow tpfadeUp"
                  data-wow-duration=".9s"
                  data-wow-delay=".4s"
                >
                  <Image src={shape_4} alt="theme-pure" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbTwo;
