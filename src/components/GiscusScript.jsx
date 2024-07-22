import Script from 'next/script'

export default function GiscusScript() {
  return (
    <>
      <Script
        src="https://giscus.app/client.js"
        data-repo="sysmae/OTMComments"
        data-repo-id="R_kgDOMXcVmg"
        data-category="Comments"
        data-category-id="DIC_kwDOMXcVms4Cg2dh"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="ko"
        data-loading="lazy"
        crossOrigin="anonymous"
        async
      />
    </>
  )
}
