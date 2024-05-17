'use client'

import React, { useState } from 'react'

const S3UploadForm = () => {
  const [downloadUrl, setDownloadUrl] = useState(null) // 다운로드 URL 상태 추가
  const [isUploading, setIsUploading] = useState(false) // 업로드 중 상태 추가

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsUploading(true) // 업로드 시작 시 업로드 중 상태를 true로 설정
    setDownloadUrl(null) // 폼 제출 시 다운로드 URL 초기화
    const formData = new FormData()
    const file = event.target.file.files[0]
    formData.append('file', file)

    // 변환 옵션을 formData에 추가
    formData.append('compress', event.target.compress.checked)
    formData.append('flip', event.target.flip.checked)
    formData.append('flop', event.target.flop.checked)

    try {
      const response = await fetch('/api/s3-upload', {
        method: 'POST',
        body: formData,
      })

      setIsUploading(false) // 응답 받은 후 업로드 중 상태를 false로 설정

      if (response.ok) {
        const data = await response.json()
        if (data.url) {
          // 다운로드 URL 상태 업데이트
          setDownloadUrl(data.url)
        } else {
          alert(`File uploaded successfully with name: ${data.fileName}`)
        }
      } else {
        alert('Error uploading file')
      }
    } catch (error) {
      setIsUploading(false) // 에러 발생 시 업로드 중 상태를 false로 설정
      alert('Error uploading file')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          disabled={isUploading}
        />
        <div>
          <input
            type="checkbox"
            id="compress"
            name="compress"
            disabled={isUploading}
          />
          <label htmlFor="compress">Compress Image</label>
        </div>
        <div>
          <input type="checkbox" id="flip" name="flip" disabled={isUploading} />
          <label htmlFor="flip">Flip Image Vertically</label>
        </div>
        <div>
          <input type="checkbox" id="flop" name="flop" disabled={isUploading} />
          <label htmlFor="flop">Flop Image Horizontally</label>
        </div>
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {downloadUrl && (
        <>
          <img src={downloadUrl} alt="Uploaded content" /> {/* 이미지 렌더링 */}
          <a
            href={downloadUrl}
            download="transformed-image"
            style={{
              marginTop: '20px',
              display: 'inline-block',
              textDecoration: 'none',
              padding: '10px',
              background: '#007bff',
              color: '#ffffff',
              borderRadius: '5px',
            }}
          >
            Download Image
          </a>
        </>
      )}
    </>
  )
}

export default S3UploadForm
