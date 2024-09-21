const startRecognitionButton = document.getElementById('start-recognition');
const lyricsDiv = document.getElementById('lyrics');
const albumArt = document.getElementById('albumArt');

// Placeholder function to simulate song recognition and lyric fetching
async function recognizeSong() {
    // Here you would use an external service like ACRCloud or AudD.io to recognize the song
    const fakeSongData = {
        title: "Blinding Lights",
        artist: "The Weeknd",
        albumArt: "placeholder.jpg",  // Replace with dynamic image link
        lyrics: `I've been tryna call...`
    };
    
    return fakeSongData;
}

// Function to update the lyrics and UI
function updateUIWithSongData(songData) {
    lyricsDiv.innerText = songData.lyrics;
    albumArt.src = songData.albumArt;

    // Generate a dynamic theme based on the album art (monet effect)
    applyMonetEffect(songData.albumArt);
}

// Apply a 'monet' effect based on album art color
async function applyMonetEffect(imageUrl) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Enable CORS to fetch the image
    img.src = imageUrl;

    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const colors = getDominantColor(imageData);
        
        // Apply color theme based on dominant colors
        document.body.style.setProperty('--primary-color', colors.dark);
        document.body.style.setProperty('--accent-color', colors.light);
        document.body.classList.add('dynamic-theme');
    };
}

// Simple dominant color extraction (returns dark and light colors)
function getDominantColor(imageData) {
    let r = 0, g = 0, b = 0;
    const data = imageData.data;
    const colorStep = 5;

    for (let i = 0; i < data.length; i += 4 * colorStep) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    const totalPixels = data.length / (4 * colorStep);
    const avgR = Math.floor(r / totalPixels);
    const avgG = Math.floor(g / totalPixels);
    const avgB = Math.floor(b / totalPixels);

    const darkColor = `rgb(${avgR / 2}, ${avgG / 2}, ${avgB / 2})`;
    const lightColor = `rgb(${avgR}, ${avgG}, ${avgB})`;

    return { dark: darkColor, light: lightColor };
}

// Event listener for starting the song recognition process
startRecognitionButton.addEventListener('click', async () => {
    const songData = await recognizeSong();
    updateUIWithSongData(songData);
});
