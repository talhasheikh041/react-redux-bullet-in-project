import { useState } from "react"

import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import { postAdded } from "./postsSlice"
import { selectAllUsers } from "../users/usersSlice"

const AddPostForm = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)

  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value)

  const onClickSavePost = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))
    }
    setTitle("")
    setContent("")
  }

  const canSavePost = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    )
  })

  return (
    <section>
      <h2 className="text-3xl font-bold">Add a New Post</h2>
      <form className="flex flex-col mt-4">
        <label htmlFor="postTitle" className="text-lg">
          Post Title:
        </label>
        <input
          className="bg-gray-900 outline-none border text-white rounded-sm focus:border-blue-300 pl-1"
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="text-lg mt-4" htmlFor="postAuthor">
          Author:
        </label>
        <select
          className="bg-gray-900 outline-none border text-white rounded-sm focus:border-blue-300 pl-1 p-1"
          name="postAuthor"
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value="">Select the Author</option>
          {usersOptions}
        </select>

        <label htmlFor="postContent" className="text-lg mt-4">
          Content:
        </label>
        <textarea
          className="bg-gray-900 outline-none border text-white rounded-sm focus:border-blue-300 pl-1"
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button
          type="button"
          className="border mt-4 p-1 text-lg hover:bg-slate-300 hover:text-black hover:font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
          onClick={onClickSavePost}
          disabled={!canSavePost}
        >
          {canSavePost ? "Save Post" : "🚫"}
        </button>
      </form>
    </section>
  )
}
export default AddPostForm
