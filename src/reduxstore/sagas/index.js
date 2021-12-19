import { all, call, spawn } from 'redux-saga/effects';

/**
 * Saga List
 */
import watchApp from './app';
import startChannel from './network';
import watchSong from './song';

/**
 * RootSagas
 */
export default function* root() {
  const sagas = [
    watchApp,
    startChannel,
    watchSong,
  ];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
