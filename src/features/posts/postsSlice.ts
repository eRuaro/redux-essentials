import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { client } from '../../api/client';
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
    posts: Post[],
    status: 'idle' | "pending" | "success" | "error",
    error: string | null
}

const initialState: PostsState = {
    posts: [
        new Post("1", 'Post 1', 'Content 1', "1", sub(new Date(), { minutes: 10 }).toISOString()),
        new Post("2", 'Post 2', 'Content 2', "1", sub(new Date(), { minutes: 5 }).toISOString()),
    ],
    status: 'idle',
    error: null
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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'success'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'error'
                // null assertion operator
                state.error = action.error.message!
            })
    }
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions; 

export default postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, id: string) => state.posts.posts.find(post => post.id === id);