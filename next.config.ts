import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = {
  /* config options here */
}

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(
  withContentlayer(nextConfig)
)
