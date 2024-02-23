describe("Auth routes", () => {
    it("Get random user's data", () => {
        //Register the user:
        const userData = {
            firstName: "AuthTestUser1",
            lastName: "AuthTestUser1",
            email: "AuthTestUser1@example.com",
            password: "AuthTestUser1111.",
        };

        //Register
        cy.request(
            "POST",
            "http://localhost:5000/users/register",
            userData
        ).then((response) => {
            expect(response.status).to.equal(200);
            //Login
            cy.request("POST", "http://localhost:5000/users/login", {
                email: userData.email,
                password: userData.password,
            }).then((loginResponse) => {
                expect(loginResponse.status).to.equal(200);

                const jwt = loginResponse.body.token;

                //Test the route
                cy.request({
                    method: "GET",
                    url: "http://localhost:5000/users/random",
                    headers: {
                        Authorization: "Bearer " + jwt,
                    },
                }).then((randomUserResponse) => {
                    expect(randomUserResponse.status).to.equal(200);
                    expect(randomUserResponse.body.message).to.equal("success");
                    expect(randomUserResponse.body.foundUser).to.exist;
                });
            });
        });
    });

    it("Data fetching failed (User not logged in)", () => {
        //Test the route
        cy.request({
            method: "GET",
            url: "http://localhost:5000/users/random",
            failOnStatusCode: false,
        }).then((randomUserResponse) => {
            expect(randomUserResponse.status).to.equal(401);
        });
    });
});
