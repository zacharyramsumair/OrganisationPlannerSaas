import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteEvent } from "@/action/event"
import { useRouter } from "next/navigation";

export function DeleteEventDialog(props:any) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false); // State variable to track deletion process

  const pressDeleteEventButton = async () => {
    setIsDeleting(true); // Set the deletion state to true when button is clicked
    await deleteEvent(props.eventId);
    // router.push("/dashboard");
    // Reload the page after deletion
    window.location.reload(); 
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={"mx-2"} variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete this Event</DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={pressDeleteEventButton}
            disabled={isDeleting} // Disable button while deletion is in progress
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
