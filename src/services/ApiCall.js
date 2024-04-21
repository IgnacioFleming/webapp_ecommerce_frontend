import alerts from "../utils/alerts/alerts";

export default class ApiCall {
  constructor(path) {
    this.path = path;
  }

  async upload(id, data, token) {
    try {
      const result = await fetch(`${this.path}/uploadProfileImage/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const payload = await result.json();
      return payload;
    } catch (error) {
      alerts.errorAlert("There was a problem while processing your data");
    }
  }
  async getProfileImage(id, token) {
    try {
      const result = await fetch(`${this.path}/profileImage/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const { payload } = await result.json();
      return payload;
    } catch (error) {
      alerts.errorAlert("There was a problem while fetching data");
    }
  }
}
