// Giscus.js
'use client'

import { useEffect, useRef } from 'react'
import useDarkModeStore from '@/stores/darkModeStore'

export default function Giscus() {
  const ref = useRef(null)
  const { darkMode, initializeDarkMode } = useDarkModeStore()

  useEffect(() => {
    initializeDarkMode()
  }, [initializeDarkMode])

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'darkMode') {
        const newTheme = event.newValue === 'true' ? 'dark' : 'light'
        updateGiscusTheme(newTheme)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const theme = darkMode ? 'dark' : 'light'

    const scriptElem = document.createElement('script')
    scriptElem.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'

    scriptElem.setAttribute('data-repo', 'sysmae/OTMComments')
    scriptElem.setAttribute('data-repo-id', 'R_kgDOMXcVmg')
    scriptElem.setAttribute('data-category', 'Comments')
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOMXcVms4Cg2dh')
    scriptElem.setAttribute('data-mapping', 'pathname')
    scriptElem.setAttribute('data-strict', '0')
    scriptElem.setAttribute('data-reactions-enabled', '1')
    scriptElem.setAttribute('data-emit-metadata', '1')
    scriptElem.setAttribute('data-input-position', 'top')
    scriptElem.setAttribute('data-theme', theme)
    scriptElem.setAttribute('data-lang', 'ko')
    scriptElem.setAttribute('data-loading', 'lazy')
    scriptElem.setAttribute('crossOrigin', 'anonymous')

    ref.current.appendChild(scriptElem)
  }, [ref, darkMode])

  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: darkMode ? 'dark' : 'light' } } },
      'https://giscus.app',
    )
  }, [darkMode])

  return <section ref={ref} />
}
