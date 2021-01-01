import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import styles from "./styles";
import "./style.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as cartActionCreator from "../../actions/cartAction";
import * as uiActionCreator from "../../actions/uiAction";
import * as wishlistActionCreator from "../../actions/wishlistAction";
import { successNofication } from "../../commons/ToastHelper";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import Product from "../../components/product";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      minusButtonDisabled: true,
    };
  }

  findIndex = (state, productId) => {
    let result = null;
    state.forEach((product, index) => {
      if (product.productId === productId) {
        result = index;
      }
    });
    return result;
  };

  minusProduct = () => {
    if (this.state.amount > 1) {
      this.setState({
        amount: this.state.amount - 1,
      });
    }
    if (this.state.amount - 1 === 1) {
      this.setState({
        minusButtonDisabled: true,
      });
    }
  };

  addProduct = () => {
    this.setState({
      amount: this.state.amount + 1,
      minusButtonDisabled: false,
    });
  };

  renderCategory = (types) => {
    let result = "";
    types.forEach((type, index) => {
      if (index === types.length - 1) {
        result = result + type;
      } else {
        result = result + type + ", ";
      }
    });
    return result;
  };

  renderDetail = (detail) => {
    return detail;
  };

  addToCart = (data) => {
    let { cartAction, cartList, uiAction, serverId } = this.props;
    let { addToCart, addAmountOfProduct } = cartAction;
    let { showLoginNofication } = uiAction;
    let { productId } = data;
    if (serverId) {
      let index = this.findIndex(cartList, productId);
      if (index !== null) {
        let cartListId = cartList[index].id;
        addAmountOfProduct(cartListId, this.state.amount);
      } else {
        addToCart(data, this.state.amount);
      }
    } else {
      showLoginNofication();
    }
  };
  addToWishlist = (data) => {
    let { wishlistAction, serverId, uiAction } = this.props;
    let { addToWishlist } = wishlistAction;
    let { showLoginNofication } = uiAction;
    if (serverId) {
      addToWishlist(data);
    } else {
      showLoginNofication();
    }
  };
  removeFromWishlist = (data) => {
    let { wishlistAction } = this.props;
    let { deleteFromWishlist } = wishlistAction;
    deleteFromWishlist(data);
  };
  renderProducts = (category) => {
    let { productList } = this.props;
    let { data: currentProduct } = this.props;
    let result = null;
    let countProduct = 0;
    result = productList.map((data, index) => {
      let { content } = data;
      let { type } = content;

      for (let i = 0; i < category.length; i++) {
        if (type.includes(category[i])) {
          if (currentProduct !== data) {
            if (countProduct < 8) {
              countProduct = countProduct + 1;
              return <Product data={data} key={index} />;
            }
          }
        }
      }
    });
    return result;
  };
  render() {
    let { data, wishlist } = this.props;
    let { src, alt, content, background, status, price, sale } = data;
    let { name, detail, type } = content;
    let isProductAlreadyInWishlist = false;
    wishlist.forEach((product) => {
      if (product.alt === data.alt) {
        isProductAlreadyInWishlist = true;
      }
    });
    return (
      <div className="productContainer">
        <Grid container xs={12}>
          <Grid item container xs={12} className="productWrapper">
            {/* <Grid item md={1}></Grid> */}
            <Grid item container className="contentWrapper">
              <Grid item md={5} className="imageArea">
                <img alt={alt} src={src} />
              </Grid>
              <Grid item md>
                <Box
                  className="productDetailArea"
                  borderLeft={0}
                  letterSpacing={1}
                >
                  <Box
                    textAlign="left"
                    fontSize={35}
                    mb={2}
                    className="productTitle"
                  >
                    {name}
                  </Box>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className="detailItem"
                  >
                    <span className="headerDetail">Category</span>{" "}
                    {this.renderCategory(type)}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className="detailItem"
                  >
                    <span className="headerDetail">Detail</span>{" "}
                    {this.renderDetail(detail)}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className="detailItem"
                  >
                    <span className="headerDetail">Status</span>{" "}
                    {status ? (
                      <span className="available">Available</span>
                    ) : (
                      <span className="soldOut">Sold out</span>
                    )}
                  </Typography>
                  <div className="priceItem">
                    <Typography className="originalPrice">{price}$</Typography>
                    <ArrowRightAltOutlinedIcon className="newPriceIcon" />
                    <Typography className="salePrice">
                      {Number((price * (1 - sale / 100)).toFixed(2))}$
                    </Typography>
                  </div>
                  <Box className="eachProductDetailAction">
                    <Box className="amountWrapper">
                      <Button
                        color="primary"
                        variant="contained"
                        className="minus"
                        onClick={this.minusProduct}
                        disabled={this.state.minusButtonDisabled}
                      >
                        <RemoveIcon className="removeIcon" />
                      </Button>
                      <div className="amount">{this.state.amount}</div>
                      <Button
                        className="add"
                        variant="contained"
                        color="primary"
                        onClick={this.addProduct}
                      >
                        <AddIcon />
                      </Button>
                    </Box>
                    <Box className="buttonWrapper">
                      {isProductAlreadyInWishlist ? (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={
                            window.innerWidth < 425 ? "" : <FavoriteIcon />
                          }
                          className="wishlist"
                          onClick={() => {
                            this.removeFromWishlist(data);
                          }}
                          // className="actionButton"
                        >
                          Remove from wishlist
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={
                            window.innerWidth < 425 ? (
                              ""
                            ) : (
                              <FavoriteBorderIcon />
                            )
                          }
                          className="wishlist"
                          onClick={() => {
                            this.addToWishlist(data);
                          }}
                          // className="actionButton"
                        >
                          Add to wishlist
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={
                          window.innerWidth < 425 ? "" : <ShoppingCartIcon />
                        }
                        className="addToCart"
                        onClick={() => {
                          this.addToCart(data);
                        }}
                        disabled={status ? false : true}
                        // className="actionButton"
                      >
                        Add to cart
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/* <Grid item md={1}></Grid> */}
          </Grid>
          <Grid item xs={12}>
            <div className="titleWrapper">
              <div className="title">Related</div>
            </div>
            <div className="categoryListSection">
              <div className="categoryList">{this.renderProducts(type)}</div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartList: state.cart.cartList,
    serverId: state.accountData.serverId,
    wishlist: state.wishlist.wishlist,
    productList: state.productList.productList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cartAction: bindActionCreators(cartActionCreator, dispatch),
    uiAction: bindActionCreators(uiActionCreator, dispatch),
    wishlistAction: bindActionCreators(wishlistActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ProductPage);
