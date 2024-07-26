import { FormEvent, useState } from 'react'
import axios from 'axios'

const Newsletter = () => {
  const [email, setEmail] = useState<string>('')
  const [status, setStatus] = useState<
    'success' | 'error' | 'loading' | 'idle'
  >('idle')
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [statusCode, setStatusCode] = useState<number>()

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    try {
      const response = await axios.post('/api/subscribe', { email })

      setStatus('success')
      setStatusCode(response.status)
      setEmail('')
      setResponseMsg(response.data.message)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setStatus('error')
        setStatusCode(err.response?.status)
        setResponseMsg(err.response?.data.error)
      }
    }
  }

  return (
    <div className="flex justify-center items-center  bg-gray-100 dark:bg-gray-900">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md p-4 sm:p-6"
        onSubmit={handleSubscribe}
      >
        <div className="mb-2">
          <input
            className={`w-full h-12 px-4 mb-2 text-lg rounded-lg border transition ease-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-purple-400 ${
              statusCode === 400 ? 'border-orange-500' : 'border-gray-300'
            }`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="w-full h-12 bg-purple-700 hover:bg-purple-500 text-white font-bold rounded-lg transition ease-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-purple-400"
            type="submit"
            disabled={status === 'loading'}
          >
            Subscribe
          </button>
        </div>
        <div className="pt-4 text-center">
          {status === 'success' && (
            <p className="text-green-600">{responseMsg}</p>
          )}
          {status === 'error' && (
            <p className="text-orange-600">{responseMsg}</p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Newsletter
