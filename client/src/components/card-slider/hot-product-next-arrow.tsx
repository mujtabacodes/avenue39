import { MdArrowForwardIos } from 'react-icons/md';

const HotProductNextArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div className="hot-product-next-arrow cursor-pointer absolute -top-10 right-3" onClick={onClick}>
      <MdArrowForwardIos size={25} />
    </div>
  );
};

export default HotProductNextArrow;