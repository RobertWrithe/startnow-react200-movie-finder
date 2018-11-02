import React from 'react';
import { connect } from 'react-redux';

class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { details } = this.props;

        return (
            <div>
                <h1>Movie Detail </h1>

                <p>Movie IMDB ID: {this.props.match.params.id}</p>

                <p>{details.Title}</p>

                <a href='#/'>Back</a>
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