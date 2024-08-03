import { FormEvent, useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [responseMsg, setResponseMsg] = useState('')
  const [statusCode, setStatusCode] = useState('')

  async function handleSubscribe(e) {
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
    <form
      className="flex w-full max-w-sm items-center space-x-2"
      onSubmit={handleSubscribe}
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
      />
      <Button type="submit" disabled={status === 'loading'}>
        Subscribe
      </Button>

      <div className="absolute pt-32 text-center">
        {status === 'success' && (
          <p className="text-green-600">{responseMsg}</p>
        )}
        {status === 'error' && <p className="text-orange-600">{responseMsg}</p>}
      </div>
    </form>

    // <div className="flex items-center justify-center  bg-gray-100 dark:bg-gray-900">
    //   <form
    //     className="w-full max-w-md bg-white p-4 shadow-md dark:bg-gray-800 sm:p-6"
    //     onSubmit={handleSubscribe}
    //   >
    //     <div className="mb-2">
    //       <input
    //         className={`mb-2 h-12 w-full rounded-lg border px-4 text-lg transition duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400 ${
    //           statusCode === 400 ? 'border-orange-500' : 'border-gray-300'
    //         }`}
    //         type="email"
    //         placeholder="Enter your email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         disabled={status === 'loading'}
    //       />
    //     </div>

    //     <div className="flex justify-center">
    //       <button
    //         className="h-12 w-full rounded-lg bg-purple-700 font-bold text-white transition duration-200 ease-out hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:cursor-not-allowed disabled:bg-gray-400 dark:focus:ring-purple-400"
    //         type="submit"
    //         disabled={status === 'loading'}
    //       >
    //         Subscribe
    //       </button>
    //     </div>
    //     <div className="pt-4 text-center">
    //       {status === 'success' && (
    //         <p className="text-green-600">{responseMsg}</p>
    //       )}
    //       {status === 'error' && (
    //         <p className="text-orange-600">{responseMsg}</p>
    //       )}
    //     </div>

    //   </form>
    // </div>
  )
}

export default Newsletter
