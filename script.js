console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songInfo = document.querySelector('.songinfo');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let searchIcon = document.getElementById('searchIcon');
let searchBar = document.getElementById('searchBar');

let songs = [
    { SongName: "Tera Fitoor", filepath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "05:34" },
    { SongName: "Raabta", filepath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "04:22" },
    { SongName: "Tum Mile", filepath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "05:12" },
    { SongName: "Kesariya", filepath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "04:30" },
    { SongName: "Shayad", filepath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "04:45" },
    { SongName: "Apna Bana Le", filepath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "03:58" },
    { SongName: "Hawayein", filepath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "04:19" },
    { SongName: "Maan Meri Jaan", filepath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "03:55" },
    { SongName: "Tujh Mein Rab Dikhta Hai", filepath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "05:06" },
    { SongName: "Raatan Lambiyan", filepath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "04:12" },
];

// Load songs into DOM
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].SongName;
    element.getElementsByClassName("timestamp")[0].innerHTML =
        `${songs[i].duration} <i id="${i}" class="far songItemPlay fa-circle-play"></i>`;
});

// Master play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updateMasterUI(true);
    } else {
        audioElement.pause();
        updateMasterUI(false);
    }
});

function updateMasterUI(isPlaying) {
    if (isPlaying) {
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
}

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all small play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Song click from list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        playSong(songIndex);
    });
});

// Play song
function playSong(index) {
    makeAllPlays();
    audioElement.src = songs[index].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    updateMasterUI(true);
    document.querySelector(`.songItemPlay[id="${index}"]`).classList.remove('fa-circle-play');
    document.querySelector(`.songItemPlay[id="${index}"]`).classList.add('fa-circle-pause');
    songInfo.innerHTML = `<img src="playing.gif" width="42px" id="gif"> ${songs[index].SongName}`;
}

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// 🔍 Toggle search bar with icon
searchIcon.addEventListener('click', () => {
    if (searchBar.style.display === "none" || searchBar.style.display === "") {
        searchBar.style.display = "block";
        searchBar.focus();
    } else {
        searchBar.style.display = "none";
        searchBar.value = ""; // clear input
        // Reset song list visibility
        songItems.forEach((element) => {
            element.style.display = "flex";
        });
    }
});

// 🔍 Search functionality
searchBar.addEventListener('input', () => {
    let query = searchBar.value.toLowerCase();

    songItems.forEach((element, i) => {
        let songName = songs[i].SongName.toLowerCase();
        if (songName.includes(query)) {
            element.style.display = "flex"; // show if match
        } else {
            element.style.display = "none"; // hide if not match
        }
    });
});
