This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

const handleRatingChange = (newRating:any) => {
        console.log('New Rating:', newRating);
      };
 <StarRating defaultValue={2} onChange={handleRatingChange} />



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
       {/* <div className="bg-white rounded-full absolute top-4 right-6 flex flex-col gap-2 py-2 px-1 product-hover-icons z-[1] opacity-0 group-hover:opacity-100 transition-opacity">
          <PiEyeThin size={17} className="cursor-pointer" />
          <CiHeart size={18} className="cursor-pointer" />
        </div> */}

          // const filteredCards1 = products
  //   .filter((card) => {
  //     const inCategory =
  //       selectedCategories.length > 0
  //         ? selectedCategories.includes(card.productType || '')
  //         : true;
  //     const inPriceRange =
  //       card.price >= priceRange[0] && card.price <= priceRange[1];
  //     return inCategory && inPriceRange;
  //   })
  //   .sort((a, b) => {
  //     if (sortOption === 'name') {
  //       return a.name.localeCompare(b.name);
  //     } else if (sortOption === 'max') {
  //       return b.price - a.price;
  //     } else if (sortOption === 'min') {
  //       return a.price - b.price;
  //     } else if (sortOption === 'review') {
  //       return b.reviews - a.reviews;
  //     }
  //     return 0;
  //   });