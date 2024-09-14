import React, { useState, useEffect, useRef } from 'react';
import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-9";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";

const BrandPage = () => {
  const [brands, setBrands] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeBrand, setActiveBrand] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const contentRefs = useRef({});
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const detailsAreaRef = useRef(null);

  // 主类别及其对应的子标签
  const mainBrands = {
    'Technology': ['Fanuc', 'ABB', 'Google', 'Amazon', 'IBM'],
    'Automobiles': ['Tesla', 'Toyota', 'Ford', 'BMW', 'Audi'],
    'Fashion': ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci'],
    'Food & Beverage': ['Coca-Cola', 'Pepsi', 'Nestle', 'Starbucks', 'McDonald\'s'],
    'Healthcare': ['Pfizer', 'Moderna', 'Johnson & Johnson', 'Roche', 'Novartis']
  };

  useEffect(() => {
    fetchData();
    updateLayout();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateLayout);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  const updateLayout = () => {
    updateHeaderHeight();
    adjustMenuPosition();
    adjustContentMargin();
  };

  const updateHeaderHeight = () => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  };

  const adjustMenuPosition = () => {
    if (menuRef.current && containerRef.current && detailsAreaRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const detailsAreaRect = detailsAreaRef.current.getBoundingClientRect();
      const menuWidth = 330; // 固定菜单宽度为280px

      const topPosition = Math.max(headerHeight, detailsAreaRect.top);
      
      menuRef.current.style.position = 'fixed';
      menuRef.current.style.top = `${topPosition}px`;
      menuRef.current.style.left = `${containerRect.left}px`;
      menuRef.current.style.width = `${menuWidth}px`;
      menuRef.current.style.maxHeight = `${window.innerHeight - topPosition}px`;
      menuRef.current.style.overflowY = 'auto';
    }
  };

  const adjustContentMargin = () => {
    if (contentRef.current && menuRef.current) {
      const menuWidth = 280; // 使用与菜单相同的固定宽度
      contentRef.current.style.marginLeft = `${menuWidth + 30}px`; // 30px for gap
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/inrobots?populate=*');
      const data = await response.json();
      const brandCount = {};

      data.data.forEach(item => {
        const brands = item.attributes.brand.split(',').map(brand => brand.trim());
        brands.forEach(brand => {
          brandCount[brand] = (brandCount[brand] || 0) + 1;
        });
      });

      setBrands(brandCount);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const getBrandCount = (brand) => {
    return brands[brand] || 0;
  };

  const handleScroll = () => {
    adjustMenuPosition();
    Object.keys(contentRefs.current).forEach((brand) => {
      const element = contentRefs.current[brand];
      if (element) {
        const { top, bottom } = element.getBoundingClientRect();
        if (top <= headerHeight && bottom > headerHeight) {
          setActiveBrand(brand);
        }
      }
    });
  };

  const handleBrandClick = (brand) => {
    setActiveBrand(brand);
    const element = contentRefs.current[brand];
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <HeaderSix ref={headerRef} />
      <BreadcrumbTwo />
      <div className="sv-details-area pt-100 pb-100" ref={detailsAreaRef}>
        <div className="container" ref={containerRef}>
          <div className="row">
            <div ref={menuRef} style={{ width: '280px' }}>
              <div className="sv-details-widget">
                <div className="sv-details-category mb-30">
                  <div className="sv-details-category-title">
                    <h4 className="sv-details-title-sm">Main Brands</h4>
                  </div>
                  <div className="sv-details-category-list">
                    <ul>
                      {Object.keys(mainBrands).map(brand => (
                        <li key={brand} className={activeBrand === brand ? 'active' : ''}>
                          <a 
                            href={`#${brand.replace(/\s+/g, '-')}`} 
                            onClick={(e) => {
                              e.preventDefault();
                              handleBrandClick(brand);
                            }}
                          >
                            <span>{brand}</span>
                            <i className="fal fa-angle-right"></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div ref={contentRef} style={{ width: 'calc(100% - 280px)' }}>
              <div className="sv-details-wrapper">
                {Object.entries(mainBrands).map(([mainBrand, subBrands]) => (
                  <div 
                    key={mainBrand} 
                    id={mainBrand.replace(/\s+/g, '-')} 
                    className="sv-details-text mb-35"
                    ref={el => contentRefs.current[mainBrand] = el}
                  >
                    <h4 className="sv-details-text-title pb-10">{mainBrand}</h4>
                    <div className="row">
                      {subBrands.map(subBrand => {
                        const count = getBrandCount(subBrand);
                        const isDisabled = count === 0;
                        return (
                          <div key={subBrand} className="col-md-4 mb-3">
                            <a
                              href={isDisabled ? '#' : `/brand/${encodeURIComponent(subBrand.replace(/\s+/g, '-'))}`}
                              className={`d-block p-3 border rounded ${isDisabled ? 'text-muted' : 'text-primary'}`}
                              onClick={(e) => {
                                if (isDisabled) {
                                  e.preventDefault();
                                }
                              }}
                              style={{
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                backgroundColor: isDisabled ? '#f8f9fa' : '#fff',
                              }}
                            >
                              <i className="fal fa-folder-open mr-2"></i>
                              {subBrand}
                              <span className="float-right">{count}</span>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterFive />
    </>
  );
};

export default BrandPage;
