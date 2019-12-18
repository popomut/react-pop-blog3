import React, { Component } from "react";
import ReactDOM from "react-dom";

const initialState = {
  value: ""
};

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {}

  render() {
    //classes = useStyles();

    return (
      <div>
        <ul>
          <li>
            <a class="active" href="#home">
              Home
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default TopNav;
