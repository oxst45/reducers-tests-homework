import React, {ChangeEvent} from 'react';
import {FilterType, TasksType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableTitle} from './EditableTitle';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';


type TodolistPropsType = {
    todolistID: string
    title: string
    filter: FilterType
    tasks: TasksType

    changeFilter: (todolistID: string, newFilter: FilterType) => void
    deleteTech: (todolistID: string, id: string) => void
    addTech: (todolistID: string, techTitle: string) => void
    changeTechStatus: (todolistID: string, taskID: string, isDone: boolean) => void

    deleteTodolist: (todolistID: string) => void
    changeTechTitle: (todoListID: string, id: string, title: string) => void
    changeTodolistTitle: (todoListID: string, title: string) => void
}

export function Todolist(props: TodolistPropsType) {

    let techList = props.tasks[props.todolistID]
    if (props.filter === 'active') {
        techList = props.tasks[props.todolistID].filter((t) => !t.isDone)
    }
    if (props.filter === 'completed') {
        techList = props.tasks[props.todolistID].filter((t) => t.isDone)
    }
    const technologiesList = techList.map((t) => {
        const onClickDelHandler = () => {
            props.deleteTech(props.todolistID, t.id)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTechStatus(props.todolistID, t.id, e.currentTarget.checked)
        }
        const editTechTitle = (title: string) => {
            props.changeTechTitle(props.todolistID, t.id, title)
        }

        return (
            <li key={t.id}>
                {/*<Button onClick={onClickDelHandler}>X</Button>*/}

                <IconButton onClick={onClickDelHandler}
                            aria-label="delete"
                            size={'small'}
                            color={"error"}
                >
                    <Delete/>
                </IconButton>


                <EditableTitle title={t.tech} editTitle={editTechTitle}/>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeHandler}
                />
            </li>
        )
    })

    const onClickAllHandler = () => {
        props.changeFilter(props.todolistID, 'all')
    }
    const onClickActiveHandler = () => {
        props.changeFilter(props.todolistID, 'active')
    }
    const onClickCompletedHandler = () => {
        props.changeFilter(props.todolistID, 'completed')
    }
    const onDelTodolistClickHandler = () => {
        props.deleteTodolist(props.todolistID);
    }
    const AddTask = (title: string) => {
        props.addTech(props.todolistID, title)
    }
    const editTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
    }

    return (
        <div className={'todolist'}>
            <h3>
                <EditableTitle title={props.title} editTitle={editTodolistTitle}/>
                <Button onClick={onDelTodolistClickHandler}>❌</Button>
            </h3>

            <AddItemForm addItem={AddTask}/>

            <div>
                <ul>
                    {technologiesList}
                </ul>
            </div>

            <div>
              {/*  // activeStyle={}
                // activeStyle={props.filter === 'active' ? styles.filterActive : ''}
                // activeStyle={props.filter === 'completed' ? styles.filterActive : ''}*/}

                <Button variant="contained"
                        color={props.filter === 'all' ? "success" : 'secondary'}
                        size={'small'}
                        onClick={onClickAllHandler}
                >
                    All
                </Button>

                <Button variant="contained"
                        color={props.filter === 'active' ? "success" : 'secondary'}
                        size={'small'}
                        onClick={onClickActiveHandler}
                >
                    Active
                </Button>

                <Button variant="contained"
                        color={props.filter === 'completed' ? "success" : 'secondary'}
                        size={'small'}
                        onClick={onClickCompletedHandler}
                >
                    Completed
                </Button>

            </div>
        </div>
    )
}

