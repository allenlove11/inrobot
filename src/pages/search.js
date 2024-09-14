import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import HeaderSix from "@/src/layout/headers/header-6";
import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();
  const { q } = router.query;
  const baseURL = 'http://38.242.197.100:1337';

  useEffect(() => {
    if (q) {
      fetchSearchResults();
    }
  }, [q]);

  useEffect(() => {
    filterResults();
  }, [results, selectedCategory]);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}/api/inrobots?populate=*`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const formattedData = data.data.map(({ id, attributes }) => ({
        id,
        title: attributes.title,
        slug: attributes.slug,
        brand: attributes.brand,
        availability: attributes.availability,
      }));

      const filteredResults = formattedData.filter(item => 
        item.title.toLowerCase().includes(q.toLowerCase()) ||
        item.brand.toLowerCase().includes(q.toLowerCase())
      );

      setResults(filteredResults);

      // Extract unique brands as categories
      const allCategories = [...new Set(filteredResults.map(item => item.brand))];
      setCategories(['All', ...allCategories]);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('An error occurred while fetching search results. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterResults = () => {
    if (selectedCategory === 'All') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(item => item.brand === selectedCategory));
    }
  };

  return (
    <>
      <HeaderSix />
      <BreadcrumbTwo title={"Search Results"} innertitle={"Search Results"} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for: <span className="text-blue-600">"{q}"</span>
        </h2>
        
        {/* Category filter */}
        <div className="mb-4">
          <label htmlFor="category-select" className="mr-2">Filter by brand:</label>
          <select 
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded p-2"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center mt-4 text-red-500">{error}</p>
        ) : (
          <div className="portfolio blog-grid-inner mb-80">
            <div className="container">
              <div className="row grid blog-grid-inner">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, i) => (
                    <div key={i} className="col-xl-3 col-lg-6 col-md-6 mb-30 grid-item">
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
                  <p className="text-center mt-4">No results found</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterFive style_contact={true} style_team={true} />
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

export default SearchResults;
