import { BookOpen, Zap, Target, Users } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { tagList } from '@/config'

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <Badge
            variant="secondary"
            className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50">
            🚀 持续更新中
          </Badge>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          前端面试题库
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          精选前端开发面试题，助你成为更优秀的开发者
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/question">开始学习</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#features">
              了解更多 <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>

        <div className="mt-16 flex justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
              500+
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              精选面试题
            </div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
              100+
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              开发者在学习
            </div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
              24h
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              实时更新
            </div>
          </div>
        </div>

        <div
          id="features"
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <BookOpen
                  size={24}
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                系统化学习
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                从基础到高级，循序渐进的学习路径
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Zap
                  size={24}
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                实时更新
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                紧跟前端技术发展，及时更新面试题库
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Target
                  size={24}
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                针对性强
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                覆盖各大厂面试重点，直击面试痛点
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Users
                  size={24}
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                社区互动
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                分享经验，交流解法，共同进步
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-20 border-gray-200 dark:border-gray-800">
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              热门标签
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {tagList.slice(0, 6).map((tag) => (
                <Badge
                  key={tag.name}
                  variant="secondary"
                  className="p-4 justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
