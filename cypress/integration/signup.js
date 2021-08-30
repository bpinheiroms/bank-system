function generateRandomNumber(numberOfCharacters) {
  var randomValues = "";
  var stringValues = "ABCDEFGHIJKLMNOabcdefghijklmnopqrstuvwxyzPQRSTUVWXYZ";
  var sizeOfCharacter = stringValues.length;
  for (var i = 0; i < numberOfCharacters; i++) {
    randomValues =
      randomValues +
      stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
  }
  return randomValues;
}

describe("SignUp", () => {
  it("must create customer user and redirect to main screen", () => {
    const randomValues = generateRandomNumber(5);

    cy.visit("/signup");
    cy.get("#username").type(`newUser`);
    cy.get("#email").type(`${randomValues}@gmail.com`);
    cy.get("#password").type(`1234`);

    cy.server();
    cy.route("POST", "**/register").as("register");

    cy.get("[data-cy=submit]").click();

    cy.wait("@register").then((xhr) => {
      expect(xhr.status).be.eq(200);
    });

    cy.route("GET", "**/transactions").as("transactions");

    cy.wait("@transactions").then((xhr) => {
      expect(xhr.status).be.eq(200);
    });
  });

  it("must not create user because already exists", () => {
    cy.visit("/signup");
    cy.get("#username").type(`newUser`);
    cy.get("#email").type(`bpinheiroms@gmail.com`);
    cy.get("#password").type(`1234`);

    cy.server();
    cy.route("POST", "**/register").as("register");

    cy.get("[data-cy=submit]").click();

    cy.wait("@register").then((xhr) => {
      expect(xhr.status).be.eq(400);
    });
  });
});
