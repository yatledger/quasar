/* eslint-env node */
// See https://www.apollographql.com/docs/devtools/apollo-config/
// https://github.com/quasarframework/app-extension-apollo
// https://hasura.io/blog/build-responsive-cross-platform-vue-apps-with-quasar-framework-and-graphql/
module.exports = {
  client: {
    service: {
      name: 'my-service',
      url: 'https://yat.vit.ooo/graphql'
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts']
  }
}
