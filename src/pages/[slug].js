import { useRouter } from 'next/router';
import BreadcrumbSix from "@/src/common/breadcrumbs/breadcrumb-6";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import PostboxArea from "../components/blog-details/postbox-area";

const BlogPost = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <BreadcrumbSix />
            <PostboxArea post={post} />
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
    const response = await fetch(`http://38.242.197.100:1337/api/inrobots?filters[slug][$eq]=${slug}&populate=*`);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return { notFound: true };
    }

    const post = data.data[0].attributes;
    return { props: { post } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const response = await fetch('http://38.242.197.100:1337/api/inrobots?populate=*');
    const data = await response.json();

    if (!data.data) {
      return { paths: [], fallback: true };
    }

    const paths = data.data.map(({ attributes }) => ({
      params: { slug: attributes.slug },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return { paths: [], fallback: true };
  }
}

export default BlogPost;
