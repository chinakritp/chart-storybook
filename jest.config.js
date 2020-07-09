module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}', '!src/**/*.stories.js'],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    coverageReporters: ['json-summary', 'json', 'lcov', 'text'],

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx', 'yaml'],
    transform: {
      '\\.yaml$': 'yaml-jest',
      '\\.js?$': 'babel-jest',
    },
  
    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFilesAfterEnv: ['<rootDir>/enzyme.config.js', 'jest-extended'],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: 'http://localhost',

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ['<rootDir>/node_modules/'],

    // Indicates whether each individual test should be reported during the run
    verbose: false,

    // Mock file for import css and scss files
    moduleNameMapper: {
      '\\.(css|scss|jpg|jpeg|png|gif)$': 'identity-obj-proxy',
    }
  };