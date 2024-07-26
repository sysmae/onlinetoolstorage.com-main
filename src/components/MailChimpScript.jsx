import Script from 'next/script'

const MailChimpScript = () => (
  <Script
    id="mcjs"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        !function(c,h,i,m,p)
        {
          ((m = c.createElement(h)),
          (p = c.getElementsByTagName(h)[0]),
          (m.async = 1),
          (m.src = i),
          p.parentNode.insertBefore(m, p))
        }
        (document,"script","https://chimpstatic.com/mcjs-connected/js/users/af43beb116228f231742b2a32/9916d1ae5e6bf3d92294264b1.js");
      `,
    }}
  />
)

export default MailChimpScript
