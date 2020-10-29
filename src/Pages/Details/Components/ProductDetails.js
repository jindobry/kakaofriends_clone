import React, { Component } from "react";
import "../Details.scss";

export class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      productDetails: [],
    };
  }

  componentDidMount() {
    fetch("http://10.58.2.50:8001/products/product/250")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          productDetails: res.data_list,
        });
      });
  }

  render() {
    return (
      <div>
        {this.props.productInfo.map((el) => (
          <div className="mainWrap">
            <div
              className="detailsMain"
              dangerouslySetInnerHTML={{
                __html: el.detail,
              }}
            />

            <div
              className="detailsSub"
              dangerouslySetInnerHTML={{
                __html: el.sub_detail,
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ProductDetails;
