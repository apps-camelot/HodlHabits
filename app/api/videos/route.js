import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "Google API Key not found." }, { status: 500 });
    }

    try {
        // Fetch video search results from Google API
        const searchResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}&maxResults=10`
        );
        const searchData = await searchResponse.json();

        // Extract video IDs from the search response
        const videoIds = searchData.items.map((item) => item.id.videoId).join(',');

        // Fetch detailed video information for the extracted video IDs
        const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${apiKey}`
        );
        const detailsData = await detailsResponse.json();

        // Format and return the video details
        const videos = detailsData.items.map((item) => ({
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            duration: parseIsoDuration(item.contentDetails.duration),
            thumbnailUrl: item.snippet.thumbnails.high.url,
            videoId: item.id,
        }));

        return NextResponse.json(videos, { status: 200 });
    } catch (error) {
        console.error('Error fetching videos:', error);
        return NextResponse.json({ error: `Error fetching videos: ${error}` }, { status: 500 });
    }
}

// Helper function to parse ISO 8601 video duration
function parseIsoDuration(isoDuration) {
    const pattern = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = isoDuration.match(pattern);

    if (matches) {
        const hours = parseInt(matches[1] || 0, 10);
        const minutes = parseInt(matches[2] || 0, 10);
        const seconds = parseInt(matches[3] || 0, 10);

        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else if (minutes > 0) {
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        } else {
            return `${seconds} sec`;
        }
    }

    return 'Unknown duration';
}
