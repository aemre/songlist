import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'

/**
 * Types and Action Creators
 */
const { Types, Creators: Action } = createActions(
    {
        init: null,
        initSuccess: ['options'],
        initFailure: ['error']
    },
    { prefix: '@APP/' }
)
export { Types, Action }

export const INITIAL_STATE = {
    isInıt: false,
    error: null,
}

export default createReducer(INITIAL_STATE, {
    [Types.INIT]: (state) =>
        produce(state, (draft) => {
            draft.init = true;
        }),
    [Types.INIT_FAILURE]: (state, error) =>
        produce(state, (draft) => {
            draft.isInıt = false,
                draft.error = error;
        }),
    [Types.INIT_SUCCESS]: (state) =>
        produce(state, (draft) => {
            draft.isInıt = true,
                draft.error = false;
        }),
})