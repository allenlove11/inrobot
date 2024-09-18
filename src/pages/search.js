import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import HeaderSix from "@/src/layout/headers/header-6";
import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();
  const { q } = router.query;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://38.242.197.100:1337';

  const fetchSearchResults = useCallback(async () => {
    if (!q) return;

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

      const allCategories = ['All', ...new Set(filteredResults.map(item => item.brand))];
      setCategories(allCategories);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('An error occurred while fetching search results. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [q, baseURL]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(item => item.brand === selectedCategory));
    }
  }, [results, selectedCategory]);

  const ResultItem = ({ item }) => (
    <div className="col-xl-3 col-lg-6 col-md-6 mb-30 grid-item">
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
  );

  return (
    <>
      <HeaderSix />
      <BreadcrumbTwo title="Search Results" innertitle="Search Results" />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for: <span className="text-blue-600">"{q}"</span>
        </h2>
        
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
                  filteredResults.map((item, i) => <ResultItem key={i} item={item} />)
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
        /* Your existing styles here */
      `}</style>
    </>
  );
};

export default SearchResults;
