import { AR } from "expo";
import React from "react";
import { GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from "expo-three";
import * as ThreeAR from "expo-three-ar";
import TouchableView from "./TouchableView";
import {
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Button,
  Text
} from "native-base";
import { Mesh, MeshPhongMaterial, NormalBlending, PointLight } from "three";
import Firebase from "../../../config/Firebase";
import { withNavigation } from "react-navigation";
class ARChallenge extends React.Component {
  state = {
    points: 0,
    count: 0
  };
  async getUser() {
    await Firebase.database()
      .ref("/User")
      .child(Firebase.auth().currentUser.uid) // Select Feedbacktable with UID and timestamp as PRI KEY
      .update({ Points: this.state.points }) // Insert values into table
      .then(this.props.navigation.navigate("App")) // Post success navigate to HomePage
      .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch insert data errors
  }
  render() {
    console.disableYellowBox = true;
    // Setup a basic Graphics View and wrap it in a touchable view that simplifies PanResponder
    return (
      <React.Fragment>
        <TouchableView
          style={{ flex: 1, backgroundColor: "orange" }}
          shouldCancelWhenOutside={false}
          onTouchesBegan={this.clickArtifact}
        >
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("App")}
              >
                <Icon name="arrow-back"></Icon>
              </Button>
            </Left>
            <Body>
              <Title>AR</Title>
            </Body>
            <Right></Right>
          </Header>
          <GraphicsView
            style={{ flex: 1 }}
            onContextCreate={this.onContextCreate}
            onRender={this.onRender}
            onResize={this.onResize}
            arTrackingConfiguration={AR.TrackingConfiguration.World}
            isArEnabled
            isArRunningStateEnabled
            isArCameraStateEnabled
          />
          <Text>Points: {this.state.points}</Text>
        </TouchableView>
      </React.Fragment>
    );
  }

  /*
    Standard AR setup
  */
  onContextCreate = async ({ gl, scale, width, height }) => {
    // Get horizontal plane data
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);

    // Basic Three Renderer with polyfill for expo-three
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      width,
      height,
      pixelRatio: scale
    });

    this.scene = new THREE.Scene();
    // Add the camera stream to the background of the scene
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    // Create an AR Camera that updates with the device position
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
    // Add an equal lighting to the scene
    this.scene.add(new THREE.AmbientLight(0xdddddd));

    // Add a light to give depth to the scene
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  };

  createArtifact = async rand => {
    const model = {
      "coin.obj": require("../../Assets/coin.obj"),
      "coin.mtl": require("../../Assets/coin.mtl")
    };
    const empty = {
      "empty.obj": require("../../Assets/trash.obj"),
      "empty.mtl": require("../../Assets/trash.mtl")
    };
    const bag = {
      "bag.obj": require("../../Assets/bg.obj"),
      "bag.mtl": require("../../Assets/bg.mtl")
    };
    var mesh;
    // console.log(rand);
    if (rand === 1) {
      mesh = await ExpoTHREE.loadAsync(
        [model["coin.obj"], model["coin.mtl"]],
        null,
        name => model[name]
      );
      this.setState({ points: this.state.points + 1 });
    } else if (rand === 2) {
      mesh = await ExpoTHREE.loadAsync(
        [empty["empty.obj"], empty["empty.mtl"]],
        null,
        name => empty[name]
      );
    } else if (rand === 3) {
      mesh = await ExpoTHREE.loadAsync(
        [bag["bag.obj"], bag["bag.mtl"]],
        null,
        name => bag[name]
      );
      this.setState({ points: this.state.points + 1 });
    } else {
      mesh = await ExpoTHREE.loadAsync(
        [empty["empty.obj"], empty["empty.mtl"]],
        null,
        name => empty[name]
      );
    }
    ExpoTHREE.utils.scaleLongestSideToSize(mesh, 0.25);
    this.scene.add(mesh);
    this.mesh = mesh;
    // console.log(this.state.points);
  };

  onResize = ({ x, y, scale, width, height }) => {
    // When the phone resizes, we update the camera aspect ratio, and change the renderer
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {
    // Update the renderer with the scene and camera
    if (this.mesh != null) {
      this.mesh.rotation.y += 1.4 * delta;
      this.mesh.rotation.x += 1.4 * delta;
      // setTimeout(function(){this.scene.remove(this.mesh)},3000);
    }
    if (this.state.points <= 5 && this.state.count <= 5) {
      // console.log(this.state.points);
      this.renderer.render(this.scene, this.camera);
    } else {
      this.getUser();
    }
  };
  /*
    End Standard AR setup
  */
  getRandom = () => {
    result = Math.floor(Math.random() * 4);
    // console.log(result);
    return result;
  };

  // Called when `onPanResponderGrant` is invoked.
  clickArtifact = async ({ locationX: x, locationY: y }) => {
    if (!this.renderer) {
      return;
    }

    // Get the size of the renderer
    const size = this.renderer.getSize();

    // Invoke the native hit test method
    const { hitTest } = await AR.performHitTest(
      {
        x: x / size.width,
        y: y / size.height
      },
      // Result type from intersecting a horizontal plane estimate, determined for the current frame.
      AR.HitTestResultTypes.HorizontalPlane
    );

    // Traverse the test results
    for (let hit of hitTest) {
      const { worldTransform } = hit;
      // If we've already placed a cube, then remove it
      if (this.mesh) {
        this.scene.remove(this.mesh);
      }
      this.state.count += 1;

      var rand = this.getRandom();
      await this.createArtifact(rand);
      /* 
      Parse the matrix array: ex: 
        [
          1,0,0,0,
          0,1,0,0,
          0,0,1,0,
          0,0,0,1
        ]
      */
      const matrix = new THREE.Matrix4();
      matrix.fromArray(worldTransform);

      // Manually update the matrix
      this.mesh.applyMatrix(matrix);
      this.mesh.updateMatrix();
    }
  };
}

export default withNavigation(ARChallenge);
