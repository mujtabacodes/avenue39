'use client'
import ProductPage from '@/components/product-page/product'
import React, { Fragment, ReactNode, useState } from 'react'
import { StaticImageData } from 'next/image'

const Shop = ({sideBannerProduct, productBanner ,  sideBanner}: {sideBannerProduct?: string , productBanner?: ReactNode , sideBanner?: StaticImageData}) => {
    const [layout , Setlayout] = useState<string>('grid');
  return (
    <Fragment>
       <ProductPage sideBanner={sideBanner} productBanner={productBanner} layout={layout} Setlayout={Setlayout} sideBannerProduct={sideBannerProduct} />
    </Fragment>
  )
}

export default Shop