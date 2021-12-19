import NetInfo from '@react-native-community/netinfo';

/**
 * #class netinfoHelper {
 * Description for this component
 * @param
 */
class netinfoHelper {
  /**
   * constructor
   * @param {Function} listener
   */
  constructor(listener) {
    this.listener = listener;
  }

  /**
   * add event listener to NetInfo class
   * that will call handleConnectivityChange method with updated state
   */
  addNetinfoEventListener() {
    NetInfo.addEventListener((state) => this.handleConnectivityChange(state));
  }

  /**
   * remove event listener from NetInfo class
   */
  removeNetinfoEventListener() {
    NetInfo.removeNetinfoEventListener();
  }

  /**
   * handle network connection state change
   * @param {Object} state
   */
  handleConnectivityChange(state) {
    const condition = state.isConnected ? 'online' : 'offline';

    this.listener(condition);
  }
}

export default netinfoHelper;
