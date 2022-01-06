import { takeLatest, call, put, all } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';

import ShopActionTypes from './shop.types';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure,
} from './shop.action'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export function* fetchCollectionsAsync() {
    try {
        const snapshot = yield getDocs(collection(firestore, "collections"));
    
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        yield put(fetchCollectionsSuccess(collectionsMap));

    } catch(err) {
        yield put(fetchCollectionsFailure(err.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync,
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
  }
