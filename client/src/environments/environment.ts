// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL:"https://localhost:3002/api",
  IMAGE_URL: '',
  API_URL: '/api/device-sales',
  ATN_URL: '/service/customerportal',
  ATN_TOKEN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAyMzA2MTIxMzQwIiwibG9jYXRpb25Db2RlIjoiMTEwMCIsIm91IjoiIiwicm9sZSI6IkFJUyIsImlhdCI6MTY4NTQyODgzOSwiZXhwIjo5OTk5OTk5OTk5fQ.Fy-ImidrxlPjT80bDCDrzzCmQxDoUf04XRD0es7x7ck',
  FEAT_NEWLOGIN: false,
  LOCAL: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
