import { takeLatest, put, all, call } from 'redux-saga/effects';
import { signInWithPopup } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

import UserActionTypes from './user.types';
import { googleSignInFailure, googleSignInSuccess } from './user.actions';

import { 
    auth, 
    googleProvider,
    createUserProfileDocument,
} from '../../firebase/firebase.utils';

export function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        
        const userRef = yield call(createUserProfileDocument, user);

        const userSnapshot = yield getDoc(userRef);

        yield put(googleSignInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))

    } catch(err) {
        yield put(googleSignInFailure(err))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
    ])
}
