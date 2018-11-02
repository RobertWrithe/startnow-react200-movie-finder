import axios from 'axios';

export function updateSearchInput(searchInput) {
    return {
        type: 'UPDATE_SEARCH_INPUT',
        payload: { searchInput }
    };
}

export function getResults(input) {
    return {
        type: 'GET_RESULTS',
        payload: axios.get(`/results/${input}`)
            .then(res => {
                console.log(res.data);
                return { results: res.data.Search }
            })
    }
};

export function getDetails(input) {
    return {
        type: 'GET_DETAILS',
        payload: axios.get(`/details/${input}`)
            .then(res => {
                console.log(res.data);
                return { details: res.data }
            })
            .then(window.location.href = `#/movie/${input}`)
    }
};