import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import PageCover from "./PageCover";
import { bookData as originalBookData } from "@/data/bookData";
import FlipsPage from "./FlipsPage";
import Image from "next/image";

const DemoBook: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const flipBook = useRef<any>(null);

  // Adjust the book data to ensure it's an even number of pages
  const adjustBookData = (data: typeof originalBookData) => {
    if (data.length % 2 !== 0) {
      data.push({
        type: "page",
        number: data.length,
        content: "The End", 
        image: '/images/catalogue/catelog1.jpg',
      });
    }
    return data;
  };

  // Go to the next page
  const nextButtonClick = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipNext();
    }
  };

  // Go to the previous page
  const prevButtonClick = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipPrev();
    }
  };

  // Handle page flip event
  const onPage = (e: { data: number }) => {
    setPage(e.data);
  };

  // Set total page count when the component mounts
  useEffect(() => {
    setTimeout(() => {
      if (flipBook.current) {
        const total = flipBook.current.pageFlip().getPageCount() || 0;
        setTotalPage(total);
      }
    }, 0); // Timeout to wait for the flip book to initialize
  }, []);

  // Adjust the book data
  const bookData = adjustBookData([...originalBookData]);

  return (
    <div className="relative">
      <HTMLFlipBook 
        width={450} height={600}
        size="stretch"
        minWidth={450}
        maxWidth={450}
        minHeight={600}
        maxHeight={600}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={onPage}
        className="h-[100%] w-[100%] object-cover"
        ref={flipBook}
        startPage={0}
        drawShadow={true}
        flippingTime={1000}
        useMouseEvents={true}
        style={{ margin: "0 auto" }}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        showPageCorners={true}
        disableFlipByClick={false}
        swipeDistance={30}
      >
        {bookData.map((page: any, index: number) =>
          page.type === "cover" ? (
            <PageCover key={index}>
              <Image width={450} height={600} src={page.image} alt={page.content} className="shadow-md object-cover" />
            </PageCover>
          ) : (
            <FlipsPage key={index} number={page.number}>
              <Image width={450} height={600} src={page.image} alt={page.content} className="shadow-md object-cover" />
            </FlipsPage>
          )
        )}
      </HTMLFlipBook>

      {/* Uncomment below code for navigation */}
      {/* <div className="container absolute bottom-10 md:px-40 ">
        <div className="flex justify-between">
          <button type="button" onClick={prevButtonClick}>
            <BsFillArrowLeftCircleFill size={25} className="border border-white rounded-full" />
          </button>
          [<span>{page + 1}</span> of <span>{totalPage}</span>]
          <button type="button" onClick={nextButtonClick}>
            <BsFillArrowRightCircleFill size={25} className="border border-white rounded-full" />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default DemoBook;
