import { useDb } from '../db.js';

export default defineEventHandler(async (event) => {
    const db = await useDb();
    const body = await readBody(event);

    const result = await db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [body.username, body.password]
    );

    return { id: result.lastID };
});