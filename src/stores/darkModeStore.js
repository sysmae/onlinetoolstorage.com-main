import { create } from 'zustand'

const useDarkModeStore = create((set) => ({
  darkMode: 'system', // 초기 완벽하진 않지만, 시스템 설정에 따라 다크 모드 설정
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode
      localStorage.setItem('darkMode', newMode ? 'true' : 'false') // localStorage에 상태 저장
      document.body.classList.toggle('dark', newMode)
      return { darkMode: newMode }
    }),
  initializeDarkMode: () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' // localStorage에서 다크 모드 상태 읽기
    set({ darkMode: isDarkMode })
    document.body.classList.toggle('dark', isDarkMode)
  },
}))

export default useDarkModeStore
