import UserStore from "./UserStore";
import AuthStore from "./AuthStore";

export default class RootStore {
  userStore: UserStore;
  authStore: AuthStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
  }
}
