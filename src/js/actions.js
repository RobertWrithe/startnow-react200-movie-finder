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
                .then(res => { 
                    console.log('results res: ', res.data.Search);
                    return res.data.Error ? 'fail' : res.data.Search; 
                })
                .catch((err) => {
                    console.log('results err: ', err.message);
                    res.status(404).send(err.message) 
                })
    }
};

export function getDetails(input) {
    return {
        type: 'GET_DETAILS',
        payload: axios.get(`/details/${input}`)
            .then(res => { 
                console.log('details res: ', res.data);
                return res.data 
            })
            .catch((err) => {
                console.log('results err: ', err.message);
                res.status(404).send(err.message) 
        })
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