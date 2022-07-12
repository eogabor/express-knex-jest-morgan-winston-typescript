import request from "supertest";
import { app } from "../../src/app";

describe("Test server", () => {
  test("GET /", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe("HELLO!");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
