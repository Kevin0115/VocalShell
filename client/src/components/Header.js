import React, { Component } from 'react';
import '../App.css';
// import icon from '../images/speaker_icon.png';

class Header extends Component {
  render() {
    return (
      <div className="header-content">
        <h1><span className="bold">>&nbsp;</span>VocalShell</h1>
        <div className="app-logo">
						{/* <img src={ icon }></img> */}
				</div>
      </div>
    );
  }
}

export default Header;