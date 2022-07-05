import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";

export const PostsList = () => {
    const listOfPosts = useSelector((state: RootState) => state.posts.posts);

    // sort posts in reverse chronological order by datetime string
    const orderedPosts = listOfPosts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p>Post Id: {post.id}</p>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    ));

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
