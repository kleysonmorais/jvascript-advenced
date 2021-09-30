const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexist router /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);
      assert.deepStrictEqual(response.text, "Hello world");
    });
  });

  describe("/login", () => {
    it("should login sucessfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "KleysonMorais", password: "123" })
        .expect(200);
      assert.deepStrictEqual(response.text, "Loggin has a succeeded!");
    });

    // it("should unauthorizer a request when requesting is using wrong credentials and return HTTP Status 401", async () => {
    //   const response = await request(app)
    //     .post("/login")
    //     .send({ username: "Patata", password: "123" })
    //     .expect(401);
    //   assert.deepStrictEqual(response.text, "Loggin failed");
    // });
  });
});
