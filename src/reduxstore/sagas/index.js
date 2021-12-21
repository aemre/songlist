import { all, call, spawn } from 'redux-saga/effects';

/**
 * Saga List
 */
import watchApp from './app';
import startChannel from './network';
import { watchSong, watchInput, watchReset } from './song';


/**
 * RootSagas
 */
export default function* root() {
  const sagas = [
    watchApp,
    startChannel,
    watchSong,
    watchInput,
    watchReset,
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
