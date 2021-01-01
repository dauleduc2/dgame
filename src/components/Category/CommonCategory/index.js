import { Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import styles from "./styles";
import * as dataActionCreator from "../../../actions/dataAction";
import Product from "../../product";
import "./style.css";
class CommonCategory extends Component {
  componentDidMount() {
    let { dataAction } = this.props;
    let { getProductList } = dataAction;
    getProductList();
  }
  renderProducts = (category) => {
    let { productList } = this.props;
    let result = null;
    result = productList.map((data, index) => {
      let { content } = data;
      let { type } = content;
      if (type.includes(category)) {
        return <Product data={data} key={index} />;
      }
    });
    return result;
  };
  render() {
    let { type } = this.props;
    return (
      <section className="commonCategoryContainer">
        <div className="category">
          <div className="titleWrapper">
            <div className="title">{type}</div>
          </div>

          <div className="categoryListSection">
            <div className="categoryList">{this.renderProducts(type)}</div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    productList: state.productList.productList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dataAction: bindActionCreators(dataActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(CommonCategory);
