
let videos = [
    {
        title: "Amazing GTA San Andreas Stunts",
        channel: "Mystic Gamer",
        views: "25K views",
        category: "Gaming",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
        url: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    {
        title: "Best Gaming Moments",
        channel: "Gaming World",
        views: "12K views",
        category: "Gaming",
        thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
        url: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    {
        title: "Music Collection 2026",
        channel: "Music Zone",
        views: "50K views",
        category: "Music",
        thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
        url: "https://www.youtube.com/embed/ScMzIvxBSi4"
    }
];

function displayVideos(list) {
    const grid = document.getElementById("videoGrid");
    grid.innerHTML = "";

    list.forEach((video, index) => {
        grid.innerHTML += `
            <div class="video-card" onclick="playVideo(${index})">
                <img src="${video.thumbnail}" alt="">
                <h3>${escapeHTML(video.title)}</h3>
                <p>${escapeHTML(video.channel)}</p>
                <p>${video.views} • ${video.category}</p>
            </div>
        `;
    });
}

function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function searchVideos() {
    const query = document.getElementById("searchInput")
        .value.toLowerCase();

    const results = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query)
    );

    displayVideos(results);
}

function filterVideos(category) {
    const results = category === "All"
        ? videos
        : videos.filter(video => video.category === category);

    displayVideos(results);
}

function playVideo(index) {
    const video = videos[index];
    if (!video) return;

    window.open(video.url, "_blank");
}

function showUpload() {
    document.getElementById("uploadModal").style.display = "flex";
}

function closeUpload() {
    document.getElementById("uploadModal").style.display = "none";
}

function addVideo() {
    const title = document.getElementById("videoTitle").value.trim();
    const channel = document.getElementById("videoChannel").value.trim();
    const thumbnail = document.getElementById("videoThumbnail").value.trim();
    const url = document.getElementById("videoURL").value.trim();
    const category = document.getElementById("videoCategory").value;

    if (!title || !channel || !thumbnail || !url) {
        alert("Please fill in all fields!");
        return;
    }

    videos.unshift({
        title,
        channel,
        thumbnail,
        url,
        category,
        views: "0 views"
    });

    displayVideos(videos);
    closeUpload();
    alert("Video added successfully!");

    document.querySelectorAll(".modal-content input")
        .forEach(input => input.value = "");
}

displayVideos(videos);
