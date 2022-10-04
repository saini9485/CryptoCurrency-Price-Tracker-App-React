import React, { useState, useEffect } from "react";
import "./Crypto.css";
import Coin from './Coin';
import axios from "axios";
export function Crypto() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
      )
      .then((response) => {
        console.log(response.data);
        setCoins([...response.data]);
      });
  }, []);
  if (toggle) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }


  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  
  return (

<>
    <div className="DarkBtn">
    {toggle ? (
      <button onClick={() => setToggle(!toggle)} className="Togglebtn">DARK THEME</button>
    ) : (
      <button onClick={() => setToggle(!toggle)}className="Togglebtn1" >LIGHT THEME</button>
    )}
  </div>


    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
          <button className="Search_Btn">Search Currency</button>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
     
    </div> </>
  );
}


