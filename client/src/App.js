import { Route, Switch, Redirect } from "react-router";
import React, { useEffect, lazy, Suspense } from "react";
// import "./App.css";

import { GlobalStyle } from "./global.styles";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const HomePage = lazy(() => import("./pages/homepage/homePage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SingInAndSignUp = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });

    return () => unsubscribeFromAuth();
  }, []);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              path="/signin"
              exact
              render={() =>
                currentUser ? <Redirect to="/" /> : <SingInAndSignUp />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
