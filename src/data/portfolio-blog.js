// 导入 React 和 Next.js 的 Image 组件
import React from 'react';
import Image from 'next/image';

// Portfolio 组件，接收从 getStaticProps 传递来的 portfolioBlog 作为 props
const Portfolio = ({ portfolioBlog = [] }) => { // 为 portfolioBlog 提供默认空数组作为默认值
  return (
    <div>
      {/* 遍历 portfolioBlog 数组，为每个文章渲染内容 */}
      {Array.isArray(portfolioBlog) && portfolioBlog.map((item, index) => ( // 检查 portfolioBlog 是否为数组
        <div key={index} style={{ marginBottom: '20px' }}>
          {/* 文章缩略图 */}
          <Image 
            src={item.thumb_img} 
            alt="Blog Thumbnail" 
            width={624} 
            height={327} 
            layout="responsive"
          />
          {/* 文章标题 */}
          <h2>{item.title}</h2>
          {/* 文章描述 */}
          <p>{item.des}</p>
          {/* 作者头像 */}
          <Image
            src={item.avata_img}
            alt="Author Avatar"
            width={50} // 假设头像大小为 50x50，根据实际情况调整
            height={50}
          />
          {/* 其他信息，如作者名字等 */}
          <p>{item.author_name} - {item.author_info}</p>
        </div>
      ))}
    </div>
  );
};

// 使用 getStaticProps 在构建时获取数据
export async function getStaticProps() {
  // 调用 API 获取数据
  const res = await fetch('http://localhost:1337/api/news?populate=*');
  const { data } = await res.json();

  // 转换数据格式以匹配组件的预期
  const portfolioBlog = data.map(({ id, attributes }) => ({
    id: id,
    title: attributes.title,
    des: attributes.des,
    thumb_img: `http://localhost:1337${attributes.img.data.attributes.url}`, // 确保添加 baseURL
    avata_img: `http://localhost:1337${attributes.avata_img.data.attributes.url}`, // 确保添加 baseURL
    author_name: attributes.author_name, // 作者名字
    author_info: attributes.author_info, // 作者信息
    // 根据需要添加更多属性
  }));

  // 将转换后的数据作为 props 传递给页面组件
  return {
    props: {
      portfolioBlog,
    },
  };
}

export default Portfolio;
