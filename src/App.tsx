import React, {useReducer, useState} from 'react';
import {Todolist} from './components/Todolist';
import './App.css';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {removeTodolistAC, todolistReducer} from './reducers/todolist-reducer';


export type FilterType = 'active' | 'completed' | 'all'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TechnologyType = {
    id: string
    tech: string
    isDone: boolean
}
export type TasksType = {
    [todoListID: string]: Array<TechnologyType>
}

function App() {
    // BLL
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const [tasks, setTasks] = useState<TasksType>({
        [todoListID_1]: [
            {id: v1(), tech: 'HTML', isDone: true},
            {id: v1(), tech: 'CSS', isDone: true},
            {id: v1(), tech: 'LESS', isDone: false},
            {id: v1(), tech: 'JS', isDone: true},
            {id: v1(), tech: 'React', isDone: false},
            {id: v1(), tech: 'TS', isDone: false},
            {id: v1(), tech: 'Redux', isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), tech: 'chocolate', isDone: true},
            {id: v1(), tech: 'ice-cream', isDone: true},
            {id: v1(), tech: 'bread', isDone: false},
            {id: v1(), tech: 'candy', isDone: false},
            {id: v1(), tech: 'potato', isDone: false}
        ]
    });

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'Tech List', filter: 'all'},
        {id: todoListID_2, title: 'Buy List', filter: 'all'}
    ])
    // BLL End

    // tasks
    const changeTechTitle = (todoListID: string, id: string, title: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map((t) => t.id === id ? {...t, tech: title} : t)
        })
    }
    const deleteTech = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((t) => t.id !== id)})
    }
    const addTech = (todolistID: string, techTitle: string) => {
        const newTech = {
            id: v1(),
            tech: techTitle,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTech, ...tasks[todolistID]]})
    }

    const changeTechStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map((t) => t.id === taskID ? {...t, isDone} : t)
        })
    }

    // todolist
    const addTodolist = (title: string) => {
        const newTodoListID = v1()
        setTodoLists([
            ...todoLists,
            {
                id: newTodoListID,
                title,
                filter: 'all'
            }
        ])
        setTasks({...tasks, [newTodoListID]: []});
    }
    const deleteTodolist = (todolistID: string) => {
        setTodoLists(todoLists.filter((tl) => tl.id !== todolistID))
        delete tasks[todolistID];
    }

    const changeTodolistTitle = (todoListID: string, title: string) => {
        setTodoLists(todoLists.map((tl) => tl.id === todoListID ? {...tl, title} : tl
        ))
    }
    const changeFilter = (todolistID: string, newFilter: FilterType) => {
        const newState = todoLists.map((tl) => {
            return tl.id === todolistID ? {...tl, filter: newFilter} : tl;
        })
        setTodoLists(newState)
    }


    const todolistComponents = todoLists.map((tl) => {
        return (
            <Todolist key={tl.id}
                      todolistID={tl.id}
                      title={tl.title}
                      filter={tl.filter}
                      tasks={tasks}

                      changeFilter={changeFilter}
                      deleteTech={deleteTech}
                      addTech={addTech}
                      changeTechStatus={changeTechStatus}

                      deleteTodolist={deleteTodolist}
                      changeTechTitle={changeTechTitle}
                      changeTodolistTitle={changeTodolistTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoLists.length ? todolistComponents : 'Create your todolist!'}
        </div>
    )
}


export default App;

// (CRUD)
// Create   -> [newObj, ...oldState]
// Read     -> (map + key = {id})
// Update   -> (map)
// Delete   -> (filter)

// Another
// filter -> filter
// sort -> sort
// sum -> reduce
