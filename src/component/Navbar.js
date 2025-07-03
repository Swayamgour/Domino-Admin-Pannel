import AnchorTemporaryDrawer from './AnchorTemporaryDrawer'

function Navbar () {
  return (
    <nav className="w-full bg-gray-800 p-4 shadow-md fixed top-0 left-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-white">
        {/* Drawer icon (hamburger menu) */}
        <AnchorTemporaryDrawer />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li>
            <a href="#" className="hover:underline">Home</a>
          </li>
          <li>
            <a href="#" className="hover:underline">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
