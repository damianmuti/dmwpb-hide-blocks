import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register } from '@wordpress/data';


// Some default values
const DEFAULT_STATE = {
	setConditions: {},
},
DEFAULT_ACTION = {};

// Actions which can be carried out on the data store
const actions = {
  setState( conditions, setConditions ) {
    return {
      type: 'SET_CONDITIONS',
      conditions,
      setConditions,
    };
  },
  fetchFromAPI( path ) {
    return {
      type: 'FETCH_FROM_API',
      path,
    };
  },
};

// Create a store which we can use via wp.data.select('dmwpb-hide-block/conditions')
const setConditionsStore = createReduxStore( 'dmwpb-hide-blocks/conditions', {
  reducer( state = DEFAULT_STATE, action = DEFAULT_ACTION ) {
    // Update the state with the fetched value
    switch ( action.type ) {
      case 'SET_CONDITIONS':
        const updatedState = {
          ...state,
          setConditions: action.setConditions,
        };
        return updatedState;
    }

    return state;
  },

  actions,

  selectors: {
    getConditions( state, conditions ) {
      // Get the value from the state object
      const { setConditions } = state;
      return setConditions;
    },
  },

  controls: {
    FETCH_FROM_API( action ) {
      // Get the data from the API route
      return apiFetch( { path: action.path } );
    },
  },

  resolvers: {
    *getConditions( conditions ) {
      // Get the results from the API and update the state object.
      const path = '/dmwpb-hide-blocks/v1/block-conditions';
      const setConditions = yield actions.fetchFromAPI(path);

      return actions.setState( conditions, setConditions );
    },
  },
} );

register( setConditionsStore );