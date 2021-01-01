import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Product from "../product";
import * as dataActionCreator from "../../actions/dataAction";
import "./style.css";
class SearchPage extends Component {
  renderProductList = () => {
    let { productList } = this.props;
    let { keyword } = this.props.match.params;
    let filterList = productList.filter((product) => {
      return product.content.name.toLowerCase().includes(keyword.toLowerCase());
    });
    let result = null;
    result = filterList.map((product, index) => {
      return <Product data={product} key={index} />;
    });
    return result;
  };

  render() {
    let { keyword } = this.props.match.params;
    return (
      <section className="searchPageCategoryContainer">
        <div className="searchPageResult">
          {this.renderProductList().length} result for "
          <strong>{keyword}</strong>"
        </div>
        <div className="category">
          <div className="categoryListSection">
            <div className="categoryList">{this.renderProductList()}</div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return { productList: state.productList.productList };
};
const mapDispatchTopProps = (dispatch) => {
  return {
    dataAction: bindActionCreators(dataActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchTopProps);
export default compose(withConnect)(SearchPage);
