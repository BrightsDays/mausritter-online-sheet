module.exports = {
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue"
  ],
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest"
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"]
}