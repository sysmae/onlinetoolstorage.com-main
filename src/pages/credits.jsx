/* eslint-disable react/no-unescaped-entities */

import fs from 'fs'
import path from 'path'
import Head from 'next/head'

// 의존성의 정보를 가져오는 함수
async function fetchDependencyInfo(packageName) {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${packageName}: ${response.statusText}`)
  }
  const data = await response.json()
  return {
    license: data.license,
    homepage: data.homepage || 'Homepage not available',
  }
}

export async function getStaticProps() {
  const pkgPath = path.join(process.cwd(), 'package.json')
  const jsonContent = fs.readFileSync(pkgPath, 'utf8')
  const pkg = JSON.parse(jsonContent)

  // 의존성 정보를 병렬로 가져오기
  const fetchDependencies = async (deps) => {
    return await Promise.all(
      Object.keys(deps).map(async (dep) => ({
        name: dep,
        version: deps[dep],
        ...(await fetchDependencyInfo(dep)),
      })),
    )
  }

  const dependencies = await fetchDependencies(pkg.dependencies)
  const devDependencies = await fetchDependencies(pkg.devDependencies)

  return {
    props: {
      dependencies,
      devDependencies,
    },
  }
}

export default function Credits({ dependencies, devDependencies }) {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <Head>
        <title>Credits & Licenses</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Credits & Licenses</h1>
      <h2 className="text-2xl mb-2">Dependencies</h2>
      <ul className="list-disc pl-5 mb-6">
        <li>
          License: MIT.
          <br />
          <strong>Next.js:</strong> The React framework used to build this site.
        </li>
        {dependencies.map((dep) => (
          <li key={dep.name} className="mb-1">
            <strong>{dep.name}</strong>{' '}
            <span className="text-gray-600">({dep.version})</span>
            <div>License: {dep.license}</div>
            <a
              href={dep.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Homepage
            </a>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl mb-2">Dev Dependencies</h2>
      <ul className="list-disc pl-5">
        {devDependencies.map((dep) => (
          <li key={dep.name} className="mb-1">
            <strong>{dep.name}</strong>{' '}
            <span className="text-gray-600">({dep.version})</span>
            <div>License: {dep.license}</div>
            <a
              href={dep.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Homepage
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
