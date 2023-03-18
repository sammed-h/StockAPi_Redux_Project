import axios from "axios";
import Swal from "sweetalert2";
import { store } from "../Store";
import {
  ADD_TO_WISHLIST,
  GET_ALL_DATA,
  REMOVE_FROM_WISHLIST,
} from "./Constants";

export const getAllData = (query) => {
  return async (dispatch) => {
    try {
      const Api_Key = "6W45SECCL0NAHG4A";
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${Api_Key}`
      );
      const result = await response.data;
      dispatch({ type: GET_ALL_DATA, payload: result });
    } catch (error) {
      console.log(error);
    }
  };
};

export function addToWishlist(item) {
  return (dispatch, getState) => {
    console.log(getState);
    const { wishlistItems } = store.getState().Reducer;

    if (wishlistItems !== undefined && wishlistItems.length !== 0) {
      const itemExists = wishlistItems.find(
        (i) => i["2. name"] === item["2. name"]
      );
      if (itemExists) {
        // alert("Item already exists in wishlist!");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Item already exists in wishlist!",
        });
      } else {
        dispatch({ type: ADD_TO_WISHLIST, payload: item });
        // alert("Item added to wishlist!");
        Swal.fire({
          icon: "success",
          title: "Added",
          text: "Item Added in wishlist",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      dispatch({ type: ADD_TO_WISHLIST, payload: item });
      // alert("Item added to wishlist!");
      Swal.fire({
        icon: "success",
        title: "Added",
        text: "Item Added in wishlist",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
}

export function removeFromWishlist(itemId) {
  return { type: REMOVE_FROM_WISHLIST, payload: itemId };
}
