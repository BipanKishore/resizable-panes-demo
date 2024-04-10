/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: function(config) {
        config.module.rules.push(           {
            test: /\.(md)$/i, 
            type: 'asset/source'
        })
        return config
    }
};

export default nextConfig;


