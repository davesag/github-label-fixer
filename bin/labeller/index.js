'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _username = require('username');

var _username2 = _interopRequireDefault(_username);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _promptProps = require('./promptProps');

var _promptProps2 = _interopRequireDefault(_promptProps);

var _github = require('./github');

var _github2 = _interopRequireDefault(_github);

var _labels = require('./labels');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (apiToken, folderName) => {
  const githubLabeller = owner => {
    const prompts = (0, _promptProps2.default)(owner, folderName);

    const defaultPrompts = [prompts.owner, prompts.repo];

    const promptOpts = !apiToken ? [prompts.apiKey, ...defaultPrompts] : defaultPrompts;

    _prompt2.default.start();

    _prompt2.default.get(promptOpts, (err, results) => {
      if (err) {
        console.log('caught error', err);
        return;
      }
      const token = apiToken || results.apiToken;
      const { getLabels, updateLabelColor, deleteLabel, createLabel } = (0, _github2.default)(token);
      const { owner, repo } = results;
      getLabels(owner, repo).then(({ commonColors, common, missing, extra }) => {
        let promises = [];
        common.forEach(label => {
          if (commonColors[label] !== _labels.LABEL_COLORS[label]) {
            console.log('update colour of', label, 'from', commonColors[label], 'to', _labels.LABEL_COLORS[label]);
            promises.push(updateLabelColor(owner, repo, label, _labels.LABEL_COLORS[label]));
          }
        });
        Promise.all(promises).then(() => {
          promises = [];
          extra.forEach(label => {
            promises.push(deleteLabel(owner, repo, label));
          });
          Promise.all(promises).then(() => {
            promises = [];
            missing.forEach(label => {
              promises.push(createLabel(owner, repo, label, _labels.LABEL_COLORS[label]));
            });
            Promise.all(promises).then(() => {
              console.log('Label updates complete');
            }, err => console.log('caught creating missing labels', err));
          }, err => console.log('caught error deleting extra labels', err));
        }, err => console.log('caught error updating colours', err));
      }, err => console.log('error', err));
    });
  };

  (0, _username2.default)().then(githubLabeller);
};