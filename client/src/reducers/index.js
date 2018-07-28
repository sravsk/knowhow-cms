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

const role = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_ROLE':
    return Object.assign({}, state, {
      role: role
    });
    default:
      return state
  }
}

const AppReducer = combineReducers({
  user,
  company,
  role
})

export default AppReducer;
