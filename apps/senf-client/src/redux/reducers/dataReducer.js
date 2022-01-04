/**
 * /* eslint-disable import/no-anonymous-default-export
 *
 * @format
 */

/** @format */

import { isMobileCustom } from "../../util/customDeviceDetect";
import {
  SET_SCREAMS,
  SET_MY_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  STOP_LOADING_DATA,
  DELETE_SCREAM,
  SET_COMMENTS,
  SET_COMMENT,
  DELETE_COMMENT,
  POST_SCREAM,
  EDIT_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  LOADING_IDEA_DATA,
  LOADING_PROJECTS_DATA,
  LOADING_MYSCREAMS_DATA,
  SET_PROJECTS,
  SET_PROJECT,
  SET_SCREAM_USER,
  SET_FULL_SCREAMS,
  SET_COOKIES,
  SET_MAP_LOADED,
  SET_MAP_VIEWPORT,
  SET_MAP_BOUNDS,
  SET_INITIAL_MAP_BOUNDS,
  SET_INITIAL_MAP_VIEWPORT,
  SET_TOPICS,
} from "../types";

const defaultTopics = [
  "Verkehr",
  "Versorgung",
  "Umwelt und Grün",
  "Rad",
  "Inklusion / Soziales",
  "Sport / Freizeit",
  "Sonstige",
];
const initialState = {
  projects: [],
  screams: [],
  myScreams: null,
  scream: {},
  comment: {},
  like: {},
  loading: true,
  loadingIdea: false,
  loadingProjects: false,
  loadingMyScreams: false,
  scream_user: {},
  full_screams: [],
  cookie_settings: "",
  mapLoaded: false,
  mapViewport: null,
  initialMapViewport: null,
  initialMapBounds: null,
  mapBounds: null,
  topics: defaultTopics,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case LOADING_IDEA_DATA:
      return {
        ...state,
        loadingIdea: true,
      };

    case LOADING_MYSCREAMS_DATA:
      return {
        ...state,
        loadingMyScreams: true,
      };

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };

    case SET_MY_SCREAMS:
      return {
        ...state,
        myScreams: action.payload,
        loadingMyScreams: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
        loadingIdea: false,
      };

    case SET_SCREAM_USER:
      return {
        ...state,
        scream_user: action.payload,
      };

    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      let index_delete = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index_delete, 1);
      return {
        ...state,
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case SET_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };

    case DELETE_COMMENT:
      const listComments = state.scream.comments.filter(
        (comment) => comment.commentId !== action.payload
      );
      state.scream.comments = listComments;
      return {
        ...state,
      };

    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case EDIT_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };

    case LOADING_PROJECTS_DATA:
      return {
        ...state,
        loadingProjects: true,
      };

    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loadingProjects: false,
      };

    case SET_PROJECT:
      return {
        ...state,
        project: action.payload,
        // projectScreams: action.payload,
        // loadingProjectScreams: false,
      };

    case SET_FULL_SCREAMS:
      return {
        ...state,
        full_screams: action.payload,
        loading: false,
      };

    case SET_COOKIES:
      return {
        ...state,
        cookie_settings: action.payload,
      };

    case SET_MAP_LOADED:
      return {
        ...state,
        mapLoaded: true,
      };

    case SET_MAP_VIEWPORT:
      return {
        ...state,
        mapViewport: action.payload,
      };

    case SET_INITIAL_MAP_VIEWPORT:
      return {
        ...state,
        initialMapViewport: action.payload,
      };

    case SET_MAP_BOUNDS:
      return {
        ...state,
        mapBounds: action.payload,
      };

    case SET_INITIAL_MAP_BOUNDS:
      return {
        ...state,
        initialMapBounds: action.payload,
      };

    case SET_TOPICS:
      const indexOfTopic = state.topics.indexOf(action.payload);

      if (action.payload === "all") {
        return {
          ...state,
          topics: defaultTopics,
        };
      } else if (state.topics.length === 7) {
        //
        return { ...state, topics: [action.payload] };
      } else if (indexOfTopic === -1) {
        // topic does not exist, add it

        return { ...state, topics: [...state.topics, action.payload] };
      } else {
        // topic exists, remove it
        const removedTopicArray = state.topics.filter(
          (item) => item !== action.payload
        );
        if (removedTopicArray.length === 0) {
          //show default if all topics removed
          return {
            ...state,
            topics: defaultTopics,
          };
        } else {
          // show remaining after removal
          return { ...state, topics: [...removedTopicArray] };
        }
      }
    default:
      return state;
  }
}
