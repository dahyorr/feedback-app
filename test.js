const {Path} = require('path-parser');
const {URL} = require('url');
// const pathName = new URL(event.url).pathname
const p = new Path('/api/surveys/:surveyId/:choice')
console.log(p.test('/api/surveys/setnthe/yy'))