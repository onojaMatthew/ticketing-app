import request from "supertest";
import { app } from "../../app";

it ("returns 201 on successful sign up", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "test@Test1"})
    .expect(201)
})

it ("returns 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test", password: "password@P7"})
    .expect(400)
});

it ("return 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test1@domain.com", password: "d"})
    .expect(400)
});

it ("return 400 for empty email and password fields", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({email: "onoja@gmail.com"})
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({ password: "idsio7T@@"})
    .expect(400)
})

it ("return 400 for duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "tst@domain.com", password: "tst7@Msfdsf" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "tst@domain.com", password: "tst7@Mfss" })
    .expect(400);
})

it ("sets a cookie after a successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "tst@domain.com", password: "tst7@Msfdsf" })
    .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined()

})