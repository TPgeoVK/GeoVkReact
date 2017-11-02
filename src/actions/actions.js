import {UPDATE_CHECKINS, WRITING_POST} from  './actionTypes';

export const updateCheckins = () => {
    //TODO: send timestamp for only new checkins
    return {
      type: UPDATE_CHECKINS,
    }
  }

  export const writingPost = (post, longitude, latitude) => {
    return {
      type: WRITING_POST,
      payload: {
          post,
          longitude,
          latitude
      }
    }
  }