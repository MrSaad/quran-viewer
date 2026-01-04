const path = require('path');
const fastify = require('fastify')({ logger: true });
const fastifyStatic = require('@fastify/static');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Serve minified JS/CSS from dist/
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
  prefix: '/dist/',
  // allow the plugin to decorate `reply` with `sendFile`
});

// Serve quran-uthmani.txt from src/public/ (as-is, not minified)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'src', 'public'),
  prefix: '/public/',
  decorateReply: false // Don't add sendFile decorator again (already added by first static plugin)
});

// Serve index.html at root
fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html', path.join(__dirname, 'src', 'views'));
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
