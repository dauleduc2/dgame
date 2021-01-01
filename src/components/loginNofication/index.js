import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as uiActionCreator from "../../actions/uiAction";
import { bindActionCreators } from "redux";
import "./style.css";
class LoginNofication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }
  handleClose = () => {
    let { uiAction } = this.props;
    let { hideLoginNofication } = uiAction;
    hideLoginNofication();
  };
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  render() {
    let { openning } = this.props;
    return (
      <div>
        <Dialog
          open={openning}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"You did not sign in yet"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Look you did not sign in yet. Sign in now?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              later
            </Button>
            <NavLink to="/signIn" exact className="signInLink">
              <Button onClick={this.handleClose} color="primary" autoFocus>
                SIGN IN
              </Button>
            </NavLink>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    openning: state.ui.signInNofication,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uiAction: bindActionCreators(uiActionCreator, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginNofication);
