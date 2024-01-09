import { SET_TARGETED_PHOTO } from "../action/actionType";
import image2 from '../../assets/02_03.jpg'
const initialState = {
    targetedPhoto: image2// Default photo
  };
  
  export const targetedPhotoReducer = (state = initialState, action) => {

    switch (action.type) {
      case SET_TARGETED_PHOTO:
        return {
          ...state,
          targetedPhoto: action.payload,
        };
      default:
        return state;
    }
  };