import {
  ADD_TO_WISHLIST,
  GET_ALL_DATA,
  REMOVE_FROM_WISHLIST,
} from "./Constants";

const initialState = {
  getAllData: [],
  wishlistItems: [],
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DATA: {
      return {
        ...state,
        getAllData: action.payload,
      };
    }
    case ADD_TO_WISHLIST: {
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    }
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item["2. name"] !== action.payload
        ),
      };
    default:
      return { ...state };
  }
};
