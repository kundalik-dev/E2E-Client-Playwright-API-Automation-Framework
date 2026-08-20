class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeader = page.locator(".card-body h5");
    this.shoeName = page.getByText("ADIDAS ORIGINAL", { exact: true });
  }
}

export default DashboardPage;
