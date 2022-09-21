import React, { Component } from "react";
// import Clarifai from "clarifai";
import "./App.css";

//components
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      imageBoxRegion: [],
      route: "signin",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  // componentDidMount() {
  //   fetch(process.env.REACT_APP_LOCAL_BASE_URL)
  //     .then((resp) => resp.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log("error: ", error));
  // }

  calculateFaceBoxLocation = (data) => {
    console.log("clarifai: ", data);
    const clarifaiFace = data;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFace.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
  };

  displayFaceBox = (box) => {
    this.setState({ imageBoxRegion: box });
  };

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  clarifaiIndexingData = (data) => {
    return data.outputs[0].data.regions.map((boxRegion) => {
      return {
        id: boxRegion.id,
        ...boxRegion.region_info.bounding_box,
      };
    });
  };

  onSubmit = () => {
    const MODEL_ID = "face-detection";
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: process.env.REACT_APP_USER_ID,
        app_id: process.env.REACT_APP_APPLICATION_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    this.setState({
      imageUrl: IMAGE_URL,
    });

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + process.env.REACT_APP_CLARIFAI_KEY,
      },
      body: raw,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          fetch(process.env.REACT_APP_LOCAL_BASE_URL + "/image", {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((resp) => resp.json())
            .then((data) =>
              this.setState(
                Object.assign(this.state.user, { entries: data.entries })
              )
            );
        }
        this.displayFaceBox(
          this.calculateFaceBoxLocation(this.clarifaiIndexingData(res))
        );
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  loadUser = (user) => {
    console.log("user: ", user);
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
    // fetch(process.env.REACT_APP_LOCAL_BASE_URL + `/profile/${userId}`)
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //   })
    //   .catch((error) => {
    //     message.error("Failed to get user data");
    //   });
  };

  render() {
    return (
      <div className="App">
        <ParticleBackground />
        {this.state.route === "home" ? (
          <>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={this.state.imageBoxRegion}
              imageUrl={this.state.imageUrl}
            />
          </>
        ) : this.state.route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;