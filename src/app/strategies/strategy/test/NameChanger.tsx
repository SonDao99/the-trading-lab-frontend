"use client";
import { useStore } from "@/utils/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function NameChanger() {
  const {
    userStore: { userName, setUserName },
  } = useStore();

  const [newUserName, setNewUserName] = useState<string>(userName);

  return (
    <div className="min-h-full flex-1">
      <h1>{userName}</h1>

      <input
        value={newUserName}
        onChange={(e) => {
          setNewUserName(e.target.value);
        }}
      ></input>

      <Button
        onClick={() => {
          setUserName(newUserName);
        }}
      >
        Change Username
      </Button>
    </div>
  );
}

export default observer(NameChanger);
