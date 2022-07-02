import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export class Post {
    id: number;
    title: string;
    content: string;

    constructor(id: number, title: string, content: string) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}

export interface PostsState {
    posts: Post[];
    status: 'idle' | "pending" | "error" | "success";
}

const initialState: PostsState = {
    posts: [
        new Post(1, 'Post 1', 'Content 1'),
        new Post(2, 'Post 2', 'Content 2'),
    ],
    status: 'idle',
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // state refers to the array as this slice is only aware of the data it's responsible for
        postAdded(state, action) {
            state.posts.push(action.payload)
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload 
            const existingPost = state.posts.find(post => post.id === id)
        
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const initialPosts = (state: RootState) => state.posts;

export const { postAdded, postUpdated } = postsSlice.actions; 

export default postsSlice.reducer