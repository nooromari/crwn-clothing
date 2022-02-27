import React from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

import CollectionsOverViewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import { useEffect } from "react";

const ShopPage = ({ fetchCollectionsStartAsync, match}) => {

  useEffect(() => {
   fetchCollectionsStartAsync();
  }, [fetchCollectionsStartAsync])


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

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);
