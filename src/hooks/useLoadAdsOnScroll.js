import { useEffect } from 'react'

// 스크롤 이벤트에 반응하여 광고 스크립트를 로드하는 훅
export const useLoadAdsOnScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      // 광고 스크립트가 이미 페이지에 로드되었는지 확인
      const alreadyLoaded = document.getElementById('adsbygoogle-script')
      if (alreadyLoaded) {
        return // 스크립트가 이미 로드되었다면 추가 작업을 수행하지 않음
      }

      // 스크롤 이벤트 발생 시 광고 스크립트를 로드
      const script = document.createElement('script')
      script.id = 'adsbygoogle-script'
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX'
      script.async = true
      document.body.appendChild(script)

      // 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll)
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { once: true })

    // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // 빈 의존성 배열을 사용하여 마운트 시에만 이벤트 리스너를 추가하도록 함
}
