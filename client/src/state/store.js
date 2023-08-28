import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogged: false,
      posts: [],

      setLogin: (user, token) => {
        set({
          user: user,
          token: token,
          isLogged: true,
        });
      },

      setLogout: () => {
        set({
          user: null,
          token: null,
          isLogged: false,
        });
      },
      setFriends: (friends) => {
        set((state) => ({
          user: {
            ...state.user,
            friends: friends,
          },
        }));
      },

      setPosts: (posts) => {
        set(posts);
      },

      setPost: (updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          ),
        }));
      },
    }),
    {
      name: "zustand-social",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLogged: state.isLogged,
        posts: state.posts,
      }),
    }
  )
);

export default useStore;
