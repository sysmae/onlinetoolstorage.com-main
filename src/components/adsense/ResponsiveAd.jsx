// ResponsiveAd.jsx
import React from 'react'

export default function ResponsiveAd({ data_ad_slot }) {
  // useEffect(() => {
  //   // Ensure this runs only once and window is available
  //   if (typeof window !== 'undefined' && window.adsbygoogle) {
  //     try {
  //       window.adsbygoogle.push({})
  //     } catch (error) {
  //       console.error('AdSense error:', error.message)
  //     }
  //   }
  // }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', minHeight: '280px' }}
      data-ad-client="ca-pub-3670089965415680"
      data-ad-slot={data_ad_slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}
