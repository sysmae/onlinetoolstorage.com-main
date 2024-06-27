import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'random'

const loremSentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.',
  'Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
  'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.',
  'Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.',
  'Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.',
  'Diam maecenas ultricies mi eget mauris pharetra et ultrices.',
  'Neque viverra justo nec ultrices dui sapien eget mi proin.',
  'Sed vulputate odio ut enim blandit volutpat maecenas volutpat.',
  'Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet.',
  'Consectetur libero id faucibus nisl tincidunt eget nullam non nisi.',
  'Est sit amet facilisis magna etiam tempor orci eu.',
  'Lobortis elementum nibh tellus molestie nunc non blandit massa.',
  'Enim nec dui nunc mattis enim ut tellus elementum sagittis.',
  'Vitae suscipit tellus mauris a diam maecenas sed enim ut.',
  'Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum.',
  'Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat.',
  'Vivamus at augue eget arcu dictum varius duis at consectetur.',
  'Lacus vel facilisis volutpat est velit egestas dui id ornare.',
  'Sed adipiscing diam donec adipiscing tristique risus nec feugiat in.',
  'Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus.',
  'Ultricies leo integer malesuada nunc vel risus commodo viverra.',
  'Maecenas accumsan lacus vel facilisis volutpat est velit egestas.',
  'Praesent elementum facilisis leo vel fringilla est ullamcorper eget.',
  'Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.',
  'Fermentum et sollicitudin ac orci phasellus egestas tellus.',
]

const koreanLoremSentences = [
  '가나다라 마바사 아자차카 타파하.',
  '무작위 텍스트를 생성하는 예시입니다.',
  '한글 로렘 문장 또한 임의로 배치할 수 있습니다.',
  '텍스트 예제는 다양한 환경에서 테스트하기 좋습니다.',
  '내용이나 의미는 없으며 디자인 레이아웃을 위한 것입니다.',
  '디자인과 레이아웃 검토를 위한 임시 문장 추가.',
  '본문의 흐름을 확인하기 위한 한글 텍스트 예제.',
  '레이아웃 디자인 시 사용될 수 있는 더미 텍스트.',
  '페이지 디자인의 시각적 요소를 보완하기 위한 텍스트.',
  '글꼴, 정렬, 간격 등을 검토하기 위한 예제 문장들.',
  '시각적 디자인의 효과를 확인할 수 있는 기본 텍스트.',
  '레이아웃의 구성 요소를 시험하는 데 사용되는 문장.',
  '페이지 구성 요소 간의 균형을 맞추기 위해 사용됩니다.',
  '디자인 프로토타입을 위한 가이드라인으로 활용되는 문장.',
  '콘텐츠 배치를 위한 임시 텍스트로 활용됩니다.',
  '디자인 요소의 조화를 시험하기 위한 기본 텍스트입니다.',
  '유저 인터페이스 디자인에서의 가독성 테스트를 위한 문장.',
  '웹사이트 레이아웃의 효과적인 시각적 구성을 위한 문장.',
  '인쇄 미디어 디자인의 레이아웃을 검토하기 위한 텍스트.',
  '디지털 디자인의 요소를 검토하는 데 사용되는 기본 문장.',
  '브랜드 디자인의 일관성을 시험하기 위한 더미 텍스트.',
  '광고 레이아웃의 효과를 평가하기 위한 임시 문장.',
  '제품 포장 디자인에서의 텍스트 배치를 위한 예제.',
  '소셜 미디어 콘텐츠 레이아웃을 위한 기본 텍스트.',
  '시각적 스토리텔링을 위한 레이아웃 테스트 문장.',
  '정보 디자인에서 데이터 시각화를 보완하는 문장.',
  '사용자 경험 디자인 테스트를 위한 기본 문장들.',
  '인터랙티브 디자인 요소의 시각적 테스트를 위한 텍스트.',
  '디지털 아트워크의 배경으로 사용될 수 있는 더미 문장.',
  '크리에이티브 프로젝트의 컨셉 아이디어를 시험하는 문장.',
]

const containerStyle = 'max-w-4xl mx-auto py-8 px-4'
const headingStyle = 'text-xl font-bold mb-4'
const inputStyle = 'border border-gray-300 p-2 mr-2'
const buttonStyle =
  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
const copiedPopupStyle =
  'p-2 text-white bg-green-500 rounded absolute top-2 right-2'

function generateLoremSentences(count, isKorean = false) {
  let sentences = []
  const sourceArray = isKorean ? koreanLoremSentences : loremSentences
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * sourceArray.length)
    sentences.push(sourceArray[randomIndex])
  }
  return sentences.join(' ') // 문장들을 공백으로 구분하여 한 줄로 만듭니다.
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [count, setCount] = useState(1)
  const [generatedSentence, setGeneratedSentence] = useState('')
  const [showCopied, setShowCopied] = useState(false)

  const handleGenerate = (isKorean) => {
    setGeneratedSentence(generateLoremSentences(count, isKorean))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000) // 2초 후에 사라지게 설정
      },
      (err) => {
        console.error('복사 실패:', err)
      },
    )
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className={containerStyle}>
        <h2 className={headingStyle}>Random Lorem Sentence Generator</h2>
        <div>
          <label>
            Number of sentences to generate:
            <input
              className={inputStyle}
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <button
          className={`${buttonStyle} mr-2`}
          onClick={() => handleGenerate(false)}
        >
          Generate English Lorem
        </button>
        <button className={buttonStyle} onClick={() => handleGenerate(true)}>
          Generate Korean Lorem
        </button>
        <button
          className={`${buttonStyle} mt-2`}
          onClick={() => copyToClipboard(generatedSentence)}
        >
          Copy
        </button>
        {showCopied && (
          <div className={copiedPopupStyle}>Copied to clipboard!</div>
        )}
        {generatedSentence && (
          <div className="relative mt-4">
            <div
              className="p-4 border border-gray-300"
              onClick={() => copyToClipboard(generatedSentence)}
            >
              {generatedSentence}
            </div>
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
