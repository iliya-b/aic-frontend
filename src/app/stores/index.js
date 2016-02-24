module.exports = {
	AuthStore: require('./auths'),
	ProjectStore: require('./project'),
	APKStore: require('./apk'),
	APKUploadStore: require('./apk-upload'),
	APKTestStore: require('./apk-test'),
	APKTestUploadStore: require('./apk-test-upload'),
	LiveStore: require('./live'),
	LiveListStore: require('./live-list'),
	CampaignStore: require('./campaign'),
	BackendAPI: require('./backend-api'),
	AppConfigStore: require('./app-config'),
	PollingStore: require('./polling')
};
