import { ThemeProvider } from "@material-ui/core";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "../../commons/theme";
import Dashboard from "../Dashboard";
import {
  CONTENT_ROUTES,
  CATEGORY_ROUTES,
  routeNotInclideInSideBar,
} from "../../constants/routes";
import ContentRoutes from "../../components/ContentRoutes";
import Product from "../productPage/index";
import { connect } from "react-redux";
import GlobalLoading from "../../components/globalLoading";
import ConfirmNofication from "../../components/deleteConfirmNofication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginNofication from "../../components/loginNofication";
import NotFoundPage from "../../components/notFoundPage";
// import "../../justUpData";
class App extends Component {
  renderContent = () => {
    let { productList } = this.props;
    let result = null;
    let gameData = [];
    productList.forEach((data) => {
      let { alt } = data;
      gameData = gameData.concat({
        path: `/games/${alt}`,
        exact: true,
        component: Product,
        data,
      });
    });
    let routeList = CONTENT_ROUTES.concat(CATEGORY_ROUTES)
      .concat(gameData)
      .concat(routeNotInclideInSideBar);
    result = routeList.map((route) => {
      return <ContentRoutes route={route} key={route.path} data={route.data} />;
    });
    return result;
  };
  render() {
    let { ui } = this.props;
    // let { globalLoadingOpenning } = ui;
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Dashboard>{this.renderContent()}</Dashboard>
            {/* {globalLoadingOpenning ? <GlobalLoading /> : ""} */}
            <ConfirmNofication />
            <LoginNofication />
          </div>
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    productList: state.productList.productList,
    ui: state.ui,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
