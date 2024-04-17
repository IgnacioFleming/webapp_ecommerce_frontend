import alerts from "../utils/alerts/alerts";

export default class ApiCall {
  constructor(path) {
    this.path = path;
  }

  async upload(id, data) {
    try {
      const result = await fetch(`${this.path}/uploadProfileImage/${id}`, {
        method: "PUT",
        credentials: "include",
        body: data,
      });
      const payload = await result.json();
      return payload;
    } catch (error) {
      alerts.errorAlert("There was a problem while processing your data");
    }
  }
  async getProfileImage(id) {
    try {
      const result = await fetch(`${this.path}/profileImage/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const { payload } = await result.json();
      return payload;
    } catch (error) {
      alerts.errorAlert("There was a problem while fetching data");
    }
  }
}
