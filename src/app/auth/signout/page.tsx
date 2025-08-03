'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOutPage() {
  const router = useRouter()

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut({ 
          redirect: false // Handle redirect manually
        })
        // Redirect to home page after successful signout
        router.push('/')
      } catch (error) {
        console.error('Error during sign out:', error)
        // Still redirect even if there's an error
        router.push('/')
      }
    }

    handleSignOut()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Sedang keluar...</p>
        </div>
      </div>
    </div>
  )
}
