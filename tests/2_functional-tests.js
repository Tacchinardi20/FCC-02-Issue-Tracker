/*
*
*
*        FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*        -----[Keep the tests in the same order!]-----
*        (if additional are added, keep them at the very end!)
*
*
*/


const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// Create an issue with every field: POST request to /api/issues/{project}
// Create an issue with only required fields: POST request to /api/issues/{project}
// Create an issue with missing required fields: POST request to /api/issues/{project}
// View issues on a project: GET request to /api/issues/{project}
// View issues on a project with one filter: GET request to /api/issues/{project}
// View issues on a project with multiple filters: GET request to /api/issues/{project}
// Update one field on an issue: PUT request to /api/issues/{project}
// Update multiple fields on an issue: PUT request to /api/issues/{project}
// Update an issue with missing _id: PUT request to /api/issues/{project}
// Update an issue with no fields to update: PUT request to /api/issues/{project}
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}

let deleteID;

suite('Functional Tests', function() {

  // suite('POST /api/issues/{project} => object with issue data', function() {

  //   test('Every field filled in', function(done) {
  //     chai.request(server)
  //       .post('/api/issues/test')
  //       .send({
  //         issue_title: 'Title',
  //         issue_text: 'text',
  //         created_by: 'Functional Test - Every field filled in',
  //         assigned_to: 'Chai and Mocha',
  //         status_text: 'In QA'
  //       })
  //       .end(function(err, res) {
  //         assert.equal(res.status, 200);

  //         //fill me in too!

  //         done();
  //       });
  //   });

  //   test('Required fields filled in', function(done) {
      
  //   });

  //   test('Missing required fields', function(done) {
      
  //   });

  // });

  // suite('PUT /api/issues/{project} => text', function() {

  //   test('No body', function(done) {
      
  //   });

  //   test('One field to update', function(done) {
      
  //   });

  //   test('Multiple fields to update', function(done) {
      
  //   });

  // });

  // suite('GET /api/issues/{project} => Array of objects with issue data', function() {

  //   test('No filter', function(done) {
  //     chai.request(server)
  //     .get('/api/issues/test')
  //     .query({})
  //     .end(function(err, res) {
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body);
  //       assert.property(res.body[0], 'issue_title');
  //       assert.property(res.body[0], 'issue_text');
  //       assert.property(res.body[0], 'created_on');
  //       assert.property(res.body[0], 'updated_on');
  //       assert.property(res.body[0], 'created_by');
  //       assert.property(res.body[0], 'assigned_to');
  //       assert.property(res.body[0], 'open');
  //       assert.property(res.body[0], 'status_text');
  //       assert.property(res.body[0], '_id');
  //       done();
  //     });
  //   });

  //   test('One filter', function(done) {
      
  //   });

  //   test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
      
  //   });

  // });

  // suite('DELETE /api/issues/{project} => text', function() {

  //   test('No _id', function(done) {
      
  //   });

  //   test('Valid _id', function(done) {
      
  //   });

  // });

  suite('Routing Tests', function() {

//////////////////// POST Request Tests ////////////////////

    suite('3 Post request Tests', function() {

      test('Create an issue with every field: POST request to /api/issues/{project}', function(done) {
        chai.request(server)
          .post('/api/issues/projects')
          .set('content-type', 'application/json')
          .send({
            issue_title: 'Issue',
            issue_text: 'Functional Test',
            created_by: 'fCC',
            assigned_to: 'Dom',
            status_text: 'Not Done'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            deleteID = res.body._id;
            assert.equal(res.body.issue_title, 'Issue');
            assert.equal(res.body.issue_text, 'Functional Test');
            assert.equal(res.body.created_by, 'fCC');
            assert.equal(res.body.assigned_to, 'Dom');
            assert.equal(res.body.status_text, 'Not Done');
            done();
          });
      });

      test('Create an issue with only required fields: POST request to /api/issues/{project}', function(done) {
        chai.request(server)
          .post('/api/issues/projects')
          .set('content-type', 'application/json')
          .send({
            issue_title: 'Issue',
            issue_text: 'Functional Test',
            created_by: 'fCC',
            assigned_to: '',
            status_text: ''
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, 'Issue');
            assert.equal(res.body.issue_text, 'Functional Test');
            assert.equal(res.body.created_by, 'fCC');
            assert.equal(res.body.assigned_to, '');
            assert.equal(res.body.status_text, '');
            done();
          });
      });

      test('Create an issue with missing required fields: POST request to /api/issues/{project}', function(done) {
        chai.request(server)
          .post('/api/issues/projects')
          .set('content-type', 'application/json')
          .send({
            issue_title: '',
            issue_text: '',
            created_by: 'fCC',
            assigned_to: '',
            status_text: ''
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'required field(s) missing');
            done();
          });
      });

    });

//////////////////// GET Request Tests ////////////////////

    suite('3 Get request Tests', function() {

      test('View issues on a project: GET request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test-data-abc123')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.length, 4);
            done();
          });
      });

      test('View issues on a project with one filter: GET request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test-data-abc123')
          .query({ _id: '624aba858a1aef7312968bf7' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body[0], {
              _id: '624aba858a1aef7312968bf7',
              issue_title: 'get',
              issue_text: 'issue',
              created_on: '2022-04-04T09:29:41.342Z',
              updated_on: '2022-04-04T09:29:41.342Z',
              created_by: 'landon',
              assigned_to: '',
              open: true,
              status_text: ''
            });

            done();
          });
      });

      test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function(done) {
        chai.request(server)
          .get('/api/issues/test-data-abc123')
          .query({
            issue_title: 'Hey',
            issue_text: 'asdf',
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body[0], {
              _id: '624abac68a1aef7312968c02',
              issue_title: 'Hey',
              issue_text: 'asdf',
              created_on: '2022-04-04T09:30:46.580Z',
              updated_on: '2022-04-04T09:30:46.580Z',
              created_by: 'asdf',
              assigned_to: '',
              open: true,
              status_text: ''
            });

            done();
          });
      });

    });

