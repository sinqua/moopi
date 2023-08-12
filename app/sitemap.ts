import { MetadataRoute } from "next";

export default function sitemap() : MetadataRoute.Sitemap {
    return [
        {
            url: 'https://moopi.offing.me',
            lastModified: new Date(),
        },
        {
            url: 'https://moopi.offing.me/login',
            lastModified: new Date(),
        },
        {
            url: 'https://moopi.offing.me/join',
            lastModified: new Date(),
        },
        {
            url: 'https://moopi.offing.me/embed',
            lastModified: new Date(),
        },
        {
            url: 'https://moopi.offing.me/change',
            lastModified: new Date(),
        },
    ]
}