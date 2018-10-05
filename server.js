require('app-module-path').addPath(__dirname);
require('marko/express');
require('marko/node-require');

function requireNoOp(module, filename) {
  /* no-op */
}

require.extensions['.less'] = requireNoOp;
require.extensions['.css'] = requireNoOp;

const express = require('express');
const compression = require('compression'); // Provides gzip compression for the HTTP response
const serveStatic = require('serve-static');
const openBrowser = require('server-utils/openBrowser');

// If the process was started using browser-refresh then enable
// hot reloading for certain types of files to short-circuit
// a full process restart. You *should* use browser-refresh
// in development: https://www.npmjs.com/package/browser-refresh
require('marko/browser-refresh').enable();

const app = express();

const port = process.env.PORT || 8080;
const path = require('path');

const viewsDir = path.join(__dirname, 'src');
if (process.env.NODE_ENV !== 'production') {
  require('marko/hot-reload').enable(); // Enable hot reloading in development

  require('fs').watch(viewsDir, { recursive: true }, function(event, filename) {
    if (/\.marko$/.test(filename)) {
      // Resolve the filename to a full template path:

      const templatePath = path.join(viewsDir, filename);

      console.log('Marko template modified: ', templatePath);

      require('marko/hot-reload').handleFileModified(templatePath); // Pass along the *full* template path to marko
    }
  });
}

// Enable gzip compression for all HTTP responses
app.use(compression());

// Allow all of the generated files under "static" to be served up by Express
app.use('/static', serveStatic(__dirname + '/static'));

require('src/services/routes')(app);

// Map the "/" route to the home page
const indexTemplate = require('./src/pages/home/template.marko');

app.get('/', function(req, res) {
  indexTemplate.render(
    {
      name: 'Home'
    },
    res
  );
});

app.listen(port, function(err) {
  if (err) {
    throw err;
  }
  console.log('Listening on port %d', port);

  // The browser-refresh module uses this event to know that the
  // process is ready to serve traffic after the restart
  if (process.send) {
    openBrowser('http://localhost:' + port);
    process.send('online');
  }
});
