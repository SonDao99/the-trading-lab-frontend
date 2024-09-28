import RootStore from "./RootStore";
import { makeAutoObservable } from "mobx";

export default class AuthStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }
}
