// ========================================
// KVS — Kishore Vibe Studio
// 6 SONG MUSIC PLAYER + SEARCH
// ========================================


const songs = [

    {
        title: "Chal Akela",
        artist: "Sambandh",
        file: "songs/Chal Akela - Sambandh-(Mr-Jatt.com).mp3"
    },

    {
        title: "Chale Jana Nahin",
        artist: "Lata Mangeshkar",
        file: "songs/Chale Jana Nahin-Lata MangeshkarRaag.Me(1).mp3"
    },

    {
        title: "Chand Chupa Badal Mein",
        artist: "KVS",
        file: "songs/Chand Chupa Badal Mein (Hum Dil De Chuke Sanam)(1).mp3"
    },

    {
        title: "Chand Aahen Bharega",
        artist: "Mukesh",
        file: "songs/Chand_Aahen_Bharega_(Phool_Bane_Angare)-Mukesh-www.Mp3Mad.Com(1).mp3"
    },

    {
        title: "Chhoo Lene Do Nazuk Honthon Ko",
        artist: "Mohammad Rafi",
        file: "songs/Chhoo Lene Do Nazuk Honthon Ko - Mohammad Rafi -(M4A_128K) (1).m4a"
    },

    {
        title: "Chithi Na Koi Sandesh",
        artist: "KVS",
        file: "songs/Chithi Na Koi Sandesh(1).mp3"
    }

];


// ========================================
// PLAYER
// ========================================

let currentSong = 0;
let isPlaying = false;

const audio = new Audio();


// ========================================
// HTML ELEMENTS
// ========================================

const songList =
    document.getElementById("song-list");

const songSearch =
    document.getElementById("song-search");

const playerTitle =
    document.getElementById("player-title");

const playerArtist =
    document.getElementById("player-artist");

const playBtn =
    document.getElementById("play-btn");

const playerPlay =
    document.getElementById("player-play");

const nextBtn =
    document.getElementById("next-btn");

const previousBtn =
    document.getElementById("previous-btn");

const playerNext =
    document.getElementById("player-next");

const playerPrevious =
    document.getElementById("player-previous");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");


// ========================================
// TIME FORMAT
// ========================================

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsLeft =
        Math.floor(seconds % 60);

    return `${minutes}:${secondsLeft
        .toString()
        .padStart(2, "0")}`;
}


// ========================================
// UPDATE PLAY BUTTONS
// ========================================

function updateButtons() {

    const icon =
        isPlaying ? "❚❚" : "▶";

    if (playBtn) {
        playBtn.textContent = icon;
    }

    if (playerPlay) {
        playerPlay.textContent = icon;
    }
}


// ========================================
// LOAD SONG
// ========================================

function loadSong(index) {

    if (!songs[index]) {
        return;
    }

    currentSong = index;

    const song =
        songs[currentSong];

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


    if (currentTime) {
        currentTime.textContent =
            "0:00";
    }


    if (duration) {
        duration.textContent =
            "0:00";
    }


    if (progress) {
        progress.value = 0;
    }


    isPlaying = false;

    updateButtons();

    console.log(
        "Loaded:",
        song.title
    );
}


// ========================================
// PLAY SONG
// ========================================

function playSong() {

    audio.play()

        .then(() => {

            isPlaying = true;

            updateButtons();

            console.log(
                "Playing:",
                songs[currentSong].title
            );

        })

        .catch(error => {

            console.error(
                "Could not play:",
                error
            );

        });
}


// ========================================
// PAUSE SONG
// ========================================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    updateButtons();
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

    currentSong++;

    if (
        currentSong >=
        songs.length
    ) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();
}


// ========================================
// PREVIOUS SONG
// ========================================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong =
            songs.length - 1;

    }

    loadSong(currentSong);

    playSong();
}


// ========================================
// UPDATE PROGRESS
// ========================================

function updateProgress() {

    if (!audio.duration) {
        return;
    }


    if (progress) {

        progress.value =
            (audio.currentTime /
            audio.duration) * 100;

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

    if (!audio.duration) {
        return;
    }

    audio.currentTime =
        (progress.value / 100) *
        audio.duration;
}


// ========================================
// CREATE SONG LIST
// WITH SEARCH
// ========================================

function createSongList(searchText = "") {

    if (!songList) {
        return;
    }


    songList.innerHTML = "";


    const search =
        searchText
            .toLowerCase()
            .trim();


    const filteredSongs =
        songs
            .map((song, index) => ({
                song: song,
                index: index
            }))

            .filter(({ song }) => {

                return (

                    song.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    song.artist
                        .toLowerCase()
                        .includes(search)

                );

            });


    // ========================================
    // NO RESULTS
    // ========================================

    if (
        filteredSongs.length === 0
    ) {

        songList.innerHTML = `

            <div class="empty-message">

                No songs found.

            </div>

        `;

        return;
    }


    // ========================================
    // DISPLAY SONGS
    // ========================================

    filteredSongs.forEach(
        ({ song, index }) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "song-item";


            item.innerHTML = `

                <div class="song-details">

                    <strong>
                        ${String(index + 1)
                            .padStart(2, "0")}
                    </strong>


                    <strong>
                        ${song.title}
                    </strong>


                    <span>
                        ${song.artist}
                    </span>

                </div>


                <button
                    type="button"
                >
                    ▶ Play
                </button>

            `;


            const button =
                item.querySelector(
                    "button"
                );


            button.addEventListener(
                "click",
                () => {

                    loadSong(index);

                    playSong();

                }
            );


            songList.appendChild(
                item
            );

        }
    );
}


// ========================================
// SEARCH EVENT
// ========================================

songSearch?.addEventListener(
    "input",
    () => {

        createSongList(
            songSearch.value
        );

    }
);


// ========================================
// BUTTON EVENTS
// ========================================

playBtn?.addEventListener(
    "click",
    togglePlay
);


playerPlay?.addEventListener(
    "click",
    togglePlay
);


nextBtn?.addEventListener(
    "click",
    nextSong
);


playerNext?.addEventListener(
    "click",
    nextSong
);


previousBtn?.addEventListener(
    "click",
    previousSong
);


playerPrevious?.addEventListener(
    "click",
    previousSong
);


progress?.addEventListener(
    "input",
    seekSong
);


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
            "SONG FAILED:",
            songs[currentSong].file
        );

    }
);


// ========================================
// START KVS
// ========================================

loadSong(0);

createSongList();


console.log(
    "KVS loaded —",
    songs.length,
    "unique songs"
);
