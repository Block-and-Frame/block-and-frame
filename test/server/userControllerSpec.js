import request from 'supertest';
import server from '../../server/server';
import bookshelf from '../../server/config/bookshelf';

describe('User API: User Controller Spec', () => {
  beforeEach(() => {
    // Delete the user with example@example.com email address (if exists) so POST users test doesn't fail
    bookshelf.knex('users')
    .where('email', '=', 'example@example.com')
    .del()
    .catch((error) => {
      throw error;
    });
  });

  // it("GET /api/users/ should respond with 200", function (done) {
  //   this.timeout(4000);
  //   request(server)
  //   .get('/api/users')
  //   .expect(200)
  //   .end(done);
  // });

  // it("GET /api/users/:id should respond with 200", function (done) {
  //   this.timeout(4000);
  //   request(server)
  //   .get('/api/users/1')
  //   .expect(200)
  //   .end(done);
  // });


  // it("GET USER BY ID SEND RETURN A USER: /api/users/1 should response should contain 'example'", function (done) {
  //   this.timeout(4000);
  //   request(server)
  //     // TODO: make this work:
  //     //.put('/api/users/1', { username: 'example' })
  //     .get('/api/users/1')
  //     .expect(200)
  //     .end(done, /eric/);
  //   });

  // describe("CREATE A USER / POST: /api/users/", function () {
  //   it("/api/users/ should respond with 201", function (done) {
  //     this.timeout(4000);
  //     request(server)
  //     .post('/api/users')
  //     .send({
  //       email: 'example@example.com',
  //       password: 'examplepw',
  //     })
  //     .expect(201)
  //     .end(done);
  //   });
  // });
});
