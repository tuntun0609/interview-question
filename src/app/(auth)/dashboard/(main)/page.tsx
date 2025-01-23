import { allQuestions } from 'contentlayer/generated'

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* 欢迎区域 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">欢迎回来，用户</h1>
        <p className="mt-2 text-gray-600">这是您的个人仪表盘概览</p>
      </div>

      {/* 统计卡片区域 */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">总题目数</h3>
          <p className="mt-2 text-2xl font-semibold">{allQuestions.length}</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">进行中</h3>
          <p className="mt-2 text-2xl font-semibold">4</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">已完成</h3>
          <p className="mt-2 text-2xl font-semibold">8</p>
        </div>
      </div>
    </div>
  )
}
