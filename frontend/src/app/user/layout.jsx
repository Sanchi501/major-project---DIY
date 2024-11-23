import Footer from '@/src/components/Footer';
import Navbar from '@/src/components/Navbar';
import React from 'react'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout;