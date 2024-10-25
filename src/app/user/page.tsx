import { useStore } from "@/utils/hooks/useStore";
import { observer } from "mobx-react-lite";

function User() {
  const {
    userStore: { userName, setUserName },
  } = useStore();

  return <div>{userName}</div>;
}

export default observer(User);
