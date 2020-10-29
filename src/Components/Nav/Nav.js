import React from "react";
import DropDownMain from "./Components/DropDownMain";
import Searchbar from "./Components/Searchbar";
import UserModal from "./Components/UserModal";
import URL from "../../url";
import "./Nav.scss";

class Nav extends React.Component {
  state = {
    hoverOn: false,
    hoverUser: false,
    itemInCart: 0,
    isLogin: false,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState(
        {
          isLogin: true,
        },
        () => this.getCartInfo()
      );
    }
  }

  getCartInfo = () => {
    fetch(`${URL}cart`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          itemInCart: res.carts.length,
        });
      });
  };

  render() {
    const { hoverOn, hoverUser, itemInCart, isLogin } = this.state;
    return (
      <nav className="Nav">
        <div className="Container">
          <ul className="leftMenu">
            <li className="category">
              <div
                className="categoryLink"
                onMouseEnter={() => this.setState({ hoverOn: true })}
                onMouseLeave={() => this.setState({ hoverOn: false })}
              >
                카테고리
                <span className="categoryTri" />
                {hoverOn && <DropDownMain />}
              </div>
            </li>
            <li className="category">
              <a className="categoryLink" href="/location">
                매장안내
              </a>
            </li>

            <li className="category">
              <a className="categoryLink" href="/#">
                고객센터
              </a>
            </li>
          </ul>
          <a className="logoWrap" href="/main">
            <img
              className="logo"
              alt="카카오로고"
              src="/Images/kakaologo.png"
            />
          </a>
          <div className="rightMenu">
            <Searchbar />
            <aside className="icons">
              <a
                className="iconLink"
                href="/signin"
                onMouseEnter={() => this.setState({ hoverUser: true })}
                onMouseLeave={() => this.setState({ hoverUser: false })}
              >
                <span id="myPage" className="icon" />
                {hoverUser && <UserModal isLogin={isLogin} />}
              </a>
              <a className="iconLink" href="/cart">
                <span id="cart" className="icon" />
                <span className={`cartAlert ${!itemInCart && "noItem"}`}>
                  {itemInCart}
                </span>
              </a>
              <a className="iconLink" href="/#">
                <span id="language" className="icon" />
              </a>
            </aside>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
