// import logo from './logo.svg';
import { GlobalStyle } from './global.styles';

import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(
  () => import('./pages/homepage/homepage.component')
)
const ShopPage = lazy(
  () => import('./pages/shop/shop.component')
)
const SignInAndSignUpPage = lazy(
  () => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
)
const CheckoutPage = lazy(
  () => import('./pages/checkout/checkout.component')
)

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])
  
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Switch>
        <Suspense fallback={<div>...loading</div>}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Suspense>
      </Switch>
    </div>
   );
}

export default App;
