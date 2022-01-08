import React, { useEffect } from "react";
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import CollectionsOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = ({ 
    fetchCollectionsStart, 
    match,
}) => {
    const dispatch = useDispatch();
    const fetchCollectionStartHandler = dispatch(fetchCollectionsStart());

    useEffect(() => {
        fetchCollectionStartHandler();
    }, [
        fetchCollectionStartHandler,
    ])

    return (
        <div className="shop-page">
            <Route 
                exact path={`${match.path}`}
                component={CollectionsOverviewContainer}
            />
            <Route
                path={`${match.path}/:collectionId`}
                component={CollectionPageContainer}
            />
        </div>
    )
}

export default ShopPage;
