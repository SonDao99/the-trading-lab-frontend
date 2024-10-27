"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteTest } from "@/api/test";

export default function DeleteTest({
  strategyID,
  testID,
}: {
  strategyID: string;
  testID: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    let complete;
    try {
      const res = deleteTest(testID);

      complete = res;
    } catch (error) {
      console.log(error);
    }

    if (complete) {
      router.push(`/strategies/${strategyID}`);
      router.refresh();
    }
  };

  return (
    <div className="space-x-2">
      <Button
        variant="destructive"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Delete Backtest
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Delete this backtest?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
