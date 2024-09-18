import React, { useState, useEffect, useCallback } from 'react';
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

  const fetchData = useCallback(async (slug) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
      const response = await fetch(`${apiUrl}/api/inrobots?populate=*&filters[slug][$eq]=${slug}`);
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
        throw new Error("No matching robot data found");
      }
    } catch (error) {
      console.error('Error fetching robot data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (router.isReady && router.query.slug) {
      fetchData(router.query.slug);
    }
  }, [router.isReady, router.query.slug, fetchData]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="breadcrumb__area breadcrumb-ptb-4 p-relative blue-bg-2" style={{ paddingBottom: '120px', paddingTop: '120px' }}>
      <div className="container">
        <Breadcrumb title={robotData.title} />
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-12">
            <RobotDetails data={robotData} />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12">
            <QuoteFormContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-white text-xl">Error: {message}</div>
  </div>
);

const Breadcrumb = ({ title }) => (
  <span className="text-white">
    <Link href="/" legacyBehavior>
      <a className="text-white hover:underline">Home</a>
    </Link> &gt; {title}
  </span>
);

const RobotDetails = ({ data }) => (
  <div className="blog-details-banner z-index-2">
    <div className="blog-details-title-box">
      <h3 className="blog-details-banner-title text-white">{data.title}</h3>
      <p className="text-white">{data.shortdec}</p>
      <p className="text-white"><strong>Availability: </strong>{data.availability}</p>
      <p className="text-white"><strong>Manufacturer: </strong>{data.brand}</p>
      <p className="text-white"><strong>Part number: </strong>{data.title}</p>
      <p className="text-white"><strong>Description: </strong>{data.des}</p>
    </div>
  </div>
);

const QuoteFormContainer = () => (
  <div className="quote-form-container bg-white p-5 rounded-lg">
    <h4 className="text-black mb-5">Get a Quote</h4>
    <QuoteForm />
  </div>
);

export default BreadcrumbSix;
