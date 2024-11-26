import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import https from 'https';

const PING_URL = 'https://junior-react-endpoint.onrender.com';

const pingUrl = () => {
    https.get(PING_URL, (res) => {
        console.log(`Ping successful at ${new Date().toISOString()} - Status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`Ping failed at ${new Date().toISOString()}:`, err.message);
    });
};

const startPinging = () => {
    pingUrl(); // Immediate first ping
    setInterval(pingUrl, 14 * 60 * 1000); // Every 14 minutes
};

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    startPinging();
});