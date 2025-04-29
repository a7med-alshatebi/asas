// Fetch Instagram posts from the backend
const fetchInstagramPosts = async () => {
    try {
        // Backend URL (your domain)
        const backendUrl = 'https://a7med-alshatebi.tech/instagram';

        // Make a GET request to the backend
        const response = await fetch(backendUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch posts from the backend');
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the data (optional)
        console.log('Instagram Posts:', data);

        // Render the posts in the frontend
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = data.data
            .map(post => `
                <a href="${post.permalink}" target="_blank">
                    <img src="${post.media_url}" alt="Instagram Post" />
                </a>
            `)
            .join('');
    } catch (error) {
        console.error('Error fetching Instagram posts:', error.message);
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
    }
};

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchInstagramPosts);
