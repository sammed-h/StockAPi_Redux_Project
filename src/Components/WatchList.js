import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { removeFromWishlist } from "../Redux/Action";
import { PUBLIC_IMAGES_PATH } from "../Redux/Constants";
import "./CSS/WatchList.css";
function Watchlist() {
  const data = useSelector((state) => state.Reducer.wishlistItems);
  const [watchList, setwatchList] = useState(data);
  const dispatch = useDispatch();

  useEffect(() => {
    setwatchList(data);
  }, [data]);

  const handleDelete = (name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Item Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(removeFromWishlist(name));
      }
    });
  };
  return (
    <div>
      <header className="header">
        <h1 className="title">WatchList</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <span className="homeLink">Home</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* DekstopView starts here  */}
      <div className="watchListDekstopView">
        {watchList.length != 0 ? (
          <div className="tableConatiner">
            <table className="table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Region</th>
                  <th>Currency</th>
                  <th>MatchScore</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {watchList.map((movie, index) => (
                  <tr key={index}>
                    <td>{movie["1. symbol"]}</td>
                    <td>{movie["2. name"]}</td>
                    <td>{movie["3. type"]}</td>
                    <td>{movie["4. region"]}</td>
                    <td>{movie["8. currency"]}</td>
                    <td>{movie["9. matchScore"]}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(movie["2. name"])}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Link to="/">
            <div className="watch-list">
              <img src={PUBLIC_IMAGES_PATH + "/empty.png"} />
              <p className="empty-message">
                Your watch list is empty. Add some stocks data to get started!
              </p>
            </div>
          </Link>
        )}
      </div>
      {/* DekstopView ends here  */}

      {/* MobileView starts here  */}
      <div className="watchListMobileView">
        {watchList.length != 0 ? (
          <div className="tableConatiner">
            <table className="table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {watchList.map((movie, index) => (
                  <tr key={index}>
                    <td>{movie["1. symbol"]}</td>
                    <td>{movie["2. name"]}</td>
                    <td>{movie["3. type"]}</td>
                    <td>{movie["4. region"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Link to="/">
            <div className="watch-list">
              <img src={PUBLIC_IMAGES_PATH + "/empty.png"} />
              <p className="empty-message">
                Your watch list is empty. Add some stocks data to get started!
              </p>
            </div>
          </Link>
        )}
        {watchList.length != 0 && (
          <div className="tableConatiner">
            <table className="table">
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>MatchScore</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {watchList.map((movie, index) => (
                  <tr key={index}>
                    <td>{movie["8. currency"]}</td>
                    <td>{movie["9. matchScore"]}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(movie["2. name"])}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* MobileView ends here  */}
    </div>
  );
}

export default Watchlist;
