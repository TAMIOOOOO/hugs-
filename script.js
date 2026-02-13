document.addEventListener("DOMContentLoaded", () => {

    // ===== DOM ELEMENTS =====
    const container = document.querySelector(".hearts-container");
    const form = document.getElementById("loveForm");
    const loginCard = document.getElementById("loginCard");
    const errorMessage = document.getElementById("errorMessage");
    const nameInput = document.getElementById("nameInput");
    const monthsaryInput = document.getElementById("monthsaryInput");

    const CORRECT_MONTHSARY = "06/20/25";
    let heartInterval;

    // ===== START FLOATING HEARTS =====
    startHeartAnimation();

    function startHeartAnimation() {
        heartInterval = setInterval(createHeart, 450);
    }

    function stopHeartAnimation() {
        clearInterval(heartInterval);
    }

    // ===== CREATE HEART =====
    function createHeart(isBurst = false) {
        if (!container) return;

        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "💖";

        const size = random(18, 45);
        const duration = random(4, 9);

        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;

        if (isBurst) {
            heart.style.left = "50vw";
            heart.style.top = "50vh";
            heart.style.position = "fixed";
            heart.style.transform = `translate(-50%, -50%) rotate(${random(0, 360)}deg)`;
        }

        container.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    // ===== FORM SUBMISSION =====
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const monthsary = monthsaryInput.value.trim();

        if (!name) {
            showMessage("Please enter your name first, lovey 💌", true);
            return;
        }

        if (monthsary !== CORRECT_MONTHSARY) {
            showMessage("Wrong monthsary 😢 Try again my love 💕", true);
            shakeCard();
            return;
        }

        // SUCCESS 💕
        showMessage("Access granted, my love 💖", false);
        stopHeartAnimation();
        burstHearts();

        setTimeout(() => {
            window.location.href = "second.html";
        }, 1600);
    });

    // ===== UI HELPERS =====
    function showMessage(message, isError) {
        errorMessage.textContent = message;
        errorMessage.style.color = isError ? "#ff4d6d" : "#ff1493";
    }

    function shakeCard() {
        loginCard.classList.add("shake");
        setTimeout(() => loginCard.classList.remove("shake"), 500);
    }

    function burstHearts() {
        for (let i = 0; i < 35; i++) {
            setTimeout(() => createHeart(true), i * 40);
        }
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

});
