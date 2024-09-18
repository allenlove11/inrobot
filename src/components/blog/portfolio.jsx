import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 使用环境变量来设置 API URL
  const baseURL = process.env.NEXT_PUBLIC_CLIENT_API_URL || 'http://38.242.197.100:1337';

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `${baseURL}/api/inrobots?populate=*`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const formattedData = data.data.map(({ id, attributes }) => ({
        id,
        title: attributes.title,
        slug: attributes.slug,
        brand: attributes.brand,
        availability: attributes.availability,
      }));
      setItems(formattedData);
    } catch (e) {
      console.error("Failed to fetch data:", e);
      setError("Failed to load data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="portfolio blog-grid-inner mb-80">
        <div className="container">
          <div className="row grid blog-grid-inner">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="col-xl-3 col-lg-6 col-md-6 mb-30 grid-item">
                  <div className="tp-blog-item">
                    <div className="tp-blog-content">
                      <h3 className="tp-blog-title line-clamp-1">{item.title}</h3>
                      <p className="tp-blog-brand line-clamp-1">{item.brand}</p>
                      <p className="tp-blog-availability">Availability: {item.availability}</p>
                      <h4 className="tp-blog-enquire">Enquire</h4>
                      <ul className="tp-blog-features">
                        <li>✓ 12-month warranty</li>
                        <li>✓ Dispatch Immediately</li>
                        <li>✓ Delivery Worldwide</li>
                      </ul>
                      <div className="tp-blog-button">
                        <Link href={`/${item.slug}`} className="quote-button">
                          Get a Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No items found</div>
            )}
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
    color: white; /* 确保文本颜色在悬浮时保持为白色 */
  }
`}</style>

    </>
  );
};

export default Portfolio;