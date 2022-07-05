import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, RouteComponentProps } from "react-router-dom";
import { PostAuthor } from "./PostAuthor"

type SinglePostPageParams = {
    postId: string
}

type SinglePostPageProps = RouteComponentProps<SinglePostPageParams>

export const SinglePostPage: React.FC<SinglePostPageProps> = ( { match } ) => {
    const postId = match.params.postId;
    const post = useSelector((state: RootState) => state.posts.posts.find(post => post.id === postId))

    if (!post) {
        return (
            <section>
                <h2>
                    Post not found!
                </h2>
            </section>
        )
    }

    return (
        <section>
            <article className="post">
                <h2>
                    {post.title}
                </h2>
                <p className="post-content">{post.content}</p>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
                <p></p>
                <PostAuthor userId={post.userId}></PostAuthor>
                <p> on: {post.date} </p>
            </article>
        </section>
    )
}