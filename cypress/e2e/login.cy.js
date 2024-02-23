describe("User login API", () => {
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
            //Test the login:
            cy.request("POST", "http://localhost:5000/users/login", {
                email: userData.email,
                password: userData.password,
            }).then((loginResponse) => {
                expect(loginResponse.status).to.equal(200);
            });
        });
    });

    it("Login invalid credentials(password)", () => {
        //Register the user:
        const userData = {
            firstName: "LoginTestUser2",
            lastName: "LoginTestUser2",
            email: "LoginTestUser2@example.com",
            password: "LoginTestUser2222.",
        };
        cy.request(
            "POST",
            "http://localhost:5000/users/register",
            userData
        ).then((response) => {
            expect(response.status).to.equal(200);
            //Test the login:
            cy.request("POST", "http://localhost:5000/users/login", {
                email: userData.email,
                password: "Invalid1234.",
            }).then((loginResponse) => {
                expect(loginResponse.status).to.equal(403);
                expect(response.body).to.have.property(
                    "message",
                    "Invalid credentials (Password)"
                );
            });
        });
    });

    it("Login invalid credentials (email)", () => {
        //Register the user:
        const userData = {
            firstName: "LoginTestUser2",
            lastName: "LoginTestUser2",
            email: "LoginTestUser2@example.com",
            password: "LoginTestUser2222.",
        };
        cy.request(
            "POST",
            "http://localhost:5000/users/register",
            userData
        ).then((response) => {
            expect(response.status).to.equal(200);
            //Test the login:
            cy.request("POST", "http://localhost:5000/users/login", {
                email: "invalid@example.com",
                password: userData.password,
            }).then((loginResponse) => {
                expect(loginResponse.status).to.equal(403);
                expect(response.body).to.have.property(
                    "message",
                    "Invalid credentials (Email)"
                );
            });
        });
    });
});
