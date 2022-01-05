import React from "react";
import { Route } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { updateCollections } from '../../redux/shop/shop.action';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true,
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        // Promise method
        getDocs(collection(firestore, "collections")).then(doc => {
            const collectionsMap = convertCollectionsSnapshotToMap(doc);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })

        // Observer method
        // onSnapshot(collection(firestore, "collections"),async (doc) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(doc);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // })
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className="shop-page">
                <Route 
                    exact path={`${match.path}`}
                    render={(props) => <CollectionsOverviewWithSpinner 
                        isLoading={loading} 
                        {...props} 
                    />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner 
                        isLoading={loading} 
                        {...props} 
                    />}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
})

export default connect(
    null,
    mapDispatchToProps,
)(ShopPage);
