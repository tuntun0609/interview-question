'use client'

import { ByteEditor } from '@/components/byte-editor'
import { Button } from '@/components/ui/button'

const StudioPage = () => {
  return (
    <div className="h-[calc(100vh-64px)]">
      <div className="h-12 flex items-center justify-between border-b px-4">
        <input
          type="text"
          className="w-[200px] h-10 text-xl focus-visible:outline-none"
          placeholder="请输入标题"
        />
        <Button className="h-8" variant="outline">
          保存
        </Button>
      </div>
      <ByteEditor />
    </div>
  )
}

export default StudioPage
