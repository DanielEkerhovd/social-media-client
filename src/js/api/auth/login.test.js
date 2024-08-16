import { login } from "./login.js";

//Mocks the localStorage

global.localStorage = {
  store: {},
  setItem: jest.fn(function (key, value) {
    this.store[key] = value.toString();
  }),
  getItem: jest.fn(function (key) {
    return this.store[key];
  }),
};

//Mocks the fetch function

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: "dummyToken" }),
  })
);

describe("login function", () => {
  it("should store a token when provided with valid credentials", async () => {
    const email = "dummyEmail@noroff.no";
    const password = "dummyPassword";

    await login(email, password);

    const token = JSON.parse(localStorage.getItem("token"));

    const tokenSetCalls = localStorage.setItem.mock.calls.filter(
        (call) => call[0] === "token"
      );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(tokenSetCalls.length).toBe(1);
    expect(token).toBe("dummyToken");
  });
});