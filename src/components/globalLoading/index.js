import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";
import loadingIcon from "../../assets/images/globalLoading.gif";
class GlobalLoading extends Component {
  render() {
    let { classes } = this.props;
    return (
      <div className={classes.galobalLoadingWrapper}>
        <img
          src={loadingIcon}
          alt="globalLoading"
          className={classes.loadingIcon}
        />
      </div>
    );
  }
}
export default withStyles(styles)(GlobalLoading);
