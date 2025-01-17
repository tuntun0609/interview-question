'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { tagList } from '@/config'
import { MultiSelect } from '@/components/ui/multiple-select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
const schema = z.object({
  tags: z.set(z.string()),
})

export default function ListForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: new Set(),
    },
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    const searchParams = new URLSearchParams()
    searchParams.set('tags', Array.from(data.tags).join(','))
    router.push(`/post?${searchParams.toString()}`)
  }

  useEffect(() => {
    const tags = searchParams.get('tags')
    if (tags) {
      form.setValue('tags', new Set(tags.split(',').filter(Boolean)))
    }
  }, [searchParams, form])

  return (
    <Card>
      <CardHeader>
        <CardTitle>题目列表</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标签</FormLabel>
                  <div>
                    <FormControl>
                      <MultiSelect
                        showCount={3}
                        title="请选择标签"
                        options={tagList.map((tag) => ({
                          label: tag.name,
                          value: tag.value,
                        }))}
                        selectedValues={field.value}
                        onSelectionChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit">搜索</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  router.push('/post')
                }}>
                重置
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
