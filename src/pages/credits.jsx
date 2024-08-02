import fs from 'fs'
import path from 'path'
import Head from 'next/head'

// 의존성의 정보를 가져오는 함수
async function fetchDependencyInfo(packageName, retries = 3, timeout = 5000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`, {
      signal: controller.signal,
    })
    clearTimeout(id)

    if (!response.ok) {
      return {
        license: 'License not available',
        homepage: 'Homepage not available',
      }
    }

    const data = await response.json()
    return {
      license: data.license,
      homepage: data.homepage || 'Homepage not available',
    }
  } catch (error) {
    if (retries > 0) {
      console.warn(
        `Retrying fetch for ${packageName} (${retries} retries left)...`,
      )
      return fetchDependencyInfo(packageName, retries - 1, timeout)
    } else {
      console.error(`Failed to fetch ${packageName}: ${error.message}`)
      return {
        license: 'License not available',
        homepage: 'Homepage not available',
      }
    }
  }
}

export async function getStaticProps() {
  try {
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
  } catch (error) {
    console.error('Error fetching dependencies:', error)
    return {
      props: {
        dependencies: [],
        devDependencies: [],
      },
    }
  }
}

export default function Credits({ dependencies, devDependencies }) {
  return (
    <div className="mx-auto my-8 max-w-4xl">
      <Head>
        <title>Credits & Licenses</title>
      </Head>
      <h1 className="mb-4 text-3xl font-bold">Credits & Licenses</h1>
      <h2 className="mb-2 text-2xl">Dependencies</h2>
      <ul className="mb-6 list-disc pl-5">
        {dependencies.length === 0 ? (
          <li>No dependencies found.</li>
        ) : (
          dependencies.map((dep) => (
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
          ))
        )}
      </ul>
      <h2 className="mb-2 text-2xl">Dev Dependencies</h2>
      <ul className="list-disc pl-5">
        {devDependencies.length === 0 ? (
          <li>No dev dependencies found.</li>
        ) : (
          devDependencies.map((dep) => (
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
          ))
        )}
      </ul>
    </div>
  )
}
