import { logout } from './logout.js';

//Mocks the localStorage

global.localStorage = {
    store: {},
    getItem: jest.fn(function (key) {
        return this.store[key];
    }),
    removeItem: jest.fn(function (key) {
        delete this.store[key];
    }),
};

describe("logout function", () => {

    it("should clear the token from browser storage", () => {
        
        logout();

        const token = localStorage.getItem("token");

        const tokenRemoveCalls = localStorage.removeItem.mock.calls.filter(
            (call) => call[0] === "token"
        );

        expect(tokenRemoveCalls.length).toBe(1);
        expect(token).toBeUndefined();

    });  
});