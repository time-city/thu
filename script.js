const boxContainer = document.getElementById('box-container');
const progressRing = document.getElementById('progress-ring');
const boxEmoji = document.getElementById('box-emoji');
const unboxScreen = document.getElementById('unbox-screen');
const mainScreen = document.getElementById('main-screen');
const videoScreen = document.getElementById('video-screen');
const introVideo = document.getElementById('intro-video');
const videoTimer = document.getElementById('video-timer');
const bgMusic = document.getElementById('bg-music');
const lyricsContainer = document.getElementById('lyrics-container');
const instruction = document.querySelector('.instruction');

const progressFill = document.querySelector('.progress-fill');
const progressSvg = document.querySelector('.progress-svg');
const ripple = document.getElementById('ripple');

let animationFrame;
const requiredHoldTime = 2000; // Thời gian giữ (2 giây)
let isHolding = false;
let isReadyToOpen = false;
let startTime;

const playlist = ['assets/IMG_7319.mp4', 'assets/IMG_7320.mp4'];
let currentVideoIndex = 0;

// Lời bài hát (thời gian tính bằng giây)
const lyrics = [
    // { time: 0, text: "🎵 (Nhạc dạo...) 🎵" },
    { time: 1, text: "Ngồi ngẩn ngơ, anh hát vu vơ những bản tình ca năm ấy" },
    { time: 7, text: "Có đôi lần khẽ cười vì anh chợt nhớ người làm anh say" },
    { time: 13, text: "Từ giọng nói như rót mật bên tai hay là từ những lúc dỗi hờn anh sai" },
    { time: 20, text: "Nhiều khi anh cứ ngỡ là người vẫn còn nơi đây" },
    { time: 27, text: "Từng viết cho em ngàn câu ca, giờ hòa thành kí ức chẳng thể phai nhòa" },
    { time: 33, text: "Từng màu buồn nỗi đau dường như đều đang than tiếc đôi ta" },
    { time: 40, text: "Một lần này nữa thôi, người ơi" },
    { time: 42, text: "Bàn tay này anh sẽ nắm, chẳng nỡ buông ra" },
    { time: 46, text: "Mặc dòng người cứ thế lướt qua, anh chỉ cần mỗi đôi ta" },
    { time: 52, text: "Đi khắp thiên hà, anh vẫn sẽ bước đi để kiếm em" },
    { time: 59, text: "Nỗi nhớ nay dường như đang nuốt lấy anh vào màn đêm" },
    { time: 66, text: "Em nói sẽ về nhưng thêm bao lâu?" },
    { time: 69, text: "Từng phút anh chờ là ngàn cơn đau" },
    { time: 73, text: "Dù cho em đã có thêm ai rồi, chẳng còn cần anh đâu" },
    { time: 119, text: "Tại sao giờ anh mới biết anh sai?" },
    { time: 122, text: "Sao giờ anh mới xem em là ánh ban mai?" },
    { time: 125, text: "Làm em đau như thế rồi, nay anh đòi quay lại?" },
    { time: 132, text: "Luôn miệng nói yêu em, dù chưa từng có phút giây muốn bên em" },
    { time: 138, text: "Chỉ đến khi mà em rời xa, anh mới nhớ những phút êm đềm" },
    { time: 145, text: "Vì em đã trao cho anh hết cả thanh xuân" },
    { time: 148, text: "Anh trả lại em cơn đau không nói nên lời" },
    { time: 151, text: "Vậy người đừng trách thêm chi khi em buông câu xa rời" },
    { time: 158, text: "Từ giờ em không phiền anh nữa" },
    { time: 161, text: "Anh cũng không cần chờ em nữa" },
    { time: 165, text: "Em nguyện mang theo bão giông trong lòng, chỉ để lại người cơn mưa" },
    { time: 171, text: "Anh hãy thôi chờ em đi anh nhé, đôi mình đã xa" },
    { time: 177, text: "Em nói sẽ về nhưng chỉ là cớ để người buông thả" },
    { time: 184, text: "Anh cứ đi tìm một hạnh phúc mới, nghĩ cho mình anh thôi" },
    { time: 191, text: "Giờ ta hai thế giới khác nhau rồi, chẳng còn là chung đôi" },
    { time: 217, text: "Đã từng có những lúc anh sợ lạc mất nhau" },
    { time: 224, text: "Khi thấy càng nhiều nỗi đau nhưng anh lại chẳng quay đầu" },
    { time: 231, text: "Em cứ việc trách anh tồi, anh biết anh sai rồi" },
    { time: 237, text: "Rượu vẫn cứ rót, cơn đau dày vò anh mỗi tối" },
    { time: 244, text: "Uhh, I'm sorry, babe, anh cũng không biết lúc ấy mình nghĩ gì" },
    { time: 250, text: "\"Ba năm mươi\" bổ đôi, nó khiến tâm trí của anh dần phai đi" },
    { time: 257, text: "Thời gian cho anh biết được anh cần em hơn anh nghĩ" },
    { time: 264, text: "Nên nếu anh có phải đi nơi đâu tìm em, anh vẫn sẽ đi" },
    { time: 271, text: "Đi khắp thiên hà" },
    { time: 273, text: "Đi khắp thiên hà, anh vẫn sẽ bước đi để kiếm em (bước đi để kiếm em)" },
    { time: 280, text: "Nỗi nhớ nay dường như đang nuốt lấy anh vào màn đêm" },
    { time: 286, text: "Em nói sẽ về nhưng thêm bao lâu?" },
    { time: 290, text: "Từng phút anh chờ là ngàn cơn đau" },
    { time: 293, text: "Dù cho em đã có thêm ai rồi, chẳng còn cần anh đâu" },
    { time: 300, text: "Từ đầu anh biết anh sai, em à" },
    { time: 303, text: "Mà lời xin lỗi chẳng dám nói ra" },
    { time: 307, text: "Nào ngờ cái tôi của anh lại là thứ giết đôi ta" },
    { time: 313, text: "Lặng nhìn giây phút ta cách xa nhau" },
    { time: 317, text: "Hàng triệu nỗi đau chẳng nói nên câu" },
    { time: 320, text: "Khoảnh khắc mà anh nhận ra anh đã sai từ lúc bắt đầu" }
];
let currentLyricIndex = -1;

