import React from "react";

const NavContext = React.createContext();

export class NavProvider extends React.Component {
  state = {
    start: { Lat: null, Long: null },
    end: { Lat: null, Long: null },
    polyLine: [],
    route_selected: null,
    directDetails: [],
    time: [],
    timeSel: false
  };

  setStartLocation = (lat, long) => {
    // var temp = { Lat: lat, Long: long };
    this.setState({ start: { Lat: lat, Long: long } });
  };

  setEndLocation = (lat, long) => {
    this.setState({ end: { Lat: lat, Long: long } });
  };

  setPolyLine = arr => {
    this.setState({ polyLine: arr });
  };
  setRouteSelect = index => {
    this.setState({ route_selected: index });
  };

  setDirDetails = arr => {
    this.setState({ directDetails: arr });
  };

  setTime = arr => {
    this.setState({ time: arr });
  };
  setTimeSelect = index => {
    this.setState({ timeSel: index });
  };
  getValue = () => {
    return {
      start: this.state.start,
      end: this.state.end,
      polyLine: this.state.polyLine,
      route_selected: this.state.route_selected,
      directDetails: this.state.directDetails,
      time: this.state.time,
      timeSel: this.state.timeSel,
      setStart: this.setStartLocation,
      setEnd: this.setEndLocation,
      setPolyLine: this.setPolyLine,
      setSelect: this.setRouteSelect,
      setDir: this.setDirDetails,
      setTime: this.setTime,
      setTimeSel: this.setTimeSelect
    };
  };
  render() {
    return (
      <NavContext.Provider value={this.getValue()}>
        {this.props.children}
      </NavContext.Provider>
    );
  }
}

export function withNavContext(Component) {
  class ComponentWithContext extends React.Component {
    render() {
      return (
        <NavContext.Consumer>
          {value => <Component {...this.props} navProvider={value} />}
        </NavContext.Consumer>
      );
    }
  }
  return ComponentWithContext;
}
