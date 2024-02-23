describe("User registeration API", () => {
    it("Register new user successfully", () => {
        const userData = {
            firstName: "User1",
            lastName: "User1",
            email: "user1@example.com",
            password: "User1111.",
        };
        cy.request(
            "POST",
            "http://localhost:5000/users/register",
            userData
        ).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property(
                "message",
                "Registration successful"
            );
        });
    });

    it("Register fails (Email already in use)", () => {
        const userData = {
            firstName: "User1",
            lastName: "User1",
            email: "user1@example.com",
            password: "User1111.",
        };
        cy.request({
            method: "POST",
            url: "http://localhost:5000/users/register",
            body: userData,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(403);
            expect(response.body).to.have.property(
                "email",
                "Email already in use."
            );
        });
    });

    it("Register fails (Email already in use)", () => {
        const userData = {
            firstName: "User1",
            lastName: "User1",
            email: "user1@example.com",
            password: "User1111.",
        };
        cy.request({
            method: "POST",
            url: "http://localhost:5000/users/register",
            body: userData,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(403);
            expect(response.body).to.have.property(
                "email",
                "Email already in use."
            );
        });
    });

    it("Register fails (Invalid email format)", () => {
        const userData = {
            firstName: "User2",
            lastName: "User2",
            email: "invalid",
            password: "User2222.",
        };
        cy.request({
            method: "POST",
            url: "http://localhost:5000/users/register",
            body: userData,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(400);
        });
    });

    it("Register fails (Invalid password)", () => {
        const userData = {
            firstName: "User3",
            lastName: "User3",
            email: "user3@example.com",
            password: "invalid",
        };
        cy.request({
            method: "POST",
            url: "http://localhost:5000/users/register",
            body: userData,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(400);
        });
    });
});
