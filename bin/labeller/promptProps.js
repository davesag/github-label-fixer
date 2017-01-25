'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const promptProps = (owner, folderName) => {
  const prompts = {
    apiToken: {
      name: 'apiToken',
      validator: /^[a-z0-9]+$/,
      hidden: true
    },
    owner: {
      name: 'owner',
      validator: /^[a-z0-9A-Z\-]+$/,
      warning: 'Owner name must be only letters, dashes, or numbers',
      description: 'Enter the name of the project owner',
      required: true,
      default: owner
    },
    repo: {
      name: 'repo',
      validator: /^[a-z0-9A-Z\-]+$/,
      warning: 'Owner name must be only letters, dashes, or numbers',
      description: 'Enter the name of the github repo',
      required: true,
      default: folderName
    }
  };
  return prompts;
};
exports.default = promptProps;