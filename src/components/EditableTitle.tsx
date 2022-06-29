import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    title: string
    editTitle: (title: string) => void
}

export function EditableTitle(props: PropsType) {

    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditHandler = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.editTitle(title);
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        editMode
            ? <input type="text"
                     autoFocus
                     onBlur={offEditMode}
                     onKeyDown={onEnterHandler}
                     onChange={onChangeSetTitle}
                     value={title}
            />
            : <span onDoubleClick={onEditHandler}>{title}</span>
    );
}