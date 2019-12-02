import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-mde/lib/styles/css/react-mde-all.css";
import firebase from "./firebase/Firebase";
import MarkdownRenderer from "./MarkdownRenderer";

//source page: https://www.npmjs.com/package/react-mde
//https://codesandbox.io/s/vm1k17ymq0

const initialState = {
  value: ""
};

class ShowArticle extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  getData(e) {

    var stateObject = this;
    var id = this.props.match.params.id;

    //anonymouse authentication
    firebase
      .auth()
      .signInAnonymously()
      .then(function() {
        firebase
          .database()
          .ref("myblog/" + id)
          .once("value")
          .then(snapshot => {
            const key = snapshot.key;
            const val = snapshot.val();
            //alert(val.value);
            console.log(val.value);

            stateObject.setState({
              value: val.value
            });
          })
          .catch(e => {
            console.log("Error fetching data", e);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("login error");
        console.log(errorCode);
        console.log(errorMessage);
      });

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
        Show Article
        <MarkdownRenderer data={this.state.value} />
      </div>
    );
  }
}

export default ShowArticle;
