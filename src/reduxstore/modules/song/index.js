import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'

/**
 * Types and Action Creators
 */
const { Types, Creators: Action } = createActions(
    {
        init: null,
        songListSuccess: ['songList'],
        songListFailure: ['error']
    },
    { prefix: '@SONGS/' }
)
export { Types, Action }

export const INITIAL_STATE = {
    songList: null,
    error: null,
    loading: false
}

export default createReducer(INITIAL_STATE, {
    [Types.INIT]: (state) =>
        produce(state, (draft) => {
            draft.loading = true;
        }),
    [Types.SONG_LIST_FAILURE]: (state, error) =>
        produce(state, (draft) => {
            draft.loading = false,
                draft.error = error;
        }),
    [Types.SONG_LIST_SUCCESS]: (state,  list ) =>
        produce(state, (draft) => {
            console.log('list',list)
            draft.loading = false,
                draft.songList = list;
        }),
})