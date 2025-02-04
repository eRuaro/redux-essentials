import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { RootState } from "../../app/store";

import { postUpdated, selectPostById } from "./postsSlice";

type EditPostFormParams = {
    postId: string, 
}

type EditPostFormProps = RouteComponentProps<EditPostFormParams>

export const EditPostForm: React.FC<EditPostFormProps> = ( { match } ) => {
    const postId= match.params.postId

    const post = useSelector((state: RootState) => selectPostById(state, postId))

    const [title, setTitle] = useState(post!.title)
    const [content, setContent] = useState(post!.content)  
    
    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({
                id: postId,
                title: title,
                content: content
            }))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </section>
    )
}