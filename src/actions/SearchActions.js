import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { TEXT_CHANGED, LOADING, SEARCH_DONE, SAVED_VIDEOS_FETCHED, SAVE_VIDEO, CLOSE_POPUP } from './types';
import Config from '../config';

export const textChanged = (text) => {
  return  {
    type: TEXT_CHANGED,
    payload: text
  }
}

export const searchVideo = ({ text }) => {
  return (dispatch) => {
    dispatch(setLoading(true)); //start the spinner

    fetch(`${Config.SEARCH_API_URL}${text}`)
      .then(res => res.json())
      .then(out => {
        out = filterSearchResults(out); //filter the search result by taking only the needed info (videoID, description, title, artist, and the image)
        dispatch(setLoading(false)); // stops the spinner
        dispatch(setSearchResults()); // clears the search input
        Actions.searchResults({ result: out }); // send the search results to the searchResult scene to be viewed to the user
      })
  }
}

export const saveVideo = (video) => {
  const { currentUser } = firebase.auth();
  const { id, artist, title, description, thumb, key } = video;

  return (dispatch) => {
    dispatch(setLoading(true)); //start the spinner
    firebase.database().ref(`/users/${currentUser.uid}/savedVideos`) //check if the video that the user trying to save is already saved before
      .orderByChild('id')
      .equalTo(id)
      .once('value', snapshot => {
        if(snapshot.val() !== null) { //if it was saved
          console.log('already saved');
          dispatch(setLoading(false)); //then stop the spinner
          dispatch({type: SAVE_VIDEO, payload: true }); //send a payload: true that indicates that the video was already saved(used for the popUp)
        } else {
          console.log('not saved1');
          firebase.database().ref(`/users/${currentUser.uid}/savedVideos`) //else save the video details in the database
            .push({ id, artist, title, description, thumb, key })
            .then(() => {
              console.log('not saved2');
              dispatch(setLoading(false)); //stop the spinner
              dispatch({type: SAVE_VIDEO, payload: false }); //send a payload: false that indicates that the video was not saved before(used for the popUp)
            });
        }
      });
  }
}

export const unsaveVideo = (uid) => {
  const {currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/savedVideos/${uid}`) //removes the video from the database
      .remove()
      .then(() => {
        Actions.savedVideos();
      })
  }
}

export const closePopUp = () => {
  return {
    type: CLOSE_POPUP,
    payload: false //resets the loading variable to false to close the popUp after indicating that the video was previously saved
  }
}

export const savedVideos = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/savedVideos`) //retrieve the saved videos from the database
      .on('value', snapshot => {
        dispatch({type: SAVED_VIDEOS_FETCHED, payload: snapshot.val() });
      });
  }
}

export const setLoading = (flag) => { //for the spinner
    return {
      type: LOADING,
      payload: flag
    };
}

export const setSearchResults = () => {
  return {
    type: SEARCH_DONE
  }
}

const filterSearchResults = (result) => {
  return result.items.map(item => {
    return {
      id: item.id.videoId,
      artist: item.snippet.channelTitle,
      title: item.snippet.title,
      description: item.snippet.description,
      thumb: item.snippet.thumbnails.high.url,
      key: item.id.videoId
    }
  });
}
