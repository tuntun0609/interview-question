export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 欢迎区域 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">欢迎回来，用户</h1>
        <p className="text-gray-600 mt-2">这是您的个人仪表盘概览</p>
      </div>

      {/* 统计卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 text-sm">总项目数</h3>
          <p className="text-2xl font-semibold mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 text-sm">进行中</h3>
          <p className="text-2xl font-semibold mt-2">4</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 text-sm">已完成</h3>
          <p className="text-2xl font-semibold mt-2">8</p>
        </div>
      </div>

      {/* 快速操作区域 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">快速操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center border rounded-lg hover:bg-gray-50">
            创建新项目
          </button>
          <button className="p-4 text-center border rounded-lg hover:bg-gray-50">
            查看报告
          </button>
          <button className="p-4 text-center border rounded-lg hover:bg-gray-50">
            团队管理
          </button>
          <button className="p-4 text-center border rounded-lg hover:bg-gray-50">
            系统设置
          </button>
        </div>
      </div>
    </div>
  )
}
