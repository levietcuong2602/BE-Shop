/* eslint-disable import/no-unresolved */
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const httpLogger = require('http-logger');
const expressJSDocSwagger = require('express-jsdoc-swagger');

const camelCaseReq = require('./middlewares/camelCaseReq');
const omitReq = require('./middlewares/omitReq');
const snakeCaseRes = require('./middlewares/snakeCaseRes');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();
require('./models');

const { PORT } = require('./configs');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(httpLogger());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(camelCaseReq);
app.use(omitReq);
app.use(snakeCaseRes());

require('./routes')(app);

const swaggerOptions = {
  info: {
    version: '1.0.0',
    title: 'SSO API Documentation',
    description: 'Documentation for single sign on system',
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  filesPattern: './**/*.js',
  baseDir: __dirname,
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
};

expressJSDocSwagger(app)(swaggerOptions);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
