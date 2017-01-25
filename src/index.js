import labeller from './labeller'

require('dotenv').config()

process.on('unhandledRejection', function(reason, p) {
  console.log('Unhandled rejection in promise', p, 'caused by', reason)
})

const API_TOKEN = process.env.GITHUB_TOKEN
const pathArray = process.cwd().split('/')
const folderName = pathArray[pathArray.length - 1]

labeller(API_TOKEN, folderName)
