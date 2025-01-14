import { Badge } from '@/components/ui/badge'
import { Post } from '@/db/schema'
import Link from 'next/link'

export default function ListItem({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`}>
      <div
        key={post.id}
        className="group cursor-pointer p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300">
        <h3 className="text-lg font-medium group-hover:text-purple-600 transition-colors duration-300 ">
          {post.title}
        </h3>
        {post.tags && (
          <div className="mt-2 flex gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-2 text-sm text-gray-500">
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
        </div>
      </div>
    </Link>
  )
}
