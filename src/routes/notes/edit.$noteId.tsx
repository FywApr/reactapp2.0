import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "@mui/material";
import { useUnit } from "effector-react";
import { $notes } from "../../pages/notes/store/NoteStore";
import { NoteForm } from "../../pages/notes/NoteForm";



export const Route = createFileRoute("/notes/edit/$noteId")({
    component: NotesFormRoute,
    staticData: {
        title: "Редактировать заметку",
    }
});

function NotesFormRoute(){
    const { noteId } = Route.useParams();
    const data = useUnit($notes);
    const note = data.find((note) => note.id === Number(noteId));

    if (!note) {
        return <Typography align={'center'}>{"Заметки не существует"}</Typography>
    }

    return <NoteForm note={note} />
}