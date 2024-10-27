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
import { usePathname, useRouter } from "next/navigation";
import { deleteStrategy } from "@/api/strategy";

export default function ModifyStrategy({ strategyID }: { strategyID: string }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`${pathname}/edit-strategy`);
  };

  const handleDelete = async () => {
    let complete;
    try {
      const res = deleteStrategy(strategyID);

      complete = res;
    } catch (error) {
      console.log(error);
    }

    if (complete) {
      router.push("/strategies");
      router.refresh();
    }
  };

  return (
    <div className="space-x-2">
      <Button variant="outline" onClick={handleEdit}>
        Edit Strategy
      </Button>

      <Button
        variant="destructive"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Delete Strategy
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Delete this strategy?</DialogTitle>
            <DialogDescription>
              This will permanently delete the strategy and all associated
              backtests. This action cannot be undone.
            </DialogDescription>
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
