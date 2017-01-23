'use strict';

var _labeller = require('./labeller');

var _labeller2 = _interopRequireDefault(_labeller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const API_TOKEN = process.env.GITHUB_TOKEN;
const pathArray = __dirname.split('/');
const folderName = pathArray[pathArray.length - 2];

(0, _labeller2.default)(API_TOKEN, folderName);