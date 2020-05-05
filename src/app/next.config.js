module.exports = {
    exportTrailingSlash: false,
    exportPathMap: async function(defaultPathMap,
        { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            '/user': { page: '/user' },
            '/twit': { page: '/twit' }
        }
    }
}