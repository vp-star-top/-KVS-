const songs = [
    {
        title: "Awaara Hoon",
        artist: "Raj Kapoor",
        file: "songs/Awaara Hoon - Awara-Raj KapoorRaag.Me(1).mp3"
    },
    {
        title: "Aye Mere Humsafar",
        artist: "KVS",
        file: "songs/Aye Mere Humsafar - (BossMp3.Me)(1).mp3"
    },
    {
        title: "Aye Watan Tere Liye",
        artist: "KVS",
        file: "songs/Aye Watan Tere Liye-(Mr-Jatt.com)(1).mp3"
    },
    {
        title: "Baazigar O Baazigar",
        artist: "KVS",
        file: "songs/Baazigar O Baazigar - Baazigar (1993)__Bollywood H - 128K MP3(1).mp3"
    },
    {
        title: "Benaam Sa Ye Dard",
        artist: "KVS",
        file: "songs/Benaam_Sa_Ye_Dard_(www.Mp3Skulls.info)(1).mp3"
    },
    {
        title: "Aur Tum Aye",
        artist: "KVS",
        file: "songs/aur tum aye(1).mp3"
    },
    {
        title: "Badan Pe Sitare Lapete Huye",
        artist: "KVS",
        file: "songs/(hindimp3download.net)-badan-pe-sitare-lapete-hue.mp3"
    },
    {
        title: "Badi Mastani Hai Meri Mehbooba",
        artist: "KVS",
        file: "songs/(hindimp3download.net)-badi-mastani-hai-meri-mehbooba.mp3"
    },
    {
        title: "Baharo Phool Barsao",
        artist: "KVS",
        file: "songs/(hindimp3download.net)-baharo-phool-barsao.mp3"
    },
    {
        title: "Dil Ne Dil Ko Pukara",
        artist: "KVS",
        file: "songs/(hindimp3download.net)-dil-ne-dil-ko-pukara.mp3"
    }
];

let currentSong = 0;
let isPlaying = false;

const audio = new Audio();

const songList = document.getElementById("song-list");
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");

const playBtn = document.getElementById("play-btn");
const playerPlay = document.getElementById("player-play");

const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");

const playerNext = document.getElementById("player-next");
const playerPrevious = document.getElementById("player-previous");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

function formatTime(time) {
    if (!Number.isFinite(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function loadSong(index) {
    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.file;

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    progress.value = 0;

    isPlaying = false;
    updateButtons();
}

function playSong() {
    audio.play()
        .then(() => {
            isPlaying = true;
            updateButtons();
        })
        .catch(error => {
            console.error("Could not play song:", error);
        });
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    updateButtons();
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function updateButtons() {
    const icon = isPlaying ? "❚❚" : "▶";

    if (playBtn) {
        playBtn.textContent = icon;
    }

    if (playerPlay) {
        playerPlay.textContent = icon;
    }
}

function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
}

function previousSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
}

function updateProgress() {
    if (!audio.duration) {
        return;
    }

    progress.value =
        (audio.currentTime / audio.duration) * 100;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);
}

function seekSong() {
    if (!audio.duration) {
        return;
    }

    audio.currentTime =
        (progress.value / 100) * audio.duration;
}

function createSongList() {
    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const item = document.createElement("div");

        item.className = "song-item";

        item.innerHTML = `
            <div>
                <strong>${String(index + 1).padStart(2, "0")}</strong>
                <strong>${song.title}</strong>
                <span>${song.artist}</span>
            </div>

            <button type="button">
                ▶ Play
            </button>
        `;

        item.querySelector("button").addEventListener(
            "click",
            () => {
                loadSong(index);
                playSong();
            }
        );

        songList.appendChild(item);
    });
}

playBtn?.addEventListener("click", togglePlay);

playerPlay?.addEventListener("click", togglePlay);

nextBtn?.addEventListener("click", nextSong);

playerNext?.addEventListener("click", nextSong);

previousBtn?.addEventListener("click", previousSong);

playerPrevious?.addEventListener(
    "click",
    previousSong
);

progress?.addEventListener(
    "input",
    seekSong
);

audio.addEventListener(
    "timeupdate",
    updateProgress
);

audio.addEventListener(
    "loadedmetadata",
    updateProgress
);

audio.addEventListener(
    "ended",
    nextSong
);

audio.addEventListener(
    "error",
    () => {
        console.error(
            "Song file could not be loaded:",
            songs[currentSong].file
        );
    }
);

loadSong(0);
createSongList();

console.log(
    "KVS player ready —",
    songs.length,
    "unique songs"
);