function startHolding(e) {
    if (e.type === 'touchstart') e.preventDefault();

    isHolding = true;
    isReadyToOpen = false;
    progressSvg.style.opacity = '1';
    startTime = Date.now();
    ripple.classList.remove('explode');

    function updateProgress() {
        if (!isHolding) return;

        let elapsedTime = Date.now() - startTime;
        let progressRatio = Math.min(elapsedTime / requiredHoldTime, 1);

        // Hiệu ứng vòng tròn SVG chạy ngược chiều kim đồng hồ (từ 283 -> 0)
        const dashOffset = 283 - (283 * progressRatio);
        progressFill.style.strokeDashoffset = dashOffset;

        // Bông hoa phóng to mượt mà và phát sáng
        const scale = 1 + (progressRatio * 0.4); // Phóng to đến 1.4x
        const glow = progressRatio * 20;
        boxEmoji.style.transform = `scale(${scale})`;
        boxEmoji.style.filter = `drop-shadow(0 0 ${glow}px var(--primary))`;

        if (progressRatio >= 1) {
            instruction.innerText = "Tuyệt vời! Thả tay ra để xem bất ngờ nhé ❤️";
            instruction.style.color = "var(--primary)";
            progressFill.style.stroke = "#fff"; // Chớp chớp viền trắng
            isReadyToOpen = true;
        }

        if (isHolding) {
            animationFrame = requestAnimationFrame(updateProgress);
        }
    }
    updateProgress();
}

function stopHolding() {
    isHolding = false;
    cancelAnimationFrame(animationFrame);

    if (isReadyToOpen) {
        // FIX: Phải gọi play() ngay lập tức trong event touchend/mouseup thì Safari/iOS mới cho phép phát âm thanh & video
        bgMusic.play().catch(e => console.error("Audio play failed:", e));
        
        // Không gán lại src cho video đầu tiên để tránh Safari hủy lệnh play
        if (!introVideo.src || !introVideo.src.includes(playlist[currentVideoIndex])) {
            introVideo.src = playlist[currentVideoIndex];
        }
        introVideo.play().catch(e => console.error("Video play failed:", e));

        // Nổ bung hiệu ứng ripple
        ripple.classList.add('explode');
        boxEmoji.style.transform = 'scale(0)';
        progressSvg.style.opacity = '0';
        instruction.style.opacity = '0';

        setTimeout(() => {
            // Hiện màn hình video mờ mờ rồi rõ dần lên
            videoScreen.style.opacity = '0';
            videoScreen.style.display = 'flex';
            setTimeout(() => {
                videoScreen.style.opacity = '1';
            }, 50);

            // Ẩn hộp quà sau khi chuyển cảnh xong
            setTimeout(() => {
                unboxScreen.style.display = 'none';
            }, 1000);
        }, 600); // Chờ hiệu ứng ripple nổ xong rồi mới chuyển cảnh
    } else {
        progressFill.style.strokeDashoffset = 283;
        progressFill.style.stroke = "var(--primary)";
        boxEmoji.style.transform = `scale(1)`;
        boxEmoji.style.filter = `none`;
        instruction.innerText = "Nhấn giữ bông hoa nhé cục vàng ❤️";
        instruction.style.color = "#ffffff";
    }
}

// Xử lý chuyển video khi hết
introVideo.addEventListener('ended', () => {
    currentVideoIndex++;
    if (currentVideoIndex < playlist.length) {
        introVideo.src = playlist[currentVideoIndex];
        introVideo.play().catch(e => console.error("Video play failed:", e));
    } else {
        showMainLetter();
    }
});

// Helper function format time MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Cập nhật thời gian video
introVideo.addEventListener('timeupdate', () => {
    const current = formatTime(introVideo.currentTime);
    const total = formatTime(introVideo.duration);
    videoTimer.innerText = `${current} / ${total}`;
});

// Cập nhật lời bài hát theo nhạc nền
bgMusic.addEventListener('timeupdate', () => {
    const currentTime = bgMusic.currentTime;

    let newIndex = -1;
    for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].time) {
            newIndex = i;
        } else {
            break;
        }
    }

    if (newIndex !== currentLyricIndex && newIndex !== -1) {
        currentLyricIndex = newIndex;
        lyricsContainer.innerHTML = `<div class="lyric-line">${lyrics[newIndex].text}</div>`;
    }
});

function showMainLetter() {
    videoScreen.style.opacity = '0';
    setTimeout(() => {
        videoScreen.style.display = 'none';
        mainScreen.style.display = 'block';
        void mainScreen.offsetWidth; // trigger reflow
        mainScreen.style.opacity = '1';
    }, 1000);
}

boxContainer.addEventListener('mousedown', startHolding);
window.addEventListener('mouseup', stopHolding);

boxContainer.addEventListener('touchstart', startHolding, { passive: false });
window.addEventListener('touchend', stopHolding);
window.addEventListener('touchcancel', stopHolding);

// CHẶN MỌI THAO TÁC TOUCH (DOUBLE TAP TUA VIDEO) LÊN MÀN HÌNH VIDEO Ở IOS
videoScreen.addEventListener('touchstart', (e) => {
    e.preventDefault();
}, { passive: false });
