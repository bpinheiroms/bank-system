/// <referece tpyes="cypress" />

const adminLogin = {
  email: "admin@admin.com",
  password: "1234",
};

const customerLogin = {
  email: "bpinheiroms@gmail.com",
  password: "123456789",
};

describe("SignIn", () => {
  it("must login by passing valid ADMIN data and redirect to check control screen", () => {
    cy.visit("/signin");
    cy.get("#email").type(adminLogin.email);
    cy.get("#password").type(adminLogin.password);

    cy.server();
    cy.route("POST", "**/authenticate").as("authenticate");

    cy.get("[data-cy=submit]").click();

    cy.wait("@authenticate").then((xhr) => {
      expect(xhr.status).be.eq(200);
    });

    cy.route("GET", "**/deposit-control").as("depositControl");

    cy.wait("@depositControl").then((xhr) => {
      expect(xhr.status).be.eq(200);
    });
  });

  it("must login by passing valid CUSTOMER data and redirect to balance screen", () => {
    cy.visit("/signin");
    cy.get("#email").type(customerLogin.email);
    cy.get("#password").type(customerLogin.password);

    cy.server();
    cy.route("POST", "**/authenticate").as("authenticate");

    cy.get("[data-cy=submit]").click();

    cy.wait("@authenticate").then((xhr) => {
      expect(xhr.status).be.eq(200);
    });

    cy.route("GET", "**/transactions").as("transactions");

    cy.wait("@transactions").then((xhr) => {
      expect(xhr.status).be.eq(200);
    });
  });

  it("must login as ADMIN can't access check deposit screen ", () => {
    cy.visit("/signin");
    cy.get("#email").type(customerLogin.email);
    cy.get("#password").type(customerLogin.password);

    cy.server();
    cy.route("POST", "**/authenticate").as("authenticate");

    cy.get("[data-cy=submit]").click();

    cy.wait("@authenticate").then((xhr) => {
      expect(xhr.status).be.eq(200);
    });

    cy.visit("/check-deposit");

    cy.route("GET", "**/user").as("user");

    cy.wait("@user").then((xhr) => {
      expect(xhr.status).be.eq(404);
    });
  });

  it("must login as CUSTOM can't access check control screen ", () => {
    cy.visit("/signin");
    cy.get("#email").type(customerLogin.email);
    cy.get("#password").type(customerLogin.password);

    cy.server();
    cy.route("POST", "**/authenticate").as("authenticate");

    cy.get("[data-cy=submit]").click();

    cy.wait("@authenticate").then((xhr) => {
      expect(xhr.status).be.eq(200);
    });

    cy.visit("/check-control");

    cy.route("GET", "**/user").as("user");

    cy.wait("@user").then((xhr) => {
      expect(xhr.status).be.eq(404);
    });
  });

  it("must not login when data does not exist.", () => {
    cy.visit("/signin");
    cy.get("#email").type(`aa@aa.com.br`);
    cy.get("#password").type(`1234`);

    cy.server();
    cy.route("POST", "**/authenticate").as("authenticate");

    cy.get("[data-cy=submit]").click();

    cy.wait("@authenticate").then((xhr) => {
      expect(xhr.status).be.eq(403);
    });
  });

  it("must not call api when password is missing", () => {
    cy.visit("/signin");
    cy.get("#email").type(`aa@aa.com.br`);

    cy.get("[data-cy=submit]").click();

    cy.contains("Password Required").should("to.have.length", 1);
  });

  it("must not call api when email is missing", () => {
    cy.visit("/signin");
    cy.get("#password").type(`1234`);

    cy.get("[data-cy=submit]").click();

    cy.contains("Required email").should("to.have.length", 1);
  });

});
