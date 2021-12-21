import { takeLatest, put, call, throttle } from 'redux-saga/effects';
import { Action, Types } from '../modules/song';
import { getSongs } from '../../api/services';


/**
 * Song Saga Init
 */
function* song() {
  try {
    const response = yield call(getSongs.songs);
    yield put(Action.songListSuccess(response));
  } catch (e) {
    yield put(Action.songListFailure(`Error: ${e}`));
  }
}

/**
 * Song Watcher
 */
export function* watchSong() {
  yield takeLatest(Types.INIT, song);
}
function* handleInput(input) {
  yield put(Action.songListSearch(input.query));
}
function* resetSearch(filter) {
  if (filter.id != -1)
    yield put(Action.songListFilter(filter.id));
}

export function* watchInput() {
  yield throttle(150, Types.SEARCH, handleInput)
}
export function* watchReset() {
  yield takeLatest(Types.SEARCH_RESET, resetSearch)
}