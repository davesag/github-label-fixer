import request  from 'request-promise-native'
import {intersection, complement} from 'set-manipulator'

import {LABEL_NAMES} from './labels'
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
          const labelNames = JSON.parse(response).map(label => label.name)
          console.log('got labelNames', labelNames)

          const common  = intersection(labelNames, LABEL_NAMES)
          const missing = complement(labelNames, LABEL_NAMES)
          const extra   = complement(LABEL_NAMES, labelNames)
          return resolve({
            common, missing, extra
          })
        }, reject
      )
    })
  }

  return {
    getLabels
  }
}
