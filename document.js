const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')

jsdoc2md.render({ files: ['src/**/*.js'] }).then((readme) => fs.writeFile('README.md', readme));