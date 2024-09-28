"use client";
import RootStore from "../../stores/RootStore";
import { createContext } from "react";

export const storeContext = createContext<RootStore>(new RootStore());
