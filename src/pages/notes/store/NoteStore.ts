import { createEffect, createEvent, createStore } from "effector";
import { Note } from "../model/Note";
import { AddNoteDTO, UpdateNoteDTO } from "./NotesProvider";

export const addNote = createEvent<AddNoteDTO>();
export const updateNote = createEvent<UpdateNoteDTO>();
export const removeNote = createEvent<{id:number}>();

export const setNotesDefaultValue = createEffect<void, Note[]>(async () => {
   const response = await fetch("https://run.mocky.io/v3/8cd284b9-b9e7-40d6-bb90-79f84db05f12")
        .then(res => res.json())
   
    return response
})

export const $notes = createStore<Note[]>([])
    .on(addNote, (state, dto) => [
        ...state,
        { id: state.length + 1, createDate: new Date(), ...dto}
    ])
    .on(updateNote, (state, dto) => {
        state.map((note) =>{
            const { id, ...nestDTO } = dto
            if(note.id === dto.id){
                return {
                    ...note,
                    ...nestDTO,
                }
            }

        return note;
        })
    })
    .on(setNotesDefaultValue.doneData, (_, value) => value)
    .on(removeNote, (state, dto) => state.filter((item) => item.id !== dto.id));

