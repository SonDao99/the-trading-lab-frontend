import { useStore } from "@/utils/hooks/useStore";

export default function User() {
  const {
    userStore: { userName, setUserName },
  } = useStore();

  return <div>{userName}</div>;
}
