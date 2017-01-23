import username from 'username'
import prompt   from 'prompt'

import promptProps from './promptProps'
import GitHub      from './github'

export default (apiToken, folderName) => {
  const githubLabeller = owner => {
    const prompts = promptProps(owner, folderName)

    const defaultPrompts = [prompts.owner, prompts.repo]

    const promptOpts = !apiToken ? [prompts.apiKey, ...defaultPrompts] : defaultPrompts

    prompt.start()

    prompt.get(promptOpts, (err, results) => {
      if (err) {
        console.log('caught error', err)
        return
      }
      const token = apiToken || results.apiToken
      const {getLabels} = GitHub(token)
      const {owner, repo} = results
      getLabels(owner, repo).then(
        ({common, missing, extra}) => {
          console.log('common',  common)
          console.log('missing', missing)
          console.log('extra',   extra)
          // ... to be continued.
        },
        err => console.log('error', err)
      )
    })
  }

  username().then(githubLabeller)
}
