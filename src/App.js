// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {doc, onSnapshot} from 'firebase/firestore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { firestore, auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null
  
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        await createUserProfileDocument(userAuth);

        onSnapshot(doc(firestore, "users", userAuth.uid), (doc) => {
          setCurrentUser({
            id: doc.id,
            ...doc.data(),
          });
        })
        
      } 
      
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
       <Header />
       <Routes>
         <Route path='/' element={<HomePage />}/>
         <Route path='/shop' element={<ShopPage />}/>
         <Route path='/checkout' element={<CheckoutPage />}/>
         <Route 
          path='/signin' 
          element={
            this.props.currentUser ? 
            <Navigate to='/' /> :
            <SignInAndSignUpPage />
          }
        />
         <Route 
           path="*"
           element={
             <main style={{ padding: "1rem" }}>
               <h1>There's nothing here!</h1>
             </main>
           }
         />
       </Routes>
      </div>
     );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  // Whatever object that is passed on "dispatch" would be an action object
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
