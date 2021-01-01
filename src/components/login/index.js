import React, { Component } from "react";
import "./style.css";
import Fab from "@material-ui/core/Fab";
import { Button, Typography } from "@material-ui/core";
import "fontsource-roboto";
import TextField from "@material-ui/core/TextField";
import { NavLink } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators, compose } from "redux";
import { renderTextField } from "../../commons/reduxFormHelper";
import * as accountActionCreator from "../../actions/accountDataAction";
import { SubmissionError } from "redux-form";
import { successNofication } from "../../commons/ToastHelper";
import * as cartActionCreator from "../../actions/cartAction";
import * as wishlistActionCreator from "../../actions/wishlistAction";
class signInPage extends Component {
  onSubmit = (data) => {
    let {
      history,
      accountList,
      accountAction,
      cartAction,
      wishlistAction,
    } = this.props;
    let { getCartList } = cartAction;
    let { getWishlist } = wishlistAction;
    let { signInSuccess, signInFailed } = accountAction;
    accountList.forEach((account) => {
      if (account.userName === data.userName) {
        if (account.password === data.password) {
          signInSuccess(account.userId, account.id);
          getCartList();
          getWishlist();
          history.goBack();
          successNofication("Login success, happy shopping!");
        } else {
          signInFailed();
          throw new SubmissionError({
            password: "Incorrect password",
          });
        }
      }
    });
  };
  componentDidMount() {
    let { accountAction } = this.props;
    let { getAccountList } = accountAction;
    getAccountList();
  }
  render() {
    let { handleSubmit } = this.props;
    return (
      <div className="signInContainer">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="signInWrapper">
            <div className="iconHeader">
              <Fab
                color="primary"
                aria-label="add"
                disableFocusRipple={true}
                disableRipple={true}
              >
                <PersonOutlineOutlinedIcon />
              </Fab>
            </div>
            <div className="header">
              <Typography variant="h6" gutterBottom>
                Sign in
              </Typography>
            </div>
            <div className="userName">
              <Field
                name="userName"
                id="outlined-basic"
                label="User name"
                variant="outlined"
                className="inputButton"
                component={renderTextField}
              />
            </div>
            <div className="password">
              <Field
                name="password"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className="inputButton"
                component={renderTextField}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className="signInButton"
              type="submit"
              disabled={this.props.invalid ? true : false}
            >
              SIGN IN
            </Button>
            <div className="signInAction">
              <NavLink exact to="/" className="link">
                Forgot password?
              </NavLink>
              <NavLink exact to="/signUp" className="link">
                Sign up
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const warn = (values) => {};
const validate = (values) => {
  const errors = {};
  if (!values.userName) {
    errors.userName = "Required";
  } else if (values.userName.length < 6) {
    errors.userName = "User name have to have at least 6 words";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password have to have at least 6 words";
  }
  return errors;
};
const mapStateToProps = (state) => {
  return {
    accountList: state.accountData.accountList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    accountAction: bindActionCreators(accountActionCreator, dispatch),
    cartAction: bindActionCreators(cartActionCreator, dispatch),
    wishlistAction: bindActionCreators(wishlistActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReduxForm = reduxForm({
  form: "LOGIN",
  validate: validate,
  warn: warn,
});
export default compose(withConnect, withReduxForm)(signInPage);