//////////////////// PUT Request Tests ////////////////////

    suite('5 Put request Tests', function() {

      test('Update one field on an issue: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .put('/api/issues/test-data-put')
          .send({
            _id: '624aef0c3924b79e7760f056',
            issue_title: 'Something'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, 'successfully updated');
            assert.equal(res.body._id, '624aef0c3924b79e7760f056');
            done();
          });
      });

      test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .put('/api/issues/test-data-put')
          .send({
            _id: '624aef0c3924b79e7760f056',
            issue_title: 'Something',
            issue_text: 'asdf'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, 'successfully updated');
            assert.equal(res.body._id, '624aef0c3924b79e7760f056');
            done();
          });
      });

      test('Update an issue with missing _id: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .put('/api/issues/test-data-put')
          .send({
            issue_title: 'update',
            issue_text: 'update'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'missing _id');
            done();
          });
      });

      test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .put('/api/issues/test-data-put')
          .send({ _id: '624aef0c3924b79e7760f056' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'no update field(s) sent');
            done();
          });
      });

      test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function(done) {
        chai.request(server)
          .put('/api/issues/test-data-put')
          .send({
            _id: '5fe0c500e672341c1815a770',
            issue_title: 'update',
            issue_text: 'update'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'could not update');
            done();
          });
      });

    });

//////////////////// DELETE Request Tests ////////////////////

    suite('3 DELETE request Tests', function() {

      test('Delete an issue: DELETE request to /api/issues/{project}', function(done) {
        chai.request(server)
          .delete('/api/issues/projects')
          .send({ _id: deleteID })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, 'successfully deleted');
            done();
          });
      });

      test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function(done) {
        chai.request(server)
          .delete('/api/issues/projects')
          .send({ _id: '5fe0c500ec2f6f4c1815a770invalid' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'could not delete');
            done();
          });
      });

      test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function(done) {
        chai.request(server)
          .delete('/api/issues/projects')
          .send({
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'missing _id');
            done();
          });
      });

    });

  });

});