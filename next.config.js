const path = require('path');

module.exports = {
    output: 'standalone',
    images: {
        domains: [
            'www.gravatar.com'
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.resolve.alias['@'] = path.join(__dirname, '.');
        return config;
    },
};