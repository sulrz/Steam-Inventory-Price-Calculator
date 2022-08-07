import React from "react";
import ItemHolder from "../ItemHolder/ItemHolder";
import './InventoryPage.css'

function InventoryPage(props) {

    function createItemHolders() {
        if (!props.assets || !props.itemInfos)
            return;

        const imageUrl = "https://community.cloudflare.steamstatic.com/economy/image/";

        return (props.assets.map(element => {
            const item = props.itemInfos[element["classid"]];
            const itemName = item["market_hash_name"];
            const marketable = item["marketable"];
            
            let price = null;
            if (marketable === 1 && props.itemPrices)
                price = props.itemPrices[itemName];

            return (
                <ItemHolder 
                    key = {element["assetid"]}
                    imageUrl = {imageUrl + item["icon_url"]}
                    itemName = {itemName}
                    itemPrice = {price && price["24_hours"]["lowest_price"]}
                />
            );
        }));
    }

    return (
        <div className="InventoryPage">
            {createItemHolders()}
        </div>
    );
}

export default InventoryPage;