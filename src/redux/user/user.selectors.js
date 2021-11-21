import {createSelector} from 'reselect'

const selectUser = state => state.user //input selector

export const selectCurrentUser = createSelector(
    [selectUser], //aray of input sel
    user => user.currentUser //gets return from input sels in order specified

)