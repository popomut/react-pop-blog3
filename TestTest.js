import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-mde/lib/styles/css/react-mde-all.css";
import firebase from "./firebase/Firebase";
import MarkdownRenderer from "./MarkdownRenderer";

//source page: https://www.npmjs.com/package/react-mde
//https://codesandbox.io/s/vm1k17ymq0

const initialState = {
  value: "",
  coverFileURL: ""
};

class TestTest extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  getData(e) {
    var stateObject = this;
    var id = this.props.match.params.id;

    //anonymouse authentication

    var storage = firebase.storage();
    var picName = "cover_1576122797153";

    storage
      .ref("cover_images/" + picName)
      .getDownloadURL()
      .then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        console.log("url= " + url);
      })
      .catch(function(error) {
        // Handle any errors
      });

    /*
        storage
          .child("cover_images/cover_1576122797153")
          .getDownloadUrl.then(function(url) {
            this.setState({
              coverFileURL: url
            });

            console.log("url" + url);


          })
          .catch(function(error) {
            // Handle any errors
          });
          */

    console.log("id : " + id);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    //classes = useStyles();

    return (
      <div>
        <br />
        <br />
        <br />
        Show Article test test
      </div>
    );
  }
}

export default TestTest;
