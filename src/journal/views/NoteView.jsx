import { useEffect, useMemo, useRef } from "react";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString  = useMemo(()=>{
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
      dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if(messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])
    
    const fileInputRef = useRef();

    const onSaveNote = () =>{
        dispatch(startSaveNote());
    }

    const onFileInputChange =({target})=>{
        if(target.files===0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete =()=>{
        dispatch(startDeletingNote());
    }

    return (
        <Grid container direction='row'
            justifyContent='space-between'
            alignItems='center'
            className="animate__animated animate__fadeIn animate__faster"

            sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{ dateString }</Typography>
            </Grid>

            <input 
                type="file"
                multiple
                ref={fileInputRef}
                onChange={onFileInputChange}
                style={{display:'none'}}
            />    

            <IconButton 
                onClick={()=>fileInputRef.current.click()} 
                color='primary' disabled={isSaving} 
            >
                <UploadOutlined />
            </IconButton> 

            <Grid item>
                <Button 
                    disabled={isSaving} 
                    onClick={onSaveNote} 
                    color='primary' 
                    sx={{ p: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedio en el dia de hoy?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid
              container
              justifyContent='end'              
            >
              <Button 
                onClick={onDelete}
                sx={{mt:2}}
                color="error"
              >
                <DeleteOutline />
                Borrar
              </Button>
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGallery images={note.imageUrls} />
        </Grid>
    )
}