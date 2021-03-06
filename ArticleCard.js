import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-mde/lib/styles/css/react-mde-all.css";
import firebase from "./firebase/Firebase";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import windowSize from "react-window-size";

//source page: https://www.npmjs.com/package/react-mde
//https://codesandbox.io/s/vm1k17ymq0

const initialState = {
  value: "",
  coverFileURL: ""
};

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  bigCard: {
    maxWidth: 600
  },
  media: {
    height: 140
  },
  bigMedia: {
    height: 250
  }
});

class ArticleCard extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClickCard = this.handleClickCard.bind(this);
    this.getCoverImage = this.getCoverImage.bind(this);
  }

  handleClickCard(id) {
    //alert(id);
    this.props.history.push("/showArticle/" + id);
  }

  componentDidMount() {}

  async getCoverImage(coverFileName, mediaCount) {
    var storage = firebase.storage();

    storage
      .ref("cover_images/" + coverFileName)
      .getDownloadURL()
      .then(function(url) {
        /*
        articleCardObject.setState({
          coverFileURL: url
        });
        */

        //document.getElementById(count).style.background-image = url;
        //this.cardMedia.current.style.background-image = url;

        var cardRef = document.getElementById(mediaCount);
        cardRef.style.backgroundImage = "url(" + url + ")";

        console.log("url= " + url);
      })
      .catch(function(error) {
        console.log(error);
        // Handle any errors
      });
  }

  render() {
    //classes = useStyles();

    var dataEntries = this.props.data;

    const { classes } = this.props;

    var articleCardObject = this;

    const items = [];
    var count = 0;
    var mediaCount = "media0";
    for (var key in dataEntries) {
      count = count + 1;
      mediaCount = "media" + count;
      console.log("count = " + count);
      console.log("test test =====================================");
      console.log("key " + key);
      //console.log(dataEntries.length);

      //this.getCoverImage(dataEntries[key].coverFileName, mediaCount);

      console.log("test end =====================================");

      //var imageInBase64 ="https://firebasestorage.googleapis.com/v0/b/ng-blog-3d3e9.appspot.com/o/cover_images%2F" +dataEntries[key].coverFileName;
      //console.log(test);

      if (this.props.windowWidth < 400) {
        //this is to skip showing bigcard for small device, show it as smallcard.
        count = count + 100;
        mediaCount = "media" + count;
      }

      this.getCoverImage(dataEntries[key].coverFileName, mediaCount);

      if (count != 1) {
        items.push(
          <div
            id="card"
            class="card"
            key={count}
            onClick={this.handleClickCard.bind(this, dataEntries[key].key)}
          >
            <Card key={count} id={count} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  id={mediaCount}
                  className={classes.media}
                  image={this.state.coverFileURL}
                  title={dataEntries[key].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {dataEntries[key].title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {dataEntries[key].description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <div>
                  <Link to="/showArticle" className="btn btn-primary">
                    Read
                  </Link>
                </div>
              </CardActions>
            </Card>
          </div>
        );
      } else {
        items.push(
          <div
            id="card"
            class="bigCard"
            key={count}
            onClick={this.handleClickCard.bind(this, dataEntries[key].key)}
          >
            <Card key={count} id={count} className={classes.bigCard}>
              <CardActionArea>
                <CardMedia
                  id={mediaCount}
                  className={classes.bigMedia}
                  image={this.state.coverFileURL}
                  title={dataEntries[key].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {dataEntries[key].title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {dataEntries[key].description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <div>
                  <Link to="/showArticle" className="btn btn-primary">
                    Read
                  </Link>
                </div>
              </CardActions>
            </Card>
          </div>
        );
      }
    }

    return (
      <div id="dataDiv" align="center">
        {items}
      </div>
    );
  }
}

//export default ArticleCard;

export default windowSize(
  withRouter(withStyles(styles, { withTheme: true })(ArticleCard))
);
