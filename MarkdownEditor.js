import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import TextField from "@material-ui/core/TextField";
import firebase from "./firebase/Firebase";
import FileBase64 from "react-file-base64";

//Import npm react-filepond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// FilePond Register plugin
import FilePondImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondImagePreview);

//source page: https://www.npmjs.com/package/react-mde
//https://codesandbox.io/s/vm1k17ymq0

const initialState = {
  title: "",
  description: "",
  value: "**Hello world!!!**",
  tab: "write",
  files: []
};

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleFilePondInit() {
    // handle init file upload here
    console.log("now initialised", this.pond);
  }

  handleFilePondProcessing(
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort
  ) {
    // handle file upload here
    console.log(" handle file upload here");
    console.log(file);

    const fileUpload = file;
    const storageRef = firebase.storage().ref(`cover_images/${file.name}`);
    const task = storageRef.put(fileUpload);

    task.on(
      `state_changed`,
      snapshort => {
        console.log("uploading... " + snapshort.bytesTransferred, snapshort.totalBytes);
        let percentage =
          (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
        //Process
        this.setState({
          uploadValue: percentage
        });
      },
      error => {
        //Error
        this.setState({
          messag: `Upload error : ${error.message}`
        });
      },
      () => {
        //Success
        console.log("upload success.");
        this.setState({
          messag: `Upload Success`,
          picture: task.snapshot.downloadURL //เผื่อนำไปใช้ต่อในการแสดงรูปที่ Upload ไป
        });
      }
    );
  }

  handleValueChange = e => {
    this.setState({
      value: e
    });
  };

  handleTabChange = tab => {
    this.setState({
      tab: tab
    });
  };

  handleTitleChange = title => {
    this.setState({
      title: title.target.value
    });
  };

  handleDescriptionChange = description => {
    this.setState({
      description: description.target.value
    });
  };

  handleImagePickerChange = image => {
    this.setState({
      image: image.target.value
    });
  };

  handleImagePickerError = e => {
    console.log(e);
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.files.length == 0) {
      alert("please select a cover image");
      return;
    }

    var title = this.state.title;
    var value = this.state.value;
    var files = this.state.files;
    var createDate = new Date().getTime();
    var description = this.state.description;

    //anonymouse authentication
    firebase
      .auth()
      .signInAnonymously()
      .then(function() {
        firebase
          .database()
          .ref("myblog")
          .push({
            title,
            description,
            value,
            files,
            createDate
          })
          .then(data => {
            //success callback
            console.log("data ", data);
          })
          .catch(error => {
            //error callback
            console.log("error ", error);
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
  };

  getFiles(files) {
    console.log(files);
    console.log(files[0].name);
    console.log(files[0].base64);

    this.setState({ files: files });
  }

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Add an article</h3>
          </div>
          <form name="myform" onSubmit={this.onSubmit}>
            <TextField
              id="title"
              className="textField"
              onChange={this.handleTitleChange}
              label="What is article title? Put it here please."
              margin="normal"
              variant="outlined"
            />

            <br />
            <br />

            <FileBase64
              id="fileSelector"
              multiple={true}
              onDone={this.getFiles.bind(this)}
            />

            {/* Pass FilePond properties as attributes */}
            <FilePond
              allowMultiple={true}
              maxFiles={3}
              ref={ref => (this.pond = ref)}
              server={{ process: this.handleFilePondProcessing.bind(this) }}
              oninit={() => this.handleFilePondInit()}
            >
              {/* Set current files using the <File/> component */}
              {this.state.files.map(file => (
                <File key={file} source={file} />
              ))}
            </FilePond>

            <br />
            <br />

            <TextField
              id="description"
              label="What is title description? put it here please."
              multiline
              rows="4"
              defaultValue=""
              className="textField"
              onChange={this.handleDescriptionChange}
              margin="normal"
              variant="filled"
            />

            <br />
            <br />

            <ReactMde
              onChange={this.handleValueChange}
              onTabChange={this.handleTabChange}
              value={this.state.value}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
              selectedTab={this.state.tab}
            />

            <br />

            <button type="submit" class="btn btn-success">
              Post Article
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
