// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Initialize Firebase

   firebase: {
     apiKey: 'AIzaSyAe8EPYWyQfUZq9KPWm7Xq3HjzwpPOWdq4',
     authDomain: 'webshop-c81b2.firebaseapp.com',
     databaseURL: 'https://webshop-c81b2.firebaseio.com',
     projectId: 'webshop-c81b2',
     storageBucket: 'webshop-c81b2.appspot.com',
     messagingSenderId: '835945568608'
   }

};
