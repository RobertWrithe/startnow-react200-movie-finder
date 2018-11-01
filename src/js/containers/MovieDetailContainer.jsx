import React from 'react';

class MovieDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Movie Detail Container</h1>

                <p>Viewing movie test</p>
                {/* <p>Viewing movie {this.props.match.params}</p> */}
            </div>
        )
    }
}

export default MovieDetailContainer;