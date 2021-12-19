import { takeLatest, put, call } from 'redux-saga/effects';
import { Action, Types } from '../modules/song';
import { getSongs } from '../../api/services';


/**
 * Menu Saga Init
 */
function* song() {
  try {
   // yield put(Action.init)
   console.log('response',getSongs.songs())
    const response = yield call(getSongs.songs);
    yield put(Action.songListSuccess(response));
  } catch (e) {
    yield put(Action.songListFailure(`Error: ${e}`));
  }
}

/**
 * Menu Watcher
 */
export default function* watchSong() {
  yield takeLatest(Types.INIT, song);
}