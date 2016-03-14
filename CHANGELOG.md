# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [Unreleased]

### Added
- Live GSM calls (not yet ready on the backend and changes on the API are to come)

### Fixed
- Fix live rotation
- Fix next path on logout/redirection
- Fix home redirection when already logged

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