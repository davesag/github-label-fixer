'use strict';

var _labeller = require('./labeller');

var _labeller2 = _interopRequireDefault(_labeller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

process.on('unhandledRejection', function (reason, p) {
  console.log('Unhandled rejection in promise', p, 'caused by', reason);
});

const API_TOKEN = process.env.GITHUB_TOKEN;
const pathArray = process.cwd().split('/');
const folderName = pathArray[pathArray.length - 1];

(0, _labeller2.default)(API_TOKEN, folderName);