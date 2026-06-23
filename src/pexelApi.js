import { createClient } from 'pexels';

const API_KEY = "ogEwsTHYMBRZXCY6llMJVfWRgLB0ivjwIAISP4FEX2WdMCKnMZtHehs9";
const client = createClient(API_KEY);

export async function fetchPhoto(query) {
    const data = await client.photos.search({ query, per_page: 1 });
    const url = data.photos[0].src.original;
    // console.log(url);
    return url;
}