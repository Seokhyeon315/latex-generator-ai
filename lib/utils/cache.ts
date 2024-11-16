import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, any>({
    max: 100, // Maximum number of items
    ttl: 1000 * 60 * 5, // Time to live: 5 minutes
});

export function getCachedResponse(key: string) {
    return cache.get(key);
}

export function setCachedResponse(key: string, value: any) {
    cache.set(key, value);
}

export function clearCache() {
    cache.clear();
} 