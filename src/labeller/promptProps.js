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
      warning: 'Project name must be only letters or dashes',
      description: 'Enter the name of the github owner',
      required: true,
      default: owner
    },
    repo: {
      name: 'repo',
      validator: /^[a-z0-9A-Z\-]+$/,
      warning: 'Repository must be only letters or dashes',
      description: 'Enter the name of the github repo',
      required: true,
      default: folderName // remove later
    }
  }
  return prompts
}
export default promptProps
