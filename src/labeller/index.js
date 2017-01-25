import username from 'username'
import prompt   from 'prompt'

import promptProps from './promptProps'
import GitHub      from './github'

import {LABEL_COLORS} from './labels'

export default (apiToken, folderName) => {
  const githubLabeller = owner => {
    const prompts = promptProps(owner, folderName)

    const defaultPrompts = {owner: prompts.owner, repo: prompts.repo}

    const promptOpts = !apiToken ? {apiToken: prompts.apiToken, ...defaultPrompts} : defaultPrompts

    prompt.start()

    prompt.get({properties: promptOpts}, (err, results) => {
      if (err) {
        console.log('caught error', err)
        return
      }
      const token = apiToken || results.apiToken
      const {getLabels, updateLabelColor, deleteLabel, createLabel} = GitHub(token)
      const {owner, repo} = results
      getLabels(owner, repo).then(
        ({commonColors, common, missing, extra}) => {
          let promises = []
          common.forEach(label => {
            if (commonColors[label] !== LABEL_COLORS[label]) {
              console.log('update colour of', label, 'from', commonColors[label], 'to', LABEL_COLORS[label])
              promises.push(updateLabelColor(owner, repo, label, LABEL_COLORS[label]))
            }
          })
          Promise.all(promises).then(() => {
            promises = []
            extra.forEach(label => {
              promises.push(deleteLabel(owner, repo, label))
            })
            Promise.all(promises).then(() => {
              promises = []
              missing.forEach(label => {
                promises.push(createLabel(owner, repo, label, LABEL_COLORS[label]))
              })
              Promise.all(promises).then(() => {
                console.log('Label updates complete')
              },
              err => console.log('caught creating missing labels', err)
            )
            },
            err => console.log('caught error deleting extra labels', err)
          )
          },
          err => console.log('caught error updating colours', err)
        )
        },
        err => console.log('error', err)
      )
    })
  }

  username().then(githubLabeller)
}
