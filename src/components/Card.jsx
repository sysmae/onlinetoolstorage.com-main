import React from 'react'

const Card = ({ title, content }) => {
  // title이 React 요소인지 확인
  const isTitleLink = React.isValidElement(title)

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white dark:bg-gray-600">
      <div className="font-bold text-xl mb-2 dark:bg-gray-600">
        {isTitleLink ? title : <span>{title}</span>}
      </div>
      <p className="text-gray-700 text-base">{content}</p>
    </div>
  )
}

export default Card
