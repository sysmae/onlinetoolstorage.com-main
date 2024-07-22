// Giscus.js
'use client'

import { useEffect, useRef, useState } from 'react'
import useDarkModeStore from '@/stores/darkModeStore'

export default function Giscus() {
  const ref = useRef(null)
  const { darkMode, initializeDarkMode } = useDarkModeStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    initializeDarkMode()
    setIsInitialized(true)
  }, [initializeDarkMode])

  useEffect(() => {
    if (isInitialized) {
      const iframe = document.querySelector('iframe.giscus-frame')
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: darkMode ? 'dark' : 'light' } } },
        'https://giscus.app',
      )
    }
  }, [darkMode, isInitialized])

  useEffect(() => {
    if (!isInitialized || !ref.current || ref.current.hasChildNodes()) return

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
    scriptElem.setAttribute('data-input-position', 'bottom')
    scriptElem.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    scriptElem.setAttribute('data-lang', 'ko')
    scriptElem.setAttribute('data-loading', 'lazy')
    scriptElem.setAttribute('crossOrigin', 'anonymous')

    ref.current.appendChild(scriptElem)
  }, [darkMode, isInitialized])

  return <section ref={ref} />
}
