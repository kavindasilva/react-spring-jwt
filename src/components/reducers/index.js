import { combineReducers } from 'redux';

import { authentication } from '../reducers/authentication.reducer';
import { users } from '../reducers/users.reducer';
import { alert } from '../reducers/alert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert
});

export default rootReducer;