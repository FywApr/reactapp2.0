import { createFileRoute } from "@tanstack/react-router";
import { NoteOne } from "../../pages/notes/NoteOne";



export const Route = createFileRoute("/notes/$noteId")({
    component: NotesOneRoute,
    staticData: {
        title: "Заметка",
    }
});

function NotesOneRoute(){
    return <NoteOne />
}