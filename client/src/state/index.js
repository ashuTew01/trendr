import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    profileFriends: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            //it seems like you are modifying the state directly instead of replacing the 
            //object like in vanilla redux, but under the hood this is not the case.
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends don't exist.")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setProfileFriends: (state, action) => {
            if(state.profileFriends) {
                state.profileFriends = action.payload.friends;
            } else {
                console.error("User friends don't exist.")
            }
        }
    }
});

export const { 
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts,
    setPost,
    setProfileFriends
 } = authSlice.actions;

 export default authSlice.reducer;