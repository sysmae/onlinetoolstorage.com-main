import { useState } from 'react'
import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'calculator'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [term, setTerm] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)

  const calculateMonthlyPayment = (amount, rate, term) => {
    const monthlyRate = rate / 100 / 12
    const totalPayments = term * 12
    const monthlyPayment =
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments))
    return monthlyPayment.toFixed(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!loanAmount || !interestRate || !term) {
      alert('Please fill all fields')
      return
    }
    const calculatedMonthlyPayment = calculateMonthlyPayment(
      loanAmount,
      interestRate,
      term,
    )
    setMonthlyPayment(calculatedMonthlyPayment)
    setTotalPayment((calculatedMonthlyPayment * term * 12).toFixed(2))
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">Loan Repayment Calculator</h2>
          <div className="mb-4">
            <label
              htmlFor="loanAmount"
              className="block text-sm font-bold mb-2"
            >
              Loan Amount
            </label>
            <input
              type="number"
              id="loanAmount"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="interestRate"
              className="block text-sm font-bold mb-2"
            >
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="term" className="block text-sm font-bold mb-2">
              Term (years)
            </label>
            <input
              type="number"
              id="term"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Calculate
          </button>
          {monthlyPayment && (
            <div className="mt-4">
              <p className="text-lg">
                Monthly Payment:{' '}
                <span className="font-semibold">{monthlyPayment}</span>
              </p>
              <p className="text-lg">
                Total Payment:{' '}
                <span className="font-semibold">{totalPayment}</span>
              </p>
            </div>
          )}
        </form>
      </div>
      <CustomContent category={category} />
    </>
  )
}
