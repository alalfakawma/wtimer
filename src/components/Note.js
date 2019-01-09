import React from 'react';

class Note extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`box animated bounceInRight ${this.props.className}`}>
				This is the note app!
			</div>
		);
	}
}

export default Note;