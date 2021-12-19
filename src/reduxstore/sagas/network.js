import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { Actions } from '../modules/network';
import NetinfoHelper from '../netInfoHelper';
/**
 * Constructs a Saga channel that allows users
 * to be notified whenever network state changes.
 *@param syncActionName
 */
export default function* startChannel() {
  const channel = eventChannel((listener) => {
    /**
     * handle connectivity change
     * @param {boolean} isConnected
     */
    const handleConnectivityChange = (isConnected) => {
      listener(isConnected);
    };

    const netInfo = new NetinfoHelper(handleConnectivityChange);

    netInfo.addNetinfoEventListener();

    return () => netInfo.removeNetinfoEventListener();
  });

  // Listen for the changes and put action
  while (true) {
    const connectionInfo = yield take(channel);
    if (connectionInfo === 'online') {
      yield put(Actions.onlineStatus(connectionInfo));
    } else {
      yield put(Actions.offlineStatus(connectionInfo));
    }
  }
}
