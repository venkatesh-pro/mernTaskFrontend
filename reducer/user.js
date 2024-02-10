let initialState = null;

if (typeof window !== "undefined") {
  if (localStorage.getItem("user")) {
    initialState = JSON.parse(localStorage.getItem("user"));
  } else {
    initialState = null;
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
