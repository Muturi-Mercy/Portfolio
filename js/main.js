document.querySelectorAll(".video-container").forEach(container => {
    const video = container.querySelector(".work-video");
    const playButton = container.querySelector(".play-button");
    const progressBar = container.querySelector(".progress-bar");

    // Play or pause video when button is clicked
    playButton.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playButton.textContent = "❚❚"; // Change to pause icon
            progressBar.style.opacity = "1"; // Show progress bar
        } else {
            video.pause();
            playButton.textContent = "▶"; // Change to play icon
        }
    });

    // Update progress bar as video plays
    video.addEventListener("timeupdate", () => {
        if (!isNaN(video.duration)) {
            progressBar.value = (video.currentTime / video.duration) * 100;
        }
    });

    // Seek video when progress bar is clicked or dragged
    progressBar.addEventListener("input", () => {
        if (!isNaN(video.duration)) {
            video.currentTime = (progressBar.value / 100) * video.duration;
        }
    });

    // Reset play button when video ends
    video.addEventListener("ended", () => {
        playButton.textContent = "▶"; // Reset to play icon
        progressBar.style.opacity = "0"; // Hide progress bar
    });

    // Hide progress bar when video is paused
    video.addEventListener("pause", () => {
        progressBar.style.opacity = "0";
    });

    // Pause and reset videos that scroll out of view
    document.addEventListener("scroll", () => {
        if (!isElementInViewport(video)) {
            video.pause();
            video.currentTime = 0;
            playButton.textContent = "▶";
            progressBar.style.opacity = "0";
        }
    });
});

// Check if the video is currently in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
