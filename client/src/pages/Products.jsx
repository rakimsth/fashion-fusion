import "./Products.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import {
  fetchProducts,
  setCurrentPage,
  setLimit,
} from "../slices/productSlice";
import SkeletalLoader from "../components/SkeletalLoader";
import Paginate from "../components/Paginate";

import { SERVER_URL } from "../constants";

const Products = () => {
  const { products, loading, limit, total, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit, page: currentPage }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <>
      <div className="productBody">
        <section className="section">
          <div className="container">
            <div className="row justify-content-center section-heading">
              <div className="col-lg-6 text-center">
                <h3 className="h2 mt-2">Latest Arrivals</h3>
              </div>
            </div>
            <div className="row g-3 g-lg-4">
              {products && products.length > 0 ? (
                products.map((product, index) => {
                  return (
                    <div className="col-6 col-lg-3" key={product?._id || index}>
                      <div className="product-card-10">
                        <div className="product-card-image">
                          {product?.quantity < 1 && (
                            <div className="badge-ribbon">
                              <span className="badge bg-danger">
                                Out of Stock
                              </span>
                            </div>
                          )}
                          <div className="product-media">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src={
                                  product?.images[0] &&
                                  product?.images[0].includes("https:")
                                    ? product?.images[0]
                                    : SERVER_URL + "/" + product?.images[0] ||
                                      "https://www.bootdey.com/image/380x380/FF00FF/000000"
                                }
                                title={product?.name || ""}
                                alt={product?.name || ""}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="product-card-info">
                          <h6 className="product-title">
                            <a href="#">
                              {product?.name.length > 30
                                ? product.name.substring(0, 27).concat("...")
                                : product?.name}
                            </a>
                          </h6>
                          <div className="product-price">
                            <span className="text-primary">
                              {/* 28.<small>50</small> */}
                              NPR {product?.price || ""}
                            </span>
                            {/* <del className="fs-sm text-muted">
                      $38.<small>50</small>
                    </del> */}
                          </div>
                          <div className="product-action">
                            <Link
                              className="btn"
                              to={`/products/${product?._id}`}
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                            <button
                              className="btn"
                              onClick={() => {
                                dispatch(addToCart(product));
                              }}
                              disabled={product.quantity < 1 ? true : false}
                            >
                              <i className="fa fa-shopping-cart"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="container">
                  {products.length === 0 && !loading && (
                    <div className="p-5 text-center text-primary">
                      No Products Found...
                    </div>
                  )}
                  {products.length === 0 && loading && (
                    <div className="row mt-4">
                      <div className="col">
                        <SkeletalLoader />
                      </div>
                      <div className="col">
                        <SkeletalLoader />
                      </div>
                      <div className="col">
                        <SkeletalLoader />
                      </div>
                      <div className="col">
                        <SkeletalLoader />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <Paginate
                dispatch={dispatch}
                total={total}
                limit={limit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setLimit={setLimit}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;

// Product List
// product list page (selector/ dispatch)
