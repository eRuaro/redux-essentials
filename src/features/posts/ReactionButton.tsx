import React from "react";
import { useDispatch } from "react-redux";
import { Post } from "./postsSlice";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
    "thumbsUp": '👍',
    "hooray": '🎉',
    "heart": '❤️',
    "rocket": '🚀',
    "eyes": '👀'
}

interface ReactionButtonsProp {
    post: Post
}

export const ReactionButton: React.FC<ReactionButtonsProp> = ({ post }) => {
    const dispatch = useDispatch()
    
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button 
                key={name} 
                type="button" 
                className="muted-button reaction-button"
                onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return (
        <div>
            {reactionButtons}
        </div>
    )
}