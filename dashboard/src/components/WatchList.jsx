import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import axios from "axios";

import GeneralContext from "./GeneralContext";


import { useContext } from 'react';
import { PieGraph } from './PieGraph';

const WatchList = () => {

  let [watchlist, setWatchList] = useState([]);

  useEffect(() => {
    const fetchData =async()=>{
      try{
        const res =await axios.get("http://localhost:8080/allwatchlist");
        setWatchList(res.data);
      }catch(err){
        console.error(err);
      }
    }
    fetchData();
  }, [])

  const labels = watchlist.map((subArray) => subArray["name"]);
  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length}/ 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, idx) => {
          return (<WatchListItem key={idx} stock={stock} idx={idx} />);
        })}
      </ul>
      <PieGraph data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, idx }) => {
  let [showWatchListItem, setShowWatchListItem] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchListItem(true);
  }

  const handleMouseExit = (e) => {
    setShowWatchListItem(false);
  }

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className='percent'> {stock.percent}</span>
          {stock.isDown ? (<KeyboardArrowDownIcon className='down' />) : (<KeyboardArrowUpIcon className='up' />)}
          <span className='price'> {stock.price}</span>
        </div>
      </div>
      {showWatchListItem && <WatchListActions uid={stock.name} />}
    </li>
  )
}

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className='actions' key={uid}>
      <span>
        <Tooltip
          title="Buy (B)" placement='top' arrow slots={{ transition: Grow }} onClick={handleBuyClick}
        >
          <button className='buy' >Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (s)" placement='top' arrow slots={{ transition: Grow }}
        >
          <button className='sell'>Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)" placement='top' arrow slots={{ transition: Grow }}
        >
          <button className='action'>
            <BarChartOutlinedIcon className='icon' />
          </button>
        </Tooltip>
        <Tooltip
          title="More" placement='top' arrow slots={{ transition: Grow }}
        >
          <button className='action'>
            <MoreHoriz className='icon' />
          </button>
        </Tooltip>
      </span>
    </span>
  )
}