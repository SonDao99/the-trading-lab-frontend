import RootStore from "./RootStore";
import { makeAutoObservable } from "mobx";
import { StrategyCardData } from "@/lib/constants";
import { getStrategies } from "@/api/strategies";

export default class StrategiesStore {
  rootStore: RootStore;
  strategies: StrategyCardData[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  fetchStrategies = async () => {
    this.strategies = await getStrategies(this.rootStore.authStore.userid);
  };
}
