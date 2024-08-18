describe('Logout function', () => {

    

    it('should log out the user with the logout button', () => {

        cy.removeToken();

        cy.fixture('goodData.json').then((user) => {
            cy.login();
        });

        cy.get('button[data-auth="logout"]').click();
        cy.window().its('localStorage').invoke('getItem', 'token').should('be.null');

    });

});