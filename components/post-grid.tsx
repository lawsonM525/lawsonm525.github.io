import Image from "next/image"
import { MessageCircle, Heart } from "lucide-react"

interface PostProps {
  image: string
  likes: number
  comments: number
}

function PostItem({ image, likes, comments }: PostProps) {
  return (
    <div className="relative aspect-square group">
      <Image
        src={image}
        alt="Post"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  )
}

export function PostGrid() {
  const posts = [
    { image: "/placeholder.svg?height=600&width=600", likes: 123, comments: 12 },
    { image: "/placeholder.svg?height=600&width=600", likes: 234, comments: 23 },
    { image: "/placeholder.svg?height=600&width=600", likes: 345, comments: 34 },
    { image: "/placeholder.svg?height=600&width=600", likes: 456, comments: 45 },
    { image: "/placeholder.svg?height=600&width=600", likes: 567, comments: 56 },
    { image: "/placeholder.svg?height=600&width=600", likes: 678, comments: 67 },
    // Add more posts as needed
  ]

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post, index) => (
        <PostItem key={index} {...post} />
      ))}
    </div>
  )
}

