import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { RouteComponentProps } from "react-router-dom";

type SinglePostPageParams = {
    postId: string
}

type SinglePostPageProps = RouteComponentProps<SinglePostPageParams>

export const SinglePostPage: React.FC<SinglePostPageProps> = ( { match } ) => {
    const postIdString  = match.params.postId;
    const postId: number = +postIdString;
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
            </article>
        </section>
    )
}