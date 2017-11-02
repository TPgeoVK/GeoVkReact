import update from 'react-addons-update';
import { START_PREDICT_LOADING, SUCCESS_PREDICT_LOADING, ERROR_PREDICT_LOADING } from '../actions/predictPlace';


const initialState = {
    place: {
        title:'',
    },
    isLoading: false,
};


export default function tasks(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.place) {
        newStore = update(store, {
            tasks: { $merge: action.payload.place },
        });
    }

    switch (action.type) {
        case START_PREDICT_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_PREDICT_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                place:{
                    title: { $set: action.payload }
                },
            });
        }
        case ERROR_PREDICT_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        default:
            return newStore;
    }
}