import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/site-logo.png";
import "./dashboardHeader.css";
export default class Example extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    const { ontoggleNav } = this.props;
    return (
      <div className='sidebar-container'>
        <Link to='/'>
          <img
            src={logo}
            alt=''
            style={{ marginTop: "10px", paddingLeft: "10px" }}
          />
        </Link>
        <div className='hmbger' onClick={ontoggleNav}>
          &#9776;
        </div>
      </div>
    );
  }
}
