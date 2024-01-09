import { SET_TARGETED_PHOTO } from "./actionType";

export const setTargetedPhoto = (photo) => ({
    type: SET_TARGETED_PHOTO,
    payload: photo,
  });