import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";

class AllCategory extends Component {
  render() {
    let { match } = this.props;
    console.log(match);
    return <div>All Category</div>;
  }
}
export default withStyles(styles)(AllCategory);
