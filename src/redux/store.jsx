import { createStore } from 'redux';
import { targetedPhotoReducer } from './reducers/targetedPhotoReducer';
const store = createStore(targetedPhotoReducer);

export default store;