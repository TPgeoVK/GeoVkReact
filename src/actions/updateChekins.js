import {UPDATE_CHECKINS} from  './actionTypes';
import { CALL_API, getJSON } from 'redux-api-middleware';

export const updateCheckins = () => {
    //TODO: send timestamp for only new checkins
    return {
      type: UPDATE_CHECKINS,
    }
  }