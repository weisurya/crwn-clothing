// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {doc, onSnapshot} from 'firebase/firestore' 

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { firestore, auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null
  
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        await createUserProfileDocument(userAuth);

        onSnapshot(doc(firestore, "users", userAuth.uid), (doc) => {

          this.setState({
            currentUser: {
              id: doc.id,
              ...doc.data(),
            }
          });
        })
        
      } else {
        this.setState({
          currentUser: userAuth,
        });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
       <Header currentUser={this.state.currentUser} />
       <Routes>
         <Route path='/' element={<HomePage />}/>
         <Route path='/shop' element={<ShopPage />}/>
         <Route path='/signin' element={<SignInAndSignUpPage />}/>
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

export default App;
