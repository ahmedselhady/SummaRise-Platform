import TransparentButton from "../Button/TransparentButton";
import RoundedButton from "../Button/RoundedButton";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(porps) {
  return (
    <Fragment style={{ height: "100%" }}>
      <header className="toolbar">
        <nav className="toolbar-nav">
          <div className="toolbar-logo">
            <a href="/"> THE LOGO</a>
          </div>
          <div className="toolbar-separator"></div>
          <div className="toolbar-navigation-items">
            <ul>
              <li>
                <TransparentButton displayText="Help" textColor="skyblue" />
              </li>

              <Link to="/user">
                <li>
                  <RoundedButton
                    displayText="Sign In"
                    borderColor="skyblue"
                    backgroundColor="transparent"
                    textColor="skyblue"
                  />
                </li>
              </Link>

              <li>
                <RoundedButton
                  displayText="Register"
                  borderColor="skyblue"
                  backgroundColor="transparent"
                  textColor="skyblue"
                />
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* <SideDrawer /> */}
    </Fragment>
  );
  // <nav className="nav-wrapper grey darken-3">
  //     <div className="container">
  //         Data
  //     </div>
  // </nav>
  //     <div class="navbar-fixed">
  //       {/* <nav>
  //         <div class="nav-wrapper">
  //           <a href="#" class="brand-logo">
  //             Logo
  //           </a>
  //           <ul id="nav-mobile" class="right hide-on-med-and-down">
  //             <li>
  //               <a href="sass.html">Sass</a>
  //             </li>
  //             <li>
  //               <a href="badges.html">Components</a>
  //             </li>
  //             <li>
  //               <a href="collapsible.html">JavaScript</a>
  //             </li>
  //           </ul>
  //         </div>
  //       </nav> */}
  //       {/* <nav>
  //         <div class="nav-wrapper">
  //           <a href="#!" class="brand-logo">
  //             Logo
  //           </a>
  //           <a href="#" data-target="mobile-demo" class="sidenav-trigger">
  //             <i class="material-icons">menu</i>
  //           </a>
  //           <ul class="right hide-on-med-and-down">
  //             <li>
  //               <a href="sass.html">Sass</a>
  //             </li>
  //             <li>
  //               <a href="badges.html">Components</a>
  //             </li>
  //             <li>
  //               <a href="collapsible.html">Javascript</a>
  //             </li>
  //             <li>
  //               <a href="mobile.html">Mobile</a>
  //             </li>
  //           </ul>
  //         </div>
  //       </nav> */}

  //       <ul class="sidenav" id="mobile-demo">
  //         <li>
  //           <a href="sass.html">Sass</a>
  //         </li>
  //         <li>
  //           <a href="badges.html">Components</a>
  //         </li>
  //         <li>
  //           <a href="collapsible.html">Javascript</a>
  //         </li>
  //         <li>
  //           <a href="mobile.html">Mobile</a>
  //         </li>
  //       </ul>
  //     </div>
  //   );
}

export default Navbar;
