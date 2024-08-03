import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'general'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [ipAddress, setIpAddress] = useState('Loading...')

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get('/api/get-ip')
        setIpAddress(response.data.ip)
      } catch (error) {
        console.error('Error fetching IP:', error)
        setIpAddress('Unable to fetch IP address')
      }
    }

    fetchIP()
  }, [])

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex flex-col items-center justify-center xl:mt-24">
        <h3 className="text-3xl font-bold">Your IP Address:</h3>
        <p className="text-xl">{ipAddress}</p>
      </div>
      <CustomContent category={category} />
    </>
  )
}
