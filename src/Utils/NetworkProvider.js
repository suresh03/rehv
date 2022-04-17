import React from "react";
import NetInfo from "@react-native-community/netinfo";
import DropdownAlert from "react-native-dropdownalert";

export const NetworkContext = React.createContext({ isConnected: true });

export class NetworkProvider extends React.PureComponent {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      this.handleConnectivityChange(state.isConnected);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
    this.showAlert(isConnected);
  };

  showAlert = (isConnected) => {
    if (!isConnected) {
      const {
        type = "error",
        title = "Internet Connection Problem",
        message = "Please check your network connection",
        payload,
        interval,
      } = this.props;
      if (this.dropDownAlertRef) {
        this.dropDownAlertRef.alertWithType(
          type,
          title,
          message,
          payload,
          interval
        );
      }
    } else {
      if (this.dropDownAlertRef) {
        this.dropDownAlertRef.closeAction();
      }
    }
  };

  renderAlert = () => {
    return (
      <DropdownAlert
        ref={(ref) => (this.dropDownAlertRef = ref)}
        tapToCloseEnabled={false}
        panResponderEnabled={false}
        closeInterval={0} // ? Cancel auto close
        {...this.props}
      />
    );
  };
  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}
        {this.renderAlert()}
      </NetworkContext.Provider>
    );
  }
}
