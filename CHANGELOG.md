# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.10] - 2022-03-08
### Fixed
- `forceComplete` endpoint does not provide a response body. so, it was throwing a fetch error

## [1.2.9] - 2021-10-27
### Changed
- Constructor for Onfleet class should include `defaultPath` & `defaultApiVersion` to better support local dev environments

## [1.2.8] - 2021-10-11
### Changed
- Relocate `depleted` event handler

## [1.2.7] - 2021-08-23
### Added
- Enable passing `baseURL` as param to `Onfleet`'s constructor
- README in ES
- CHANGELOG
### Changed
- Bump `path-parse` from 1.0.6 to 1.0.7

## [1.2.6] - 2021-08-09
### Fixed
- Bugfix for `workers.getByLocation`

## [1.2.5] - 2021-06-28
### Added
- POST and PUT operations on Hubs endpoint

## [1.2.4] - 2021-06-04
### Added
- Customizable Bottleneck options

## [1.2.3] - 2021-05-19
### Added
- Worker estimate endpoint

## [1.2.2] - 2021-05-13
### Added
- Metadata query support (#35)
- `auto-dispatch` endpoint

## [1.2.1] - 2021-03-10
### Changed
- Enhance wrapper to support admin terminology

## [1.2.0] - 2021-01-29
### Changed
- Enhance wrapper with customizable timeout (#24)
### Fixed
- Rate limiting bug (#28)

## [1.1.1] - 2020-10-07
### Changed
- Update Bottleneck constants to better fit real-life API usage (#23)
- Update `node-fetch` dependency version

## [1.1.0] - 2020-06-11
### Fixed
- Rate-limiting reservoir bug when rate limit errors are hit (#19)

## [1.0.9] - 2020-05-27
### Changed
- Misc improvements

## [1.0.8] - 2020-05-27
### Changed
- Bumping universal timeout from 10s to 70s to match API actual timeout limit (#17)
### Fixed
- Content type typo

## [1.0.7] - 2020-05-06
### Changed
- Rate limiting approved
- Update documentation to include rate limiting
### Fixed
- Security update for package.json

## [1.0.5] - 2019-12-30
### Added
- Included type definition for TypeScript (#7)
### Fixed
- Error bugs (#8)

## [1.0.4] - 2019-09-18
### Fixed
- `eslint-util` package.json vulnerability fix

## [1.0.3] - 2019-07-08
### Added
- Badges for download metrics, Travis CI builds, and updated documentation
### Fixed
- package.json vulnerabilities

## [1.0.2] - 2019-05-21
### Added
- Initial release on npm

[Unreleased]: https://github.com/onfleet/node-onfleet/compare/v1.2.9...HEAD
[1.2.10]: https://github.com/onfleet/node-onfleet/compare/v1.2.9...v1.2.10
[1.2.9]: https://github.com/onfleet/node-onfleet/compare/v1.2.8...v1.2.9
[1.2.8]: https://github.com/onfleet/node-onfleet/compare/v1.2.7...v1.2.8
[1.2.7]: https://github.com/onfleet/node-onfleet/compare/v1.2.6...v1.2.7
[1.2.6]: https://github.com/onfleet/node-onfleet/compare/v1.2.5...v1.2.6
[1.2.5]: https://github.com/onfleet/node-onfleet/compare/v1.2.4...v1.2.5
[1.2.4]: https://github.com/onfleet/node-onfleet/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/onfleet/node-onfleet/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/onfleet/node-onfleet/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/onfleet/node-onfleet/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/onfleet/node-onfleet/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/onfleet/node-onfleet/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/onfleet/node-onfleet/compare/v1.0.9...v1.1.0
[1.0.9]: https://github.com/onfleet/node-onfleet/compare/v1.0.8...v1.0.9
[1.0.8]: https://github.com/onfleet/node-onfleet/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/onfleet/node-onfleet/compare/v1.0.5...v1.0.7
[1.0.5]: https://github.com/onfleet/node-onfleet/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/onfleet/node-onfleet/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/onfleet/node-onfleet/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/onfleet/node-onfleet/releases/tag/v1.0.2
