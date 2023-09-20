module.exports = {
	testEnvironment: 'node',
	roots: ['<rootDir>/tests'],
	transform: {
		'^.+.tsx?$': 'ts-jest',
	},
	testRegex: '(/tests/.|(.|/)(test|spec)).(jsx?|tsx?)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	collectCoverageFrom: ['./src/modules/*/*.ts'],
	coverageDirectory: 'coverage',
	verbose: true,
};
