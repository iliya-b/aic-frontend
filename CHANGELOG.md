# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [Unreleased]

### Added
- Add back button to test source editor.
- Add details page with compilation results in the test source list.

### Changed
- Fix style at live machine list.
- Fix state after saving test source file.
- Changed naming monkey runner => monkey tool.
- Fix style of status boxes in live mode.

### Removed
- Removed from APK Manager list the apks that come from test sources.

## [0.7.2]

### Added
- Add quota panel to campaign.
- Add machine information to tests running.
- Add to the CI the deployment of stories at build/stories.
- Add hwconfig to live info.
- Add rotation buttons to live.
- Add drag toolbar on live fullscreen.
- Add project details with billing values.
- Add collapse toolbar on live fullscreen.
- Add test manager (dsl).
- Add hwconfig to campaign (possibility to select device configuration for test campaign).

### Changed
- Moved all components in /#themes to storybook.
- Live code cleanup.
- Fix bugs with 180° rotation.
- Initiate some sensors when load live.
- App redesign: new theme colors and new logo.
- Remove the packages from campaign (when empty all tests will be run).

## [0.7.1]

Tagging v0.7.1 to keep up with backend version.

## [0.7.0]

### Added
- Dialog live session creation.
- User quota API integration (before was hardcoded value).
- Test manager (testsources backend API integration).
- Test campaign (campaigns backend API integration).
- Add component select field.
- Live fullscreen and fit size.
- Add CI deployment and release.
- Add Notify lib to group polling actions.

### Changed
- Update many API calls to comply with backend modifications.
- Update npm packages.
- Update async calls of live apk install and monkey runner.
- Some components from /#themes to new project frontend-stories.
- Update live list to filter out campaign machines.

Note: v0.6 skipped because we did not had a stable version to tag
before tag v0.7 arrived in the backend.

## [0.5.1]

Last tag before big changes on backend API (v0.6).

### Added
- Test Manager.

### Changed
- Fix vm list.

## [0.5.0]

Note that we skipped 0.4.* for the sake of consistency with the other
version projects of AiC.

### Added
- Reflux promise. Refactor of all the code related to backend API.
- Build with webpack.
- TOTP for VNC connection.
- Prototype banner.
- Images enabled by config.
- VM Quota limit.

### Changed
- Update packages, passing to react@v15.

### Fixed
- Fix all material-ui paths, buttons colors and toolbars alignments.

## [0.3.0]

### Added
- Secure connection with wss for websockets and https for backend.
- Live connects to gateway for the vm screen (vm docker reverse proxy).

## [0.2.4]

### Added
- Feedback for apk install and monkey runner on live.

### Fixed
- Fix project internal selected menu indication.

## [0.2.3]

### Added
- Live GSM calls.
- Live Monkey runner (panda icon).
- Project management.
- Camera assets management and live camera.

### Changed
- Update live create to JSON (update on kyaraben API).
- Update Backend API, separate into rest-api and gateway*.
- Update APK Manager now shows upload progress.

### Fixed
- Fix live rotation.
- Fix next path on logout/redirection.
- Fix home redirection when already logged.
- Fix when changed battery value on live.
- Fix VM list machine status (deleting and error where without icons).

### Removed
- Indexes files (for now while we don't have [tree shacking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)).
- Audio live (for now while backend does not support it).

## [0.2.2] - 2016-03-10

### Added
- Live VM sensors: gps, battery, accelerometer, light, gravity, gyroscope, linear_acc, magnetometer, orientation, pressure, proximity, relative_humidity, temperature.
- Live install APK.
- APK Manager: list, upload and delete APKs.
- Server error dialog appears when any request to back-end API returns 500.

### Changed
- Update of dependency packages with major API changes.

## [0.2.1] - 2016-02-29

Working version with python backend API. Before refactoring for packages update.

## [0.2.0] - 2016-02-10

Version with gitlabci build and support to python microservices back-end.

## [0.1.0] - 2015-10-08

Working version of December 2015 demo. Last version with vertx.