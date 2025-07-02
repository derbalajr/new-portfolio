import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['derbalajr.com'], // Add your domain or other domains if needed
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp', 'image/avif'],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        minimumCacheTTL: 60,
        unoptimized: false,
    },
    // Performance and SEO optimizations
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    
    // Headers for better SEO and security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    }
                ]
            },
            {
                source: '/sitemap.xml',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/xml'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=43200'
                    }
                ]
            },
            {
                source: '/robots.txt',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/plain'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400'
                    }
                ]
            }
        ]
    },
    
    // Enable experimental features for better performance
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },
    
    // Webpack optimizations
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        
        // Prevent problematic packages from being included in server bundle
        if (isServer) {
            config.externals = config.externals || [];
            // Add problematic client-only packages to externals
            const clientOnlyPackages = [
                'react-lottie',
                'lottie-web'
            ];
            
            // Push each package to externals
            clientOnlyPackages.forEach(pkg => {
                if (!config.externals.includes(pkg)) {
                    config.externals.push(pkg);
                }
            });
        }
        
        // Optimize bundle size
        config.optimization = {
            ...config.optimization,
            splitChunks: isServer ? {
                // Disable chunk splitting for server build to prevent issues
                chunks: 'async',
                cacheGroups: {
                    default: false,
                    vendors: false,
                },
            } : {
                chunks: 'all',
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        priority: -10,
                        chunks: 'all',
                    },
                },
            },
        };
        
        return config;
    },
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "derbalajr",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});