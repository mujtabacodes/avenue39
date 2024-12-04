import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";
import Container from "@/components/ui/Container";
import { IOrder, IOrderProduct, IProduct } from "@/types/types";

const ViewOrder = async ({ params: { name } }: { params: { name: string } }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/trackorder/${name}`);
  const userDetail: IOrder = response.data;
  if (userDetail) {
    console.log(userDetail, 'order track')
  }
  const subTotal = userDetail.products.reduce((total, item) => {
    const productPrice = item.productData?.discountPrice > 0 ? item.productData?.discountPrice : item.productData?.price;
    return total + item.quantity * productPrice;
  }, 0);
  const Shipping = 0;
  const Total = Number(subTotal) + Shipping;
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
      <div>
        {userDetail && (
          <div className="max-w-screen-sm mx-auto">
            {/* <div className="space-y-3">
            <div>
              <p className="font-medium text-23">Login To View</p>
            </div>
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-5 w-full">
                <input
                  className="w-full rounded-md p-2 border border-gray"
                  name="email"
                  placeholder="Email"
                  type="email"
                  id={"email"}
                />
              </div>
              <div className="col-span-5">
                <input
                  className="w-full rounded-md p-2 border border-gray"
                  name="ordernumber"
                  placeholder="Order Number"
                  type="ordernumber"
                  id={"ordernumber"}
                />
              </div>
              <div className="col-span-2">
                <button className="bg-black text-white px-4 py-2 rounded-md w-full">
                  Login
                </button>
              </div>
            </div>
          </div> */}

            <div className="border border-gray p-2 rounded-md">
              <p className="text-18 font-bold">Order Id</p>
              <p className="text-14">
                {userDetail.orderId}
              </p>
              <p className="text-18 font-bold">Email</p>
              <p className="text-14">
                {userDetail.user_email}
              </p>
            </div>

            <div className="border border-gray p-2 rounded-md mt-10">
              <p className="font-bold text-23">Order Detail</p>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-18 font-medium">Shipping Address</p>
                  <p className="text-14">{userDetail.address}</p>
                </div>
                <div>
                  <p className="text-18 font-medium">Phone Number</p>
                  <p className="text-14">{userDetail.phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mt-10">
              <p className="text-light font-semibold">
                Need help?{" "}
                <Link className="text-black" href="/contact">
                  Contact Us
                </Link>
              </p>
              <Link className="bg-black text-white px-4 py-2" href="/">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {userDetail.products.map((product: IOrderProduct) => (
          <div key={product.id}>
            <div className="flex gap-4 mt-1">
              <Image
                className="w-[80px] h-[80px] object-cover rounded-md"
                width={200}
                height={200}
                src={product.productData.posterImageUrl || product.productData.hoverImageUrl}
                alt={product.productData.name}
              />
              <div>
                <p>{product.productData.name}</p>
                <div className="flex justify-between">
                  <p className="font-medium text-lightdark">Price</p>
                  <p>
                    AED <span>{product.productData?.discountPrice > 0 ? product.productData?.discountPrice : product.productData?.price}</span>
                  </p>
                </div>
                <p className="font-medium">
                  Quantity: <span>{product.quantity}</span>
                </p>
              </div>
            </div>


          </div>
        ))}

        {/* Display Shipping Fee and Total Only Once */}
        <div className="border border-gray py-4 rounded-md px-4">
          {/* <div className="flex justify-between">
            <p className="text-18 font-semibold">Subtotal</p>
            <p>
              AED <span>{subTotal}</span>
            </p>
          </div> */}
          {/* <div className="flex justify-between my-4">
            <p className="text-18 font-semibold">Shipping Fee</p>
            <p>
              AED<span>{ }</span>
            </p>
          </div> */}
          <div className="flex justify-between">
            <p className="text-18 font-semibold">Total</p>
            <p>
              AED <span>{Total}</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ViewOrder;