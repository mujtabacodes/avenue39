import React, { Component } from "react";
import HTMLFlipBook from "react-pageflip";
import PageCover from "./PageCover";
import { bookData as originalBookData } from "@/data/bookData"; 
import FlipsPage from "./FlipsPage";
// import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

interface DemoBookState {
  page: number;  
  totalPage: number;  
}

class DemoBook extends Component<{}, DemoBookState> {
  private flipBook: React.RefObject<any>;

  constructor(props: {}) {
    super(props);
    this.flipBook = React.createRef();
    this.state = {
      page: 0,
      totalPage: 0,
    };
  }

  
  adjustBookData = (data: typeof originalBookData) => {
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

  nextButtonClick = () => {
    if (this.flipBook.current) {
      this.flipBook.current.pageFlip().flipNext();
    }
  };

  prevButtonClick = () => {
    if (this.flipBook.current) {
      this.flipBook.current.pageFlip().flipPrev();
    }
  };

  onPage = (e: { data: number }) => {
    this.setState({ page: e.data });
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.flipBook.current) {
        const totalPage = this.flipBook.current.pageFlip().getPageCount() || 0;
        this.setState({ totalPage });
      }
    }, 0); 
  }

  render() {
    const bookData = this.adjustBookData([...originalBookData]);
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
          onFlip={this.onPage}
          className="h-[100%] w-[100%] object-fill"
          ref={this.flipBook}
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
                <img width={450} height={600} src={page.image} alt={page.content} className="shadow-md" /> 
              </PageCover>
            ) : (
              <FlipsPage key={index} number={page.number}>
                <img width={450} height={600} src={page.image} alt={page.content} /> 
              </FlipsPage>
            )
          )}
        </HTMLFlipBook>

        {/* Uncomment below code for navigation */}
        {/* <div className="container absolute bottom-10 md:px-40 ">
          <div className="flex justify-between">
            <button type="button" onClick={this.prevButtonClick}>
              <BsFillArrowLeftCircleFill size={25} className="border border-white rounded-full" />
            </button>
            [<span>{this.state.page + 1}</span> of <span>{this.state.totalPage}</span>]
            <button type="button"  onClick={this.nextButtonClick}>
              <BsFillArrowRightCircleFill size={25} className="border border-white rounded-full" />
            </button>
          </div>
        </div> */}
      </div>
    );
  }
}

export default DemoBook;
