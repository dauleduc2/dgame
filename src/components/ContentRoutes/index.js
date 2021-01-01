import { withStyles } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import styles from "./styles";
class ContentRoutes extends Component {
  render() {
    let { route } = this.props;
    let { path, component: MyComponent, exact, data, type } = route;
    if (path !== "/search") {
      return (
        <div>
          <Route
            path={`${path}`}
            exact={exact}
            render={(routeProps) => {
              return (
                <Fragment>
                  <MyComponent {...routeProps} data={data} type={type} />
                </Fragment>
              );
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Route
            path={`/search/:keyword`}
            exact={exact}
            render={(routeProps) => {
              return (
                <Fragment>
                  <MyComponent {...routeProps} data={data} type={type} />
                </Fragment>
              );
            }}
          />
        </div>
      );
    }
  }
}
export default withStyles(styles)(ContentRoutes);
