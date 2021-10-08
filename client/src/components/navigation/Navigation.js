import React from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  StatusBar
} from "react-native";
import MapView from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Polyline from "@mapbox/polyline";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { withOrientation } from "react-navigation";
const GOOGLE_MAPS_APIKEY = "AIzaSyBBzmreXc_jGOKwuHe78CnsGDT_HDi8Dak";
import { withNavigation } from "react-navigation";
import { withNavContext } from "./navContent";
import HeaderLayout from "../layout/header";
let timer = {
  //Declare this outside of the class scope, can put directly under all the imports before "class Navigation extends React.Component"
  hours: 0,
  minutes: 0,
  seconds: 5,
  unmount_time: 0
};
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 1.29027,
        longitude: 103.851959,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      },
      location: null,
      errorMessage: null,
      startingLocation: {
        latitude: null,
        longitude: null
      },
      finalDestination: {
        latitude: null,
        longitude: null
      },
      tempStarting: {
        latitude: null,
        longitude: null
      },
      tempDestination: {
        latitude: null,
        longitude: null
      },
<<<<<<< HEAD
      SalterInputStatus: 0, // user starting location
      EalterInputStatus: 0, //user ending
=======
      SalterInputStatus : 0, // user starting location
      EalterInputStatus : 0, //user ending
