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
	Tabs,
	Tab
} = mui;

// APP
const {
	APKSelectionDialog,
	APKTestSelectionDialog,
	DeviceSelectionDialog,
	AreaStatus,
	AppUtils,
	TestResultsBox,
	LogBox,
	LogBoxRow,
	AuthRequired
} = require('app/components');

const {CampaignStore} = require('app/stores');
const {CampaignActions} = require('app/actions');

const ProjectCampaign = class extends AuthRequired {

	constructor(props) {
		super(props);
		this.state = {
			res: '',
			device: null,
			apk: [],
			apkTest: [],
			errorMessage: ''
		};

		this._onDeviceSelectClick = this._onDeviceSelectClick.bind(this);
		this._onAPKSelectClick = this._onAPKSelectClick.bind(this);
		this._onAPKTestSelectClick = this._onAPKTestSelectClick.bind(this);
		this._onLaunchCampaignSubmit = this._onLaunchCampaignSubmit.bind(this);
		this._onLauchAnotherCampaignSubmit = this._onLauchAnotherCampaignSubmit.bind(this);
		this._onDeviceSelect = this._onDeviceSelect.bind(this);
		this._onAPKSelect = this._onAPKSelect.bind(this);
		this._onAPKTestSelect = this._onAPKTestSelect.bind(this);
		// this.getLauchFieldsDisable = this.getLauchFieldsDisable.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
	}

	render() {
		const style = {
			paperCenter: {
				textAlign: 'center',
				padding: Spacing.desktopGutter
			},
			center: {
				textAlign: 'center'
			},
			spacing: {
				padding: Spacing.desktopGutter
			},
			error: {
				icon: {
					color: this.context.muiTheme.palette.errorColor,
					fontSize: '50px',
					float: 'left'
				},
				message: {
					color: this.context.muiTheme.palette.errorColor
				},
				status: {
					display: 'none'
				}
			},
			infoArea: {
				width: 547,
				margin: '0 auto',
				paddingBottom: `${Spacing.desktopGutter}px`
			}
		};

		const apksRendered = this.state.apk ? this.state.apk.map((item, index) => {
			return (
				<div key={index}>
					<TextField floatingLabelText="APK Name" value={item.name} disabled /><br />
					<TextField floatingLabelText="APK ID" value={item.id} disabled /><br />
				</div>
			);
		}) : null;

		const apksTestRendered = this.state.apkTest ? this.state.apkTest.map((item, index) => {
			return (
				<div key={index}>
					<TextField floatingLabelText="APK Test Name" value={item.name} disabled /><br />
					<TextField floatingLabelText="APK Test ID" value={item.id} disabled /><br />
				</div>
			);
		}) : null;

		const logBoxRows = (this.state && this.state.campaign) ? this.state.campaign.logBox.map((v, i) => {
			return <LogBoxRow key={i} time={v.time}>{v.message}</LogBoxRow>;
		}) : null;

		return (
			<div>
				<h1>Campaign</h1>
			</div>
		);
		// return (
		// 	<div>

		// 		<div style={style.infoArea}>
		// 			<AreaStatus typeName="campaign" /><br />
		// 			<div style={{width: 547}}>
		// 				<LogBox>
		// 				{logBoxRows}
		// 				</LogBox>
		// 			</div>
		// 		</div>

		// 		{this.context.appConfig.debug ? (
		// 		<div>
		// 			<Paper style={style.paperCenter}>

		// 				<h3>Debug</h3>

		// 				<FlatButton
		// 					label="Set Results"
		// 					title="Set Results"
		// 					primary
		// 					onTouchTap={this._onStateChange.bind(this, {campaign: {status: 'CAMPAIGN_STATUS_RESULTED', results: []}})}
		// 					/>

		// 			</Paper>
		// 			<br />
		// 		</div>
		// 		) : null}

		// 		{this.state && this.state.campaign && this.state.campaign.status === 'CAMPAIGN_STATUS_PREPARING' ? (

		// 		<div>
		// 		<Tabs>
		// 			<Tab label="Device" >
		// 				<Paper style={style.paperCenter}>
		// 					{this.state.device ? (
		// 					<div>
		// 						<TextField floatingLabelText="Device Name" value={this.state.device.name} disabled /><br />
		// 						<TextField floatingLabelText="Device ID" value={this.state.device.id} disabled /><br />
		// 					</div>
		// 					) : null}
		// 					<FlatButton
		// 						label="Select a device"
		// 						title="Select a device"
		// 						onTouchTap={this._onDeviceSelectClick}
		// 						linkButton
		// 						primary
		// 						/>
		// 				</Paper>
		// 			</Tab>
		// 			<Tab label="APK" >
		// 				<Paper style={style.paperCenter}>
		// 					{apksRendered}
		// 					<FlatButton
		// 						label="Select an APK"
		// 						title="Select an APK"
		// 						onTouchTap={this._onAPKSelectClick}
		// 						linkButton
		// 						primary
		// 						/>
		// 				</Paper>
		// 			</Tab>
		// 			<Tab label="APK Test" >
		// 				<Paper style={style.paperCenter}>
		// 					{apksTestRendered}
		// 					<FlatButton
		// 						label="Select an APK Test"
		// 						title="Select an APK Test"
		// 						onTouchTap={this._onAPKTestSelectClick}
		// 						linkButton
		// 						primary
		// 						/>
		// 				</Paper>
		// 			</Tab>
		// 			<Tab label="Launch" >
		// 				<Paper style={style.paperCenter}>

		// 						<div>
		// 							<FlatButton
		// 								label="Launch campaign"
		// 								title="Launch campaign"
		// 								onClick={this._onLaunchCampaignSubmit}
		// 								linkButton
		// 								primary
		// 								/>
		// 							<br />
		// 							<TextField ref="instanceName" floatingLabelText="Device Name" value={this.state.device ? this.state.device.name : ''} disabled /><br />
		// 							<TextField ref="instanceId" floatingLabelText="Device ID" value={this.state.device ? this.state.device.id : ''} disabled /><br />
		// 							{apksRendered}
		// 							{apksTestRendered}
		// 							<TextField ref="ProjectId" floatingLabelText="Project ID" value={''} disabled /><br />
		// 						</div>

		// 				</Paper>
		// 			</Tab>
		// 		</Tabs>

		// 		<DeviceSelectionDialog projectId={null} onSelect={this._onDeviceSelect} ref="deviceDialog" />
		// 		<APKSelectionDialog projectId={null} onSelect={this._onAPKSelect} ref="APKDialog" />
		// 		<APKTestSelectionDialog projectId={null} onSelect={this._onAPKTestSelect} ref="APKTestDialog" />
		// 		</div>
		// 		) : null}

		// 		{this.state && this.state.campaign && this.state.campaign.status.substr(-6) === 'FAILED' ? (
		// 		<Paper style={style.paperCenter}>

		// 				<span style={style.error.icon} className="mdi mdi-android" />
		// 				<p style={style.error.status}>{this.state.campaign.status}</p>
		// 				<p style={style.error.message}>{this.state.campaign.message}</p>

		// 		</Paper>
		// 		) : null}

		// 		{this.state && this.state.campaign && (this.state.campaign.status === 'CAMPAIGN_STATUS_RESULTED') ? (
		// 		<Paper style={style.spacing} zDepth={0}>

		// 			<h2>Results</h2>

		// 			<TestResultsBox results={this.state.campaign.results} />

		// 			<br />

		// 			<div style={style.center} >
		// 				<FlatButton
		// 					label="Start new campaign"
		// 					title="Start new campaign"
		// 					primary
		// 					onClick={this._onLauchAnotherCampaignSubmit}
		// 					/>
		// 			</div>

		// 		</Paper>
		// 		) : null}

		// 	</div>
		// );
	}

	_onDeviceSelectClick() {
		this.refs.deviceDialog.show();
	}

	_onAPKSelectClick() {
		this.refs.APKDialog.show();
	}

	_onAPKTestSelectClick() {
		this.refs.APKTestDialog.show();
	}

	_onDeviceSelect(selectedDevice) {
		this.setState({device: selectedDevice});
	}

	_onAPKSelect(selectedAPK) {
		this.setState({apk: selectedAPK});
	}

	_onAPKTestSelect(selectedAPK) {
		this.setState({apkTest: selectedAPK});
	}

	_onLaunchCampaignSubmit() {
		const projectId = this.state.campaign.projectId;
		const instanceId = this.state.device.id;
		const instanceName = this.state.device.name;

		const APKIds = this.state.apk.map(item => {
			return item.apkId;
		});
		const APKTestIds = this.state.apkTest.map(item => {
			return item.apkId;
		});

		CampaignActions.create(projectId, instanceId, instanceName, APKIds, APKTestIds);
	}

	_onLauchAnotherCampaignSubmit() {
		// this.setState({campaign: CAMPAIGN_NOT_STARTED});
		CampaignActions.restart();
	}

	_onStateChange(state) {
		this.setState(state);
	}

	componentDidMount() {
		// const projectId = AppUtils.getProjectIdFromRouter(this.context.router);
		const projectId = this.props.params.projectId;
		this.unsubscribe = CampaignStore.listen(this._onStateChange);
		CampaignActions.reset();
		CampaignActions.setProjectId(projectId);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
	}

};

ProjectCampaign.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object,
	appConfig: React.PropTypes.object
};

ProjectCampaign.propTypes = {
	params: React.PropTypes.object
};

module.exports = ProjectCampaign;
