'use client';
import React, { useEffect, useState } from 'react';
import DetailTabs from '@/components/detail-tabs/detail-tabs';
import Container from '@/components/ui/Container';
import Services from '@/components/services/services';
import { IProduct, IProductDetail, IReview } from '@/types/types';
import ProductDetail from '@/components/product-detail/product-detail';
import {
  calculateRatingsPercentage,
  generateSlug,
} from '@/config';
import TopHero from '@/components/top-hero';
import FeatureSlider from '@/components/card-slider/feature-slider';
import { Table } from 'antd';
import { Skeleton } from '@/components/ui/skeleton';
import NoProduct from '@/components/ui/no-product';

const Product = ({ params, reviews , product }: { params: IProductDetail, reviews: IReview[] , product: IProduct }) => {
  const slug = params.name;
  console.log(slug);
  console.log(reviews, 'reviews')
  const additional_columns_handler = () => {
    const section = product?.sections;
    if (section && section.length > 0) {
      const dynamicTabs = section.map((sec: any) => ({
        label: sec.heading,
        content: (
          <div className="space-y-2">
            {sec.additionalInformation?.map((item: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <p className="text-black text-17 font-normal leading-7">{item.name}</p>
                <p className="text-slate-400 text-17 font-normal leading-7">{item.detail}</p>
              </div>
            ))}
          </div>
        ),
      }));
      setTabs((prevTabs) => [...prevTabs, ...dynamicTabs].filter(
        (tab, index, self) =>
          index === self.findIndex((t) => t.label === tab.label)
      ));
    }
  };

  const [sortOption, setSortOption] = useState<string>('default');
  const [visibleCount, setVisibleCount] = useState(3);
  const loadMoreReviews = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const productId = product?.id;
  // const filteredReviews = reviews.filter(
  //   (review) => review.productId === productId,
  // );
  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'review':
        return b.star - a.star;
      case 'recent':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });
  const reviewsToDisplay = sortedReviews.slice(0, visibleCount);

  // if (!product) {
  //   return <Loader />;
  // }

  const { productReviews, averageRating } =
    calculateRatingsPercentage(filteredReviews);

  const dataSource = product?.additionalInformation.map((info, index) => ({
    key: index,
    ...info,
  }));
  // const dataSource2 = [
  //   {
  //     key: '1',
  //     name: 'Mike',
  //     age: 32,
  //     address: '10 Downing Street',
  //   },
  //   {
  //     key: '2',
  //     name: 'John',
  //     age: 42,
  //     address: '10 Downing Street',
  //   },
  // ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },
  ];

  console.log(product, "product");
  console.log(dataSource);
  const [tabs, setTabs] = useState<any[]>([
    {
      label: 'Description',
      content: (
        <div className="p-2 flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="w-full md:w-3/5">
            <p className="text-slate-400 text-17 font-normal leading-7">
              <Skeleton className="text-slate-400 text-17 font-normal leading-7" />
              {product?.description ? (
                product.description
              ) : (
                <Skeleton className="text-slate-400 text-17 font-normal leading-7" />
              )}
            </p>
          </div>
          {product?.spacification && product?.spacification.length > 0 &&

            <div className="w-full md:w-2/5 border-t-2 md:border-t-0 border-s-0 md:border-s-2 py-4 md:pb-10">
              <h5 className="px-0 md:ps-12 font-bold text-15 uppercase">
                specification
              </h5>
              <ul className="list-disc text-slate-400 text-14 px-4 md:ps-16 mt-4">
                {product?.spacification?.map(({ specsDetails }, index) => (
                  <li key={index}>{specsDetails}</li>
                ))}
              </ul>
            </div>
          }
        </div>
      ),
    },
    // {
    //   label: `Review (${filteredReviews.length})`,
    //   content: (
    //     <div>
    //       <div className="px-2 py-6 flex flex-col lg:flex-row items-center gap-6 md:gap-10 w-full max-w-full lg:max-w-[750px]">
    //         {averageRating > 1 && (
    //           <div className="w-full xs:w-fit flex flex-col gap-4">
    //             {productReviews.map((item, index) => (
    //               <div className="flex items-center gap-3" key={index}>
    //                 <span className="text-nowrap">{item.label}</span>
    //                 <Progress
    //                   value={item.ratingValue}
    //                   className="w-72 md:w-80"
    //                 />
    //                 <span className="w-10">{item.ratingValue}%</span>
    //               </div>
    //             ))}
    //           </div>
    //         )}
    //         <div className="flex flex-col gap-4 w-60 sm:w-48 md:w-60">
    //           {averageRating > 1 && (
    //             <div className="w-60 sm:w-48 md:w-60 h-36 border-2 rounded-sm flex flex-col justify-center items-center gap-2">
    //               <span className="text-14 text-lightdark">
    //                 {filteredReviews.length} Reviews
    //               </span>
    //               <h4 className="text-warning text-lg font-semibold">
    //                 {averageRating}
    //               </h4>
    //               <span className="flex">
    //                 {renderStars({ star: averageRating })}
    //               </span>
    //             </div>
    //           )}
    //           <WriteReview productId={productId || 0} />
    //         </div>
    //       </div>
    //       <div className="w-full px-8 h-20 bg-lightbackground flex items-center justify-between">
    //         <span className="text-lightdark">
    //           {filteredReviews.length} Reviews
    //         </span>
    //         <div className="w-fit">
    //           <Select onValueChange={(value) => setSortOption(value)}>
    //             <SelectTrigger className="font-semibold">
    //               <SelectValue placeholder="Sort by: Default" />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectGroup>
    //                 <SelectLabel>Sort Options</SelectLabel>
    //                 <SelectItem value="default">Default</SelectItem>
    //                 <SelectItem value="name">Name</SelectItem>
    //                 <SelectItem value="review">Rating</SelectItem>
    //                 <SelectItem value="recent">Recent</SelectItem>
    //               </SelectGroup>
    //             </SelectContent>
    //           </Select>
    //         </div>
    //       </div>
    //       <div className="flex flex-col gap-6">
    //         {error ? (
    //           <div className="text-red-500">Error: {error.message}</div>
    //         ) : isLoading ? (
    //           <div className="text-gray-500">Loading...</div>
    //         ) : (
    //           <>
    //             {reviewsToDisplay.map((item) => (
    //               <div
    //                 className="flex items-start gap-4 border-b-2 py-10"
    //                 key={item.id}
    //               >
    //                 <div>
    //                   <Image
    //                     src={
    //                       item.userProfileImg ? item.userProfileImg : profileImg
    //                     }
    //                     alt="profile image"
    //                     className="rounded-full"
    //                     width={50}
    //                     height={50}
    //                   />
    //                 </div>
    //                 <div className="flex flex-col gap-2">
    //                   <div className="flex items-center gap-4">
    //                     <h5 className="font-semibold">{item.name}</h5>
    //                     <span className="text-12 text-lightdark font-medium">
    //                       at {formatDate(item.createdAt)}
    //                     </span>
    //                   </div>
    //                   <div className="flex">
    //                     {renderStars({ star: item.star })}
    //                   </div>
    //                   <p className="pe-4 text-14">{item.review}</p>
    //                 </div>
    //               </div>
    //             ))}
    //             {filteredReviews.length > visibleCount && (
    //               <div className="flex  mt-4 py-2 px-4 items-center justify-center">
    //                 <Button
    //                   onClick={loadMoreReviews}
    //                   className=" w-24 flex text-white rounded"
    //                 >
    //                   Load More
    //                 </Button>
    //               </div>
    //             )}
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   ),
    // },
    {
      label: 'Additional Information',
      content: (
        <>
          {
            dataSource && dataSource.length > 0 ?
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                rowKey="name"
                className="detail"
              />
              : null
          }

        </>
      ),
    },

  ])

  const cartpageBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Product', href: '/products' },
    { label: product?.name ?? 'Product Page' },
  ];


  useEffect(() => {
    additional_columns_handler()
  }, [product])



  return (
    <div>
      <TopHero breadcrumbs={cartpageBreadcrumbs} />
      <Container>
        {!product ? (
          <NoProduct
            cardHeight="2xl:h-[488px]"
            iconSize={40}
            title="No Product Found"
            titleClass="font-medium text-2xl md:text-3xl"
          />
        ) : (product &&
          <ProductDetail
            params={product}
            isZoom={true}
            gap="lg:gap-20 md:gap-20 sm:gap-10 gap-10"
            swiperGap=" justify-between gap-2 xs:gap-6 md:gap-3"
            detailsWidth="w-full md:w-1/2 lg:w-1/4"
          />
        )}
      </Container>
      {product && (
        <div className=''>
          <DetailTabs tabs={tabs} />
        </div>
      )}

      <div className="mt-10 pt-10 mb-20 border-t-2">
        <Container>
          {/* <p className="text-2xl font-medium text-center mb-4 sm:mb-0">
            Similar Products
          </p> */}
          <FeatureSlider />
        </Container>
      </div>
      <Services />
    </div>
  );
};

export default Product;
