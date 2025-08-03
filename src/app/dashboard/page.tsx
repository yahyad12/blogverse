'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

interface Post {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  category: {
    id: string
    name: string
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/posts?authorId=${session?.user?.id}`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      return
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts() // Refresh the posts list
      } else {
        alert('Gagal menghapus postingan')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Gagal menghapus postingan')
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }
    
    if (session?.user?.id) {
      fetchPosts()
    }
  }, [session, status, router])

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div>Memuat...</div>
        </div>
      </>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dasbor</h1>
              <p className="text-gray-600">Selamat datang kembali, {session.user?.username || session.user?.name}!</p>
            </div>
            <div className="space-x-4">
              <Link
                href="/posts/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Buat Postingan Baru
              </Link>
              <Link
                href="/categories"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Kelola Kategori
              </Link>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Postingan Anda</h2>
              
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Anda belum membuat postingan apapun.</p>
                  <Link
                    href="/posts/create"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Buat postingan pertama Anda
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Kategori: {post.category.name}
                          </p>
                          <p className="text-gray-600 mb-2">
                            {post.content.length > 150
                              ? `${post.content.substring(0, 150)}...`
                              : post.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              {post.published ? (
                                <span className="text-green-600">Dipublikasi</span>
                              ) : (
                                <span className="text-yellow-600">Draf</span>
                              )}
                            </span>
                            <span>
                              {new Date(post.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Link
                            href={`/posts/${post.id}/edit`}
                            className="text-blue-600 hover:text-blue-500 text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-500 text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
