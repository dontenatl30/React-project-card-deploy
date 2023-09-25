import React, { useState } from "react";
import Nav from "./components/Nav";
import CartPage from "./components/CartPage";
import useApiFetcher from "./Hooks/useApiFetcher";
import ItemPage from "./components/ItemPage";
import Item from "./components/Item";
import "./App.css"

const summarizeCart = (cart) => {
  const groupItems = cart.reduce((summary, item) => { summary[item.id] = summary[item.id] || {
  ...item,
  count: 0 }
  summary[item.id].count++;
      return summary;
    }, {});
  return Object.values(groupItems); 
};
function App() {
  const fakeStoreUrl = "https://fakestoreapi.com/products";
  const [activeTab, setActiveTab] = useState("items");
  const { data, error, loading } = useApiFetcher(fakeStoreUrl);
  const [cart, setCart] = useState([]);


  const addToCart = (item) => {
    setCart([...cart, item]); };
  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const Content = ({ tab, onAddToCart, cart, onRemoveItem }) => {
    switch (tab) {
      case 'items':
        return <ItemPage items={data} onAddToCart={onAddToCart} />;
      case 'cart':
        return <CartPage items={cart} onAddOne={onAddToCart} onRemoveOne={onRemoveItem}/>
      default:
        break;
    }
  };

  const removeItem = (item) => {
    let index = cart.findIndex(i => i.id === item.id); if (index >= 0) {
    setCart(cart => {
    const copy = [...cart]; copy.splice(index, 1); return copy;
    }); }
    }


  return (
    <div className="bg-dark font-sans md:font-serif font-normal leading-6">
      <Nav activeTab={activeTab} 
      onTabChange={setActiveTab} />
      <main className="App-content">
        <Content 
        tab={activeTab} 
        onAddToCart={addToCart} 
        cart={summarizeCart(cart)} onRemoveItem={removeItem}/>
      </main>
    </div>
  );
}

export default App;

// https://fakestoreapi.com/docs

// https://fakerjs.dev/