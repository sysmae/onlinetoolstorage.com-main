import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-center p-2 w-full pb=16 bottom-0">
      <p>Copyright © 2024 sysmae All rights reserved.</p>
      <Link href="/credits">Credits & Licenses</Link>
    </footer>
  )
}

export default Footer
