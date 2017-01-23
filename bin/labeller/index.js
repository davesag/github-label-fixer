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
      const { getLabels } = (0, _github2.default)(token);
      const { owner, repo } = results;
      getLabels(owner, repo).then(({ common, missing, extra }) => {
        console.log('common', common);
        console.log('missing', missing);
        console.log('extra', extra);
        // ... to be continued.
      }, err => console.log('error', err));
    });
  };

  (0, _username2.default)().then(githubLabeller);
};