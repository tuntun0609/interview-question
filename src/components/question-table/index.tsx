import dayjs from 'dayjs'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Question } from 'contentlayer/generated'

import { Badge } from '../ui/badge'

export default function QuestionTable({
  questionList,
}: {
  questionList: Question[]
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>标题</TableHead>
          <TableHead>标签</TableHead>
          <TableHead>难度</TableHead>
          <TableHead>更新时间</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questionList.map((item) => (
          <TableRow key={item.slug}>
            <TableCell>
              <Link className="text-purple-400" href={`/question/${item.slug}`}>
                {item.title}
              </Link>
            </TableCell>
            <TableCell className="flex gap-2 flex-wrap">
              {item.tags?.map((tag) => (
                <Badge variant="outline" key={tag}>
                  {tag}
                </Badge>
              ))}
            </TableCell>
            <TableCell>{item.difficulty}</TableCell>
            <TableCell>{dayjs(item.date).format('YYYY-MM-DD')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
