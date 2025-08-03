'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    if (isSigningOut) return 
    
    setIsSigningOut(true)
    
    try {
      await signOut({ 
        redirect: true,
        callbackUrl: '/' 
      })
    } catch (error) {
      console.error('Sign out error:', error)
      
      try {
        const response = await fetch('/api/auth/signout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          router.push('/')
          router.refresh()
        } else {
          throw new Error('Signout API failed')
        }
      } catch (apiError) {
        console.error('API signout error:', apiError)
        window.location.href = '/'
      }
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            BlogVerse
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/posts" 
              className="text-gray-600 hover:text-gray-800"
            >
              Postingan
            </Link>
            
            {status === 'loading' ? (
              <div>Memuat...</div>
            ) : session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 hover:text-gray-800"
                >
                  Dasbor
                </Link>
                <span className="text-gray-600">
                  Selamat datang, {session.user?.username || session.user?.name}
                </span>
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className={`text-gray-600 hover:text-gray-800 transition-colors ${
                    isSigningOut ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSigningOut ? 'Keluar...' : 'Keluar'}
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-gray-600 hover:text-gray-800"
                >
                  Masuk
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
