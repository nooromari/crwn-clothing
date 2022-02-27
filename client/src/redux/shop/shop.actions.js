import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import shopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return async (dispatch) => {
    const db = getFirestore();

    dispatch(fetchCollectionsStart());
    onSnapshot(
      collection(db, "collections"),
      (snapshot) => {
        console.log("are you alive?");
        const collecttionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collecttionsMap));
      },
    //   (err) => {
    //     console.log("No");
    //     dispatch(fetchCollectionsFailure(err.message));
    //   }
    );
  };
};
