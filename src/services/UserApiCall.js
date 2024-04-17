import ApiCall from "./ApiCall";
const path = `${import.meta.env.VITE_APP_BASE_URL}/api/users`;
export default class UserApiCall extends ApiCall {
  constructor() {
    super(path);
  }
}
