import React from 'react'
import footer from '../assets/footer.png'

export default function Footer(){
    return(
         <footer className="w-full  text-center py-4 border-t bg-cover border-rose-200 "
           style={{
                  backgroundImage: `url(${footer})`
                }}
              >
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Pastel Plans. Made with 💖 by Trixie.
      </p>
    </footer>
    )
}