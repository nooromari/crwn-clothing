import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import React from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

import CollectionOverView from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverViewWithSpinner = WithSpinner(CollectionOverView);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const db = getFirestore();
    onSnapshot(collection(db, "collections"), (snapshot) => {
      const collecttionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collecttionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverViewWithSpinner isLoading={loading} {...props} />} />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collecttionsMap) =>
    dispatch(updateCollections(collecttionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
