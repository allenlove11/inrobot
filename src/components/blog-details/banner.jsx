import React from 'react';
import Image from 'next/image';

const Banner = ({ imageUrl }) => {
  // 假设您知道图片的原始宽高比，例如 16:9
  const aspectRatio = (9 / 16) * 100; // 计算百分比

  return (
    <div className="blog-details-img-area mb-80">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="blog-details-big-img z-index-2" style={{ position: 'relative', width: '100%', paddingBottom: `10%` }}>
              {/* 使用外部 URL 时，需要在 next.config.js 中配置域名 */}
              <Image src={imageUrl} alt="theme-pure" layout="responsive" width={700} height={394} objectFit="cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
