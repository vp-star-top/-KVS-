// ========================================
// KVS — Kishore Vibe Studio
// Music Player
// ========================================

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


// ========================================
// PLAYER STATE
// ========================================

let currentSongIndex = 0;
let isPlaying = false;


// ========================================
// AUDIO
// ========================================

const audio = new Audio();


// ========================================
// HTML ELEMENTS
// ========================================

const songList = document.getElementById("song-list");

const playerTitle =
    document.getElementById("player-title");

const playerArtist =
    document.getElementById("player-artist");

const playBtn =
    document.getElementById("play-btn");

const playerPlay =
    document.getElementById("player-play");

const previousBtn =
    document.getElementById("previous-btn");

const nextBtn =
    document.getElementById("next-btn");

const playerPrevious =
    document.getElementById("player-previous");

const playerNext =
    document.getElementById("player-next");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const radioDisplay =
    document.querySelector(".radio-display");


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsRemaining =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        secondsRemaining
            .toString()
            .padStart(2, "0")
    );
}


// ========================================
// UPDATE PLAY BUTTONS
// ========================================

function updatePlayButtons() {

    const symbol =
        isPlaying ? "❚❚" : "▶";

    if (playBtn) {
        playBtn.textContent = symbol;
    }

    if (playerPlay) {
        playerPlay.textContent = symbol;
    }
}


// ========================================
// LOAD SONG
// ========================================

function loadSong(index) {

    if (!songs[index]) {
        return;
    }

    currentSongIndex = index;

    const song =
        songs[currentSongIndex];

    audio.src = song.file;

    audio.load();

    if (playerTitle) {
        playerTitle.textContent =
            song.title;
    }

    if (playerArtist) {
        playerArtist.textContent =
            song.artist;
    }

    if (radioDisplay) {
        radioDisplay.textContent =
            "READY — " + song.title;
    }

    isPlaying = false;

    updatePlayButtons();

    if (progress) {
        progress.value = 0;
    }

    if (currentTime) {
        currentTime.textContent = "0:00";
    }

    if (duration) {
        duration.textContent = "0:00";
    }

    console.log(
        "Loaded:",
        song.file
    );
}


// ========================================
// PLAY
// ========================================

function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            updatePlayButtons();

            console.log(
                "Playing:",
                songs[currentSongIndex].title
            );

        })
        .catch((error) => {

            isPlaying = false;

            updatePlayButtons();

            console.error(
                "Audio could not play:",
                error
            );

        });
}


// ========================================
// PAUSE
// ========================================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    updatePlayButtons();

}


// ========================================
// PLAY / PAUSE
// ========================================

function togglePlay() {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

}


// ========================================
// NEXT SONG
// ========================================

function nextSong() {

    currentSongIndex++;

    if (
        currentSongIndex >=
        songs.length
    ) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    playSong();

}


// ========================================
// PREVIOUS SONG
// ========================================

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();

}


// ========================================
// PROGRESS
// ========================================

function updateProgress() {

    if (
        !audio.duration ||
        !Number.isFinite(audio.duration)
    ) {
        return;
    }

    const percentage =
        (
            audio.currentTime /
            audio.duration
        ) * 100;

    if (progress) {
        progress.value =
            percentage;
    }

    if (currentTime) {
        currentTime.textContent =
            formatTime(
                audio.currentTime
            );
    }

    if (duration) {
        duration.textContent =
            formatTime(
                audio.duration
            );
    }

}


// ========================================
// SEEK
// ========================================

function seekSong() {

    if (
        !audio.duration ||
        !Number.isFinite(audio.duration)
    ) {
        return;
    }

    audio.currentTime =
        (
            progress.value / 100
        ) * audio.duration;

}


// ========================================
// SHOW SONG LIST
// ========================================

function showSongList() {

    if (!songList) {
        console.error(
            "song-list element not found."
        );

        return;
    }

    songList.innerHTML = "";

    songs.forEach(
        (song, index) => {

            const songItem =
                document.createElement(
                    "div"
                );

            songItem.className =
                "song-item";

            songItem.innerHTML = `

                <div class="song-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="song-details">

                    <strong>
                        ${song.title}
                    </strong>

                    <span>
                        ${song.artist}
                    </span>

                </div>

                <button
                    type="button"
                    class="song-play-button"
                >
                    ▶ Play
                </button>

            `;

            const button =
                songItem.querySelector(
                    ".song-play-button"
                );

            button.addEventListener(
                "click",
                () => {

                    loadSong(index);

                    playSong();

                }
            );

            songList.appendChild(
                songItem
            );

        }
    );

}


// ========================================
// BUTTON EVENTS
// ========================================

if (playBtn) {

    playBtn.addEventListener(
        "click",
        togglePlay
    );

}


if (playerPlay) {

    playerPlay.addEventListener(
        "click",
        togglePlay
    );

}


if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        nextSong
    );

}


if (playerNext) {

    playerNext.addEventListener(
        "click",
        nextSong
    );

}


if (previousBtn) {

    previousBtn.addEventListener(
        "click",
        previousSong
    );

}


if (playerPrevious) {

    playerPrevious.addEventListener(
        "click",
        previousSong
    );

}


if (progress) {

    progress.addEventListener(
        "input",
        seekSong
    );

}


// ========================================
// AUDIO EVENTS
// ========================================

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
            "FAILED TO LOAD SONG:",
            songs[currentSongIndex].file
        );

        if (radioDisplay) {

            radioDisplay.textContent =
                "Unable to load this song";

        }

    }
);


// ========================================
// START KVS
// ========================================

loadSong(0);

showSongList();

console.log(
    "KVS music player loaded:",
    songs.length,
    "songs"
);
