import type { Config } from 'jest';

const config: Config = {
	roots: ['<rootDir>/src'],

	collectCoverage: true,

	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

	coverageDirectory: 'coverage',

	coveragePathIgnorePatterns: [
		'/node_modules/',
		'\\.protocol\\.ts$',
		'\\.model\\.ts$',
		'/protocols/',
		'/config/',
		'/main/',
		'/domain/*',
	],

	coverageProvider: 'v8',

	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper:{
		'@/(.*)': '<rootDir>/src/$1',
	}
};

export default config;