import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { backToResults } from '../actions';

class MovieDetail extends React.Component {
    constructor(props) {
        super(props);

        this.handleBackToResults = this.handleBackToResults.bind(this);
    }

    handleBackToResults(event) {
        const { dispatch } = this.props;
        const { value } = event.target;
        dispatch(backToResults(value));
    }

    render() {
        const { details } = this.props;

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
                            <Link to='/'>
                                <button
                                    className='btn btn-block btn-warning'
                                    type='button'
                                    id='back-button'
                                    value='none'
                                    onClick={this.handleBackToResults}
                                >Back to Results</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-11 bg-white py-4'>
                        <div className='row d-flex justify-content-center mb-4'>
                            <div className='col-3 pr-0'>
                                <div className='card'>
                                    <img className='card-img-top' src={details.Poster} alt={details.Title + ' Poster'} />
                                </div>
                            </div>
                            <div className='col-5'>
                                <div className='card'>
                                    <div className='card-header'>
                                      <p className='m-0 text-center'>Movie Details</p>
                                    </div>
                                    <div className='card-body p-3'>
                                        <h5 className='card-title'>{details.Title}</h5>
                                        <h6 className='card-subtitle mb-2 text-muted'>{details.Year} | {details.Rated} | {details.Genre}</h6>
                                        <div className='card-text'>
                                            <p className='small mb-2'><em>Directed by: <strong>{details.Director}</strong></em></p>
                                            <p className='small mb-2'><em>Starring: <strong>{details.Actors}</strong></em></p>
                                            <p>{details.Plot}</p>
                                            <strong className='d-inline-block mr-1'>IMDb:</strong><p className='d-inline-block mr-2 mb-0'>{details.imdbRating}</p>
                                            <strong className='d-inline-block mr-1'>Metacritic:</strong><p className='d-inline-block mr-2 mb-0'>{details.Metascore}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-8'>
                                <Link to='/'>
                                    <button
                                        className='btn btn-block btn-warning'
                                        type='button'
                                        id='back-button-block'
                                        value='none'
                                        onClick={this.handleBackToResults}
                                    >Back to Results</button>
                                </Link>
                            </div>
                        </div>
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
        details: store.details
    };
}

export default connect(mapStoreToProps)(MovieDetail);