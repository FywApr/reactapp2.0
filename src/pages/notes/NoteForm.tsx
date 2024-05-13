import { TextField } from '@mui/material';
import  { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../shared/ui/Button';
import { useRouter } from '@tanstack/react-router';
import { Note } from './model/Note';
import { useUnit } from 'effector-react';
import { addNote, updateNote } from './store/NoteStore';


interface Props {
  note?: Note;
}

type Form = {
  title: string;
  description: string;
};


export const NoteForm: FC<Props> = function NoteForm(props) {
  const [addNoteFn,updateNoteFn] = useUnit([addNote, updateNote]);
  const { history } = useRouter();
  const {handleSubmit, control, formState: {isValid} } = useForm<Form>({
    defaultValues: {
      title: props.note?.title ?? "",
      description: props.note?.description ?? ""
    }
  });

  

  return (
    <form className='gap-6 flex flex-col pt-4' onSubmit={handleSubmit((form) => {
      if(props.note){
        updateNoteFn({ id: props.note.id, ...form});
      } else {
        addNoteFn(form)
      }

      history.back();
    })}>
      <Controller 
      name='title' 
      control={control} 
      rules={{
        required: 'Title is required',
        validate: (value) => value.length > 5 || "Минимум 6 символов"
      }} 
      render={({field, fieldState: {error}})=> (
        <TextField {...field} error={Boolean(error?.message)} helperText={error?.message} label={"Заголовок"} fullWidth={true} variant={"outlined"}/>
      )}/>
      
      <Controller 
      name='description' 
      control={control} 
      rules={{
        required: 'Title is required',
        validate: (value) => value.length > 5 || "Минимум 6 символов"
      }} 
      render={({field, fieldState: {error}})=> (
        <TextField {...field} error={Boolean(error?.message)} helperText={error?.message} label={"Описание"} fullWidth={true} multiline={true} maxRows={4}/>
      )}/>
      <Button disabled={!isValid} type='submit'>{props.note ? "Сохранить" : "Добавить"}</Button>
    </form>
  ) 
};