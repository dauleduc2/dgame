import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";
import "./style.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as cartActionCreator from "../../actions/cartAction";
import * as uiActionCreator from "../../actions/uiAction";
import ClearIcon from "@material-ui/icons/Clear";
import { NavLink } from "react-router-dom";
import rc from "classnames";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minusButtonDisabled: true,
      saleFromVoucher: 0,
    };
  }
  componentDidMount() {
    let { cartAction, serverId } = this.props;
    let { getCartList } = cartAction;
    if (serverId !== null) {
      getCartList();
    }
  }

  minusProduct = (product) => {
    let { amount } = product;
    let { cartAction } = this.props;
    let { minusAmountOfProduct } = cartAction;
    minusAmountOfProduct(product);
    this.setState({
      minusButtonDisabled: false,
    });
    if (amount - 1 === 1) {
      this.setState({
        minusButtonDisabled: true,
      });
    }
  };
  addProduct = (product) => {
    let { cartAction } = this.props;
    let { addAmountOfProduct } = cartAction;
    addAmountOfProduct(product.id, 1);
    this.setState({
      minusButtonDisabled: false,
    });
  };
  renderDesktopCartItems = () => {
    let result = null;
    let { cartList } = this.props;
    result = cartList.map((product, index) => {
      let { src, alt, content, price, sale, amount } = product;
      let { name } = content;
      return (
        <div className="productInCart">
          <Paper className="productInCartWrapper" key={index}>
            <img src={src} alt={alt} />
            <div className="productInformationWrapper">
              <div className="productName">{name}</div>
              <div className="priceWrapper">
                {sale !== 0 ? <div className="oldPrice">{price}$</div> : ""}
                {sale !== 0 ? <ArrowRightAltIcon className="changeIcon" /> : ""}
                <div className="newPrice">
                  {Number((price * (1 - sale / 100)).toFixed(2))}$
                </div>
              </div>
              <div className="amountArea">
                <Box className="amountWrapper">
                  <Button
                    color="primary"
                    variant="contained"
                    className="minus"
                    onClick={() => {
                      this.minusProduct(product);
                    }}
                    disabled={amount >= 1 ? false : true}
                  >
                    <RemoveIcon className="removeIcon" />
                  </Button>
                  <div className="amount">{amount}</div>
                  <Button
                    className="add"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.addProduct(product);
                    }}
                  >
                    <AddIcon className="addIcon" />
                  </Button>
                </Box>
              </div>
            </div>
            <div className="totalPriceWrapper">
              <div className="calcPrice">
                Price
                <span>{Number((price * (1 - sale / 100)).toFixed(2))}$</span>
              </div>
              <div className="calcPrice">
                Amount <span>{amount}</span>
              </div>
              <hr />
              <div className="calcPrice">
                Total
                <span>
                  {Number(price * (1 - sale / 100) * amount).toFixed(2)}$
                </span>
              </div>
            </div>
          </Paper>
          <div className="deleteWrapper">
            <IconButton
              aria-label="delete"
              className="iconButton"
              onClick={() => this.onShowConfirmNofication(product)}
            >
              <ClearIcon className="icon" />
            </IconButton>
          </div>
        </div>
      );
    });
    return result;
  };
  renderMobileCartItems = () => {
    let result = null;
    let { cartList } = this.props;

    result = cartList.map((product, index) => {
      let { src, alt, content, price, sale, amount } = product;
      let { name } = content;
      return (
        <Paper key={index} className="mobileProductInCart" elevation={3}>
          <img src={src} alt={alt} />
          <div className="mobileProductInCartDetail">
            <Typography className="mobileTitle">{name}</Typography>
            <div className="priceWrapper">
              <div className="oldPrice">{price}$</div>
              <ArrowRightAltIcon className="changeIcon" />
              <div className="newPrice">
                {Number((price * (1 - sale / 100)).toFixed(2))}$
              </div>
            </div>
            <div className="amountArea">
              <Box className="amountWrapper">
                <Button
                  color="primary"
                  variant="contained"
                  className="minus"
                  onClick={() => {
                    this.minusProduct(product);
                  }}
                  disabled={amount >= 1 ? false : true}
                >
                  <RemoveIcon className="removeIcon" />
                </Button>
                <div className="amount">{amount}</div>
                <Button
                  className="add"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.addProduct(product);
                  }}
                >
                  <AddIcon className="addIcon" />
                </Button>
              </Box>
            </div>
          </div>
          <div className="totalPriceWrapper">
            <div className="calcPrice">
              Total : {Number(price * (1 - sale / 100) * amount).toFixed(2)}$
            </div>
          </div>
        </Paper>
      );
    });
    return result;
  };
  renderNoProductInCart = () => {
    let result = null;

    result = (
      <div className="signInNofication">
        <div className="message">
          Please sign in to see product in your cart
        </div>
        <div className="signInNoficationAction">
          <NavLink to="/signIn" exact className="navLink">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="button"
            >
              sign in now
            </Button>
          </NavLink>
        </div>
      </div>
    );
    return result;
  };
  renderListPrice = () => {
    let { cartList } = this.props;
    let result = 0;
    cartList.forEach((product) => {
      result =
        result + product.price * (1 - product.sale / 100) * product.amount;
    });
    result = result.toFixed(2);
    return result;
  };
  onShowConfirmNofication = (product) => {
    let { uiAction } = this.props;
    let { showConfirmNofication } = uiAction;
    showConfirmNofication(product);
  };
  onDeleteProduct = (product) => {
    let { cartAction } = this.props;
    let { deleteProductFromCart } = cartAction;
    deleteProductFromCart(product);
  };
  render() {
    let { cartList, serverId, classes } = this.props;
    return (
      <div className="cartContainer">
        <Grid container xs={12}>
          <Grid
            item
            xs={12}
            md={8}
            className={rc(classes.desktopCart, "billSection")}
          >
            {serverId
              ? this.renderDesktopCartItems()
              : this.renderNoProductInCart()}
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            className={rc(classes.mobileCart, "billSection")}
          >
            {serverId
              ? this.renderMobileCartItems()
              : this.renderNoProductInCart()}
          </Grid>
          <Grid item xs={12} md={4} className="totalSection">
            <Paper elevation={3} className="totalWrapper">
              <div className="billHeader">BILLING IMFORMATION</div>
              <div className="amountProductAnnouncement">
                You have <span>{cartList.length}</span> products in cart
              </div>
              <div className="price">
                List Price: <span>{this.renderListPrice()}$</span>
              </div>
              <div className="price">
                Voucher : <span>-{this.state.saleFromVoucher}%</span>
              </div>
              <hr />
              <div className="price">
                Subtotal ({cartList.length} items):
                <span>
                  {Number(
                    (
                      this.renderListPrice() *
                      (1 - this.state.saleFromVoucher / 100)
                    ).toFixed(2)
                  )}
                  $
                </span>
              </div>
              <Button
                color="primary"
                variant="contained"
                className="placeOrderButton"
              >
                PLACE ORDER
              </Button>
            </Paper>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cartAction: bindActionCreators(cartActionCreator, dispatch),
    uiAction: bindActionCreators(uiActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(Cart);
