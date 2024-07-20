import dynamic from 'next/dynamic'
import React, { useState, useRef, useEffect } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
})
import 'react-quill/dist/quill.snow.css'
// import 'react-quill/dist/quill.bubble.css'

const category = 'text'

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

  useEffect(() => {
    const data = localStorage.getItem('editorData')
    if (data) {
      const parsedData = JSON.parse(data)
      setTitle(parsedData.title)
      setContent(parsedData.content)
    }
  }, [])

  const handleChange = (contentValue) => {
    setContent(contentValue, () => {
      // Callback after state is updated
      updateLocalStorage(title, contentValue)
    })
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle, () => {
      // Callback after state is updated
      updateLocalStorage(newTitle, content)
    })
  }

  const handleDownload = () => {
    const element = document.createElement('a')

    // Extend replacements to handle paragraph tags as newlines
    let plainText = content
      .replace(/<\/p>/gi, '\n') // Converts closing paragraph tags to newlines
      .replace(/<br\s*\/?>/gi, '\n') // Convert HTML <br> to newline characters
      .replace(/&nbsp;/gi, ' ') // Convert non-breaking spaces to regular spaces
      .replace(/<[^>]+>/g, '') // Remove any remaining HTML tags

    const file = new Blob([plainText], {
      type: 'text/plain',
    })

    element.href = URL.createObjectURL(file)
    element.download = `${title || 'notepad-content'}.txt`
    document.body.appendChild(element)
    element.click()
  }

  function handleFileUpload(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] // Get the first file, assuming there's at least one file selected
      if (file instanceof Blob) {
        const reader = new FileReader()
        reader.onload = (event) => {
          let text = event.target.result
          text = text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') // Replace tabs with four non-breaking spaces
          text = text.replace(/\n/g, '<br>') // Replace newline characters with HTML <br> tags for correct rendering in Quill
          setContent(text)
          let titleWithoutExtension = file.name.replace(/\..+$/, '') // Sets the title to the file name without the extension
          setTitle(titleWithoutExtension, () => {
            updateLocalStorage(titleWithoutExtension, text)
          })
          localStorage.setItem(
            'editorData',
            JSON.stringify({ title: titleWithoutExtension, content: text }),
          )
        }
        reader.readAsText(file)
      } else {
        console.error('The chosen file is not a valid Blob.')
      }
    } else {
      console.error('No file was selected.')
    }
  }

  function updateLocalStorage(title, content) {
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
      <div
        style={editorStyle}
        className="editor-container bg-white shadow-lg rounded-lg overflow-auto"
      >
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full text-xl font-semibold border border-gray-300 rounded"
          placeholder="Enter the filename here..."
        />
        <div className="flex space-x-4 my-2">
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download as TXT
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Load TXT File
          </button>
          <button
            onClick={toggleFullScreen}
            className={`${isFullScreen ? 'bg-red-600 hover:bg-red-800' : 'bg-purple-600 hover:bg-purple-800'} text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out`}
          >
            {isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          </button>
        </div>
        <ReactQuill theme="snow" value={content} onChange={handleChange} />
      </div>
      <input
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
