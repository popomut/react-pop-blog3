import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "./firebase/Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const initialState = {
  value: ""
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/addArticle",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

class SigninAddArticle extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {}

  render() {
    //classes = useStyles();

    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default SigninAddArticle;
