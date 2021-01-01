import { List, ListItem, withStyles } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { CONTENT_ROUTES } from "../../constants/routes";
import styles from "./styles";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { CATEGORY_ROUTES } from "../../constants/routes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import * as accountActionCreator from "../../actions/accountDataAction";
import * as cartActionCreator from "../../actions/cartAction";
import $ from "jquery";
import "./sideBar.css";
import "./style.css";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { successNofication } from "../../commons/ToastHelper";
class SideBar extends Component {
  componentDidMount() {
    $(".categoryListToggle").slideUp();
  }
  handleIconClick = () => {
    $(".categoryListToggle").stop().slideToggle();
    $(".arrowIcon").toggleClass("rotate180");
  };
  renderCategoryList = () => {
    let result = null;
    let { classes } = this.props;
    result = CATEGORY_ROUTES.map((route) => {
      return (
        <NavLink
          to={route.path}
          key={route.path}
          activeClassName="selected"
          exact={route.exact}
          className={classes.navLinkCustom}
        >
          <ListItem
            button
            className={classes.listCategoryItem}
            onClick={this.onToggleSideBar}
          >
            <ListItemText primary={route.name} />
          </ListItem>
        </NavLink>
      );
    });
    return result;
  };
  onLogOut = () => {
    let { accountAction, cartAction } = this.props;
    let { logOut } = accountAction;
    let { clearCart } = cartAction;

    logOut();
    clearCart();
    successNofication("log out success");
  };
  onToggleSideBar = () => {
    if (window.innerWidth < 960) {
      this.props.onToggleSideBar();
    }
  };
  renderListItem = () => {
    let result = null;
    let { classes, cartListLength, serverId } = this.props;
    let decoyContentRoute = CONTENT_ROUTES;
    if (window.innerWidth < 960) {
      if (!serverId) {
        decoyContentRoute = decoyContentRoute.concat({
          path: "/signIn",
          exact: true,
          name: "Sign in",
          icon: <AccountCircleIcon />,
        });
      } else {
        decoyContentRoute = decoyContentRoute.concat({
          name: "Log out",
          icon: <ExitToAppIcon />,
        });
      }
    }
    result = decoyContentRoute.map((route, index) => {
      if (route.name === "Log out") {
        return (
          <Fragment key={index}>
            <ListItem button onClick={this.onLogOut}>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          </Fragment>
        );
      }
      if (route.name !== "Category") {
        return (
          <NavLink
            to={route.path}
            key={route.path}
            activeClassName="selected"
            exact={route.exact}
            className={classes.navLinkCustom}
          >
            <ListItem button onClick={this.onToggleSideBar}>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.name} />
              {route.name === "Cart" ? (
                <div className="amountProductInCart">
                  <div className="amountAnnoucement">{cartListLength}</div>
                </div>
              ) : (
                ""
              )}
            </ListItem>
          </NavLink>
        );
      } else if (route.name === "Category") {
        return (
          <Fragment key={route.path}>
            <ListItem button onClick={this.handleIconClick}>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.name} />
              <ListItemIcon>
                <ExpandMoreIcon className="arrowIcon" />
              </ListItemIcon>
            </ListItem>
            <List className="categoryListToggle">
              {this.renderCategoryList()}
            </List>
          </Fragment>
        );
      }
    });
    return result;
  };

  render() {
    let { classes, openning } = this.props;
    return (
      <div className={openning ? "blackWrapper" : ""}>
        <Drawer
          variant="persistent"
          anchor={"right"}
          open={openning}
          classes={{
            paper: classes.drawerPaper,
          }}
          className={openning ? "drawer" : "drawer deep"}
        >
          <List>{this.renderListItem()}</List>
        </Drawer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { serverId: state.accountData.serverId };
};
const mapDispatchTopProps = (dispatch) => {
  return {
    accountAction: bindActionCreators(accountActionCreator, dispatch),
    cartAction: bindActionCreators(cartActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchTopProps);
export default compose(withConnect, withStyles(styles))(SideBar);
