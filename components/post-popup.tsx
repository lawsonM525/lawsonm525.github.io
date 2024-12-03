import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Heart, ExternalLink } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface PostPopupProps {
  id: string
  onClose: () => void
}

export function PostPopup({ id, onClose }: PostPopupProps) {
  // In a real application, you would fetch the post data based on the id
  // For this example, we'll use mock data
  const post = {
    image: "/placeholder.svg?height=600&width=600",
    views: 1000,
    likes: 123,
    description: "Exciting new project in the works! #TechInnovation",
    tags: ["tech", "innovation", "coding"],
    link: "https://www.instagram.com/p/ABC123/"
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900 p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative aspect-square md:w-1/2">
            <Image
              src={post.image}
              alt="Post"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2 flex flex-col">
            <div className="flex-1">
              <p className="text-white mb-4">{post.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(post.link, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

