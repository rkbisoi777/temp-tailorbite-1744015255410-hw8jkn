import { Menu, Search, ShoppingCart } from 'lucide-react';

const Header = () => (
  <header className="mb-12 fixed top-0 z-50 bg-white w-full shadow-sm">
    <div className="relative flex flex-row justify-between items-center lg:px-8 container mx-auto px-4 h-16">
      {/* Left Side - Menu */}
      <button className="p-2 text-primary-800 transition-colors">
        <Menu className="w-6 h-6" />
      </button>

      {/* Center Logo */}
      {/* <div className="absolute left-1/2 mt-6 transform -translate-x-1/2 translate-y-4 bg-white rounded-full border-8 border-transparent shadow-lg">
        <div className=" overflow-hidden w-32 h-24 mb-2 mt-4 -mx-1.5">
          <img src="/5.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
        </div>
      </div> */}

      <div className="absolute left-1/2 mt-3 transform -translate-x-1/2 translate-y-4 bg-white rounded-full border-8 border-transparent shadow-lg">
        <div className=" overflow-hidden w-[116px] h-[86px] mb-2 mt-4 -mx-1.5">
          <img src="/5.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      {/* Right Side - Icons */}
      <div className="flex justify-end gap-4">
        <button className="p-2 text-primary-800 transition-colors"><Search className="w-6 h-6" /></button>
        {/* <button className="p-2 text-primary-800 transition-colors"><User className="w-6 h-6" /></button> */}
        <button className="p-2 text-primary-800 transition-colors"><ShoppingCart className="w-6 h-6" /></button>
      </div>
    </div>
  </header>
);

export default Header;
