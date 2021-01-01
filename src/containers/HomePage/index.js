import { Grid, Typography, withStyles } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import styles from "./styles";
import "./homePage.css";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { slideSectionConstants } from "../../constants/slideSectionConstants";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as productListActionCreator from "../../actions/dataAction";
import Product from "../../components/product";
import blackWallpaper from "./blackWallpaper.jpg";
import { NavLink } from "react-router-dom";
import { hotGameList } from "../../constants/dataBase";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  componentWillReceiveProps(props) {
    if (props.isRerendered) {
      this.forceUpdate();
    }
  }
  renderTypeList = (types) => {
    let result = null;
    result = types.map((type, index) => {
      if (index === types.length - 1) {
        return <div className="typeSection">{type}</div>;
      } else {
        return <div className="typeSection">{type},</div>;
      }
    });
    return result;
  };
  renderDetail = (detail) => {
    let result;
    let windowWidth = window.innerWidth;

    let textNumber = 200;
    if (windowWidth < 960 && windowWidth > 700) {
      textNumber = 180;
    } else if (windowWidth < 700) {
      textNumber = 130;
    }
    let testValue = detail.slice(0, textNumber);
    if (testValue.endsWith(" ") == true || detail[textNumber] === " ") {
      result = testValue;
    } else {
      while (true) {
        if (detail.slice(0, textNumber).endsWith(" ") == false) {
          textNumber++;
        } else {
          result = detail.slice(0, textNumber);
          break;
        }
      }
    }

    result += "...";
    return result;
  };
  renderSlideSection = () => {
    let result = null;
    result = slideSectionConstants.map((section) => {
      let { src, alt, content, price, background, sale } = section;
      let { type, detail, name } = content;
      return (
        <div
          className="slideSection"
          key={alt}
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="imageSection">
            <div className="saleBadge">on sale {sale}%</div>
            <img src={src} alt={alt} />
          </div>
          <div className="slideDetail">
            <Typography variant="h5" gutterBottom className="titleItem">
              {name}
            </Typography>
            <div className="categoryItem">
              <span className="headerDetail">Type</span>{" "}
              {this.renderTypeList(type)}
            </div>
            <Typography variant="body2" gutterBottom className="detailItem">
              <span className="headerDetail">Detail</span>{" "}
              {this.renderDetail(detail)}
            </Typography>
            <div className="priceItem">
              <Typography className="originalPrice">{price}$</Typography>
              <ArrowRightAltOutlinedIcon className="newPriceIcon" />
              <Typography className="salePrice">
                {Number((price * (1 - sale / 100)).toFixed(2))}$
              </Typography>
            </div>
            <div className="detailAction">
              <NavLink
                to={`/games/${alt}`}
                exact={true}
                className="navlinkSlide"
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="seeMoreButton"
                  size="small"
                >
                  See More
                </Button>
              </NavLink>
              <Button
                variant="contained"
                color="primary"
                className="addToCartButton"
                startIcon={<ShoppingCartIcon />}
                size="small"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      );
    });
    return result;
  };
  renderSlideDot = () => {
    let result = null;
    result = slideSectionConstants.map((slide, index) => {
      return (
        <div
          className="dot"
          key={index}
          onClick={() => {
            this.currentSlide(index);
          }}
        ></div>
      );
    });
    return result;
  };
  showSlides = (slideIndex) => {
    let slides = document.getElementsByClassName("slideSection");
    let dots = document.getElementsByClassName("dot");
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
    if (slideIndex > slides.length - 1) {
      slideIndex = 0;
    }
    for (let i = 0; i < slides.length; i++) {
      const element = slides[i];
      element.style.visibility = "hidden";
      element.className = element.className.replace(" appear", "");
    }
    for (let i = 0; i < dots.length; i++) {
      const element = dots[i];
      element.className = element.className.replace(" active", "");
    }
    slides[slideIndex].style.visibility = "visible";
    slides[slideIndex].className += " appear";
    dots[slideIndex].className += " active";

    this.setState({
      slideIndex: slideIndex,
    });
  };
  currentSlide = (n) => {
    this.showSlides(n);
  };
  onMoveToPrevSlide = () => {
    let index = this.state.slideIndex - 1;
    this.showSlides(index);
  };
  onMoveToNextSlide = () => {
    let index = this.state.slideIndex + 1;
    this.showSlides(index);
  };
  componentDidMount() {
    this.showSlides(this.state.slideIndex);
    let { productListAction } = this.props;
    let { getProductList } = productListAction;
    getProductList();
  }
  renderProducts = (category) => {
    let { productList } = this.props;
    let result = null;
    let countProduct = 0;
    result = productList.map((data, index) => {
      let { content } = data;
      let { type } = content;

      if (type.includes(category)) {
        if (countProduct < 8) {
          countProduct = countProduct + 1;
          return <Product data={data} key={index} />;
        }
      }
    });
    return result;
  };
  renderHotProduct = () => {
    let { productList } = this.props;
    let result = null;
    let countProduct = 0;
    result = productList.map((data, index) => {
      let { alt } = data;
      console.log(alt);
      if (hotGameList.includes(alt)) {
        if (countProduct < 8) {
          countProduct = countProduct + 1;
          return <Product data={data} key={index} />;
        }
      }
    });

    return result;
  };
  render() {
    return (
      <section className="homePageContainer">
        {/* <img className="wallpaperBackground" src={blackWallpaper} /> */}
        <section className="slideContainer">
          <Typography variant="h5" gutterBottom className="basicHeader">
            {/* <div className="titleWrapper">
              <div className="title">Recommeded</div>
            </div> */}
          </Typography>
          <div className="slide">
            <ArrowBackIosRoundedIcon
              className="arrow arrowLeft"
              onClick={this.onMoveToPrevSlide}
            />
            {this.renderSlideSection()}
            <ArrowForwardIosRoundedIcon
              className="arrow arrowRight"
              onClick={this.onMoveToNextSlide}
            />
          </div>
          <div className="slideDot">{this.renderSlideDot()}</div>
        </section>
        {/* <hr /> */}
        <section className="categoryContainer">
          <div className="category">
            <Typography variant="h5" gutterBottom className="basicHeader">
              <div className="titleWrapper">
                <div className="title">Hot</div>
              </div>
            </Typography>
            <div className="categoryListSection">
              <div className="categoryList">{this.renderHotProduct()}</div>
            </div>
          </div>
          {/* -----------------category---------------------- */}
          <div className="category">
            <Typography variant="h5" gutterBottom className="basicHeader">
              <div className="titleWrapper">
                <div className="title">Horror</div>
                <NavLink
                  to="/category/horror"
                  exact
                  className="categoryNavlink"
                >
                  <a>See more</a>
                </NavLink>
              </div>
            </Typography>
            <div className="categoryListSection">
              <div className="categoryList">
                {this.renderProducts("Horror")}
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <div className="category">
            <Typography variant="h5" gutterBottom className="basicHeader">
              <div className="titleWrapper">
                <div className="title">Adventure</div>
                <NavLink
                  to="/category/adventure"
                  exact
                  className="categoryNavlink"
                >
                  <a>See more</a>
                </NavLink>
              </div>
            </Typography>
            <div className="categoryListSection">
              <div className="categoryList">
                {this.renderProducts("Adventure")}
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <div className="category">
            <Typography variant="h5" gutterBottom className="basicHeader">
              <div className="titleWrapper">
                <div className="title">Co-op</div>
                <NavLink to="/category/co-op" exact className="categoryNavlink">
                  <a>See more</a>
                </NavLink>
              </div>
            </Typography>
            <div className="categoryListSection">
              <div className="categoryList">{this.renderProducts("Co-op")}</div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return { productList: state.productList.productList };
};
const mapDispatchTopProps = (dispatch) => {
  return {
    productListAction: bindActionCreators(productListActionCreator, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchTopProps);
export default compose(withConnect, withStyles(styles))(HomePage);
