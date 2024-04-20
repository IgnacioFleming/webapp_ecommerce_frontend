import alerts from "../utils/alerts/alerts";
import { jwt } from "../utils/utils";

export default class ApiCall {
  constructor(path) {
    this.path = path;
  }

  async upload(id, data) {
    try {
      const result = await fetch(`${this.path}/uploadProfileImage/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${jwt}` },
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
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const { payload } = await result.json();
      return payload;
    } catch (error) {
      alerts.errorAlert("There was a problem while fetching data");
    }
  }
}
