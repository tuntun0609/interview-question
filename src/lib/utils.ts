import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

import { Question } from 'contentlayer/generated'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化持续时间
export const formatDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  const remainingMinutes = minutes % 60
  const remainingSeconds = seconds % 60

  let formattedTime = ''

  if (hours > 0) {
    formattedTime += `${hours}小时`
  }
  if (remainingMinutes > 0 || hours > 0) {
    if (formattedTime) {
      formattedTime += ' '
    }
    formattedTime += `${remainingMinutes}分钟`
  }
  if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
    if (formattedTime) {
      formattedTime += ' '
    }
    formattedTime += `${remainingSeconds}秒`
  }

  return formattedTime
}

export const sortQuestions = (questions: Question[], sort: 'desc' | 'asc' = 'desc') =>
  questions.sort((a, b) =>
    sort === 'desc' ? dayjs(b.date).diff(dayjs(a.date)) : dayjs(a.date).diff(dayjs(b.date))
  )

export const getSystemTheme = () => {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const isDark = media.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}

export const isCdnImage = (src: string) => {
  return src.startsWith('https://') || src.startsWith('http://')
}
