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
const schema = z.object({
  tags: z.set(z.string()),
})

export default function ListForm(props: { tags: string[] }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: new Set(props.tags),
    },
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data)
    router.push(`/post?tags=${Array.from(data.tags).join(',')}`)
  }

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
            <Button type="submit">搜索</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
