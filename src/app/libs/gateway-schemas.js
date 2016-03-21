'use strict';

// Should avoid to use eslint-disable-line camelcase
// But in this file is OK since we define the schemes passed to back-end

// JSON schemes to validated objects sent to back-end API

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
			project_id: {type: 'string'} // eslint-disable-line camelcase
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
		}
	}// ,
	// gsm: {
	// 	call: {
	// 		type: 'object',
	// 		strict: true,
	// 		properties: {
	// 			action: {
	// 				enum: ['accept', 'cancel', 'hold', 'receive']
	// 			},
	// 			phone_number: {type: 'string'} // eslint-disable-line camelcase
	// 		}
	// 	},
	// 	network: {
	// 		type: 'object',
	// 		strict: true,
	// 		properties: {
	// 			type: {enum: ['umts', 'lte', 'gprs', 'gsm', 'hspa', 'edge', 'cdma', 'evdo', 'hsdpa', 'hsupa', 'full']}
	// 		}
	// 	},
	// 	registration: {
	// 		type: 'object',
	// 		strict: true,
	// 		properties: {
	// 			type: {enum: ['home', 'denied', 'searching', 'roaming', 'none']}
	// 		}
	// 	},
	// 	signal: {
	// 		type: 'object',
	// 		strict: true,
	// 		properties: {
	// 			strength: {type: 'integer', min: 0, max: 4}
	// 		}
	// 	},
	// 	sms: {
	// 		type: 'object',
	// 		strict: true,
	// 		properties: {
	// 			phone_number: {type: 'string'}, // eslint-disable-line camelcase
	// 			text: {type: 'string'}
	// 		}
	// 	}
	// }
};

module.exports = GatewaySchemas;
