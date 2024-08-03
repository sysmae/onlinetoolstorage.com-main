import Link from 'next/link'

function Footer() {
  return (
    <footer className="bottom-0 w-full bg-gray-200 p-2 pb-16 text-center dark:bg-gray-800">
      <p>Copyright © 2024 sysmae All rights reserved.</p>
      <Link href="/credits">Open Source Library</Link>
    </footer>
  )
}

export default Footer
