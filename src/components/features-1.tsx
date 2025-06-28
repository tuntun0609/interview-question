import { ReactNode } from 'react'
import { Settings2, Sparkles, Zap } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Features() {
  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">覆盖您的需求</h2>
          <p className="mt-4">可以轻松构建您的SaaS应用</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3">
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">可定制</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">广泛的自定制选项，允许您根据您的特定需求定制每个方面。</p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Settings2 className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">您拥有完全控制权</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                从设计元素到功能，您拥有完全控制权，以创建独特且个性化的体验。
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">由AI驱动</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                元素到功能，您拥有完全控制权，以创建独特且个性化的体验。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div aria-hidden className="to-background absolute inset-0 bg-radial from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
      {children}
    </div>
  </div>
)
