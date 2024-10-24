import RootStore from "./RootStore";
import { makeAutoObservable } from "mobx";

export default class AuthStore {
  rootStore: RootStore;
  email: string = "sondao1999@gmail.com";
  name: string = "Son Dao";
  userid: string = "113053702607165718413";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }
}
