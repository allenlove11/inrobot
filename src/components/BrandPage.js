import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BrandPage = ({ brand }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:1337';

  useEffect(() => {
    fetchBrandPosts();
  }, [brand]);

  const fetchBrandPosts = async () => {
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
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch brand posts');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Brand: <span className="text-blue-600">{brand}</span> ({posts.length} results)
        </h2>
        <div className="portfolio blog-grid-inner mb-80">
          <div className="container">
            <div className="row grid blog-grid-inner">
              {posts.length > 0 ? (
                posts.map((post, i) => (
                  <div key={i} className="col-xl-3 col-lg-6 col-md-6 mb-30 grid-item">
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
                ))
              ) : (
                <p className="text-center mt-4">No posts found for this brand</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tp-blog-title {
          font-size: 18px;
          line-height: 1.3;
          margin-bottom: 10px;
        }
        .tp-blog-brand {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .tp-blog-availability {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .tp-blog-enquire {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .tp-blog-features {
          list-style-type: none;
          padding-left: 0;
          margin-bottom: 15px;
        }
        .tp-blog-features li {
          font-size: 14px;
          margin-bottom: 5px;
        }
        .tp-blog-content {
          padding: 20px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
        }
        .quote-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #6865ff;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
        }
        .quote-button:hover {
          background-color: #5451d6;
          box-shadow: 0 2px 4px rgba(104, 101, 255, 0.4);
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
};

export default BrandPage;
