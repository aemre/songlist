import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'

/**
 * Types and Action Creators
 */
const { Types, Creators: Action } = createActions(
    {
        init: null,
        search: ['query'],
        searchReset: ['id'],
        songListSuccess: ['songList'],
        songListFailure: ['error'],
        songListFilter: ['id'],
        songListSearch: ['query']
    },
    { prefix: '@SONGS/' }
)
export { Types, Action }

export const INITIAL_STATE = {
    songList: null,
    error: null,
    loading: false,
    genre_id: -1
}

export default createReducer(INITIAL_STATE, {
    [Types.INIT]: (state) =>
        produce(state, (draft) => {
            draft.loading = true;
        }),
    [Types.SEARCH]: (state) =>
        produce(state, (draft) => {

        }),
    [Types.SEARCH_RESET]: (state) =>
        produce(state, (draft) => {

        }),
    [Types.SONG_LIST_FAILURE]: (state, error) =>
        produce(state, (draft) => {
            draft.loading = false,
                draft.error = error;
        }),
    [Types.SONG_LIST_SUCCESS]: (state, list) => {
        list.songList.genres.unshift({ id: -1, name: "All", isSelected: true })
        return produce(state, (draft) => {
            draft.loading = false,
                draft.songList = list;
        })
    },
    [Types.SONG_LIST_FILTER]: (state, genre_id) => {
        let newList = state.songList.songList.videos.filter((video) => video.genre_id == genre_id.id)
        return produce(state, (draft) => {
            if (genre_id.id == -1) {
                draft.loading = false,
                    draft.genre_id = genre_id.id,
                    draft.songFilteredList = null;
            } else {
                draft.loading = false,
                    draft.genre_id = genre_id.id,
                    draft.songFilteredList = newList;
            }
        })
    },
    [Types.SONG_LIST_SEARCH]: (state, query) => {
        if (query.query == undefined || query.query.length < 2) return
        let newList = (state.genre_id === -1 ? state.songList?.songList?.videos : state.songFilteredList).filter((video) => {
            return video.title.toString().indexOf(query.query) > -1
        })

        return produce(state, (draft) => {
            if (query.query == undefined || query.query.length < 2) {
                draft.genre_id = state.genre_id,
                    draft.loading = false,
                    draft.songFilteredList = null;

            } else {
                draft.loading = false,
                draft.songFilteredList = newList;
            }
        })
    },

})
