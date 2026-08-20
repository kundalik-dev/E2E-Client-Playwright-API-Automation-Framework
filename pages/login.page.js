class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "email@example.com" });
    this.passwordInput = page.getByPlaceholder("enter your passsword", { exact: true });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto(pageUrl) {
    await this.page.goto(pageUrl);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

export default LoginPage;
