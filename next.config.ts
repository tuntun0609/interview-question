import withBundleAnalyzer from '@next/bundle-analyzer'
import { withContentlayer } from 'next-contentlayer2'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
}

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(
  withContentlayer(nextConfig)
)
