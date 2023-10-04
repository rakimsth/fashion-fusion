import { BsArrowLeftSquare } from "react-icons/bs";
const Cart = ({ cart }) => {
  return <>{cart ? <FilledCart data={[]} /> : <EmptyCart />}</>;
};

const FilledCart = ({ data }) => {
  return <></>;
};

const EmptyCart = () => {
  return (
    <>
      <div className="p-5 bg-body-tertiary rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Your cart is empty</h1>
          <a className="btn btn-light btn-lg" href="/products">
            <BsArrowLeftSquare />
            &nbsp;Continue Shopping
          </a>
        </div>
      </div>
    </>
  );
};

export default Cart;
