import { nanoid } from "@reduxjs/toolkit";
import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("")

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

    // In order to dispatch actions from a component, we need access to the store's dispatch function. We get this by calling the useDispatch hook from React-Redux. 
    // We also need to import the postAdded action creator into this file.

    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content,
                    userId,
                    date: new Date().toISOString()
                })
            )

            setTitle("")
            setContent("")
            setUserId("")
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOption = users.map(user => (
        <option key={user.id} value = {user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>
                Add a New Post 
            </h2>
            <form>
                <label htmlFor="postTitle"> Post Title:</label>
                <input
                    type="text" 
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOption}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
                    Save Post
                </button>
            </form>
        </section>
    )
}