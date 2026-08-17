const songs = [
    {
        title: "AUD-20211007-WA0002",
        artist: "KVS",
        file: "songs/AUD-20211007-WA0002.mp3"
    },
    {
        title: "AUD-20211126-WA0000",
        artist: "KVS",
        file: "songs/AUD-20211126-WA0000.mp3"
    },
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
        title: "Badan Pe Sitare Lapete Huye",
        artist: "KVS",
        file: "songs/(hindimp3download.net)-badan-pe-sitare-lapete-hue(1).mp3"
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
        file: "songs/(hindimp3download.net)-dil-ne-dil-ko-pukara(1).mp3"
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

const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");

const playerPrevious = document.getElementById("player-previous");
const playerNext = document.getElementById("player-next");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);

    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
}

function loadSong(index) {
    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.file;

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    audio.load();

    isPlaying = false;

    updatePlayButtons();
}

function updatePlayButtons() {
    const symbol = isPlaying ? "❚❚" : "▶";

    if (playBtn) playBtn.textContent = symbol;
    if (playerPlay) playerPlay.textContent = symbol;
}

function playSong() {
    audio.play()
        .then(() => {
            isPlaying = true;
            updatePlayButtons();
        })
        .catch(error => {
            console.error("Audio could not play:", error);
        });
}

function pauseSong() {
    audio.pause();

    isPlaying = false;

    updatePlayButtons();
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
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

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

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

function showSongList() {
    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const songItem = document.createElement("div");

        songItem.className = "song-item";

        songItem.innerHTML = `
            <strong>${song.title}</strong>
            <span>${song.artist}</span>
            <button type="button">▶ Play</button>
        `;

        const button =
            songItem.querySelector("button");

        button.addEventListener("click", () => {
            loadSong(index);
            playSong();
        });

        songList.appendChild(songItem);
    });
}

playBtn?.addEventListener("click", togglePlay);

playerPlay?.addEventListener("click", togglePlay);

nextBtn?.addEventListener("click", nextSong);

playerNext?.addEventListener("click", nextSong);

previousBtn?.addEventListener("click", previousSong);

playerPrevious?.addEventListener("click", previousSong);

progress?.addEventListener("input", seekSong);

audio.addEventListener("timeupdate", updateProgress);

audio.addEventListener("loadedmetadata", updateProgress);

audio.addEventListener("ended", nextSong);

audio.addEventListener("error", () => {
    console.error(
        "Could not load:",
        songs[currentSong].file
    );
});

loadSong(0);

showSongList();

console.log(
    "KVS music player loaded:",
    songs.length,
    "songs"
);
