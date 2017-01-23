'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _setManipulator = require('set-manipulator');

var _labels = require('./labels');

var _userAgent = require('./userAgent');

var _userAgent2 = _interopRequireDefault(_userAgent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE = 'https://api.github.com';

exports.default = apiToken => {
  const auth = {
    bearer: apiToken
  };

  const getLabels = (owner, repo) => {
    const options = {
      url: `${BASE}/repos/${owner}/${repo}/labels`,
      method: 'get',
      headers: _userAgent2.default,
      auth
    };
    return new Promise((resolve, reject) => {
      (0, _requestPromiseNative2.default)(options).then(response => {
        const labelNames = JSON.parse(response).map(label => label.name);
        console.log('got labelNames', labelNames);

        const common = (0, _setManipulator.intersection)(labelNames, _labels.LABEL_NAMES);
        const missing = (0, _setManipulator.complement)(labelNames, _labels.LABEL_NAMES);
        const extra = (0, _setManipulator.complement)(_labels.LABEL_NAMES, labelNames);
        return resolve({
          common, missing, extra
        });
      }, reject);
    });
  };

  return {
    getLabels
  };
};