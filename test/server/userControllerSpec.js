import request from 'supertest';
import server from '../../server/server';
import bookshelf from '../../server/config/bookshelf';


xdescribe('User API: User Controller Spec', () => {
  before((done) => {
    // Delete the user with example@example.com email address (if exists) so POST users test doesn't fail
    bookshelf.knex('users')
    .where('email', '=', 'example@example.com')
    .del()
    .then(done)
    .catch((error) => {
      throw error;
    });
  });

  it('GET /api/users/ should respond with 200', function (done) {
    // this.timeout(4000);
    request(server)
    .get('/api/users')
    .expect(200)
    .end(done);
  });

  describe("CREATE A USER / POST: /api/users/", function () {
    it("/api/users/ should respond with 201", function (done) {
     // this.timeout(4000);
      request(server)
      .post('/api/users')
      .send({
        email: 'example@example.com',
        password: 'examplepw',
      })
      .expect(201)
      .end(done);
    }); 
  });

  let id1;

  describe('Manipulate Users', () => {
    before((done) => {
      bookshelf.knex('users')
      .where('email', '=', 'example@example.com')
      .then((user) => {
        id1 = user[0].id;
      })
      .then(done)
      .catch((error) => {
        console.error('ERROR!', error);
      });
    });

    it('GET /api/users/:id should respond with 200', function (done) {
      request(server)
      .get(`/api/users/${id1}`)
      .expect(200)
      .end(done);
    });

    it('PUT /api/users/ should respond with 200', function (done) {
      request(server)
      .put(`/api/users/${id1}`)
      .send({
        email: 'example@example.com',
        password: 'examplepw123',
      })
      .expect(200)
      .end(done);
    });

    describe('DELETE A USER: /api/users/', function () {
      it('DELETE /api/users/ should respond with 200', function (done) {
        request(server)
        .delete(`/api/users/${id1}`)
        .expect(200)
        .end(done);
      });

      it(`GET /api/users/:deletedID should respond with 404`, function (done) {
        request(server)
          .get(`/api/users/${id1}`)
          .expect(404)
          .end(done);
      });
    });
  });
});

