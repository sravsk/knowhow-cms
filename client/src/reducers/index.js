import { combineReducers } from 'redux';

const user = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_USER':
    return Object.assign({}, state, {
      user: someUser
    });
    default:
      return state
  }
}

const company = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_COMPANY_HASH':
    return Object.assign({}, state, {
      company: someCompHash
    });
    default:
      return state
  }
}

const AppReducer = combineReducers({
  user,
  company
})

export default AppReducer;
