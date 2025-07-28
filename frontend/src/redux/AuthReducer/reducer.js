// redux/AuthReducer/reducer.js
const initialState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: "",
  isStaff: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_REQUEST":
      return { ...state, isLoading: true, isError: false };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        isStaff: payload.isStaff,
      };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, isError: true };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};
