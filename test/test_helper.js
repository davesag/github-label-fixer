import chai             from 'chai'
import sinon            from 'sinon'
import sinonChai        from 'sinon-chai'
import chaiAsPromised   from 'chai-as-promised'
import chaiString       from 'chai-string'
import sinonStubPromise from 'sinon-stub-promise'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiString)
sinonStubPromise(sinon)

process.on('unhandledRejection', function(reason, p) {
  console.log('Unhandled rejection in promise', p, 'caused by', reason)
})
