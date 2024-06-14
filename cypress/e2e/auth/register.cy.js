describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('login_ok', () => {
        cy.get('input[data-cy=username_input]').type('test');
        cy.get('input[data-cy=password_input]').type('123456abC');
        cy.get('button[type=submit]').click();
    });
});
