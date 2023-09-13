import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"
import { RootStateType } from "../../app/store"
import { sub } from "date-fns"

type ReactionsType = {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export type PostStateType = {
  id: string
  title: string
  content: string
  userId?: string
  date: string
  reactions: ReactionsType
}

const initialState: PostStateType[] = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
]

export const selectAllPosts = (state: RootStateType) => state.posts

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostStateType>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        }
      },
    },
    reactionAdded: (state, action) => {
      const {
        postId,
        reaction,
      }: { postId: string; reaction: keyof ReactionsType } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, reactionAdded } = postsSlice.actions
export default postsSlice.reducer
