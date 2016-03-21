# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [Unreleased]

### Added
- Live GSM calls
- Live Monkey runner (panda icon)
- Project management

### Changed
- Update live create to JSON (update on kyaraben API)
- Update Backend API, separate into rest-api and gateway*
- Update APK Manager now shows upload progress

### Fixed
- Fix live rotation
- Fix next path on logout/redirection
- Fix home redirection when already logged
- Fix when changed battery value on live
- Fix VM list machine status (deleting and error where without icons).

### Removed
- Indexes files (for now while we don't have [tree shacking](http://www.2ality.com/2015/12/webpack-tree-shaking.html))

## [0.2.2] - 2016-03-10

### Added
- Live VM sensors: gps, battery, accelerometer, light, gravity, gyroscope, linear_acc, magnetometer, orientation, pressure, proximity, relative_humidity, temperature.
- Live install APK
- APK Manager: list, upload and delete APKs
- Server error dialog appears when any request to back-end API returns 500.

### Changed
- Update of dependency packages with major API changes.

## [0.2.1] - 2016-02-29

Working version with python backend API. Before refactoring for packages update.

## [0.2.0] - 2016-02-10

Version with gitlabci build and support to python microservices back-end.

## [0.1.0] - 2015-10-08

Working version of December 2015 demo. Last version with vertx.