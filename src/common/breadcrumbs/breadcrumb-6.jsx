import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import QuoteForm from '../../components/QuoteForm'; // 确保路径正确

const BreadcrumbSix = () => {
  const router = useRouter();
  const [robotData, setRobotData] = useState({
    title: "",
    shortdec: "",
    availability: "",
    brand: "",
    des: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady || !router.query.slug) return;

      const { slug } = router.query;
      setLoading(true);

      try {
        const response = await fetch(`http://38.242.197.100:1337/api/inrobots?populate=*&filters[slug][$eq]=${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const robotItem = data.data[0].attributes;
          setRobotData({
            title: robotItem.title || "No title",
            shortdec: robotItem.shortdec || "No short description",
            availability: robotItem.availability || "Unknown",
            brand: robotItem.brand || "Unknown brand",
            des: robotItem.des || "No description",
          });
        } else {
          setError("No matching robot data found");
        }
      } catch (error) {
        console.error('Error fetching robot data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, router.query.slug]);

  if (loading) return <div style={{ color: 'white' }}>Loading...</div>;
  if (error) return <div style={{ color: 'white' }}>Error: {error}</div>;

  return (
    <div className="breadcrumb__area breadcrumb-ptb-4 p-relative blue-bg-2" style={{ paddingBottom: '120px', paddingTop: '120px' }}>
      <div className="container">
        <span style={{ color: 'white' }}>
          <Link href="/" legacyBehavior>
            <a style={{ color: 'white' }}>Home</a>
          </Link> &gt; {robotData.title}
        </span>
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-12">
            <div className="blog-details-banner z-index-2">
              <div className="blog-details-title-box">
                <h3 className="blog-details-banner-title" style={{ color: 'white' }}>
                  {robotData.title}
                </h3>
                <p style={{ color: 'white' }}>{robotData.shortdec}</p>
                <p style={{ color: 'white' }}>
                  <strong>Availability: </strong>{robotData.availability}
                </p>
                <p style={{ color: 'white' }}>
                  <strong>Manufacturer: </strong>{robotData.brand}
                </p>
                <p style={{ color: 'white' }}>
                  <strong>Part number: </strong>{robotData.title}
                </p>
                <p style={{ color: 'white' }}>
                  <strong>Description: </strong>{robotData.des}
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-4 col-md-12">
            <div className="quote-form-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ color: 'black', marginBottom: '20px' }}>Get a Quote</h4>
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbSix;