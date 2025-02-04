import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, RouteComponentProps } from "react-router-dom";
import { PostAuthor } from "./PostAuthor"
import { ReactionButton } from "./ReactionButton";
import { selectPostById } from "./postsSlice";

type SinglePostPageParams = {
    postId: string
}

type SinglePostPageProps = RouteComponentProps<SinglePostPageParams>

export const SinglePostPage: React.FC<SinglePostPageProps> = ( { match } ) => {
    const postId = match.params.postId;
    const post = useSelector((state: RootState) => selectPostById(state, postId))

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
                <ReactionButton post={post}> </ReactionButton>
                <PostAuthor userId={post.userId}></PostAuthor>
                <p> on: {post.date} </p>
            </article>
        </section>
    )
}