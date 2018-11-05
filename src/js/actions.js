import axios from 'axios';

export function updateSearchInput(searchInput) {
    return {
        type: 'UPDATE_SEARCH_INPUT',
        payload: searchInput
    };
};

export function getResults(input) {
    return {
        type: 'GET_RESULTS',
        payload: axios.get(`/results/${input}`)
            .then(res => res.data.Search )
    }
};

export function getDetails(input) {
    return {
        type: 'GET_DETAILS',
        payload: axios.get(`/details/${input}`)
            .then(res => res.data )
    }
};

export function backToResults(input) {
    return {
        type: 'BACK_TO_RESULTS',
        payload: input
    }
};

export function clearResults(input) {
    return {
        type: 'CLEAR_RESULTS',
        payload: input
    }
};