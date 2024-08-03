import React, { useState, useRef, useEffect } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const category = 'general'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

function Editor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    const data = localStorage.getItem('editorData')
    if (data) {
      const parsedData = JSON.parse(data)
      setTitle(parsedData.title)
      setContent(parsedData.content)
    }
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

  const handleChange = (e) => {
    const contentValue = e.target.value
    setContent(contentValue)
    updateLocalStorage(title, contentValue)
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    updateLocalStorage(newTitle, content)
  }

  const handleDownload = () => {
    const element = document.createElement('a')

    let plainText = content
      .replace(/<\/p>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/&nbsp;/gi, ' ')
      .replace(/<[^>]+>/g, '')

    const file = new Blob([plainText], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${title || 'notepad-content'}.txt`
    document.body.appendChild(element)
    element.click()
  }

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        let text = event.target.result
        text = text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        text = text.replace(/\n/g, '<br>')
        setContent(text)
        const titleWithoutExtension = file.name.replace(/\..+$/, '')
        setTitle(titleWithoutExtension)
        updateLocalStorage(titleWithoutExtension, text)
      }
      reader.readAsText(file)
    }
  }

  const updateLocalStorage = (title, content) => {
    localStorage.setItem('editorData', JSON.stringify({ title, content }))
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const editorStyle = isFullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'white',
        padding: '20px',
        marginTop: '0rem',
        backgroundColor: 'gray',
      }
    : {}

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false)
      }
    }
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isFullScreen])

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div style={editorStyle} className="overflow-auto xl:mt-32">
        <div className="my-2 flex space-x-4">
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full rounded border border-gray-300 text-xl font-semibold"
            placeholder="Enter the filename here..."
          />
          <Button
            onClick={handleDownload}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Download as TXT
          </Button>
          <Button
            onClick={() => fileInputRef.current.click()}
            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Load TXT File
          </Button>
          <Button
            onClick={toggleFullScreen}
            className={`${isFullScreen ? 'bg-red-600 hover:bg-red-800' : 'bg-purple-600 hover:bg-purple-800'} rounded px-4 py-2 font-semibold text-white transition duration-300 ease-in-out`}
          >
            {isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          </Button>
        </div>
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          className="w-full resize-none overflow-hidden rounded border border-gray-300"
        />
      </div>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".txt"
      />
      <CustomContent category={category} />
    </>
  )
}

export default Editor
