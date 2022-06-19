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
    reducers: {}
})

export const initialPosts = (state: RootState) => state.posts;

export default postsSlice.reducer