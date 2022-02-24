// import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import React from "react";
import { Route } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionsOverViewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  // state = {
  //   loading: true,
  // };

  // unsubscribeFromSnapshot = null;

  async componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    await fetchCollectionsStartAsync();
    // const { updateCollections } = this.props;
    // const db = getFirestore();
    // onSnapshot(collection(db, "collections"), (snapshot) => {
    //   const collecttionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collecttionsMap);
    //   this.setState({ loading: false });
    // });
    // collection(db, "collections").then(res => console.log(res,'reees'))
  }

  render() {
    const { match, isCollectionsLoaded } = this.props;
    // const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverViewContainer} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // isCollectionFetching : selectIsCollectionFetching,
  // isCollectionsLoaded : selectIsCollectionsLoaded
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
