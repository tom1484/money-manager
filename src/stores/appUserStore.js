import create from "zustand";

const useAppUserStore = create((set) => ({
    appUser: null,
    signInProcessing: false,
    signInAppUser: (userName, password) => {
        // set({ appUser: userName });
        set({ signInProcessing: true });
        console.log(userName)
    },
}));

export default useAppUserStore;