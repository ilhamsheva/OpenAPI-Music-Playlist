import server from './src/server/index.js';
import 'dotenv/config'

const host = process.env.HOST;
const port = process.env.PORT;

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});