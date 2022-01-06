import { collection, getDocs } from 'firebase/firestore';

import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        dispatch(fetchCollectionsStart());

        getDocs(collection(firestore, "collections"))
        .then(doc => {
            const collectionsMap = convertCollectionsSnapshotToMap(doc);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}
