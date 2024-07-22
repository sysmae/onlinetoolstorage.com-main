// stores/darkModeStore.js
import create from 'zustand'

const useDarkModeStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode
      localStorage.setItem('darkMode', newMode)
      document.body.classList.toggle('dark', newMode)
      return { darkMode: newMode }
    }),
  initializeDarkMode: () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    set({ darkMode: isDarkMode })
    document.body.classList.toggle('dark', isDarkMode)
  },
}))

export default useDarkModeStore
