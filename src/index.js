import Fastify from 'fastify';
import cors from '@fastify/cors';
import Word from './word.model.js';

const fastify = Fastify({
    logger: true,
});

// Declare a route
fastify.get('/ping', async function (request, reply) {
    reply.send({ response: 'pong' });
});

fastify.register(cors, {
    origin: ['http://localhost:3000', 'https://kyotomanga.live'],
});

fastify.get('/search', async function (request, reply) {
    const { keyword, limit } = request.query;

    const words = await Word.find({
        word: { $regex: `^${keyword}`, $options: 'i' },
    }).limit(limit);

    reply.send({ keyword, limit, words });
});

// Run the server!
fastify.listen({ port: 5555, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // Server is now listening on ${address}
});
