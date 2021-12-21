import { takeLatest, put, call } from 'redux-saga/effects';
import { Actions, Types } from '../modules/app';


/**
 * App Saga Init
 */
function* init() {
  try {
    yield put(Actions.initSuccess("response"));
  } catch (e) {
    yield put(Actions.initFailure(`Error: ${e}`));
  }

}

/**
 * App watcher
 */
export default function* watchApp() {
  yield takeLatest(Types.INIT, init);
}
