import { createClient } from 'redis';

export const CACHE_DURATION = 5 * 60; // 5 minutes in seconds

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        reconnectStrategy: (retries) => Math.min(retries * 50, 3000)
    }
});

client.on('error', (error) => {
    console.error('Redis connection error:', error);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('reconnecting', () => {
    console.log('Reconnecting to Redis...');
});

// Attempt to connect to Redis
const connectToRedis = async () => {
    if (!client.isOpen) {
        try {
            await client.connect();
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
        }
    } else {
        console.log('Redis connection already open');
    }
};

// Export the connection function instead of connecting immediately
export { connectToRedis };

export default client;
