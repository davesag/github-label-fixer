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
        const result = JSON.parse(response);
        const labelColors = result.reduce(_labels.reduceLabels, {});
        const labelNames = result.map(label => label.name);
        const common = (0, _setManipulator.intersection)(labelNames, _labels.LABEL_NAMES);
        const commonColors = common.reduce((acc, elem) => {
          acc[elem] = labelColors[elem];
          return acc;
        }, {});
        const missing = (0, _setManipulator.complement)(_labels.LABEL_NAMES, labelNames);
        const extra = (0, _setManipulator.complement)(labelNames, _labels.LABEL_NAMES);
        return resolve({
          commonColors, common, missing, extra
        });
      }, reject);
    });
  };

  const updateLabelColor = (owner, repo, name, color) => {
    const body = JSON.stringify({ name, color });
    const options = {
      url: `${BASE}/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`,
      method: 'patch',
      headers: _userAgent2.default,
      auth,
      body
    };
    return new Promise((resolve, reject) => {
      (0, _requestPromiseNative2.default)(options).then(response => {
        // console.log('response', response)
        return resolve(); // no need for anything back
      }, reject);
    });
  };

  const deleteLabel = (owner, repo, name) => {
    const options = {
      url: `${BASE}/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`,
      method: 'delete',
      headers: _userAgent2.default,
      auth
    };
    return new Promise((resolve, reject) => {
      (0, _requestPromiseNative2.default)(options).then(response => {
        // console.log('response', response)
        return resolve(); // no need for anything back
      }, reject);
    });
  };

  const createLabel = (owner, repo, name, color) => {
    const body = JSON.stringify({ name, color });
    const options = {
      url: `${BASE}/repos/${owner}/${repo}/labels`,
      method: 'post',
      headers: _userAgent2.default,
      auth,
      body
    };
    return new Promise((resolve, reject) => {
      (0, _requestPromiseNative2.default)(options).then(response => {
        // console.log('response', response)
        return resolve(); // no need for anything back
      }, reject);
    });
  };

  return {
    getLabels,
    updateLabelColor,
    deleteLabel,
    createLabel
  };
};