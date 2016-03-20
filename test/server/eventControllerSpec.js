import server from '../../server/server';
import request from 'supertest';

describe('Event API: Event Controller Spec', () => {
  it('GET / should respond with 200', (done) => {
    request(server)
    .get('/')
    .expect(200)
    .end(done);
  });

  // it('GET /api/events/ should respond with 200', function (done) {
  //   this.timeout(10000);
  //   request(server)
  //   .get('/api/events')
  //   .expect(200)
  //   .end(done);
  // });

  // it("GET EVENTS: /api/events/1 should respond with 200", function (done) {
  //   this.timeout(1000);
  //   request(server)
  //   .get('/api/events')
  //   .expect(200)
  //   .end(done);
  // });

  // it("GET EVENT BY ID SEND AN EVENT: /api/events/1 should contain the word 'example'", function (done) {
  //   this.timeout(3000);
  //   request(server)
  //   .get('/api/events')
  //   .expect(200, /example/)
  //   .end(done);
  // });
});
