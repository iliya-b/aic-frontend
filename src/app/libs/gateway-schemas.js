'use strict';

// Should avoid to use eslint-disable-line camelcase
// But in this file is OK since we define the schemes passed to back-end

// JSON schemes to validated objects sent to back-end API
// TODO: should validate the schema received from back-end

const GatewaySchemas = {
	projects: {
		type: 'object', strict: true,
		properties: {
			project_name: {type: 'string'} // eslint-disable-line camelcase
		}
	},
	userLogin: {
		type: 'object', strict: true,
		properties: {
			username: {type: 'string', rules: ['trim']},
			password: {type: 'string'}
		}
	},
	live: {
		type: 'object', strict: true,
		properties: {
			image: {type: 'string'},
			project_id: {type: 'string'}, // eslint-disable-line camelcase
			avm_name: {type: 'string'}, // eslint-disable-line camelcase
			hwconfig: {
				type: 'object',
				strict: true,
				properties: {
					width: {type: 'integer', optional: true},
					height: {type: 'integer', optional: true},
					dpi: {type: 'integer', optional: true},
					enable_sensors: {type: 'integer', min: 0, max: 1, optional: true}, // eslint-disable-line camelcase
					enable_battery: {type: 'integer', min: 0, max: 1, optional: true}, // eslint-disable-line camelcase
					enable_gps: {type: 'integer', min: 0, max: 1, optional: true}, // eslint-disable-line camelcase
					enable_camera: {type: 'integer', min: 0, max: 1, optional: true}, // eslint-disable-line camelcase
					// enable_record: {type: 'integer', min: 0, max: 1, optional: true}, // eslint-disable-line camelcase
					enable_gsm: {type: 'integer', min: 0, max: 1, optional: true}, // eslint-disable-line camelcase
					enable_nfc: {type: 'integer', min: 0, max: 1, optional: true} // eslint-disable-line camelcase
				}
			}
		}
	},
	sensors: {
		'accelerometer': {
			type: 'object',
			strict: true,
			properties: {
				x: {type: 'number'},
				y: {type: 'number'},
				z: {type: 'number'}
			}
		},
		'battery': {
			type: 'object',
			strict: true,
			properties: {
				level_percent: {type: 'number', min: 0, max: 100}, // eslint-disable-line camelcase
				ac_online: {type: 'integer', min: 0, max: 1} // eslint-disable-line camelcase
			}
		},
		'gps': {
			type: 'object',
			strict: true,
			properties: {
				latitude: {type: 'number'},
				longitude: {type: 'number'}
			}
		},
		'gravity': {
			type: 'object',
			strict: true,
			properties: {
				x: {type: 'number'},
				y: {type: 'number'},
				z: {type: 'number'}
			}
		},
		'gyroscope': {
			type: 'object',
			strict: true,
			properties: {
				azimuth: {type: 'number'},
				pitch: {type: 'number'},
				roll: {type: 'number'}
			}
		},
		'light': {
			type: 'object',
			strict: true,
			properties: {
				light: {type: 'number'}
			}
		},
		'linear_acc': { // eslint-disable-line camelcase
			type: 'object',
			strict: true,
			properties: {
				x: {type: 'number'},
				y: {type: 'number'},
				z: {type: 'number'}
			}
		},
		'magnetometer': {
			type: 'object',
			strict: true,
			properties: {
				x: {type: 'number'},
				y: {type: 'number'},
				z: {type: 'number'}
			}
		},
		'orientation': {
			type: 'object',
			strict: true,
			properties: {
				azimuth: {type: 'number'},
				pitch: {type: 'number'},
				roll: {type: 'number'}
			}
		},
		'pressure': {
			type: 'object',
			strict: true,
			properties: {
				pressure: {type: 'number'}
			}
		},
		'proximity': {
			type: 'object',
			strict: true,
			properties: {
				distance: {type: 'number'}
			}
		},
		// TODO: senza does not have schema
		'recording': {
			type: 'object',
			strict: true,
			properties: {
				filename: {type: 'string'},
				start: {type: 'integer', min: 0, max: 1}
			}
		},
		'relative_humidity': { // eslint-disable-line camelcase
			type: 'object',
			strict: true,
			properties: {
				relative_humidity: {type: 'number'} // eslint-disable-line camelcase
			}
		},
		// TODO: remove system?
		// TODO: senza does not have schema
		'system': {
			type: 'object',
			strict: true,
			properties: {
				uid: {type: 'string'},
				command: {type: 'string'},
				params: {type: 'string'}
			}
		},
		'temperature': {
			type: 'object',
			strict: true,
			properties: {
				temperature: {type: 'number'}
			}
		},
		'gsm/call': {
			type: 'object',
			strict: true,
			properties: {
				action: {
					enum: ['accept', 'cancel', 'hold', 'receive']
				},
				phone_number: {type: 'string'} // eslint-disable-line camelcase
			}
		},
		'gsm/network': {
			type: 'object',
			strict: true,
			properties: {
				type: {enum: ['umts', 'lte', 'gprs', 'gsm', 'hspa', 'edge', 'cdma', 'evdo', 'hsdpa', 'hsupa', 'full']}
			}
		},
		'gsm/registration': {
			type: 'object',
			strict: true,
			properties: {
				type: {enum: ['home', 'denied', 'searching', 'roaming', 'none']}
			}
		},
		'gsm/signal': {
			type: 'object',
			strict: true,
			properties: {
				strength: {type: 'integer', min: 0, max: 4}
			}
		},
		'gsm/sms': {
			type: 'object',
			strict: true,
			properties: {
				phone_number: {type: 'string'}, // eslint-disable-line camelcase
				text: {type: 'string'}
			}
		},
		'camera': {
			type: 'object',
			strict: true,
			properties: {
				file_id: {type: 'string'} // eslint-disable-line camelcase
			}
		}
	},
	monkeyRunner: {
		type: 'object',
		strict: true,
		properties: {
			packages: {type: 'array'}, // eslint-disable-line camelcase
			throttle: {type: 'integer', optional: true},
			event_count: {type: 'integer'} // eslint-disable-line camelcase
		}
	},
	campaign: {
		type: 'object'
		// strict: true,
		// properties: {
		// 	images: {type: 'array'}, // eslint-disable-line camelcase
		// 	apks: {type: 'array'}, // eslint-disable-line camelcase
		// 	packages: {type: 'array', optional: true}, // eslint-disable-line camelcase
		// 	campaign_name: {type: 'string'} // eslint-disable-line camelcase
		// }
	}
};

module.exports = GatewaySchemas;
