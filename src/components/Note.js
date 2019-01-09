import React from 'react';

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: []
		};
		this.saveNote = this.saveNote.bind(this);
		this.noteInput = React.createRef();
		this.noteHolder = React.createRef();
		this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
	}

	saveNote(e) {
		if (e.key === "Enter") {
			const note = e.target.value;
			const time = this.props.getTime();
			const notes = this.state.notes;
			notes.unshift({
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
			<div ref={ this.noteHolder } className={`box note-holder ${this.props.className}`}>
				<div className={`title is-5 ${this.state.notes.length ? 'm-b-20' : 'm-b-30'}`}>Notes -</div>
					<div className={`notes-container ${!this.state.notes.length ? 'is-hidden' : ''}`}>
						{ this.state.notes.map((note, i) => {
							return (
								<React.Fragment key={i}>
									<div className="columns">
										<div className="column is-three-quarters p-t-0 p-b-0">
											<p>{note.note}</p>
										</div>
										<div className="column has-text-right p-t-0 p-b-0">{note.time}</div>
									</div>
									<hr className="m-b-20 m-t-0"/>
								</React.Fragment>
							);
						}) }
					</div>
				<input ref={ this.noteInput } type="text" placeholder="Enter note..." className="input is-small note-input" onKeyPress={ this.saveNote }/>
			</div>
		);
	}
}

export default Note;