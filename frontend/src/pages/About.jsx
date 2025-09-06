import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-rose-50 px-6 py-16 flex flex-col items-center justify-center text-center font-merienda">
      <h1 className="text-4xl sm:text-5xl font-luckiestGuy text-pink-400 mb-6">Hi there 👋</h1>

      <p className="w-300 text-gray-700 text-justify text-lg mb-6">
        So my name is Trixie, and this Pastel Plans was created as a little cozy corner of the internet something to showcase the kind of things I love to build. 
        This is one of my full-stack application build with MongooseDB, I wanted to keep it simple and Pink! 🌸        
        It’s more than just something my code, it’s a space filled with tiny bits of self-care and creative organization, wrapped in soft pastel colors (we girl developers love these colours 🩷)!

        
      </p>


      <p className=" max-w-5xl text-gray-700 text-lg mb-6">
        From habit tracking, to daily affirmations, to skincare logs and to-dos every part of this project was built with the idea of calmness and clarity in mind. 
        It also has a lot of features such as filtering, adding widgets and animation features and using React which means obviously it is responsive.
        You can clone this project as it will be available on my Github Repository. Feel free to make changes and edits of your own to the project as To-Do apps are one of the best 
        ways to show case your building skills as always. Similarly, so is my work.
      </p>

      <p className="max-w-4xl text-gray-700 text-lg mb-6">
        I wanted to add a journaling space too, but truthfully, I ran out of ideas (and maybe a little bit of time). So, that part stayed a little unfinished. And that is okay because not everything has to be perfect to be meaningful.
        Maybe you can finish the unfinished task better than what i could do
      </p>
    <p className="max-w-4xl text-gray-700 text-lg mb-6">
        Thank you for visiting. I hope you find something here that feels a little helpful or maybe even a little like home. 

        Happy Coding, Bubyeee!!
    </p>
      <Link to="/" className="bg-rose-300 text-white px-6 py-2 rounded-full shadow hover:bg-rose-400 transition-all">
        Back to Home
      </Link>
    </div>
  )
}
