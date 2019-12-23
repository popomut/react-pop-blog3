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
    this.OrganizeObjectArray = this.OrganizeObjectArray.bind(this);
  }

  OrganizeObjectArray(objArray) {
    const object1 = {
      aaa: { color1: "pink1", color2: "red" },
      bbb: { color1: "pink2", color2: "red" },
      ccc: { color1: "pink3", color2: "red" },
      ddd: { color1: "pink4", color2: "red" }
    };

    console.log(Object.keys(objArray));
    console.log(Object.values(objArray));

    var key1 = Object.keys(objArray);
    var value1 = Object.values(objArray);
    var object2 = {};

    var i = 0;
    for (i = 0; i < value1.length; i++) {
      value1[i]["key"];
      value1[i]["key"] = key1[i];
    }

    console.log("OrganizeObjectArray");
    console.log(value1);
    return value1;

    // expected output: Array ["a", "b", "c"]
  }

  //DESC sort
  sortByKey(array, key) {
    //alert('sort method');

    var newArrayDataOfOjbect = this.OrganizeObjectArray(array);

    //var newArrayDataOfOjbect = Object.values(array);

    console.log(newArrayDataOfOjbect);
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
          .limitToLast(20)
          .orderByChild("createDate")
          .once("value")
          .then(snapshot => {
            const key2 = snapshot.key;
            var val2 = snapshot.val();

            console.log("print val");
            console.log(val2);
            //need to sort result to be DESC
            //https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
            val2 = stateObject.sortByKey(val2, "createDate");

            console.log("after soring by key");

            console.log(val2);

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
