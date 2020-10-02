module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  transform: {
    '^.+\\.(js)$': 'babel-jest',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/', '<rootDir>/.history/'],
  coveragePathIgnorePatterns: [],
  coverageReporters: ['json', 'json-summary'],
  cacheDirectory: '.jest/cache',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [],
  resetMocks: true,
};
