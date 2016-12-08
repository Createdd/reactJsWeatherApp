var initialState = {
  location: 'Vienna, Austria',
  data: {},
  dates: [],
  temps: [],
  selected: {
    date: '',
    temp: null
  }
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        location: action.location
      });
    case 'SET_SELCTED_TEMP':
      return Object.assign({},state, {
        selected: {
          temp: action.temp,
          date: state.selected.date
        }
      });
    case 'SET_SELCTED_DATE':
    return Object.assign({},state, {
      selected: {
        date: action.date,
        temp: state.selected.temp
      }
    });
    default:
      return state;
  }
}
