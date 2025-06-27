'use server'

import { revalidatePath } from 'next/cache'

import { createTag } from '@/service/tags'

export async function addTag(formData: FormData) {
  const name = formData.get('name') as string

  // 表单验证
  if (!name || name.trim().length === 0) {
    return {
      success: false,
      error: '标签名称不能为空',
    }
  }

  if (name.trim().length > 100) {
    return {
      success: false,
      error: '标签名称不能超过100个字符',
    }
  }

  // 创建标签
  const result = await createTag({
    name: name.trim(),
  })

  if (result.success) {
    // 重新验证页面数据
    revalidatePath('/dashboard/tags')

    return {
      success: true,
      message: '标签创建成功',
    }
  } else {
    return {
      success: false,
      error: result.error,
    }
  }
}
