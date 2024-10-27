import UserStore from "./UserStore";
import AuthStore from "./AuthStore";
import StrategiesStore from "./StrategiesStore";

export default class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  strategiesStore: StrategiesStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
    // this.strategiesStore = new StrategiesStore(this);
  }
}
