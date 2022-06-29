import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css';
import {Button} from '@mui/material';

type PropsType = {
    addItem: (title: string) => void
}
export function AddItemForm(props: PropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError('')
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTaskClickHandler();
        }
    }

    const onAddTaskClickHandler = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Invalid value')
        }
    }

    return (
        <div>
            <input type="text"
                   value={title}
                   onChange={onTitleChangeHandler}
                   onKeyDown={onEnterHandler}
            />
            <Button onClick={onAddTaskClickHandler}>Add</Button>

            {error && <div className={styles.invalid}>
                {error}
            </div>}
        </div>
    );
}