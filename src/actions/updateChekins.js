import UPDATE_CHECKINS from  './actionTypes';
import { CALL_API, getJSON } from 'redux-api-middleware';

export const START_UPDATE_LOADING = 'START_UPDATE_LOADING';
export const SUCCESS_UPDATE_LOADING = 'SUCCESS_UPDATE_LOADING';
export const ERROR_UPDATE_LOADING = 'ERROR_UPDATE_LOADING';

export const updateCheckins = (url) => {
    //TODO: send timestamp for only new checkins
    return {
      type: UPDATE_CHECKINS,
    }
  }