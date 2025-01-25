import React from "react";

interface PageCoverProps {
  children: React.ReactNode;
}
/* eslint-disable */
const PageCover = React.forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
  return (
    <div className="flex w-[100%] bg-[#E2E3E5] shadow-lg  text-center border border-1" ref={ref} data-density="hard">
        <h2 >{props.children}</h2>
    </div>
  );
});
PageCover.displayName = 'PageCover';
export default PageCover;
