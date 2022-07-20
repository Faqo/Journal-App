import { IconButton, Typography } from "@mui/material";
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { savingNewNote, startNewNote } from "../../store/journal";

export const JournalPage = () => {

  const dispatch = useDispatch()

  const { isSaving, active:note } = useSelector(state=>state.journal);

  const onClickNewNote=()=>{
    dispatch( startNewNote() );
    dispatch( savingNewNote() );
  }

  return (
    <JournalLayout>
      {
        (!!note)
        ?<NoteView />
        :<NothingSelectedView />
      }

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large"
        sx={{
          color:'white',
          backgroundColor:'error.main',
          ':hover':{backgroundColor:'error.main',opacity:0.8},
          position:'fixed',
          right:50,
          bottom:50
        }}
      >
        <AddOutlined sx={{fontSize:30}}/>
      </IconButton>
    </JournalLayout>
  )
}