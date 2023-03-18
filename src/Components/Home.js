import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist, getAllData } from "../Redux/Action";
import { PUBLIC_IMAGES_PATH } from "../Redux/Constants";
import "./CSS/Home.css";

const Home = () => {
  const [focused, setFocused] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Reducer.getAllData);
  console.log(data);
  const wishlistData = useSelector((state) => state.Reducer.wishlistItems);

  useEffect(() => {
    dispatch(getAllData(query));
  }, [query]);

  function handleInputChange(event) {
    const { value } = event.target;
    if (value === "") {
      setQuery("");
    } else {
      setQuery(value);
    }
  }
  function addWishlist(item) {
    dispatch(addToWishlist(item));
  }
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Home</h1>
        <div className="dekstopView">
          <div className="search-form">
            <form>
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setFocused({ name: true })}
                focused={focused.name?.toString()}
                className="SearchInput"
                value={query}
                onChange={handleInputChange}
              />
            </form>
            {query.length > 0 && (
              <div className="suggestions-container">
                {data?.bestMatches?.map((item, ind) => (
                  <div className="suggestion" key={ind}>
                    {item["2. name"]}
                    <span>score:({item["9. matchScore"]})</span>
                    <button
                      className="AddToWishlist"
                      onClick={() => addWishlist(item)}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/watchlist">
                <div className="wishMain">
                  <div class="circle">
                    <span class="number">{wishlistData.length}</span>
                  </div>
                  <span className="wishLink">Watchlist</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div
        className="homeBody"
        style={{
          backgroundImage: `url(${PUBLIC_IMAGES_PATH + "/stockmarketbg.jpg"})`,
        }}
      >
        <div className="search-form">
          <form>
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setFocused({ name: true })}
              focused={focused.name?.toString()}
              className="SearchInput"
              value={query}
              onChange={handleInputChange}
            />
          </form>
          {query.length > 0 && (
            <div className="suggestions-container">
              {data?.bestMatches?.map((item, ind) => (
                <div className="suggestion" key={ind}>
                  {item["2. name"]}
                  <span>score:({item["9. matchScore"]})</span>
                  <button
                    className="AddToWishlist"
                    onClick={() => addWishlist(item)}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
