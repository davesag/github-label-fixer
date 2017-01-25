import request  from 'request-promise-native'
import {intersection, complement} from 'set-manipulator'

import {LABEL_NAMES, LABEL_COLORS, reduceLabels} from './labels'
import userAgent from './userAgent'

const BASE = 'https://api.github.com'

export default apiToken => {
  const auth = {
    bearer: apiToken
  }

  const getLabels = (owner, repo) => {
    const options = {
      url: `${BASE}/repos/${owner}/${repo}/labels`,
      method: 'get',
      headers: userAgent,
      auth
    }
    return new Promise((resolve, reject) => {
      request(options).then(
        response => {
          const result = JSON.parse(response)
          const labelColors = result.reduce(reduceLabels, {})
          const labelNames = result.map(label => label.name)
          const common  = intersection(labelNames, LABEL_NAMES)
          const commonColors = common.reduce((acc, elem) => {
            acc[elem] = labelColors[elem]
            return acc
          }, {})
          const missing = complement(LABEL_NAMES, labelNames)
          const extra   = complement(labelNames, LABEL_NAMES)
          return resolve({
            commonColors, common, missing, extra
          })
        }, reject
      )
    })
  }

  const updateLabelColor = (owner, repo, name, color) => {
    const body = JSON.stringify({name, color})
    const options = {
      url: `${BASE}/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`,
      method: 'patch',
      headers: userAgent,
      auth,
      body
    }
    return new Promise((resolve, reject) => {
      request(options).then(
        response => {
          // console.log('response', response)
          return resolve() // no need for anything back
        }, reject
      )
    })
  }

  const deleteLabel = (owner, repo, name) => {
    const options = {
      url: `${BASE}/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`,
      method: 'delete',
      headers: userAgent,
      auth
    }
    return new Promise((resolve, reject) => {
      request(options).then(
        response => {
          // console.log('response', response)
          return resolve() // no need for anything back
        }, reject
      )
    })
  }

  const createLabel = (owner, repo, name, color) => {
    const body = JSON.stringify({name, color})
    const options = {
      url: `${BASE}/repos/${owner}/${repo}/labels`,
      method: 'post',
      headers: userAgent,
      auth,
      body
    }
    return new Promise((resolve, reject) => {
      request(options).then(
        response => {
          // console.log('response', response)
          return resolve() // no need for anything back
        }, reject
      )
    })
  }

  return {
    getLabels,
    updateLabelColor,
    deleteLabel,
    createLabel
  }
}
