import React from "react";
import './ItemHolder.css'

function ItemHolder(props) {
    const [price, setPrice] = React.useState({});


    React.useEffect(() => {
        const priceUrl = "https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=";

        fetch(priceUrl + props.itemName)
            .then(res => res.json())
            .then(res => setPrice(res));
    }, []);

    return (
        <div className="ItemHolder">
            <img 
                className="ItemImage"
                src={props.imageUrl}
            />

            <h2 className="ItemName">{props.itemName}</h2>
            {price && price["success"] && 
            <h3 className="ItemPrice">Price: {price["lowest_price"]}</h3>}
        </div>
    );
}

export default ItemHolder;