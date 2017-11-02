import WRITING_POST from  './actionTypes';
import { CALL_API, getJSON } from 'redux-api-middleware';

export const START_PREDICT_LOADING = 'START_PREDICT_LOADING';
export const SUCCESS_PREDICT_LOADING = 'SUCCESS_PREDICT_LOADING';
export const ERROR_PREDICT_LOADING = 'ERROR_PREDICT_LOADING';

export const predictPlace = (url, post, longitude, latitude) => {
    return {
        [CALL_API]: {
            endpoint: url,
            method: 'GET',
            types: [
                START_PREDICTION_LOADING,
                {
                    type: SUCCESS_PREDICTION_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                return JSON.parse(json);
                            },
                        );
                    },
                },
                ERROR_PREDICTION_LOADING,
            ],
        },
    };
};