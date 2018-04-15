import {
    ADD_IDEAS,
    APPEND_IDEA,
    DELETE_IDEA,
    UPDATE_BODY,
    ADD_SORT
} from './events';

export const addIdeas = (data) => {
  return {
      type: ADD_IDEAS,
      payload: data
  }
};

export const appendIdea = (data) => {
  return {
      type: APPEND_IDEA,
      payload: data
  }
};

export const deleteIdea = (data) => {
  return {
      type: DELETE_IDEA,
      payload: data
  }
};

export const updateIdea = (data) => {
  return {
      type: UPDATE_BODY,
      payload: data
  }
};

export const addSort = (data) => {
  return {
      type: ADD_SORT,
      payload: data
  }
};