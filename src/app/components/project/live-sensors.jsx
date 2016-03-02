'use strict';

// React
const React = require('react');

// Material design
const mui = require('material-ui');
const {Spacing} = mui.Styles;
const {
	FlatButton,
	Paper,
	TextField,
	Slider} = mui;

// APP
const TogglableIcon = require('app/components/shared/togglable-icon');
const {LiveStore} = require('app/stores');
const {LiveActions} = require('app/actions');

const LiveSensors = class extends React.Component {

	constructor(props) {
		super(props);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleBatteryChange = this.handleBatteryChange.bind(this);
		this.handleRotationChange = this.handleRotationChange.bind(this);
		this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
		this.handleRecordStart = this.handleRecordStart.bind(this);
		this.handleRecordStop = this.handleRecordStop.bind(this);
		this.handleScreenshot = this.handleScreenshot.bind(this);
		this.state = {};
		this.setRefLat = c => this.lat = c;
		this.setRefLon = c => this.lon = c;
	}

	render() {
		const style = {
			sensors: {
				padding: Spacing.desktopGutter / 2,
				marginTop: '20px'
			},
			sensorIcon: {
				fontSize: '64px',
				padding: `${(Spacing.desktopGutter / 2)}px`
			},
			sensorBox: {
				width: '687px',
				padding: '10px',
				boxSizing: 'border-box',
				position: 'absolute',
				display: 'inline-block'
			},
			sensorIconRotationHorizontal: {
				fontSize: '64px',
				padding: `${(Spacing.desktopGutter / 2)}px`,
				transform: 'rotate(-45deg)'
			},
			sensorIconRotationVertical: {
				fontSize: '64px',
				padding: `${(Spacing.desktopGutter / 2)}px`,
				transform: 'rotate(45deg)'
			},
			sensorIconRotation: {}
		};

		// TODO: improve this if
		if (this.state.live && this.state.live.screen.rotation === 'horizontal') {
			style.sensorIconRotation = style.sensorIconRotationHorizontal;
		} else if (this.state.live && this.state.live.screen.rotation === 'vertical') {
			style.sensorIconRotation = style.sensorIconRotationVertical;
		} else {
			style.sensorIconRotation = style.sensorIcon;
		}

		// const imageNVideo = (
		// 	<div>
		// 	<TogglableIcon style={style.sensorIcon} isOn iconName="file-video"/>
		// 	<FlatButton
		// 		label="Start recording"
		// 		title="Start recording"
		// 		href="#"
		// 		primary
		// 		disabled={this.state.live.recording}
		// 		onClick={this.handleRecordStart}
		// 		/>
		// 	<FlatButton
		// 		label="Stop recording"
		// 		title="Stop recording"
		// 		href="#"
		// 		primary
		// 		disabled={!this.state.live.recording}
		// 		onClick={this.handleRecordStop}
		// 		/>
		// 	<br/>
		// 	<TogglableIcon style={style.sensorIcon} isOn iconName="file-image"
		// 	/>
		// 	<FlatButton
		// 		label="Take screen shot"
		// 		title="Take screen shot"
		// 		href="#"
		// 		primary
		// 		disabled={this.state.live.recording}
		// 		onClick={this.handleScreenshot}
		// 		/>
		// 	</div>
		// );

		if (this.state.live) {
			return (
				<Paper style={style.sensors}>
					<TogglableIcon style={style.sensorIcon} isOn iconName="battery-charging-60"/>
					<div style={style.sensorBox}>
						<Slider name="battery" max={100} min={0} step={1} value={this.state.live.battery} onChange={this.handleBatteryChange}/>
					</div> <br/>
					<TogglableIcon style={style.sensorIconRotation} isOn iconName="screen-rotation" onClick={this.handleRotationChange}/>
					<span>{this.state.live ? this.state.live.screen.rotation : ''}</span>
					<br/>
					<TogglableIcon style={style.sensorIcon} isOn iconName="map-marker"/>
					<TextField ref={this.setRefLat} floatingLabelText="latitude" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
					<TextField ref={this.setRefLon} floatingLabelText="longitude" onFocus={this.props.onInputFocus} onBlur={this.props.onInputBlur}/>
					<FlatButton
						label="Submit"
						title="Submit"
						href="#"
						primary
						onClick={this.handleLocationSubmit}
						/>
					<br/>
				</Paper>
			);
		}
		return null;
	}

	handleBatteryChange(e, value) {
		e.preventDefault();
		// const intValue = parseInt(value, 10);
		LiveActions.setSensorBattery(this.props.avmId, value);
	}

	handleRotationChange(e) {
		e.preventDefault();
		const newRotationName = this.state.live.rotationSets[this.state.live.screen.rotation].next;
		const newRotationValue = this.state.live.rotationSets[newRotationName];
		LiveActions.setSensorAccelerometer(this.props.avmId, newRotationValue.x, newRotationValue.y, newRotationValue.z, newRotationName);

		setTimeout(() => {
			LiveActions.setDelayedRotation();
		}, 1500);

		// setTimeout(function(){
		//   // debug(Live.getRotation() );
		//   if(this.state.live.screen.rotation === 'horizontal'){
		//     // debug('h');
		//     $('#novnciframe').css('width','800px').css('height','600px');
		//   }else if(this.state.live.screen.rotation === 'vertical'){
		//     // debug('v');
		//     $('#novnciframe').css('width','600px').css('height','800px');
		//   }
		// }, 1500);
	}

	handleLocationSubmit(e) {
		e.preventDefault();
		const lat = parseFloat(this.lat.getValue());
		const lon = parseFloat(this.lon.getValue());
		LiveActions.setSensorLocation(this.props.avmId, lat, lon);
	}

	handleRecordStart(e) {
		e.preventDefault();
		LiveActions.recordStart(this.state.projectId);
	}

	handleRecordStop(e) {
		e.preventDefault();
		LiveActions.recordStop(this.state.projectId, this.state.live.recordingFileName);
	}

	handleScreenshot(e) {
		e.preventDefault();
		LiveActions.screenshot(this.state.projectId);
	}

	handleStateChange(state) {
		this.setState(state);
	}

	componentDidMount() {
		this.unsubscribe = LiveStore.listen(this.handleStateChange);
		LiveActions.loadState();
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

LiveSensors.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object
};

LiveSensors.propTypes = {
	avmId: React.PropTypes.string,
	onInputFocus: React.PropTypes.func,
	onInputBlur: React.PropTypes.func
};

module.exports = LiveSensors;
