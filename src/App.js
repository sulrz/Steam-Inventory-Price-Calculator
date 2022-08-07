import './App.css';
import React from 'react';
import InventoryPage from './components/Inventory/InventoryPage';

function App() {

  const [data, setData] = React.useState({});
  const [assets, setAssets] = React.useState([]);
  const [descriptions, setDescriptions] = React.useState([]);
  const [itemInfos, setItemInfos] = React.useState({});
  const [itemPrices, setItemPrices] = React.useState({});

  const inventoryUrl = "https://steamcommunity.com/inventory/76561198355571856/730/2?l=english&count=5000";
  const marketPricesUrl = "http://csgobackpack.net/api/GetItemsList/v2/";

  React.useEffect(() => {
    fetch(inventoryUrl)
      .then(res => res.json())
      .then(res => setData(res));

    fetch(marketPricesUrl)
      .then(res => res.json())
      .then(res => setItemPrices(res["items_list"]))
      .then(console.log(itemPrices));
  }, []);

  React.useEffect(() => {
    if (!data) return;
  
    setAssets(data["assets"]);
    setDescriptions(data["descriptions"]);
  }, [data]);

  React.useEffect(() => {
    if (!descriptions) return;

    setItemInfos(() => {
      descriptions.map(description => 
        setItemInfos(prevState => ({
          ...prevState,
          [description["classid"]]: description
        }))
      )
    });
  }, [descriptions]);

  return (
    <div className="App">
      <InventoryPage
        assets = {assets}
        itemInfos = {itemInfos}
        itemPrice = {itemPrices}
      />
    </div>
  );
}

export default App;
