import React from 'react';
import { useRouter } from 'next/router';
import BrandPage from '../../components/BrandPage';
import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-10";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";

const BrandRoute = () => {
  const router = useRouter();
  const { brand } = router.query;

  return (
    <>
      <HeaderSix />
      <BreadcrumbTwo title={`Brand: ${brand}`} />
      <BrandPage brand={brand} />
      <FooterFive />
    </>
  );
};

export default BrandRoute;