>>>>>>> 1af34082fc44ae6aff51a38db722b5704ecd2207
      routeStatus: null,
      arrOfDirectionDetails: [], //store direction details of all routes
      arrOfPolyline: [],
      routeSelected: null,
      userRouteSelectionStatus: null, // null means user hasnt select route, any other value means user selected route
      routebox: null,
      allDetailsAcquired: null,
      stepByStepInstructionStatus: null,
      selectChallengeStatus: null,
      curMainInstruction: null,
      curSubInstruction: null,
      mainCount: 0,
      mainCoord: { latitude: null, longitude: null },
      subCount: 0,
      subCoord: { latitude: null, longitude: null },
      subSteps: [],
      transitDetails: null,
      currLocation: { latitude: null, longitude: null },
      cdTimer: timer,
      arrOfTime: [],
      timerInit: false,
      timeSelect: 0
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    // console.log(navigation.getParam("sel", "0"));
    timeSel = navigation.getParam("sel", "0");
    if (this.props.navProvider.start.Lat != null) {
      // console.log("TRUE");
      await this.setState({
        startingLocation: {
          latitude: this.props.navProvider.start.Lat,
          longitude: this.props.navProvider.start.Long
        },
        finalDestination: {
          latitude: this.props.navProvider.end.Lat,
          longitude: this.props.navProvider.end.Long
        },
        arrOfDirectionDetails: this.props.navProvider.directDetails,
        arrOfPolyline: this.props.navProvider.polyLine,
        routeSelected: this.props.navProvider.route_selected,
        allDetailsAcquired: 1,
        userRouteSelectionStatus: 1,
        arrOfTime: this.props.navProvider.time
      });
      if (timeSel === 1) {
        console.log("inside timer challenge");
        await this.setState({ timeSelect: 1 });
        if (!this.state.timerInit) {
          //Timer has not been initialised
          var expected_time =
            this.state.arrOfTime[this.state.routeSelected] - 2; // expected_time is in mins
          console.log(this.state.arrOfTime[this.state.routeSelected]);
          if (expected_time >= 60) {
            this.setState({
              cdTimer: {
                hours: Math.floor(expected_time / 60),
                minutes: expected_time - Math.floor(expected_time / 60) * 60,
                seconds: 0,
                unmount_time: this.state.cdTimer.unmount_time
              }
            });
          } else {
            this.setState({
              cdTimer: {
                hours: 0,
                minutes: expected_time,
                seconds: 0,
                unmount_time: this.state.cdTimer.unmount_time
              }
            });
          }
          this.setState({ timerInit: true });
        }
        var diff = 0;
        if (this.state.unmount_time == 0) {
          diff = 0;
        } else {
          diff = (Date.now() - this.state.cdTimer.unmount_time) / 1000;
        }
        console.log(diff);
        this.setState({
          cdTimer: {
            hours: this.state.cdTimer.hours - Math.floor(diff / (60 * 60)),
            minutes: this.state.cdTimer.minutes - Math.floor(diff / 60),
            seconds: this.state.cdTimer.seconds - Math.floor(diff),
            unmount_time: this.state.cdTimer.unmount_time
          }
        });
        console.log(JSON.stringify(this.state.cdTimer));
        //START TIMER
        this.myInterval = setInterval(() => {
          const { hours, seconds, minutes } = this.state.cdTimer;
          if (seconds > 0) {
            this.setState({
              cdTimer: {
                hours: this.state.cdTimer.hours,
                minutes: this.state.cdTimer.minutes,
                seconds: this.state.cdTimer.seconds - 1,
                unmount_time: this.state.cdTimer.unmount_time
              }
            });
          }
          if (seconds <= 0) {
            if (minutes <= 0) {
              if (hours <= 0) {
                //TIMES UP
                clearInterval(this.myInterval);
                alert("Time Challenge Failed", [{ text: "OK" }], {
                  cancelable: false
                });
              } else {
                this.setState({
                  cdTimer: {
                    hours: this.state.cdTimer.hours - 1,
                    minutes: 59,
                    seconds: 59,
                    unmount_time: this.state.cdTimer.unmount_time
                  }
                });
              }
            } else {
              this.setState({
                cdTimer: {
                  hours: this.state.cdTimer.hours,
                  minutes: this.state.cdTimer.minutes - 1,
                  seconds: 59,
                  unmount_time: this.state.cdTimer.unmount_time
                }
              });
            }
          }
        }, 1000);
      } else {
        //console.logconsole.log("NOBODY");
      }
      // console.log(this.props.navProvider.timeSel);
      // console.log(this.state.startingLocation.latitude);

      this.startNavigation();
      this.displayFinalRouteV2();
    }
  };
  componentWillUnmount() {
    // To keep the timer correct even if user change page
    clearInterval(this.myInterval);
    timer = this.state.cdTimer;
    timer.unmount_time = Date.now();
  }
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  error(err) {
    // error function for if get current position failed
    alert(
      "Unable to get current location. Please turn on GPS or check connection.",
      [{ text: "OK" }],
      { cancelable: false }
    );
  }

  success = async pos => {
    // function is called everytime current lat long is updated
    var crd = pos.coords; // current location
    var count = this.state.mainCount; // the current MAIN instruction index
    var subCount = this.state.subCount; // the current SUB instruction index (only used when transit mode= WALKING)
    this.setState({
      currLocation: {
        latitude: crd.latitude,
        longitude: crd.longitude
      }
    });

    if (
      this.state.curMainInstruction !=
      this.state.arrOfDirectionDetails[this.state.routeSelected][count]
        .html_instructions
    ) {
      // update Main instruction using current instruction index
      this.setState({
        curMainInstruction: this.state.arrOfDirectionDetails[
          this.state.routeSelected
        ][count].html_instructions
      });
    }

    if (!this.nearEnding(crd)) {
      // If not near the FINAL destination
      if (
        this.state.mainCoord.latitude !=
          this.state.arrOfDirectionDetails[this.state.routeSelected][count]
            .end_location.lat &&
        this.state.mainCoord.longitude !=
          this.state.arrOfDirectionDetails[this.state.routeSelected][count]
            .end_location.lng
      )
        // Update end point of current MAIN instruction
        this.setState({
          mainCoord: {
            latitude: this.state.arrOfDirectionDetails[
              this.state.routeSelected
            ][count].end_location.lat,
            longitude: this.state.arrOfDirectionDetails[
              this.state.routeSelected
            ][count].end_location.lng
          }
        });

      if (
        this.state.arrOfDirectionDetails[this.state.routeSelected][count]
          .travel_mode == "WALKING"
      ) {
        // if transit mode=WALKING
        if (
          this.state.subSteps !=
          this.state.arrOfDirectionDetails[this.state.routeSelected][count]
            .steps
        ) {
          //Update the SUB instructions array
          this.setState({
            subSteps: this.state.arrOfDirectionDetails[
              this.state.routeSelected
            ][count].steps
          });
        }

        if (!this.near(crd, this.state.mainCoord)) {
          // if not near the destination of CURRENT MAIN instruction
          if (
            this.state.subCoord.latitude !=
              this.state.subSteps[subCount].end_location.lat &&
            this.state.subCoord.longitude !=
              this.state.subSteps[subCount].end_location.lng
          ) {
            // Update end point of sub instruction
            this.setState({
              subCoord: {
                latitude: this.state.subSteps[subCount].end_location.lat,
                longitude: this.state.subSteps[subCount].end_location.lng
              }
            });
          }

          if (!this.near(crd, this.state.subCoord)) {
            // if not near the destination of CURRENT SUB instruction
            if (
              this.state.curSubInstruction !=
              this.state.subSteps[subCount].html_instructions
            ) {
              // Update SUB instruction to be displayed
              this.setState({
                curSubInstruction: this.state.subSteps[subCount]
                  .html_instructions
              });
            }
          } else {
            // else move to next SUB instruction
            this.setState({ subCount: this.state.subCount + 1 });
            this.setState({
              curSubInstruction: this.state.subSteps[this.state.subCount]
                .html_instructions
            });
          }
        } else {
          // else move to next MAIN instruction
          this.setState({ mainCount: this.state.mainCount + 1 });
          this.setState({
            curMainInstruction: this.state.arrOfDirectionDetails[
              this.state.routeSelected
            ][this.state.mainCount].html_instructions
          });
        }
      } else if (
        this.state.arrOfDirectionDetails[this.state.routeSelected][count]
          .travel_mode == "TRANSIT"
      ) {
        // else if transit mode= TRANSIT (aka bus or mrt)
        if (!this.near(crd, this.state.mainCoord)) {
          // if not near the destination of CURRENT MAIN instruction
          if (
            this.state.transitDetails !=
            this.state.arrOfDirectionDetails[this.state.routeSelected][count]
              .transit_details
          ) {
            this.setState({
              transitDetails: this.state.arrOfDirectionDetails[
                this.state.routeSelected
              ][count].transit_details
            });
          }

          if (
            this.state.curSubInstruction !=
            "Take " +
              this.state.transitDetails.line.name +
              " to " +
              this.state.transitDetails.arrival_stop.name
          ) {
            // Update SUB instruction to be displayed
            this.setState({
              curSubInstruction:
                "Take " +
                this.state.transitDetails.line.name +
                " to " +
                this.state.transitDetails.arrival_stop.name
            });
          }
        } else {
          // else move to next MAIN instruction
          this.setState({ mainCount: this.state.mainCount + 1 });
          this.setState({
            curMainInstruction: this.state.arrOfDirectionDetails[
              this.state.routeSelected
            ][this.state.mainCount].html_instructions
          });
        }
      }
    } else {
      //WHAT HAPPENS WHEN NAVIGATION DONE
      navigator.geolocation.stopObserving(); // STOP LISTENING FOR CURRENT POSITION
      timeSelect = navigation.getParam("sel", "0");
      if (timeselect === 1) {
        var user_points = 0;
        await Firebase.database()
          .ref("/User/" + Firebase.auth().currentUser.uid)
          .once("value", snapshot => {
            user_points = snapshot.val().Points;
          });
        user_points += 100;
        Firebase.database()
          .ref("/User")
          .child(Firebase.auth().currentUser.uid) // Select Feedbacktable with UID and timestamp as PRI KEY
          .update({ Points: user_points }) // Insert values into table
          .then(this.createTransaction(selectedObj)) // Post success navigate to HomePage
          .catch(error =>
            alert(error, [{ text: "OK" }], { cancelable: false })
          ); // Catch insert data errors
      }
      this.props.navigation.navigate("FeedbackS");
    }
  };

  stripHTML(text) {
    // remove html tags from SUB instruction
    if (text == null) {
      text = "";
    }
    return text.replace(/<.*?>/gm, "");
  }

  startNavigation() {
    console.log("Starting Navigation");
    this.setState({ allDetailsAcquired: 1 });
    navigator.geolocation.watchPosition(this.success, this.error, this.options);
  }

  nearEnding(cur) {
    //Check the current lat long to see if user is within 10m radius of final destination, if yes return true, else return false
    // get current lat long and set to state.curLat and state.curLong
    if (
      cur.latitude - this.state.finalDestination.latitude <= 0.00005 &&
      cur.latitude - this.state.finalDestination.latitude >= -0.00005
    ) {
      if (
        cur.longitude - this.state.finalDestination.longitude <= 0.00005 &&
        cur.longitude - this.state.finalDestination.longitude >= -0.00005
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  near(cur, dest) {
    //Check the current lat long to see if user is within 10m radius of provided point, if yes return true, else return false
    if (
      cur.latitude - dest.latitude <= 0.00005 &&
      cur.latitude - dest.latitude >= -0.00005
    ) {
      if (
        cur.longitude - dest.longitude <= 0.00005 &&
        cur.longitude - dest.longitude >= -0.00005
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    //console.log(location);
  };

  updateDisplayRouteStatus() {
    this.setState({ routeStatus: 1 });
  }

  updateUser(index) {
    this.setState({ userRouteSelectionStatus: 1 });
    this.props.navProvider.setSelect(index);
    this.setState({ routeSelected: index });
  }

  resetRouteSelectionStatus() {
    //console.log('entered reset route selection status function')
    this.setState({ arrOfPolyline: [] });
    this.setState({ routeStatus: null });
    this.setState({ selectChallengeStatus: null });
    this.setState({ userRouteSelectionStatus: null }); //when user click on button set seleection status to 0 so route options will be displayed again after generation new route
    this.setState({ arrOfDirectionDetails: [] }); // clear past direction details when user select generate route with new  starting/ending location
    // clear past poly lines when user has selected new routes
    //console.log("everything has been reset");
  }

  async resetAllRouteInfo() {
    this.setState({
      startingLocation: {
        latitude: null,
        longitude: null
      }
    });
    this.setState({
      finalDestination: {
        latitude: null,
        longitude: null
      }
    });
    this.setState({
      tempStarting: {
        latitude: null,
        longitude: null
      }
    });
    this.setState({
      tempDestination: {
        latitude: null,
        longitude: null
      }
    });
    this.setState({ arrOfPolyline: [] });
    this.setState({ routeStatus: null });
    this.setState({ selectChallengeStatus: null });
    this.setState({ userRouteSelectionStatus: null });
    this.setState({ arrOfDirectionDetails: [] });
  }

  updateChallengeSelectionStatus() {
    this.setState({ selectChallengeStatus: 1 });
  }

  async onDirectionBtnPress() {
    //set new poly routes and directions and store into array //reset route selection status back to 0 --> so user will be prompted to route selection screen //set new final & start destination
<<<<<<< HEAD
    if (
      this.wordChangedStatus == 1 &&
      (this.state.EalterInputStatus == 1 || this.state.SalterInputStatus == 1)
    ) {
      //if user click on locatoin than erase, it will validate
      return alert("Have to click on address provided by autocomplete");
    }
    if (
      this.state.tempStarting.latitude == null ||
      this.state.tempStarting.longitude == null
    ) {
      return alert(
        "Starting Location is a required field, Please select an address provided by autocomplete"
      );
    } else if (
      this.state.tempDestination.latitude == null ||
      this.state.tempDestination.longitude == null
    ) {
      return alert(
        "Destination is a required field, Please select an address provided by autocomplete"
      );
=======
    if (this.wordChangedStatus ==1 && (this.state.EalterInputStatus == 1 || this.state.SalterInputStatus ==1)) //if user click on locatoin than erase, it will validate
    {
      return (alert('Have to click on address provided by autocomplete'))
    }
    if (this.state.tempStarting.latitude == null || this.state.tempStarting.longitude == null ) {
      return (alert('Starting Location is a required field, Please select an address provided by autocomplete'))
    }
    else if (this.state.tempDestination.latitude == null || this.state.tempDestination.longitude == null) {
      return (alert('Destination is a required field, Please select an address provided by autocomplete'))
>>>>>>> 1af34082fc44ae6aff51a38db722b5704ecd2207
    }

    await this.setState({
      startingLocation: {
        latitude: this.state.tempStarting.latitude,
        longitude: this.state.tempStarting.longitude
      },
      finalDestination: {
        latitude: this.state.tempDestination.latitude,
        longitude: this.state.tempDestination.longitude
      }
    });
    //ANCHOR  Context Adding.
    this.props.navProvider.setStart(
      this.state.tempStarting.latitude,
      this.state.tempStarting.longitude
    );
    this.props.navProvider.setEnd(
      this.state.tempDestination.latitude,
      this.state.tempDestination.longitude
    );
    //ANCHOR /*End Context  */
    await this.resetRouteSelectionStatus();
    await this.getDirections(
      this.state.startingLocation.latitude +
        "," +
        this.state.startingLocation.longitude,
      this.state.finalDestination.latitude +
        "," +
        this.state.finalDestination.longitude
    );
  }

  async getDirections(startLoc, destinationLoc) {
    //set new poly route & direction instruction and store into array
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyBBzmreXc_jGOKwuHe78CnsGDT_HDi8Dak&mode=transit&alternatives=true`
    );
    let respJson = await resp.json();
    let routeDetails = respJson.routes;
    let tempPolyLineArray = []; //store temp array of polyroute coords to set state.polyrate equal to this
    let tempDirArrayRoute = []; //store all arrays of each route of instructions [ [route 1], [route 2], [route 3]]
    let tempTimeArray = []; //store all expected completion time of each route
    for (
      i = 0;
      i < routeDetails.length;
      i++ // respJson.routes = number of alternative routes available
    ) {
      let tempDirArray = []; // at every new route, initalize a temp direction array [ instr 1, instr 2, instr 3, instr 4]
      let points = Polyline.decode(respJson.routes[i].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      tempPolyLineArray.push(coords);

      tempTimeArray.push(
        Math.floor(routeDetails[i].legs[0].duration.value / 60)
      ); //Get the expected completion time for each route rounded to nearest minute
      for (
        k = 0;
        k < routeDetails[i].legs[0].steps.length;
        k++ // for each route go to the correct route, enter legs ( always 0), get the number of instruction for this route
      ) {
        //console.log (routeDetails[i].legs[0].steps[k])
        tempDirArray.push(routeDetails[i].legs[0].steps[k]); // push all instructions into temp direction array
        //this.state.arrOfDirectionDetails.push(routeDetails[i].legs[0].steps[k]); // for each instruction save it to array
      }
      tempDirArrayRoute.push(tempDirArray); // at the end of each route, push all instructions stored in temp array as an array into state
    }
    //console.log(tempTimeArray.length);
    this.setState({ arrOfDirectionDetails: tempDirArrayRoute });
    this.setState({ arrOfPolyline: tempPolyLineArray });
    this.setState({ arrOfTime: tempTimeArray });
    console.log(this.state.arrOfTime.length);
    //ANCHOR  Set Context
    this.props.navProvider.setPolyLine(tempPolyLineArray);
    this.props.navProvider.setDir(tempDirArrayRoute);
    this.props.navProvider.setTime(tempTimeArray);
    //END CONTEXT

    //creating my html tags for route options
    let data = [];
    let temptitle = "Route ";
    polyroutecolor = [
      "blue",
      "green",
      "red",
      "black",
      "orange",
      "purple",
      "pink"
    ];
    for (let j = 0; j < routeDetails.length; j++) {
      data.push(
        <View key={j} style={styles.challengepagebtn}>
          <TouchableOpacity onPress={() => this.updateUser(j)}>
            <Text style={styles.challengepagebtn}>
              <MaterialCommunityIcons
                name="checkbox-blank"
                color={polyroutecolor[j]}
              />{" "}
              {temptitle + j}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    this.setState({ routebox: data });
  }

  displaySearchBar() {
    return (
      <View style={styles.conStyle}>
        <HeaderLayout setHeader={"Navigation"} />
        <View style={styles.calloutView}>
          <GooglePlacesAutocomplete
            style={styles.innerContainer}
            placeholder="Starting Location"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed={false} // true/false/undefined false to make dropbar bar close
            fetchDetails={true} //return details when fetch = true
            renderDescription={row => row.description || row.vicinity} // allows current location button to be clicked
            textInputProps={{
<<<<<<< HEAD
              onChangeText: (inputDest, details = null) => {
                if (this.state.SalterInputStatus == 1) {
                  this.wordChangedStatus = 1;
                }
              }
            }}
            onPress={(data, details = null) => {
              datas = data;
              this.wordChangedStatus = 0;
              this.setState({ SalterInputStatus: 1 });
=======
              onChangeText : (inputDest, details = null) => {
                if (this.state.SalterInputStatus==1){
                 this.wordChangedStatus =1;
              }}
            }}
            onPress={(data, details = null) => {
              datas = data;
              this.wordChangedStatus=0;
              this.setState({SalterInputStatus:1})
>>>>>>> 1af34082fc44ae6aff51a38db722b5704ecd2207
              //alert("lat: "+JSON.stringify(details.geometry.location.lat)+" lan: " +JSON.stringify(details.geometry.location.lng) )
              this.setState({
                tempStarting: {
                  latitude: JSON.stringify(details.geometry.location.lat),
                  longitude: JSON.stringify(details.geometry.location.lng),
                }
              })
              //listViewDisplayed='false';
            }}
            getDefaultValue={() => ""}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyBBzmreXc_jGOKwuHe78CnsGDT_HDi8Dak",
              language: "en", // language of the results
              components: "country:SG", //limit scope to SG
              fields: "geometry.location"
            }}
          />
        </View>
        <View style={styles.calloutView}>
          <GooglePlacesAutocomplete
            style={styles.innerContainer}
            placeholder="Desired Destination" //place holder for search bar
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed={false} // true/false/undefined
            fetchDetails={true} // 'details' is provided when fetchDetails = true
            renderDescription={row => row.description} // custom description render
            textInputProps={{
<<<<<<< HEAD
              onChangeText: (inputDest, details = null) => {
                if (this.state.EalterInputStatus == 1) {
                  this.wordChangedStatus = 1;
                }
              }
            }}
            onPress={(data, details = null) => {
              datas = data;
              this.wordChangedStatus = 0;
              this.setState({ EalterInputStatus: 1 });
=======
              onChangeText : (inputDest, details = null) => {
                if (this.state.EalterInputStatus==1){
                 this.wordChangedStatus =1;
              }}
            }}
            onPress={(data, details = null) => {
              datas = data;
              this.wordChangedStatus=0;
              this.setState({EalterInputStatus:1})
>>>>>>> 1af34082fc44ae6aff51a38db722b5704ecd2207
              //alert("lat: "+JSON.stringify(details.geometry.location.lat)+" lan: " +JSON.stringify(details.geometry.location.lng) )
              this.setState({ //set temp destination
                tempDestination: {
                  latitude: JSON.stringify(details.geometry.location.lat),
                  longitude: JSON.stringify(details.geometry.location.lng),
                }
              })
            }}
            getDefaultValue={() => ""}
            query={{
              key: "AIzaSyBBzmreXc_jGOKwuHe78CnsGDT_HDi8Dak",
              language: "en", // language of the results
              components: "country:SG" //limit scope to singapore
            }}
          />
        </View>
        <Button
          onPress={() => this.onDirectionBtnPress()}
          title="Determine Directions"
          color="#00B0FF"
        />
      </View>
    );
  }

  displayMapWithChallengesOption() {
    let polyroutecolor = [
      "blue",
      "green",
      "red",
      "black",
      "orange",
      "purple",
      "pink"
    ];
    return (
      <View>
        <View style={styles.challengeBtn}>
          <Button
            title="View Challenges"
            onPress={
              () => this.props.navigation.navigate("ChallengeScreen")
              // this.startNavigation()
            }
          />
        </View>
        <Button title="Change route" onPress={() => this.resetAllRouteInfo()} />
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: Number(this.state.startingLocation.latitude),
            longitude: Number(this.state.startingLocation.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: Number(this.state.startingLocation.latitude),
              longitude: Number(this.state.startingLocation.longitude)
            }}
            title={"Starting Location"}
          />
          <MapView.Marker
            coordinate={{
              latitude: Number(this.state.finalDestination.latitude),
              longitude: Number(this.state.finalDestination.longitude)
            }}
            title={"Destination"}
          />
          <MapView.Polyline
            coordinates={this.state.arrOfPolyline[this.state.routeSelected]}
            strokeWidth={2}
            strokeColor={polyroutecolor[this.state.routeSelected]}
          />
        </MapView>
      </View>
    );
  }

  generateAllPolyRoutes() {
    let overallMap = [];
    polyroutecolor = [
      "blue",
      "green",
      "red",
      "black",
      "orange",
      "purple",
      "pink"
    ];
    overallMap.push(
      <View key="starting markers">
        <MapView.Marker
          coordinate={{
            latitude: Number(this.state.startingLocation.latitude),
            longitude: Number(this.state.startingLocation.longitude)
          }}
          title={"Starting Location"}
        />
        <MapView.Marker
          coordinate={{
            latitude: Number(this.state.finalDestination.latitude),
            longitude: Number(this.state.finalDestination.longitude)
          }}
          title={"Destination"}
        />
      </View>
    );
    for (i = 0; i < this.state.arrOfPolyline.length; i++) {
      overallMap.push(
        <View key={i}>
          <MapView.Polyline
            coordinates={this.state.arrOfPolyline[i]}
            strokeWidth={2}
            strokeColor={polyroutecolor[i]}
            title={"route" + { i }}
          />
        </View>
      );
    }
    return overallMap;
  }

  displayChallengeScreen() {
    return (
      <View>
        <View style={styles.challengepagebtn}>
          <TouchableOpacity onPress={this._onPressButton}>
            <Text style={styles.challengepagebtn}>AR Challenge</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.challengepagebtn}>
          <TouchableOpacity onPress={this._onPressButton}>
            <Text style={styles.challengepagebtn}>Time-Based Challenge</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.startNavigation()}>
            <Text style={styles.challengepagebtn}>Normal Navigation</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  displayRouteOptions() {
    return <View>{this.state.routebox}</View>;
  }

  //foreach coordinates in poly route, generate marker
  displayFinalRouteV2() {
    let arrOfMarkers = [];
    for (
      i = 0;
      i < this.state.arrOfDirectionDetails[this.state.routeSelected].length;
      i++
    ) {
      if (i == 0) {
        arrOfMarkers.push(
          <View key={i}>
            <MapView.Marker
              coordinate={{
                latitude: Number(this.state.startingLocation.latitude),
                longitude: Number(this.state.startingLocation.longitude)
              }}
              title={"Starting Location"}
              pinColor={"red"}
            />
            <MapView.Marker
              coordinate={{
                latitude: Number(this.state.finalDestination.latitude),
                longitude: Number(this.state.finalDestination.longitude)
              }}
              title={"Final Destination"}
              pinColor={"red"}
            />
            <MapView.Polyline
              coordinates={this.state.arrOfPolyline[this.state.routeSelected]}
              strokeWidth={2}
              strokeColor={polyroutecolor[this.state.routeSelected]}
            />
          </View>
        );
      } else {
        arrOfMarkers.push(
          <MapView.Marker
            key={i}
            coordinate={{
              latitude: Number(
                this.state.arrOfDirectionDetails[this.state.routeSelected][i]
                  .start_location.lat
              ),
              longitude: Number(
                this.state.arrOfDirectionDetails[this.state.routeSelected][i]
                  .start_location.lng
              )
            }}
            title={"Check points"}
            pinColor={"green"}
          />
        );
      }
    }
    return arrOfMarkers;
  }

  updateStepbyStepInstructionStatus() {
    if (this.state.stepByStepInstructionStatus == null) {
      this.setState({ stepByStepInstructionStatus: 1 });
    } else {
      this.setState({ stepByStepInstructionStatus: null });
    }
  }

  displayOverviewInstructionsBtn() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.updateStepbyStepInstructionStatus()}
        >
          <Text style={styles.challengepagebtn}>Overview of instructions</Text>
        </TouchableOpacity>
      </View>
    );

    /*<Button
    title="overview of instructions"
    onPress={() => this.updateStepbyStepInstructionStatus()}/>)*/
  }

  displayOverviewInstructions() {
    let tempAllInstructions = [];
    for (
      i = 0;
      i < this.state.arrOfDirectionDetails[this.state.routeSelected].length;
      i++
    ) {
      if (
        this.state.arrOfDirectionDetails[this.state.routeSelected][i]
          .travel_mode == "WALKING"
      ) {
        // if walking is mode of transport
        tempAllInstructions.push(
          //store main instruction
          <Text key={i} style={styles.boxes}>
            Main Instructions:{" "}
            {
              this.state.arrOfDirectionDetails[this.state.routeSelected][i]
                .html_instructions
            }
          </Text>
        );
        if (
          "steps" in
          this.state.arrOfDirectionDetails[this.state.routeSelected][i]
        ) {
          // if additional substeps exists, else do nothing
          for (
            j = 0;
            j <
            this.state.arrOfDirectionDetails[this.state.routeSelected][i].steps
              .length;
            j++ //store all sub instructions
          ) {
            tempAllInstructions.push(
              //store sub instruction in the sub step
              <Text key={i.toString() + j.toString()} style={styles.boxes}>
                {" "}
                Sub Instructions:{" "}
                {this.stripHTML(
                  this.state.arrOfDirectionDetails[this.state.routeSelected][i]
                    .steps[j].html_instructions
                )}
              </Text>
            );
          }
        }
      } else if (
        this.state.arrOfDirectionDetails[this.state.routeSelected][i]
          .travel_mode == "TRANSIT"
      ) {
        // if transit is mode of transport
        tempAllInstructions.push(
          //store html instruction and bus number
          <Text key={i} style={styles.boxes}>
            Main Instructions:{" "}
            {
              this.state.arrOfDirectionDetails[this.state.routeSelected][i]
                .html_instructions
            }{" "}
            {
              this.state.arrOfDirectionDetails[this.state.routeSelected][i]
                .transit_details.line.name
            }
          </Text>
        );
      }
    }
    return tempAllInstructions;
  }
<<<<<<< HEAD
  displayTime() {
    console.log(this.state.timeSelect);
    if (this.state.timeSelect === 1) {
      console.log("DISPALY time");
      return (
        <Text>
          {" "}
          Time Challenge: {this.state.cdTimer.hours} hour{" "}
          {this.state.cdTimer.minutes} min {this.state.cdTimer.seconds} sec{" "}
        </Text>
      );
    }
  }
=======

>>>>>>> 1af34082fc44ae6aff51a38db722b5704ecd2207
  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      //current location from getlocation async function ( not used atm )
    }

    return (
      <View style={styles.container}>
        {this.state.allDetailsAcquired == 1 &&
          this.state.stepByStepInstructionStatus == 1 &&
          this.state.startingLocation.latitude != null &&
          this.state.startingLocation.longitude != null &&
          this.state.finalDestination != null &&
          this.state.finalDestination.longitude != null && (
            <View style={styles.container}>
              <View key={0} style={styles.putmetop}>
                {this.displayOverviewInstructionsBtn()}
                {this.displayOverviewInstructions()}
              </View>
              <View>
                <MapView
                  style={styles.mapStyle}
                  region={{
                    latitude: Number(this.state.startingLocation.latitude),
                    longitude: Number(this.state.startingLocation.longitude),
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                  }}
                >
                  {this.displayFinalRouteV2()}
                </MapView>
              </View>
              <View style={styles.userInstructions}>
                <View>
                  <Text>Main: {this.state.curMainInstruction}</Text>
                </View>
                <View>
                  <Text>
                    Sub: {this.stripHTML(this.state.curSubInstruction)}
                  </Text>
                </View>
                <View>
                  <Text>
                    {" "}
                    Current cords lat {this.state.currLocation.latitude}{" "}
                  </Text>
                </View>
                <View>
                  <Text>
                    {" "}
                    current long longitude {
                      this.state.currLocation.longitude
                    }{" "}
                  </Text>
                </View>
                <View>
                  <Text>
                    {" "}
                    desired sub coords lat{this.state.subCoord.latitude}{" "}
                  </Text>
                </View>
                <View>
                  <Text>
                    {" "}
                    desired sub coords longitude {
                      this.state.subCoord.longitude
                    }{" "}
                  </Text>
                </View>

                <View>
                  {/* <Text>
                    {" "}
                    Time Challenge: {this.state.cdTimer.hours} hour{" "}
                    {this.state.cdTimer.minutes} min{" "}
                    {this.state.cdTimer.seconds} sec{" "}
                  </Text> */}
                  {this.displayTime()}
                </View>
              </View>
            </View>
          )}

        {this.state.allDetailsAcquired == 1 &&
          this.state.stepByStepInstructionStatus == null &&
          this.state.startingLocation.latitude != null &&
          this.state.startingLocation.longitude != null &&
          this.state.finalDestination != null &&
          this.state.finalDestination.longitude != null && (
            <View style={styles.container}>
              <View style={styles.putmetop}>
                {this.displayOverviewInstructionsBtn()}
              </View>
              <View>
                <MapView
                  style={styles.mapStyle}
                  region={{
                    latitude: Number(this.state.startingLocation.latitude),
                    longitude: Number(this.state.startingLocation.longitude),
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                  }}
                >
                  {this.displayFinalRouteV2()}
                </MapView>
              </View>
              <View style={styles.userInstructions}>
                <View>
                  <Text>Main: {this.state.curMainInstruction}</Text>
                </View>
                <View>
                  <Text>
                    Sub: {this.stripHTML(this.state.curSubInstruction)}
                  </Text>
                </View>
                <View>
                  <Text>
                    {" "}
                    Current cords lat {this.state.currLocation.latitude}{" "}
                  </Text>
                </View>
                <View>
                  <Text>
                    {" "}
                    current long longitude {
                      this.state.currLocation.longitude
                    }{" "}
                  </Text>
                </View>
                <View>
                  <Text>
                    {" "}
                    desired sub coords lat{this.state.subCoord.latitude}{" "}
                  </Text>
                </View>
                <View>
                  <Text>
                    {" "}
                    desired sub coords longitude {
                      this.state.subCoord.longitude
                    }{" "}
                  </Text>
                </View>
                <View>
                  {/* <Text>
                    {" "}
                    Time Challenge: {this.state.cdTimer.hours} hour{" "}
                    {this.state.cdTimer.minutes} min{" "}
                    {this.state.cdTimer.seconds} sec{" "}
                  </Text> */}
                  {this.displayTime()}
                </View>
              </View>
            </View>
          )}

        {(this.state.userRouteSelectionStatus == null ||
          this.state.startingLocation.longitude == null ||
          this.state.startingLocation.latitude == null ||
          this.state.finalDestination.latitude == null ||
          this.state.finalDestination.longitude == null) && ( // if current location is obtained generate map and final destination set
          <View>
            <View>{this.displaySearchBar()}</View>
          </View>
        )}
        {this.state.routeStatus == null &&
        this.state.userRouteSelectionStatus == null &&
        this.state.startingLocation.longitude != null &&
        this.state.startingLocation.latitude != null &&
        this.state.finalDestination.latitude != null &&
        this.state.finalDestination.longitude != null && ( //if user hasnt selected route but input directions already
            // display all map polyroutes and display route button
            // enter this loop only if display route button hasn't been pressed
            <View>
              <Button
                title="Display Route Options"
                onPress={() => this.updateDisplayRouteStatus()}
              ></Button>
              <MapView
                style={styles.mapStyle}
                region={{
                  latitude: Number(this.state.startingLocation.latitude),
                  longitude: Number(this.state.startingLocation.longitude),
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05
                }}
              >
                {this.generateAllPolyRoutes()}
              </MapView>
            </View>
          )}

        {this.state.routeStatus == 1 &&
        this.state.userRouteSelectionStatus == null &&
        this.state.startingLocation.longitude != null &&
        this.state.startingLocation.latitude != null &&
        this.state.finalDestination.latitude != null &&
        this.state.finalDestination.longitude != null && ( //if user hasnt selected route but input directions already
            <View>
              {this.state.routebox}
              <MapView
                style={styles.mapStyle}
                region={{
                  latitude: Number(this.state.startingLocation.latitude),
                  longitude: Number(this.state.startingLocation.longitude),
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05
                }}
              >
                {this.generateAllPolyRoutes()}
              </MapView>
            </View>
          )}
        {this.state.errorMessage != null && ( // if there is any error message dont generate map
          <View>
            <Text> {this.state.errorMessage}</Text>
          </View>
        )}

        {this.state.selectChallengeStatus == 1 &&
          this.state.allDetailsAcquired == null && (
            <View style={styles.vertihorialigned}>
              <Text style={styles.centralize}> Challenges</Text>
              {this.displayChallengeScreen()}
            </View>
          )}

        {this.state.allDetailsAcquired == null &&
        this.state.selectChallengeStatus == null &&
        this.state.userRouteSelectionStatus != null &&
        this.state.startingLocation.latitude != null &&
        this.state.startingLocation.longitude &&
        this.state.finalDestination.latitude != null &&
        this.state.finalDestination.longitude != null && ( // if current location is obtained generate map and final destination set
            //{/* need view style container otherwise wont be able to move the map/zoom in and out */}
            <View>{this.displayMapWithChallengesOption()}</View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conStyle: {
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  container: {
    flex: 1,
    //paddingTop: 50,
    backgroundColor: "#ecf0f1",
    height: Dimensions.get("window").height,
    position: "relative"
  },
  innerContainer: {
    //borderColor: 'black',
    //borderWidth : 5,
    width: "100%"
    //height: 80,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  },
  mapStyle: {
    borderWidth: 2,
    borderColor: "green",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingTop: 0,
    width: "100%"
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  },
  challengeBtn: {
    marginBottom: 0,
    marginTop: 30
  },
  centralize: {
    textAlign: "center",
    fontSize: 46,
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width
  },
  vertihorialigned: {
    flex: 1,
    justifyContent: "center"
  },
  challengepagebtn: {
    width: Dimensions.get("window").width,
    backgroundColor: "#00B0FF",
    textAlign: "center",
    fontSize: 25
  },
  userInstructions: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "blue"
  },
  putmetop: {
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 0,
    backgroundColor: "white",
    zIndex: 2
  },
  boxes: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    textAlign: "center",
    margin: 2
  }
});

export default withNavigation(withNavContext(Navigation));
