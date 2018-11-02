import React from 'react';
import { connect } from 'react-redux';
import {
    updateSearchInput,
    getResults,
    getDetails
} from '../actions';

class MovieSearch extends React.Component {
    constructor(props) {
        super(props);

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleGetResults = this.handleGetResults.bind(this);
        this.handleGetDetails = this.handleGetDetails.bind(this);
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

    handleKeyPress(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            this.handleGetResults(event)
        }
    }

    render() {
        const { searchInput, results } = this.props;

        return (
            <div>
                <div>
                    <h1>Movie Finder</h1>
                    <input
                        type='text'
                        placeholder='Search Movies...'
                        id='search-input'
                        value={searchInput}
                        onChange={this.handleSearchInput}
                        onKeyUp={this.handleKeyPress}
                    />
                    <button
                        type='button'
                        id='search-button'
                        value={searchInput}
                        onClick={this.handleGetResults}
                    >Go!</button>
                </div>
                {results !== 'none' &&
                    <div>
                        <table>
                            <tbody>
                                {
                                    results.map(result => (
                                        <tr key={result.imdbID}>
                                            <td>{result.Title}</td>
                                            <td>{result.Year}</td>
                                            <td>
                                                <button
                                                    type='button'
                                                    id={`details-button-${result.imdbID}`}
                                                    value={result.imdbID}
                                                    onClick={this.handleGetDetails}
                                                >Get Details</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }
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