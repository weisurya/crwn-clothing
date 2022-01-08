import React from "react";
import { useSelector } from "react-redux";

import CollectionPreview from '../collection-preview/collection-preview.component';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import './collection-overview.styles.scss';

const CollectionOverview = () => {
    const collections = useSelector(selectCollectionsForPreview);

    return (
        <div className="collection-overview">
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))
            }
        </div>
    )
}

export default CollectionOverview;
