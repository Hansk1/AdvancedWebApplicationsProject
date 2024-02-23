describe("User registeration API", () => {
    it("Login successfully", () => {
        //Register the user:
        const userData = {
            firstName: "LoginTestUser1",
            lastName: "LoginTestUser1",
            email: "LoginTestUser1@example.com",
            password: "LoginTestUser1111.",
        };
        cy.request(
            "POST",
            "http://localhost:5000/users/register",
            userData
        ).then((response) => {
            expect(response.status).to.equal(200);
            cy.request("POST", "http://localhost:5000/users/login", {
                email: userData.email,
                password: userData.password,
            }).then((loginResponse) => {
                expect(loginResponse.status).to.equal(200);
                expect(loginResponse.body).to.have.property("succes", true);
            });
        });
    });
});
