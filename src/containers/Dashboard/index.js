import { Grid, withStyles } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Navigation from "../../components/Navigation";
import SideBar from "../../components/SideBar";
import styles from "./styles";
import * as dashboardActionCreator from "../../actions/dashboardAction";
import * as productListActionCreator from "../../actions/dataAction";
import * as cartListActionCreator from "../../actions/cartAction";
import rc from "classnames";
import "./dashboard.css";
class Dashboard extends Component {
  onToggleSideBar = () => {
    let { dashboardAction, sidebarOpenning } = this.props;
    let { toggleSideBar } = dashboardAction;

    toggleSideBar(sidebarOpenning);
  };
  componentDidMount() {
    let { productListAction, cartListAction } = this.props;
    let { getProductList } = productListAction;
    let { getCartList } = cartListAction;
    // getCartList();
    getProductList();
  }

  render() {
    let { sidebarOpenning: openning, classes, children, cartList } = this.props;
    let cartListLength = cartList.length;
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={12}>
            <Navigation onToggleSideBar={this.onToggleSideBar} />
          </Grid>
          <Grid item className={classes.wrapper} xs={12}>
            <Grid
              className={rc(classes.contentWraper, {
                [classes.turnRight]: openning === false,
              })}
              xs={12}
            >
              {children}
            </Grid>
            <SideBar
              openning={openning}
              cartListLength={cartListLength}
              onToggleSideBar={this.onToggleSideBar}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  sidebarOpenning: state.sideBar.openning,
  cartList: state.cart.cartList,
});
const mapDispatchToProps = (dispatch) => ({
  dashboardAction: bindActionCreators(dashboardActionCreator, dispatch),
  productListAction: bindActionCreators(productListActionCreator, dispatch),
  cartListAction: bindActionCreators(cartListActionCreator, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(Dashboard);
