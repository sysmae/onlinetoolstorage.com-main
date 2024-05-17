// import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import ResponsiveAd from './adsense/ResponsiveAd'
// import { SideContentVerticalResponsive_dataAdSlot } from '@/constants/adsense/data_ad_slot'

// function CustomLink({ href, children }) {
//   return (
//     <Link href={href}>
//       <span className="block mt-3 p-3 bg-blue-200 rounded-lg border border-blue-300 hover:bg-blue-300 transition-colors duration-200 ease-in-out dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white text-lg font-medium">
//         {children}
//       </span>
//     </Link>
//   )
// }

// function ContentCard({ title, children }) {
//   return (
//     <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg dark:shadow-md mb-4 flex flex-col">
//       <h3 className="text-xl font-bold mb-4 dark:text-gray-200">{title}</h3>
//       {children}
//     </div>
//   )
// }

// export default function SideContent() {
//   const [sections, setSections] = useState([])
//   const router = useRouter()
//   const { locale } = router

//   useEffect(() => {
//     const languageCode = locale || 'kr' // 'kr' as default if no locale is specified
//     async function loadContent() {
//       try {
//         const response = await fetch(
//           `/locales/${languageCode}/sidecontent.json`,
//         )
//         const data = await response.json()
//         setSections(data.sections)
//       } catch (error) {
//         console.error('Failed to load content:', error)
//       }
//     }

//     loadContent()
//   }, [locale])

//   return (
//     <aside className="w-full">
//       {sections.map((section, index) => (
//         <React.Fragment key={index}>
//           <ContentCard title={section.title}>
//             {section.links.map((link) => (
//               <CustomLink key={link.href} href={link.href}>
//                 {link.title}
//               </CustomLink>
//             ))}
//           </ContentCard>
//           {index < SideContentVerticalResponsive_dataAdSlot.length && (
//             <ResponsiveAd
//               data_ad_slot={
//                 SideContentVerticalResponsive_dataAdSlot[index].dataAdSlot
//               }
//             />
//           )}
//         </React.Fragment>
//       ))}
//     </aside>
//   )
// }

// {card.type === 'comments' &&
// card.items.map((item, itemIdx) => (
//   <div key={itemIdx} className="mb-2 last:mb-0">
//     <p className="text-sm">{item.content}</p>
//     <span className="text-xs text-gray-500">{item.date}</span>
//   </div>
// ))}
// {card.type === 'faq' &&
// card.items.map((item, itemIdx) => (
//   <div key={itemIdx} className="mb-2 last:mb-0">
//     <p className="font-bold">{item.question}</p>
//     <p>{item.answer}</p>
//   </div>
// ))}

import React, { useState, useEffect } from 'react'

function SideContent() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    // Fetch the JSON data from a local file or API
    async function fetchData() {
      const response = await fetch('/locales/ko/test.json')
      const data = await response.json()
      setCards(data.cards)
    }

    fetchData()
  }, [])

  return (
    <>
      {/* <ResponsiveAd
        data_ad_slot={SideContentVerticalResponsive_dataAdSlot[0].dataAdSlot}
      /> */}
    </>
    // <div className="lg:fixed lg:inset-y-0 lg:right-0 lg:top-[60px] space-y-4 w-full lg:max-w-64 mx-auto">
    //   {cards.map((card, index) => (
    //     <div key={index} className="p-4 bg-white rounded shadow">
    //       <h2 className="text-lg font-bold mb-2">{card.title}</h2>
    //       {card.type === 'links' &&
    //         card.items.map((item, itemIdx) => (
    //           <a
    //             key={itemIdx}
    //             href={item.url}
    //             className="block hover:text-blue-500"
    //           >
    //             {item.name}
    //           </a>
    //         ))}
    //     </div>
    //   ))}
    // </div>
  )
}

export default SideContent
