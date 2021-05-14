/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Note: This file is used for both PRODUCTION & DEVELOPMENT.
 * Note: Changes to this file (but not any file it imports!) are picked up by the
 * development server, but such updates are costly since the dev-server needs a reboot.
 */
const path = require('path')
const formidable = require('formidable')

function parseFiles (req, folder) {
  const form = new formidable.IncomingForm()
  form.uploadDir = folder
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        resolve({ fields, files })
      }
    })
  })
}


function sendFile ({ name, file }) {
  const options = {
    url: '...',
    method: 'POST',
    formData: file
  }
  return new Promise(resolve => {
    console.log(`sending file ${name}: `, options)
    setTimeout(() => {
      console.log(`file ${name} was be sent`)
      resolve()
    }, 250)
  })
}

module.exports.extendApp = function ({ app, ssr }) {

  app.post('/upload', async (req, res) => {
    console.log(__dirname)
    const { fields, files } = await parseFiles(req, path.join(__dirname, '../public'))
    for (const [name, file] of Object.entries(files)) {
      await sendFile({ name, file })
    }
    res.send('Thank you')
  })
  /*
     Extend the parts of the express app that you
     want to use with development server too.

     Example: app.use(), app.get() etc
  */
}
