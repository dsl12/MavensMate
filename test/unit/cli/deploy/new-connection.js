'use strict';

var assert          = require('assert');
var sinon           = require('sinon');
var sinonAsPromised = require('sinon-as-promised');
var util            = require('../../../../app/lib/util');
var helper          = require('../../../test-helper');
var commandExecutor = require('../../../../app/lib/commands')();

sinonAsPromised(require('bluebird'));

describe('mavensmate new-connection-cli', function(){

  var program;
  var commandExecutorStub;
  var getPayloadStub;

  before(function() {
    program = helper.initCli();
  });

  beforeEach(function() {
    commandExecutorStub = sinon.stub(program.commandExecutor, 'execute');
    getPayloadStub = sinon.stub(util, 'getPayload').resolves({ foo : 'bar' });
  });

  afterEach(function() {
    commandExecutorStub.restore();
    getPayloadStub.restore();
  });

  it('should accept a connection username, password, and orgType', function(done) {
    program._events['new-connection'](['foo', 'bar', 'bat']);

    commandExecutorStub.calledOnce.should.equal(true);
    assert(commandExecutorStub.calledWithMatch({
      name: 'new-connection',
      body: { username : 'foo', password: 'bar', orgType: 'bat' }
    }));

    done();
  });
});