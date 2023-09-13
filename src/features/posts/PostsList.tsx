import useAppSelector from "../../hooks/useAppSelector"
import PostAuthor from "./PostAuthor"
import ReactionButtons from "./ReactionButtons"
import TimeAgo from "./TimeAgo"
import { selectAllPosts } from "./postsSlice"

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts)

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const rederedPosts = orderedPosts.map((post) => {
    return (
      <article
        className="border mt-6 rounded-md p-4 border-gray-500 "
        key={post.id}
      >
        <h3 className="font-semibold text-2xl">{post.title}</h3>
        <p className="mt-3">{post.content.substring(0, 100)}</p>
        <p className="text-xs text-gray-400 mt-1">
          <PostAuthor userId={post.userId} />
          <TimeAgo timeStamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    )
  })
  return (
    <section className="mt-8">
      <h2 className="font-bold text-4xl">Posts</h2>
      {rederedPosts}
    </section>
  )
}
export default PostsList
