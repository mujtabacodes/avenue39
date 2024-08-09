'use client';
import React, { useState } from 'react';
import { products } from '@/data/products';
import Image from 'next/image';
import CustomPaging from '@/components/image-slider';
import { H1, NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { MdLocalFireDepartment, MdStar, MdStarBorder } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { FaCcVisa, FaLock, FaStripe } from 'react-icons/fa';
import { FaCcMastercard, FaCcPaypal } from 'react-icons/fa6';
import MasterCard from '@icons/business.png';
import VisaCard from '@icons/card.png';
import Thumbnail from '@/components/carousel/thumbnail';
import DetailTabs from '@/components/detail-tabs/detail-tabs';
import HotProductSlider from '@/components/card-slider/hot-product-slider';
import {
  bestSellerProducts,
  cards,
  features,
  productData,
  tabbyfeature,
  tabbyhowitwork,
  tabbypayicon,
  tamarafeature,
  tamaralist,
  tamarawhy,
} from '@/data';
import SliderComponent from '@/components/card-slider/card-slider';

import Container from '@/components/ui/Container';
import Services from '@/components/services/services';
import Card from '@/components/ui/card';
import { IProductDetail } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import tabbyLogo from '@icons/tabby-logo-charcoal.png';
import tamaraLogo from '@icons/EN0-full-logo-black.png';
import masterCard from '@icons/business.png';
import viseCard from '@icons/card.png';
import gPayCard from '@icons/pngwing.png';
import ProductDetail from '@/components/product-detail/product-detail';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import profileImg from '@images/profile/Ellipse 7.png';
import { Rate } from 'antd';
import TopHero from '@/components/top-hero';
import { cartpagebredcrumbs } from '@/data/data';
import { Table } from 'antd';
import FeatureSlider from '@/components/card-slider/feature-slider';

const ProductPage = ({ params }: { params: IProductDetail }) => {
  const productId = Number(params.id);
  const [formData, setFormData] = useState({
    productId: productId,
    name: '',
    email: '',
    review: '',
    star: 0,
  });
  const product = products.find((product) => product.id === productId);

  const renderStars = ({ star = 0 }: { star?: number }) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      if (i <= star) {
        stars.push(<MdStar key={i} size={20} className="text-warning" />);
      } else {
        stars.push(<MdStarBorder key={i} size={20} className="text-warning" />);
      }
    }
    return stars;
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleStarChange = (value: number) => {
    setFormData({ ...formData, star: value });
  };
  const productReviews = [
    {
      lebal: '5 star',
      ratingValue: 60,
    },
    {
      lebal: '4 star',
      ratingValue: 20,
    },
    {
      lebal: '3 star',
      ratingValue: 10,
    },
    {
      lebal: '2 star',
      ratingValue: 5,
    },
    {
      lebal: '1 star',
      ratingValue: 5,
    },
  ];

  const productReviewers = [
    {
      id: 1,
      profileImg: profileImg,
      name: 'Sam Lane',
      star: 5,
      review:
        'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
      createdAt: 'at 19 Jan 2024',
    },
    {
      id: 2,
      profileImg: profileImg,
      name: 'Sam Lane',
      star: 4,
      review:
        'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
      createdAt: 'at 19 Jan 2024',
    },
  ];

  const columns = [
    {
      title: 'Keys',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const dataSource = product.additionalInformation.map((info, index) => ({
    key: index,
    ...info,
  }));

  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="p-2 flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="w-full md:w-3/5">
            <p className="text-slate-400 text-17 font-normal leading-7">
              {product.description}
            </p>
          </div>
          <div className="w-full md:w-2/5 border-t-2 md:border-t-0 border-s-0 md:border-s-2 py-4 md:pb-10">
            <h5 className="ps-12 font-bold text-15">DIMENSIONS</h5>
            <ul className="list-disc text-slate-400 text-14 ps-16 mt-4">
              <li>coffee table-0.800*0.800*0.320</li>
              <li>side table-0.600*0.600*0.517</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: 'Review (20)',
      content: (
        <div>
          <div className="px-2 py-6 flex flex-col lg:flex-row items-center gap-6 md:gap-10 w-full max-w-full lg:max-w-[750px]">
            <div className="w-full xs:w-fit flex flex-col gap-4">
              {productReviews.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <span className="text-nowrap">{item.lebal}</span>
                  <Progress
                    value={item.ratingValue}
                    className="w-80 sm:max-w-72 md:w-80"
                  />
                  <span className="w-10">{item.ratingValue}%</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="w-full h-36 border-2 rounded-sm flex flex-col justify-center items-center gap-2">
                <span className="text-14 text-lightdark">20 Reviews</span>
                <h4 className="text-warning text-lg font-semibold">4.8</h4>
                <span className="flex">{renderStars({ star: 4.8 })}</span>
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button className="bg-warning w-full h-12 rounded-sm font-light">
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add a Review</DialogTitle>
                  </DialogHeader>
                  <div>
                    <p>Your Email Address Will Not Be Published.</p>
                    <form action="" className="flex flex-col gap-4 mt-4">
                      <Rate onChange={handleStarChange} value={formData.star} />
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          className="border px-2 w-full h-10 rounded-md"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          className="border px-2 w-full h-10 rounded-md"
                        />
                      </div>
                      <div>
                        <textarea
                          name="review"
                          className="border px-2 py-2 w-full rounded-md"
                          rows={4}
                          placeholder="Write a Review"
                          value={formData.review}
                        ></textarea>
                      </div>
                      <Button variant={'default'}>Submit</Button>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="w-full px-8 h-20 bg-lightbackground flex items-center justify-between">
            <span className="text-lightdark">1 - 2 of 20 Reviews</span>
            <div className="w-fit">
              <Select>
                <SelectTrigger className="font-semibold">
                  <SelectValue placeholder="Sort by: Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort Options</SelectLabel>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="review">Rating</SelectItem>
                    <SelectItem value="recent">Recent</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {productReviewers.map((item) => (
              <div
                className="flex items-start gap-4 border-b-2 py-10"
                key={item.id}
              >
                <div>
                  <Image
                    src={item.profileImg}
                    alt="profile image"
                    className="rounded-full"
                    width={90}
                    height={90}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <h5 className="font-semibold">{item.name}</h5>
                    <span className="text-12 text-lightdark font-medium">
                      {item.createdAt}
                    </span>
                  </div>
                  <div className="flex">{renderStars({ star: item.star })}</div>
                  <p className="pe-4 text-14">{item.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: 'Additional Information',
      content: (
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              bordered
              rowKey="key"
              className="custom-table"
            />
      ),
    },
  ];

  return (
    <div>
      <TopHero breadcrumbs={cartpagebredcrumbs} />
      <Container>
        <ProductDetail
          params={product}
          isZoom={true}
          gap="gap-10 md:gap-40"
          swiperGap="justify-between gap-6 md:gap-14"
          detailsWidth="w-full md:w-1/2 lg:w-1/4"
        />
      </Container>
      <div>
        <DetailTabs tabs={tabs} />
      </div>
      <div className="mt-10 pt-10 mb-20 border-t-2">
      <Container>
        <p className="text-3xl sm:text-4xl md:text-[51px] font-medium text-center mb-4 sm:mb-0">Similar Products</p>
        <FeatureSlider features={features} />
      </Container>
      </div>
      <Services />
    </div>
  );
};

export default ProductPage;
