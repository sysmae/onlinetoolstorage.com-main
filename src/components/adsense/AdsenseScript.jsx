import Script from 'next/script'

export default function AdsenseScript() {
  return (
    <>
      {/* Google Adsense 구글 애드센스*/}
      <Script
        id="adsbygoogle-script"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3670089965415680"
        strategy="afterInteractive"
      ></Script>

      <Script id="gtag-config" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-G3GB4K968L');
`}
      </Script>
      <Script id="adsbygoogle-push">{`window.adsbygoogle = window.adsbygoogle || [];`}</Script>

      {/* Google Analytics  구글 애널리틱스 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-43FPVB8QN1"
        strategy="afterInteractive"
      ></Script>
      <Script id="GA-script" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-43FPVB8QN1');
`}
      </Script>
    </>
  )
}
