import useLocalizedPage from '@/hooks/useLocalizedPage'
import ResponsiveAd from './adsense/ResponsiveAd'
import { SquareResponsive_dataAdSlot } from '../constants/adsense/data_ad_slot'
import { parseContentLink } from '@/lib/parseContent' // Adjust the path accordingly

function CustomContent({ category }) {
  const { t, pageKey } = useLocalizedPage(category)

  return (
    <div className="break-words">
      <div className="py-8">
        {t(`${pageKey}.sections`, { returnObjects: true }).map(
          (section, index) => (
            <div key={index} className="mb-8">
              <h2 className="mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                section.content.map((item, idx) => (
                  <p
                    key={idx}
                    className="mb-2 text-gray-600 dark:text-gray-300"
                  >
                    {parseContentLink(item)}
                  </p>
                ))
              ) : (
                <p className="mb-2 text-gray-600 dark:text-gray-300">
                  {parseContentLink(section.content)}
                </p>
              )}
              {/* Conditionally render an ad after each section */}
              {SquareResponsive_dataAdSlot[index] && (
                <ResponsiveAd
                  data_ad_slot={
                    SquareResponsive_dataAdSlot[index + 1].dataAdSlot
                  }
                />
              )}
            </div>
          ),
        )}
      </div>
    </div>
  )
}

export default CustomContent
