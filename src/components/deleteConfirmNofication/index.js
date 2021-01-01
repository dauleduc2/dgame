import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";
import "./style.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as uiActionCreator from "../../actions/uiAction";
import * as cartActionCreator from "../../actions/cartAction";
class ConfirmNofication extends Component {
  onDisagree = () => {
    let { uiAction } = this.props;
    let { hideConfirmNofication } = uiAction;
    hideConfirmNofication(false);
  };
  onAgree = () => {
    let { uiAction, cartAction, requestData } = this.props;
    let { hideConfirmNofication } = uiAction;
    let { deleteProductFromCart } = cartAction;
    hideConfirmNofication(true);
    deleteProductFromCart(requestData);
  };
  render() {
    let { openning } = this.props;
    return (
      <div className="confirmNoficationContainer">
        <div className="confirmNoficationBox">
          <Dialog
            open={openning}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete this product?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You will lose current selection of this product
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.onDisagree}>
                No
              </Button>
              <Button color="primary" autoFocus onClick={this.onAgree}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    openning: state.ui.confirmNoficationOpenning,
    requestData: state.ui.requestData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uiAction: bindActionCreators(uiActionCreator, dispatch),
    cartAction: bindActionCreators(cartActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ConfirmNofication);
