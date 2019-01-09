import React from 'react';
import Note from './Note';
import moment from 'moment';

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			currentTime: moment().set({'hour': 0, 'minute': 0, 'second': 0}),
			timer: null,
			noteShow: false,
		};
		this.toggleRunning = this.toggleRunning.bind(this);
		this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.toggleNotes = this.toggleNotes.bind(this);
		this.notes = React.createRef();
		this.getTime = this.getTime.bind(this);
	}

	toggleRunning() {
		// Toggle the state
		this.setState({
			running: !this.state.running
		}, () => {
			// If running timer
			if (this.state.running) {
				this.setState({
					timer: setInterval(() => {
						this.setState({
							currentTime: this.state.currentTime.add(1, 's')
						}, () => {
							this.saveToLocalStorage(this.state.currentTime);
						});
					}, 1000)
				})
			} else {
				clearInterval(this.state.timer);
			}
		});
	}

	componentDidMount() {
		this.getFromLocalStorage();
	}

	saveToLocalStorage(currentTime) {
		localStorage.setItem('currentTime', JSON.stringify(currentTime));
	}

	getFromLocalStorage() {
		if (localStorage.getItem('currentTime')) {
			this.setState({
				currentTime: moment(JSON.parse(localStorage.getItem('currentTime')))
			});
		}
	}

	resetTimer() {
		clearInterval(this.state.timer);
		this.setState({
			currentTime: moment().set({'hour': 0, 'minute': 0, 'second': 0}),
			running: false
		}, () => {
			this.notes.current.reset();
			this.saveToLocalStorage(this.state.currentTime);
		});
	}

	toggleNotes() {
		this.setState({
			noteShow: !this.state.noteShow
		});
	}

	getTime() {
		return this.state.currentTime;
	}

	render() {
		return (
			<div className="timerAndNote">
				<div className={`box timer-holder animated bounceInDown has-text-centered m-b-0 ${(this.state.noteShow) ? 'm-r-30' : ''}`}>
					<div className="time has-text-weight-bold">
						{ this.state.currentTime.format('HH:mm:ss') }
					</div>
					<div className="buttons m-t-10">
						<div className="button is-primary" onClick={ this.toggleNotes }>
							<span className="icon is-small">
								<i className="fa fa-sticky-note"></i>
							</span>
						</div>
						<div className="button is-primary" onClick={ this.toggleRunning }>
							<span className="icon is-small">
								<i className={`fa ${!this.state.running ? 'fa-play' : 'fa-pause'}`}></i>
							</span>
						</div>
						<div className="button is-primary" onClick={ this.resetTimer }>
							<span className="icon is-small">
								<i className="fa fa-refresh"></i>
							</span>
						</div>
					</div>
				</div>
				<Note getTime={ this.getTime } ref={ this.notes } className={`${!this.state.noteShow ? 'is-hidden' : ''}`}></Note>
			</div>
		);
	}
}

export default Timer;