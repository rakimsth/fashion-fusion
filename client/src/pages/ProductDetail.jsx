import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useCallback, useEffect } from "react";
import { getById } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, product } = useSelector((state) => state.products);

  const getProduct = useCallback(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const getRandomProducts = () => {
    const firstRandomIndex = Math.floor(Math.random() * products.length);
    const secRandomIndex = Math.floor(Math.random() * products.length);
    const thirdRandomIndex = Math.floor(Math.random() * products.length);
    const fourthRandomIndex = Math.floor(Math.random() * products.length);
    const randProduct = [
      products[firstRandomIndex],
      products[secRandomIndex],
      products[thirdRandomIndex],
      products[fourthRandomIndex],
    ];
    return randProduct;
  };
  return (
    <section>
      <div className="container flex mt-2 d-flex justify-content-center">
        <div className="col-lg-8 border p-2 bg-white">
          <div className="row hedding m-0 pl-3 pt-0 pb-3"></div>
          <div className="row m-0">
            <div className="col-lg-4 left-side-product-box pb-3">
              <img src={product?.images[0]} className="border p-3" />
              <span className="sub-img">
                {product.images.map((image, index) => {
                  return <img key={index} src={image} className="border p-2" />;
                })}
              </span>
            </div>
            <div className="col-lg-8">
              <div className="right-side-pro-detail border p-3 m-0">
                <div className="row">
                  <div className="col-lg-12">
                    <span>{product?.alias.toString()}</span>
                    <p className="m-0 p-0">{product?.name}</p>
                  </div>
                  <div className="col-lg-12">
                    <p className="m-0 p-0 price-pro">${product?.price}</p>
                    <hr className="p-0 m-0" />
                  </div>
                  <div className="col-lg-12 pt-2">
                    <h5>Product Detail</h5>
                    <span>{product?.descriptions}</span>
                    <hr className="m-0 pt-2 mt-2" />
                  </div>
                  <div className="col-lg-12">
                    <p className="tag-section">
                      <strong>Tag : </strong>
                      <a href="">{product?.category}</a>
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <h6>Quantity :</h6>
                    <input
                      type="number"
                      min="1"
                      max={String(product?.quantity)}
                      defaultValue="1"
                      className="form-control text-center w-100"
                    />
                  </div>
                  <div className="col-lg-12 mt-3">
                    <div className="row">
                      <div className="col-lg-6 pb-2">
                        <button
                          className="btn btn-danger w-100"
                          onClick={() => {
                            dispatch(addToCart(product));
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <Link to="/checkout" className="btn btn-success w-100">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center pt-3">
              <h4>More Product</h4>
            </div>
          </div>
          <div className="row mt-3 p-0 text-center pro-box-section">
            {getRandomProducts().map((item, index) => {
              return (
                <div key={index} className="col-lg-3 pb-2">
                  <div className="pro-box border p-0 m-0">
                    <img src={item.images[0]} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
