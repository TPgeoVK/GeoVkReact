import WRITING_POST from  './actionTypes';
import { CALL_API, getJSON } from 'redux-api-middleware';

export const START_PREDICTION_LOADING = 'START_PREDICTION_LOADING';
export const SUCCESS_PREDICTION_LOADING = 'SUCCESS_PREDICTION_LOADING';
export const ERROR_PREDICTION_LOADING = 'ERROR_PREDICTION_LOADING';

export const predictionPlace = (url, post, longitude, latitude) => {
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
                                return Object.assign({}, json, normalizedData);
                            },
                        );
                    },
                },
                ERROR_PREDICTION_LOADING,
            ],
        },
    };
};