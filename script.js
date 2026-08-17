const songs = [
    {
        title: "Badan Pe Sitare Lapete Huye",
        artist: "KVS",
        file: "songs/(hindimp3download.net)-badan-pe-sitare-lapete-hue.mp3"
    }
];

let currentSong = 0;
let isPlaying = false;

const audio = new Audio();

const songList = document.getElementById("song-list");
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playButtons = [
    document.getElementById("play-btn"),
    document.getElementById("player-play")
];

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

function loadSong(index) {
    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.file;

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    playButtons.forEach(button => {
        if (button) button.textContent = "▶";
    });

    isPlaying = false;
}

function playSong() {
    audio.play()
        .then(() => {
            isPlaying = true;

            playButtons.forEach(button => {
                if (button) button.textContent = "❚❚";
            });
        })
        .catch(error => {
            console.error("Audio could not play:", error);
        });
}

function pauseSong() {
    audio.pause();
    isPlaying = false;

    playButtons.forEach(button => {
        if (button) button.textContent = "▶";
    });
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updateProgress() {
    if (!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
}

function seekSong() {
    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) * audio.duration;
}

function showSongList() {
    songList.innerHTML = "";

    songs.forEach((song, index) => {
        const songItem = document.createElement("div");

        songItem.className = "song-item";

        songItem.innerHTML = `
            <strong>${song.title}</strong>
            <span>${song.artist}</span>
            <button>▶ Play</button>
        `;

        songItem.querySelector("button").addEventListener("click", () => {
            loadSong(index);
            playSong();
        });

        songList.appendChild(songItem);
    });
}

document.getElementById("play-btn")
    ?.addEventListener("click", togglePlay);

document.getElementById("player-play")
    ?.addEventListener("click", togglePlay);

document.getElementById("previous-btn")
    ?.addEventListener("click", () => {
        loadSong(0);
    });

document.getElementById("player-previous")
    ?.addEventListener("click", () => {
        loadSong(0);
    });

document.getElementById("next-btn")
    ?.addEventListener("click", () => {
        loadSong(0);
        playSong();
    });

document.getElementById("player-next")
    ?.addEventListener("click", () => {
        loadSong(0);
        playSong();
    });

progress?.addEventListener("input", seekSong);

audio.addEventListener("timeupdate", updateProgress);

audio.addEventListener("loadedmetadata", updateProgress);

audio.addEventListener("ended", () => {
    isPlaying = false;

    playButtons.forEach(button => {
        if (button) button.textContent = "▶";
    });
});

loadSong(0);
showSongList();

console.log("KVS music player loaded.");
