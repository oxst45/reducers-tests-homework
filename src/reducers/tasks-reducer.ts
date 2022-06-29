import {TasksType} from '../App';

const DELETE_TASK = 'DELETE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_ISDONE = 'CHANGE-TASK-ISDONE'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

export type ActionType = DeleteTaskAT | AddTaskAT | ChangeTaskIsDoneAT | ChangeTaskTitleAT

export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskIsDoneAT = ReturnType<typeof changeTaskIsDoneAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (tasks: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case DELETE_TASK:
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].filter((task) => {
                    return task.id !== action.taskID
                })
            }
        case ADD_TASK:
            return {
                ...tasks,
                [action.todolistID]: [
                    {
                        id: action.taskID,
                        tech: action.title,
                        isDone: false
                    },
                    ...tasks[action.todolistID]
                ]
            }
        case CHANGE_TASK_TITLE:
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map((t) => t.id === action.taskID ? {...t, tech: action.title} : t)
            }
        case CHANGE_TASK_ISDONE:
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].map((t) => t.id === action.taskID? {...t, isDone: action.isDone} : t)
            }
    }
    return tasks
}

export const deleteTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: DELETE_TASK,
        todolistID,
        taskID
    } as const
}
export const addTaskAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: ADD_TASK,
        todolistID,
        taskID,
        title
    } as const
}


export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        todolistID,
        taskID,
        title
    } as const
}



export const changeTaskIsDoneAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: CHANGE_TASK_ISDONE,
        todolistID,
        taskID,
        isDone
    } as const
}

