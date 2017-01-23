import labeller from './labeller'

require('dotenv').config()

const API_TOKEN = process.env.GITHUB_TOKEN
const pathArray = __dirname.split('/')
const folderName = pathArray[pathArray.length - 2]

labeller(API_TOKEN, folderName)
