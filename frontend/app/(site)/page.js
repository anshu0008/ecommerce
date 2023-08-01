import React from 'react';

import { getAllProduct, getBanner } from '@/sanity/sanity-utils';
import { Product,HeroBanner,FooterBanner } from '@/components';

const Home = async () =>{
  const products=await getAllProduct();
  const bannerData=await getBanner();

  return (
    <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);
};

export default Home;