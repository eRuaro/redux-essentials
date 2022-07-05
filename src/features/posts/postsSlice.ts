import { createSlice } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { RootState } from '../../app/store';

export class Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    date: string;
    reactions: { [key: string]: number };

    constructor(id: string, title: string, content: string, userId: string, date: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.date = date
        this.reactions = {
            "thumbsUp": 0,
            "hooray": 0,
            "heart": 0,
            "rocket": 0,
            "eyes": 0,
        }
    }
}

export interface PostsState {
    posts: Post[];
    status: 'idle' | "pending" | "error" | "success";
}

const initialState: PostsState = {
    posts: [
        new Post("1", 'Post 1', 'Content 1', "1", sub(new Date(), { minutes: 10 }).toISOString()),
        new Post("2", 'Post 2', 'Content 2', "1", sub(new Date(), { minutes: 5 }).toISOString()),
    ],
    status: 'idle',
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // state refers to the array as this slice is only aware of the data it's responsible for
        postAdded(state, action) {
            const post = new Post(action.payload.id, action.payload.title, action.payload.content, action.payload.userId, action.payload.date)
            state.posts.push(post)
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload 
            const existingPost = state.posts.find(post => post.id === id)
        
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const initialPosts = (state: RootState) => state.posts;

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions; 

export default postsSlice.reducer