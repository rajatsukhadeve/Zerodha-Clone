import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';

import { watchlist } from '../Data/data';

const WatchList = () => {
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
          return (<WatchListItem  key ={idx} stock={stock} idx={idx} />);
        })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock ,idx }) => {
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
  return(
    <span className='actions' key={uid}>
      <span>
        <Tooltip
          title="Buy (B)" placement='top' arrow slots={{ transition: Grow }}
        >
          <button className='buy'>Buy</button>
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
            <BarChartOutlinedIcon className='icon'/>
          </button>
        </Tooltip>
        <Tooltip
          title="More" placement='top' arrow slots={{ transition: Grow }}
        >
          <button className='action'>
            <MoreHoriz className='icon'/>
          </button>
        </Tooltip>
      </span>
    </span>
  )
}