import RootStore from "./RootStore";
import { makeAutoObservable } from "mobx";

export default class UserStore {
  rootStore: RootStore;
  userName: string = "whiny boy";
  testData: string = "";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setUserName = (newName: string) => {
    this.userName = newName;
  };
}
