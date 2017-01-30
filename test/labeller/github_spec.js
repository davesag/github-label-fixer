import {expect}   from 'chai'
import sinon      from 'sinon'
import proxyquire from 'proxyquire'
import faker      from 'faker'

const fakeRequest = {
  delete: () => {},
  get: () => {},
  patch: () => {},
  post: () => {}
}

describe('github', () => {
  const apiToken = faker.random.uuid()
  const owner = faker.internet.userName()
  const repo  = faker.lorem.word()

  const github = proxyquire('../../src/labeller/github', {
    __esModule: true,
    'request-promise-native': fakeRequest
  })

  describe('getLabels', () => {
    const {getLabels} = github(apiToken)

    let getStub

    beforeEach(() => {
      getStub = sinon.stub(fakeRequest, 'get').returnsPromise()
    })

    afterEach(() => {
      fakeRequest.get.restore()
    })

    describe('request is successful', () => {
      const responseLabels = [
        {name: "bug",           color: "ee0701"},
        {name: "documentation", color: "000000"},
        {name: "feature",       color: "0052cc"},
        {name: "turnip",        color: "ffffff"}
      ]

      const responseJson = JSON.stringify(responseLabels)

      const commonColors = {
        bug: 'ee0701',
        documentation: '000000',
        feature: '0052cc'
      }
      
      const common = ['bug', 'documentation', 'feature']
      const missing = ['help wanted', 'please close', 'question', 'ready to merge', 'tech debt', 'work in progress']
      const extra = ['turnip']

      const expected = {
        commonColors, common, missing, extra
      }

      beforeEach(() => {
        getStub.resolves(responseJson)
      })

      it('returns the correct result', () => {
        return expect(getLabels(owner, repo)).to.eventually.deep.equal(expected)
      })
    })

    describe('request is unsuccessful', () => {
      beforeEach(() => {
        getStub.rejects('oops')
      })

      it('returns a rejection', () => {
        return expect(getLabels(owner, repo)).to.be.rejected
      })
      
    })
  })

  describe('updateLabelColor', () => {
    const {updateLabelColor} = github(apiToken)

    let patchStub

    beforeEach(() => {
      patchStub = sinon.stub(fakeRequest, 'patch').returnsPromise()
    })

    afterEach(() => {
      fakeRequest.patch.restore()
    })

    describe('request is successful', () => {
      beforeEach(() => {
        patchStub.resolves()
      })

      it('is fulfilled', () => {
        return expect(updateLabelColor(owner, repo, 'test', '#ffffff')).to.be.fulfilled
      })
    })

    describe('request is unsuccessful', () => {
      beforeEach(() => {
        patchStub.rejects('oops')
      })

      it('returns a rejection', () => {
        return expect(updateLabelColor(owner, repo, 'test', '#ffffff')).to.be.rejected
      })
    })
  })

  describe('deleteLabel', () => {
    const {deleteLabel} = github(apiToken)

    let deleteStub

    beforeEach(() => {
      deleteStub = sinon.stub(fakeRequest, 'delete').returnsPromise()
    })

    afterEach(() => {
      fakeRequest.delete.restore()
    })

    describe('request is successful', () => {
      beforeEach(() => {
        deleteStub.resolves()
      })

      it('is fulfilled', () => {
        return expect(deleteLabel(owner, repo, 'test')).to.be.fulfilled
      })
    })

    describe('request is unsuccessful', () => {
      beforeEach(() => {
        deleteStub.rejects('oops')
      })

      it('returns a rejection', () => {
        return expect(deleteLabel(owner, repo, 'test')).to.be.rejected
      })
    })
  })

  describe('createLabel', () => {
    const {createLabel} = github(apiToken)

    let postStub

    beforeEach(() => {
      postStub = sinon.stub(fakeRequest, 'post').returnsPromise()
    })

    afterEach(() => {
      fakeRequest.post.restore()
    })

    describe('request is successful', () => {
      beforeEach(() => {
        postStub.resolves()
      })

      it('is fulfilled', () => {
        return expect(createLabel(owner, repo, 'test', '#ffffff')).to.be.fulfilled
      })
    })

    describe('request is unsuccessful', () => {
      beforeEach(() => {
        postStub.rejects('oops')
      })

      it('returns a rejection', () => {
        return expect(createLabel(owner, repo, 'test', '#ffffff')).to.be.rejected
      })
    })
  })
})
