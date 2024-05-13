import { createFileRoute } from "@tanstack/react-router";
import { NoteForm } from "../../pages/notes/NoteForm";



export const Route = createFileRoute("/notes/add")({
    component: NotesFormRoute,
    staticData:{
        title:"Добавление заметки"
    }
});

function NotesFormRoute(){
    return <NoteForm />
}