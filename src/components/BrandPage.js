import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const BrandPage = ({ brand }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  const fetchBrandPosts = useCallback(async () => {
    if (!brand) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}/api/inrobots?filters[brand][$eq]=${brand}&populate=*`);
      if (!response.ok) {
        throw new Error('Failed to fetch brand posts');
      }
      const data = await response.json();
      const formattedData = data.data.map(({ id, attributes }) => ({
        id,
        title: attributes.title,
        slug: attributes.slug,
        brand: attributes.brand,
        availability: attributes.availability,
      }));
      setPosts(formattedData);
    } catch (err) {
      setError('Failed to fetch brand posts');
    } finally {
      setLoading(false);
    }
  }, [brand, baseURL]);

  useEffect(() => {
    fetchBrandPosts();
  }, [fetchBrandPosts]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Brand: <span className="text-blue-600">{brand}</span> ({posts.length} results)
      </h2>
      <div className="portfolio blog-grid-inner mb-80">
        <div className="container">
          <div className="row grid blog-grid-inner">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="text-center mt-4">No posts found for this brand</p>
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Your existing styles here */
      `}</style>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="text-center mt-4">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center mt-4 text-red-500">{message}</div>
);

const PostCard = ({ post }) => (
  <div className="col-xl-3 col-lg-6 col-md-6 mb-30 grid-item">
    <div className="tp-blog-item">
      <div className="tp-blog-content">
        <h3 className="tp-blog-title line-clamp-1">{post.title}</h3>
        <p className="tp-blog-brand line-clamp-1">{post.brand}</p>
        <p className="tp-blog-availability">Availability: {post.availability}</p>
        <h4 className="tp-blog-enquire">Enquire</h4>
        <ul className="tp-blog-features">
          <li>✓ 12-month warranty</li>
          <li>✓ Dispatch Immediately</li>
          <li>✓ Delivery Worldwide</li>
        </ul>
        <div className="tp-blog-button">
          <Link href={`/${post.slug}`} className="quote-button">
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default BrandPage;
