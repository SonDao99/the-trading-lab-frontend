import RootStore from "./RootStore";
import { makeAutoObservable } from "mobx";

export default class AuthStore {
  rootStore: RootStore;
  userName: string = "idik69";
  fullName: string = "Izuk Dik";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }
}
