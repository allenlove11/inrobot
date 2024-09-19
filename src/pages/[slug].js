import { useRouter } from 'next/router';
import Head from 'next/head';
import BreadcrumbSix from "@/src/common/breadcrumbs/breadcrumb-6";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import PostboxArea from "../components/blog-details/postbox-area";
import ErrorPage from 'next/error';

const BlogPost = ({ post, error, clientApiUrl }) => {
  const router = useRouter();

  if (error) {
    return <ErrorPage statusCode={error.statusCode} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title} | Your Site Name</title>
        <meta name="description" content={post.description || `Read about ${post.title}`} />
        {/* Add more meta tags as needed */}
      </Head>
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <BreadcrumbSix />
            <PostboxArea post={post} clientApiUrl={clientApiUrl} />
          </main>
          <FooterFive style_contact={true} style_team={true} bg_style={false} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  try {
    // 使用 NEXT_PUBLIC_API_URL 用于服务器端渲染
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const response = await fetch(`${apiUrl}/api/inrobots?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return { notFound: true };
    }

    const post = data.data[0].attributes;
    return { 
      props: { 
        post,
        clientApiUrl: process.env.NEXT_PUBLIC_CLIENT_API_URL // 将客户端 API URL 传递给组件
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { error: { statusCode: 500 } } };
  }
}

export async function getStaticPaths() {
  try {
    // 使用 NEXT_PUBLIC_API_URL 用于服务器端渲染
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const response = await fetch(`${apiUrl}/api/inrobots?populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.data) {
      return { paths: [], fallback: 'blocking' };
    }

    const paths = data.data.map(({ attributes }) => ({
      params: { slug: attributes.slug },
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export default BlogPost;
