import { createFileRoute } from "@tanstack/react-router";
import { NoteList } from "../../pages/notes/NoteList";



export const Route = createFileRoute("/notes/")({
    component: NotesListRoute,
    staticData: {
        title: "Список заметок"
    }
});

function NotesListRoute(){
    return <NoteList />
}