export const initState = {
      id: "",
      username: "",
      email: "",
      password: "",
};

const userReducer = (state = initState, action) => {
      switch (action.type) {
            //Change character name
            case 'USER_ID':
                  return {
                        ...state,
                        id: action.payload
                  }
            case 'USER_USERNAME':
                  return {
                        ...state,
                        username: action.payload
                  }
            case 'USER_EMAIL':
                  return {
                        ...state,
                        email: action.payload
                  }
            case 'USER_PASSWORD':
                  return {
                        ...state,
                        password: action.payload
                  }
            default:
                  return state
      }
}

export default userReducer;