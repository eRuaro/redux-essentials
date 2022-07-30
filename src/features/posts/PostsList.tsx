import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { Spinner } from "../../components/Spinner";
import { PostAuthor } from "./PostAuthor";
import { fetchPosts, Post, selectAllPosts } from "./postsSlice";
import { ReactionButton } from "./ReactionButton";
import { TimeAgo } from "./TimeAgo";

const PostExcerpt = ({ post }: { post: Post }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <ReactionButton post={post}/>
            <Link to={`/posts/${post.id}`} className='button muted-button'>
                View Post
            </Link>
        </article>
    )
}

export const PostsList = () => {
    const dispatch = useDispatch();
    const listOfPosts = useSelector(selectAllPosts);

    const postStatus = useSelector((state: RootState) => state.posts.status);
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])
    const error = useSelector((state: RootState) => state.posts.error);

    let content

    if (postStatus === 'pending') {
        content = <Spinner text="Loading posts..." />
    } else if (postStatus === 'success') {
        // sort posts in reverse chronological order by datetime string
        const orderedPosts = listOfPosts.slice().sort((a, b) => b.date.localeCompare(a.date))

        content = orderedPosts.map(post => (
            <PostExcerpt key={post.id} post={post}/>
        ));
    } else if (postStatus === 'error') {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}
