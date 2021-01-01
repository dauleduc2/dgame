import { Button, withStyles } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import styles from "./styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import "./style.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as accountActionCreator from "../../actions/accountDataAction";
import * as cartActionCreator from "../../actions/cartAction";
import { successNofication } from "../../commons/ToastHelper";
const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      inputText: "",
    };
  }
  handleProfileMenuOpen = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };
  handleMobileMenuOpen = (e) => {
    this.setState({
      mobileMoreAnchorEl: e.currentTarget,
    });
    this.onToggleSideBar();
  };
  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null,
    });
  };
  onLogOut = () => {
    this.setState({
      anchorEl: null,
    });
    let { accountAction, cartAction } = this.props;
    let { logOut } = accountAction;
    let { clearCart } = cartAction;
    logOut();
    clearCart();
    successNofication("log out success");
  };
  renderMenu = () => {
    const isMenuOpen = Boolean(this.state.anchorEl);
    return (
      <Fragment>
        <Menu
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.onLogOut}>Log out</MenuItem>
        </Menu>
      </Fragment>
    );
  };
  renderMobileMenu = () => {
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);
    return (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  };
  onToggleSideBar = () => {
    this.props.onToggleSideBar();
  };
  onSearch = () => {
    // let inputField = document.getElementsByClassName("abcxyz");
    // console.log(inputField);
  };
  onInputChange = (e) => {
    // console.log(e);
    let { value } = e.target;
    this.setState({
      inputText: value,
    });
  };
  componentDidMount() {
    var input = document.getElementById("inputSearchField");
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchButton").click();
      }
    });
  }

  render() {
    let { classes, loginSuccess, productList } = this.props;
    let windowWidth = window.innerWidth;
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <NavLink to="/" className="logoNavlink">
              <Typography className={classes.title} variant="h6" noWrap>
                Shop Game
              </Typography>
            </NavLink>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={this.onInputChange}
                input
                id="inputSearchField"
              />
            </div>
            <NavLink
              to={`/search/${this.state.inputText}`}
              exact={false}
              className="searchNavLink"
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={this.onSearch}
                id="searchButton"
              >
                search
              </Button>
            </NavLink>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {loginSuccess ? (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              ) : (
                ""
              )}
              {loginSuccess ? (
                ""
              ) : (
                <NavLink to="/signIn" exact className="signInLink">
                  <Button size="medium" className="signInButton">
                    Sign In
                  </Button>
                </NavLink>
              )}
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={this.onToggleSideBar}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {/* {this.renderMobileMenu()} */}
        {this.renderMenu()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginSuccess: state.accountData.loginSuccess,
  productList: state.productList.productList,
});
const mapDispatchToProps = (dispatch) => ({
  accountAction: bindActionCreators(accountActionCreator, dispatch),
  cartAction: bindActionCreators(cartActionCreator, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(Navigation);
