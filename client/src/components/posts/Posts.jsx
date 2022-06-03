import Post from "../post/Post"
import "./posts.css"

export default function posts({posts}) {
    return (
        <div className="posts">
        {posts.map((p) => (
            <Post post={p}/>
        ))}
        </div>
    )
}
