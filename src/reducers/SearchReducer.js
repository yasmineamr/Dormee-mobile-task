import { TEXT_CHANGED, LOADING, SEARCH_DONE, SAVED_VIDEOS_FETCHED, SAVE_VIDEO, CLOSE_POPUP } from '../actions/types';

const INITIAL_STATE = {
  text: '',
  loading: false,
  savedVideos: {},
  saved: false
}
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TEXT_CHANGED:
      return { ...state, text: action.payload };
    case LOADING:
      return { ...state, loading: action.payload };
    case SEARCH_DONE:
      return { ...state, text: '' };
    case SAVED_VIDEOS_FETCHED:
      return { savedVideos: action.payload };
    case SAVE_VIDEO:
      return { ...state, saved: action.payload };
    case CLOSE_POPUP:
      return { ...state, saved: false };
    default:
      return state;
  }
}
