import { useState } from 'react'
import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'finance'

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
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="rounded p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold">Loan Repayment Calculator</h2>
          <div className="mb-4">
            <label
              htmlFor="loanAmount"
              className="mb-2 block text-sm font-bold"
            >
              Loan Amount
            </label>
            <input
              type="number"
              id="loanAmount"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="interestRate"
              className="mb-2 block text-sm font-bold"
            >
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="term" className="mb-2 block text-sm font-bold">
              Term (years)
            </label>
            <input
              type="number"
              id="term"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
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
