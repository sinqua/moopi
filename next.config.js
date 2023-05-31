/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites (){
        return [
            {
            source: "/:path*",
            destination: "http://api.url/:path*"
            },
        ];
    }
}
module.exports = nextConfig
