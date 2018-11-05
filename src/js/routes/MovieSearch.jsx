import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    updateSearchInput,
    getResults,
    getDetails,
    clearResults
} from '../actions';

class MovieSearch extends React.Component {
    constructor(props) {
        super(props);

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleGetResults = this.handleGetResults.bind(this);
        this.handleGetDetails = this.handleGetDetails.bind(this);
        this.handleClearResults = this.handleClearResults.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleSearchInput(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(updateSearchInput(value));
    }

    handleGetResults(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(getResults(value));
    }

    handleGetDetails(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(getDetails(value));
    }

    handleClearResults(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(clearResults(value));
    }

    handleKeyPress(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            this.handleGetResults(event)
        }
    }

    render() {
        const { searchInput, results } = this.props;

        return (
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-11 d-flex justify-content-center align-items-center py-3 bg-dark shadow-sm'>
                        <div className='card d-inline-block bg-warning text-dark mr-2'>
                            <div className='card-body p-2'>
                                <h4 className='text-center m-0'>notIMDb</h4>
                            </div>
                        </div>
                        <div className='d-inline-block'>
                            <div className='input-group fluid'>
                                <input
                                    className='form-control'
                                    type='text'
                                    id='search-input'
                                    placeholder='Find Movies and Shows...'
                                    value={searchInput}
                                    onChange={this.handleSearchInput}
                                    onKeyUp={this.handleKeyPress}
                                />
                                <div className='input-group-append'>
                                    <button
                                        className='btn btn-warning'
                                        type='button'
                                        id='search-button'
                                        value={searchInput}
                                        onClick={this.handleGetResults}
                                    ><i className='fas fa-search'></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-11 bg-white py-3'>
                        {
                            results === 'none' ?
                                <div className='container text-center'>
                                    <h3 className='display-4'>This might not be IMDb, but you can still look up details on every movie and television program out there.</h3>
                                    <h3 className='display-3'>Go on, give it a try!</h3>
                                </div>
                                :
                                results === 'fail' ?
                                    <div className='container text-center'>
                                        <h3 className='display-5'>Movie not found. Refactor search.</h3>
                                    </div>
                                    :
                                    <div>
                                        <table className='table table-striped mb-0'>
                                            <tbody>
                                                {
                                                    results.map(result => (
                                                        <tr key={result.imdbID}>
                                                            <td><img src={result.Poster} /></td>
                                                            <td id='movie-title'><strong>{result.Title}</strong></td>
                                                            <td>{result.Year}</td>
                                                            <td className='text-right'>
                                                                <Link to={'/movie/' + result.imdbID}>
                                                                    <button
                                                                        className='btn btn-outline-secondary'
                                                                        type='button'
                                                                        id={`details-button-${result.imdbID}`}
                                                                        value={result.imdbID}
                                                                        onClick={this.handleGetDetails}
                                                                    >More Info</button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <button
                                            className='btn btn-block btn-warning'
                                            type='button'
                                            id='clear-button'
                                            value='none'
                                            onClick={this.handleClearResults}
                                        >Clear Results</button>
                                    </div>
                        }
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-11 bg-light py-3 text-right'>
                        <small className='text-secondary'>Please don't sue me, IMDb.</small>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return {
        searchInput: store.searchInput,
        results: store.results
    };
}

export default connect(mapStoreToProps)(MovieSearch);