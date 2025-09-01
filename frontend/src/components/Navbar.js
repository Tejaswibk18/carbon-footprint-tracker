import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-green-600 text-white p-4 flex gap-4">
    <Link to="/" className="hover:underline">Home</Link>
    <Link to="/summary" className="hover:underline">Summary</Link>
    <Link to="/reference" className="hover:underline">Reference</Link>
  </nav>
);

export default Navbar;
