import { PropsWithChildren, FC, createContext, useState, useContext } from "react"
import { Note } from "../model/Note"

interface NotesContextValues {
    data: Note[],
    addNote: (dto: AddNoteDTO) => void;
    updateNote: (dto: UpdateNoteDTO) => void;
}


const NotesContext = createContext<NotesContextValues>({
    data: [],
    addNote: () => {},
    updateNote: () => {},
});

export const useNotes = () => useContext(NotesContext);

export type AddNoteDTO = Pick<Note, "title" | "description">;
export type UpdateNoteDTO = Partial<AddNoteDTO> & Pick<Note, "id">;


export const NotesProvider: FC<PropsWithChildren> = function NotesProvider(props){
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (dto: AddNoteDTO) => {
        setNotes((prevState) => [
            ...prevState,
            {id: prevState.length + 1, createDate: new Date(), ...dto},
        ]);
    };

    const updateNote = (dto: UpdateNoteDTO) => {
        const { id, ...nestDTO} = dto;
        setNotes((prevState) =>
            prevState.map((note) =>{
                if(note.id === dto.id){
                    return {
                        ...note,
                        ...nestDTO,
                    }
                }

            return note
            })
        );
    };

    return (
        <NotesContext.Provider value={{
            data: notes,
            addNote,
            updateNote,
        }}
        >
            {props.children}
        </NotesContext.Provider>
    )
}