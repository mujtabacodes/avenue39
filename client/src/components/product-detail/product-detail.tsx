import React from 'react';
import Thumbnail from '../carousel/thumbnail';
import { products } from '@/data/products';
import { IProductDetail } from '@/types/types';
import { MdLocalFireDepartment, MdStar, MdStarBorder } from 'react-icons/md';
import { NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { Button } from '../ui/button';
import { FiShoppingCart } from 'react-icons/fi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import Image from 'next/image';
import tabbyLogo from '@icons/tabby-logo-charcoal.png';
import tamaraLogo from '@icons/EN0-full-logo-black.png';
import {
  tabbyfeature,
  tabbyhowitwork,
  tabbypayicon,
  tamarafeature,
  tamaralist,
  tamarawhy,
} from '@/data';
import { FaCcVisa, FaLock, FaStripe } from 'react-icons/fa';
import { FaCcMastercard, FaCcPaypal } from 'react-icons/fa6';
import MasterCard from '@icons/business.png';
import VisaCard from '@icons/card.png';
import { IoBagOutline } from 'react-icons/io5';
import Link from 'next/link';
import { BsWhatsapp } from 'react-icons/bs';
import Counter from '../counter';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/redux/store';
import { selectTotalPrice, updateItemQuantity } from '@/redux/slices/cart';
import { Dispatch } from 'redux';


const ProductDetail = ({
  params,
  isZoom,
}: {
  params: IProductDetail;
  isZoom?: Boolean;
}) => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );
  const productId = Number(5);
  const product = products.find((product) => product.id === productId);
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= (4) || i <= ( 0)) {
        stars.push(<MdStar key={i} size={20} className="text-yellow-400" />);
      } else {
        stars.push(
          <MdStarBorder key={i} size={20} className="text-yellow-400" />,
        );
      }
    }
    return stars;
  };
  if (!product) {
    return <div>Product not found</div>;
  }
  const updateProductQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-full justify-between gap-8 my-10">
      <div className="flex-grow md:w-1/2">
        <Thumbnail thumbs={product?.productImages} isZoom={isZoom} />
      </div>

      <div className="w-full md:w-1/2 lg:w-[30%] flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="bg-[#00AEEF] p-2 rounded-sm text-white text-xs">
            New
          </div>
          <div className="bg-[#EE1C25] p-2 rounded-sm text-white text-xs">
            -50%
          </div>
          <div className="bg-[#56B400] p-2 rounded-sm text-white text-xs">
            IN STOCK
          </div>
        </div>
        <ProductName>{product?.name}</ProductName>

        <div className="flex gap-6 items-center justify-between">
          <div className="flex gap-2">
            <span className="flex">{renderStars()}</span>
            <span className="text-[#999999] text-11 font-medium mt-1">
              20 reviews
            </span>
          </div>
          <h3 className="text-red-500 flex items-center font-medium text-sm">
            <MdLocalFireDepartment className="text-lg mr-1" /> 12 sold in last
            19 hours
          </h3>
        </div>

        <ProductPrice className="flex gap-2">
          AED{product?.discountPrice}
          <NormalText className="font-normal text-slate-400 line-through">
            AED{product?.price}
          </NormalText>
        </ProductPrice>
        <div className="flex gap-3 font-semibold">
          <span>AVAILABLE:</span>
          <span className="text-[#56B400]">PRE-ORDER ONLY WHATSAPP</span>
        </div>
        <p className="mb-4 text-[#666666] text-16 tracking-wide leading-6">
          {product?.description}
        </p>

        <NormalText className="mb-3">Hurry Up! Sale ends in:</NormalText>
        <span className="flex gap-2 mb-3">
          {['25 Days', '25 HOUR', '25 MIN', '25 SEC'].map((time, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] p-2 rounded-md w-14 text-center font-normal text-[#666666]"
            >
              {time}
            </div>
          ))}
        </span>

        <NormalText className="mb-4">
          Hurry Up! Only <span className="text-red-600">12</span> left in stock:
        </NormalText>
        <div className="flex items-center gap-4">
          <span>counter</span>
          <Link
            href="https://wa.me/1XXXXXXXXXX"
            className="w-full h-14 text-white bg-[#64B161] rounded-full flex justify-center items-center gap-2 hover:bg-[#56B400]"
          >
            <BsWhatsapp size={35} />
            <span className="font-light">PRE-ORDER ONLY</span>
          </Link>
        </div>

        <Button className="bg-primary text-white flex gap-3 justify-center items-center w-full h-14 rounded-2xl mb-3 font-light">
          <IoBagOutline size={20} /> BUY IT NOW
        </Button>
        <div className="flex gap-2 mb-4">
          <Button
            variant={'outline'}
            className="text-primary w-1/2 h-14 rounded-2xl flex gap-3"
          >
            Add to cart
          </Button>
          <Button className="bg-yellow-500 w-1/2 text-white flex gap-3 h-14 rounded-2xl">
            TRY AT HOME
          </Button>
        </div>

        <div className="flex items-center justify-center relative my-3">
          <span className="absolute left-0 w-1/4 border-t border-gray-300"></span>
          <NormalText className="text-center px-4">
            Guaranteed Safe Checkout
          </NormalText>
          <span className="absolute right-0 w-1/4 border-t border-gray-300"></span>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="relative w-1/2 border-4 border-[#00FFBC] p-4 rounded-lg">
            <span className="absolute -top-3 left-2 bg-[#00FFBC] text-primary px-2 py-1 rounded-lg text-xs font-extrabold">
              tabby
            </span>
            <p>
              Pay 4 interest-free payments of AED 396.25.{' '}
              <Dialog>
                <DialogTrigger asChild>
                  <span className="text-red-600 underline cursor-pointer">
                    Learn more
                  </span>
                </DialogTrigger>
                <DialogOverlay className="bg-white/80" />
                <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
                  <DialogHeader>
                    <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                      Easy Monthly Installments
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-8 ps-5 xs:ps-10 md:ps-20 pe-4 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                    <Image src={tabbyLogo} alt="logo" />
                    <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mt-8 leading-10 xs:leading-tight">
                      <span className="rounded-full bg-[#3BFFC1] px-4 py-0 text-nowrap">
                        Shop now,
                      </span>
                      <br />
                      <span className="text-[#3BFFC1] text-outline-border  tracking-wider">
                        pay over time.
                      </span>
                    </h2>
                    <ul className='mt-14 font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl list-["–"] list-inside leading-normal md:leading-normal'>
                      {tabbyfeature.map((item) => (
                        <li key={item.id}>{item.para}</li>
                      ))}
                    </ul>
                    <div className="mt-12">
                      <h3 className="font-bold text-4xl sm:text-5xl">
                        How it works
                      </h3>
                      <ul className="font-medium text-xl xs:text-2xl md:text-3xl mt-8 md:leading-relaxed">
                        {tabbyhowitwork.map((item) => (
                          <li className="flex items-center gap-2" key={item.id}>
                            <span className="rounded-full bg-lightbackground min-w-10 h-10 flex items-center justify-center">
                              {item.id}
                            </span>
                            <span className="w-full">{item.para}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end gap-2 mt-20 px-6">
                      {tabbypayicon.map((item, index) => (
                        <Image
                          src={item.imageUrl}
                          alt="master"
                          className="w-20 h-20 object-contain"
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </p>
          </div>
          <div className="relative w-1/2 border-4 border-[#D47C84] p-4 rounded-lg">
            <span className="absolute -top-3 left-2 bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300 text-primary font-extrabold px-2 py-1 rounded-lg text-xs">
              tamara
            </span>
            <p>
              Pay 4 interest-free payments of AED 396.25.{' '}
              <Dialog>
                <DialogTrigger asChild>
                  <span className="text-red-600 underline cursor-pointer">
                    Learn more
                  </span>
                </DialogTrigger>
                <DialogOverlay className="bg-white/80" />
                <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
                  <DialogHeader>
                    <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                      Easy Monthly Installments
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-8 px-5 xs:px-10 md:px-20 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                    <div className="text-center">
                      <Image src={tamaraLogo} alt="logo" className="mx-auto" />
                    </div>
                    <h2 className="text-center font-bold text-5xl mt-12">
                      Pay easier with Tamara
                    </h2>
                    <div className="px-4 py-2 bg-gradient-to-r from-orange-300 via-blue-300 to-pink-300 mt-12 rounded-[70px]">
                      <div className="bg-gradient-to-r from-orange-100 via-blue-100 to-pink-100 pb-6 pt-2 px-8 rounded-[70px] flex flex-col gap-4">
                        <div className="w-10/12 mx-auto">
                          {tamarafeature.map((item) => (
                            <div
                              className="flex justify-between items-center py-4"
                              key={item.id}
                            >
                              <div>
                                <h3 className="font-bold text-2xl">
                                  {item.title}
                                </h3>
                                <p className="text-md font-light mt-2">
                                  {item.para}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 px-5 xs:px-10 2xl:px-20">
                      <h3 className="font-bold text-2xl">Why Tamara?</h3>
                      <div className="flex items-center flex-wrap 2xl:flex-nowrap justify-center 2xl:justify-between gap-4 pt-6">
                        {tamarawhy.map((item) => (
                          <div
                            className="w-48 h-9 rounded-2xl bg-primary text-white flex items-center justify-center text-20 font-semibold"
                            key={item.id}
                          >
                            {item.para}
                          </div>
                        ))}
                      </div>
                      <div className="mt-10">
                        <ul className="font-20 font-normal">
                          {tamaralist.map((item) => (
                            <li
                              className="flex items-center gap-2"
                              key={item.id}
                            >
                              <span>({item.id})</span>
                              <span>{item.para}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-4 justify-center">
            <FaLock className="text-green-600 text-xl" />
            <NormalText className="text-gray-600">Secure Checkout</NormalText>
            <div className="flex items-center space-x-2">
              <Image
                src={VisaCard.src}
                height={50}
                width={50}
                alt="Visa Card"
              />
              <Image
                src={MasterCard.src}
                height={50}
                width={50}
                alt="MasterCard"
              />
              <FaCcPaypal className="text-blue-500 text-3xl" />
              <FaStripe className="text-blue-500 text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;