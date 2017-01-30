import request from 'request-promise-native'
import {intersection, complement} from 'set-manipulator'

import {LABEL_NAMES, LABEL_COLORS, reduceLabels} from './labels'
import userAgent from './userAgent'

const BASE = 'https://api.github.com'

const github = apiToken => {
  const auth = {
    bearer: apiToken
  }

  const getLabels = (owner, repo) => {
    const options = {
      headers: userAgent,
      auth
    }
    return new Promise((resolve, reject) => {
      request.get(`${BASE}/repos/${owner}/${repo}/labels`, options).then(
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
      headers: userAgent,
      auth,
      body
    }
    return new Promise((resolve, reject) => {
      request.patch(`${BASE}/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`, options).then(
        response => resolve(),
        reject
      )
    })
  }

  const deleteLabel = (owner, repo, name) => {
    const options = {
      headers: userAgent,
      auth
    }
    return new Promise((resolve, reject) => {
      request.delete(`${BASE}/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`, options).then(
        response => resolve(),
        reject
      )
    })
  }

  const createLabel = (owner, repo, name, color) => {
    const body = JSON.stringify({name, color})
    const options = {
      headers: userAgent,
      auth,
      body
    }
    return new Promise((resolve, reject) => {
      request.post(`${BASE}/repos/${owner}/${repo}/labels`, options).then(
        response => resolve(),
        reject
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
module.exports = github
