import useLocalizedPage from '../../hooks/useLocalizedPage'
import ResponsiveAd from './adsense/ResponsiveAd'
import { SquareResponsive_dataAdSlot } from '../constants/adsense/data_ad_slot'

function CustomH1Content({ category }) {
  const { t, pageKey } = useLocalizedPage(category)

  return (
    <div className="break-words">
      <div className="px-4">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {t(`${pageKey}.title`)}
          </h1>
          <ResponsiveAd
            data_ad_slot={SquareResponsive_dataAdSlot[0].dataAdSlot}
          />
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {t(`${pageKey}.description`)}
        </p>
        <ResponsiveAd
          data_ad_slot={SquareResponsive_dataAdSlot[1].dataAdSlot}
        />
      </div>
    </div>
  )
}

export default CustomH1Content
