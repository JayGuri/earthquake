import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-dark-teal-blue shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-4 justify-center">
          <li><Link href="/" className="text-white hover:text-soft-green transition-colors duration-200 font-semibold">Home</Link></li>
          <li><Link href="/alerts" className="text-white hover:text-soft-green transition-colors duration-200 font-semibold">Alerts</Link></li>
          <li><Link href="/significance" className="text-white hover:text-soft-green transition-colors duration-200 font-semibold">Significance</Link></li>
          <li><Link href="/dashboard" className="text-white hover:text-soft-green transition-colors duration-200 font-semibold">Dashboard</Link></li>
          <li><Link href="/maps" className="text-white hover:text-soft-green transition-colors duration-200 font-semibold">Maps</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

