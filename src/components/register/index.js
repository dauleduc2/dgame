import React, { Component } from "react";
import "./style.css";
import Fab from "@material-ui/core/Fab";
import { Button, Typography } from "@material-ui/core";
import "fontsource-roboto";
import { NavLink } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../../commons/reduxFormHelper";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as accountActionCreator from "../../actions/accountDataAction";
import { getList } from "../../api/apis";
import { SubmissionError } from "redux-form";
class signUpPage extends Component {
  onSubmit = (data) => {
    let { accountAction, reset, history } = this.props;
    let { addNewAccount } = accountAction;
    addNewAccount(data);

    reset();
    history.push("/");
  };
  // onChange = (data) => {
  //   let { values } = data;
  //   let { accountList } = this.props;
  //   accountList.forEach((account) => {
  //     if (values) {
  //       if (values.email === account.email) {
  //         throw new SubmissionError({
  //           email: "This email already used to create an account",
  //         });
  //       }
  //       if (values.userName === account.userName) {
  //         throw new SubmissionError({
  //           userName:
  //             "This user name already exists, please change a new user name",
  //         });
  //       }
  //     }
  //   });
  // };
  render() {
    let { handleSubmit, inputData } = this.props;
    let fieldData = inputData.REGISTER;
    return (
      <div className="signUpContainer">
        <form
          onSubmit={handleSubmit(this.onSubmit)}
          // onChange={() => this.onChange(fieldData)}
        >
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
                Sign up
              </Typography>
            </div>
            <div className="email">
              <Field
                component={renderTextField}
                name="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="inputButton"
              />
            </div>
            <div className="userName">
              <Field
                component={renderTextField}
                name="userName"
                id="outlined-basic"
                label="User name"
                variant="outlined"
                className="inputButton"
              />
            </div>
            <div className="password">
              <Field
                component={renderTextField}
                name="password"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className="inputButton"
              />
            </div>
            <div className="password">
              <Field
                component={renderTextField}
                name="confirmPassword"
                id="outlined-password-input"
                label="Confirm password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className="inputButton"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className="signInButton"
              type="submit"
              disabled={this.props.invalid ? true : false}
            >
              SIGN UP
            </Button>
            <div className="signInAction">
              <div exact to="" className="haveAnAccount">
                Already have an account?
              </div>
              <NavLink exact to="/signIn" className="link">
                Sign in
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

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password have to have at least 6 words";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  }
  if (!values.userName) {
    errors.userName = "Required";
  } else if (values.userName.length < 6) {
    errors.userName = "User name have to have at least 6 words";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword =
      "Incorrect confirm password : not same as password above";
  }
  return errors;
};
const mapStateToProps = (state) => {
  return {
    accountList: state.accountData.accountList,
    inputData: state.form,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    accountAction: bindActionCreators(accountActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReduxForm = reduxForm({
  form: "REGISTER",
  validate: validate,
  warn: warn,
});
export default compose(withConnect, withReduxForm)(signUpPage);
