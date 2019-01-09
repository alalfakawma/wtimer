import React from 'react';

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: []
		};
		this.saveNote = this.saveNote.bind(this);
		this.noteInput = React.createRef();
		this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
	}

	saveNote(e) {
		if (e.key === "Enter") {
			const note = e.target.value;
			const time = this._reactInternalFiber._debugOwner.stateNode.state.currentTime;
			const notes = this.state.notes;
			notes.push({
				'note': note,
				'time': time.format('HH:mm:ss')
			});
			this.setState({
				notes: notes
			}, () => {
				this.saveToLocalStorage(this.state.notes);
				this.noteInput.current.value = "";
			});
		}
	}

	componentDidMount() {
		this.getFromLocalStorage();
	}

	saveToLocalStorage(notes) {
		localStorage.setItem('notes', JSON.stringify(notes));
	}

	reset() {
		this.setState({
			notes: []
		}, () => {
			this.saveToLocalStorage([]);
		});
	}

	getFromLocalStorage() {
		if (localStorage.getItem('notes')) {
			this.setState({
				notes: JSON.parse(localStorage.getItem('notes'))
			});
		}
	}

	render() {
		return (
			<div className={`box note-holder animated bounceInRight ${this.props.className}`}>
				<div className="title is-5 m-b-20">Notes -</div>
					{ this.state.notes.map((note, i) => {
						return (
							<div className="columns" key={i}>
								<div className="column is-three-quarters p-t-0 p-b-0">{note.note}</div>
								<div className="column has-text-right p-t-0 p-b-0">{note.time}</div>
							</div>
						);
					}) }
				<input ref={ this.noteInput } type="text" placeholder="Enter note..." className="input is-small" onKeyPress={ this.saveNote }/>
			</div>
		);
	}
}

export default Note;