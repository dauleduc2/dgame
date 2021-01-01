import { Grid, Typography } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import "./style.css";
class Product extends Component {
  render() {
    let { data } = this.props;
    let { alt, src, content, price, sale } = data;
    let { name, type } = content;
    return (
      <Grid className="gridWrapper" xs={6} sm={6} md={4} lg={3}>
        <NavLink
          to={`/games/${alt}`}
          key={alt}
          activeClassName="selected"
          exact={true}
          className="navlink"
        >
          <div className="product">
            <div className="imageProduct">
              <img src={src} alt={alt} />
              {sale !== 0 ? <div className="percentageSale">-{sale}%</div> : ""}
            </div>
            <div className="detailProduct">
              <Typography variant="h5" gutterBottom className="titleItem">
                {name}
              </Typography>
              <div className="price">
                {sale !== 0 ? (
                  <Fragment>
                    <div className="oldPrice">{price}$</div>
                    <ArrowRightAltOutlinedIcon className="newPriceIcon" />
                  </Fragment>
                ) : (
                  ""
                )}
                <div className="newPrice">
                  {Number((price * (1 - sale / 100)).toFixed(2))}$
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      </Grid>
    );
  }
}

export default Product;
