import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-mde/lib/styles/css/react-mde-all.css";
import firebase from "./firebase/Firebase";
import ArticleCard from "./ArticleCard";

//source page: https://www.npmjs.com/package/react-mde
//https://codesandbox.io/s/vm1k17ymq0

const initialState = {
  value: ""
};

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.sortByKey = this.sortByKey.bind(this);
  }

  //DESC sort
  sortByKey(array, key) {
    //alert('sort method');

    var newArrayDataOfOjbect = Object.values(array);
    return newArrayDataOfOjbect.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return (x < y ? -1 : x > y ? 1 : 0) * -1;
    });
  }

  getData(e) {
    //anonymouse authentication

    var stateObject = this;
    console.log("state object" + stateObject);
    firebase
      .auth()
      .signInAnonymously()
      .then(function() {
        console.log("aaaaaaaaaaaaaaaa");
        //get data from firebase
        firebase
          .database()
          .ref("myblog")
          .limitToLast(9)
          .orderByChild("createDate")
          .once("value")
          .then(snapshot => {
            const key2 = snapshot.key;
            const val2 = snapshot.val();

            console.log("print val");
            console.log(val2);
            //need to sort result to be DESC
            //https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
            //val = this.sortByKey(val, 'createDate');

            stateObject.setState({
              value: val2
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
        <ArticleCard data={this.state.value} />
      </div>
    );
  }
}

export default MainPage;
