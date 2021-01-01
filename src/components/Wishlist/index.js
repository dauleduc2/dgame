import { Button, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Product from "../product";
import styles from "./styles";
import * as wishlistActionCreator from "../../actions/wishlistAction";
import "./style.css";
import { NavLink } from "react-router-dom";
class Wishlist extends Component {
  renderProductList = (sale) => {
    let { wishlist } = this.props;
    let result = null;
    if (sale) {
      result = wishlist.map((product, index) => {
        if (product.sale !== 0) {
          return <Product data={product} key={index} />;
        }
      });
    } else {
      result = wishlist.map((product, index) => {
        return <Product data={product} key={index} />;
      });
    }
    return result;
  };
  componentDidMount() {
    let { wishlistAction, serverId } = this.props;
    let { getWishlist } = wishlistAction;
    if (serverId) {
      getWishlist();
    }
  }

  render() {
    let { serverId, wishlist } = this.props;

    if (serverId) {
      if (wishlist.length !== 0) {
        return (
          <section className="wishListCategoryContainer">
            <div className="category">
              <div className="categoryListSection">
                <div className="header">On sale now</div>
                <div className="categoryList">
                  {this.renderProductList(true)}
                </div>
              </div>
              <div className="categoryListSection">
                <div className="header">All</div>
                <div className="categoryList">
                  {this.renderProductList(false)}
                </div>
              </div>
            </div>
          </section>
        );
      } else {
        return (
          <section className="loginNoficationContainer">
            <div className="loginWrapper">
              <Typography className="message">
                Your wishlist is empty, let find some game that you may like?
              </Typography>
              <NavLink to="/" exact className="navlinkWrapper">
                <Button
                  variant="contained"
                  color="primary"
                  className="signInButton"
                >
                  home page
                </Button>
              </NavLink>
            </div>
          </section>
        );
      }
    } else {
      return (
        <section className="loginNoficationContainer">
          <div className="loginWrapper">
            <Typography className="message">
              You did not sign in yet, sign in to see your wishlist?
            </Typography>
            <NavLink to="/signIn" exact className="navlinkWrapper">
              <Button
                variant="contained"
                color="primary"
                className="signInButton"
              >
                sign in now
              </Button>
            </NavLink>
          </div>
        </section>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist.wishlist,
    serverId: state.accountData.serverId,
  };
};
const mapDispatchTopProps = (dispatch) => {
  return {
    wishlistAction: bindActionCreators(wishlistActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchTopProps);
export default compose(withConnect, withStyles(styles))(Wishlist);
