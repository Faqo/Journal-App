import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving:false,
        messageSaved:'',
        notes:[],
        // active:{
        //     id:'ABC123',
        //     title:'',
        //     body:'',
        //     date:1234567,
        //     imageUrls:[],
        // }
        active:null,
    },
    reducers: {
        savingNewNote: (state)=>{
            state.isSaving = true;
        },
        addNewEmptyNote:(state, action)=>{
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote:(state, action)=>{
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes:(state, action)=>{
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = ''
        },
        updateNote:(state, action)=>{
            state.isSaving = false;
            state.notes = state.notes.map( note =>{
                if(note.id === action.payload.id){
                    return action.payload;
                } 
                return note;
            });

            state.messageSaved = `"${action.payload.title}" actualizada correctamente`;
        },
        setPhotosToActiveNote:(state,action)=>{
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        deleteNoteById:(state, action)=>{
            state.active = null;
            state.isSaving = false;
            
            state.notes = state.notes.filter( note => note.id !== action.payload );

            state.messageSaved = `borado correctamente`;
        },
        clearNotesLogout:(state) =>{
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        }
    }
});


export const { 
    addNewEmptyNote, 
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote ,
    setSaving,
    updateNote 
} = journalSlice.actions;