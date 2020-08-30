import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Modal, Input } from '@material-ui/core';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxshadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function Todo(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState();

	const updateTodo = () =>{
		// update the todo with the new input text
		db.collection('todos').doc(props.todo.id).set({ todo: input }, { merge: true });

		setOpen(false);
	}
	const handleOpen = () => {
		setOpen(true);
		};

    return (
				
        <List>
					<Modal
						open={open}
						onClose={e => setOpen(false)}
						className={classes.modal}
					>
						<div className={classes.paper}>
							<h1>Open</h1>
							<Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
							<Button onClick={updateTodo} variant="contained" color="primary">update todo</Button>
						</div>
					</Modal>	
        	<ListItem>
						<ListItemText primary={props.todo.todo} secondary="deadline 🕓" />
						<EditIcon onClick={e => setOpen(true)}/>
						<DeleteForeverIcon onClick={
            event => db.collection('todos').doc(props.todo.id).delete()
        	} />
          </ListItem>
        </List>
    )
}

export default Todo
