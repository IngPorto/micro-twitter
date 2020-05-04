module.exports = {
    exportTrailingSlash: true,
    exportPathMap: async function() {
        return {
            '/': { page: '/' },
            '/user': { page: '/user' },
            '/t': { page: '/twit' }
        }
    }
}