const defaultState = {
    searchInput: '',
    pending: false,
    results: 'none',
    details: 'none'
};

export default function reducers (state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'UPDATE_SEARCH_INPUT': {
            return {
                ...state,
                searchInput: payload.searchInput
            };
        }
        
        case 'GET_RESULTS_FULFILLED': {
            return {
                searchInput: '',
                pending: false, 
                results: payload.results,
                details: 'none'
            };
        }
        
        case 'GET_RESULTS_PENDING': {
            return {
              ...state,
              pending: true
            };
        }

        case 'GET_RESULTS_REJECTED': {
            return {
              ...state,
              searchInput: '',
              pending: false,
              results: 'fail'
            };
        }

        case 'GET_DETAILS_FULFILLED': {
            return {
                ...state,
                pending: false, 
                details: payload.details
            };
        }
        
        case 'GET_DETAILS_PENDING': {
            return {
              ...state,
              pending: true
            };
        }

        case 'GET_DETAILS_REJECTED': {
            return {
              ...state,
              pending: false,
              details: 'fail'
            };
        }

        default: {
            return state;
        }
    }
}