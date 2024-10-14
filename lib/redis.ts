import { createClient } from 'redis';

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10)
    }
});

client.on('error', (error) => {
    console.error('Redis connection error:', error);
});

// Connect to Redis
client.connect().catch(console.error);

export default client;
