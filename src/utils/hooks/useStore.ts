import { useContext } from "react";
import { storeContext } from "../contexts/storeContext";

export const useStore = () => useContext(storeContext);
