function switchLanguage(language) {
    // Update Home Page Texts
    if (document.getElementById("homeLink")) {
        document.getElementById("homeLink").textContent = translations[language]["home"];
        document.getElementById("profileLink").textContent = translations[language]["profile"];
        document.getElementById("howToPlayHeader").textContent = translations[language]["howToPlayHeader"];
        document.getElementById("howToPlayText").textContent = translations[language]["howToPlayText"];
        document.querySelector(".button").textContent = translations[language]["playButton"];
    }

    // Update Confirm Page Texts
    if (document.getElementById("confirmEmail")) {
        document.getElementById("confirmEmail").textContent = translations[language]["confirmEmail"];
        document.getElementById("enterConfirm").textContent = translations[language]["enterConfirm"];
        document.getElementById("confirmButton").textContent = translations[language]["confirmButton"];
    }
}

// Initialize the language switcher
document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) {
        languageSelect.addEventListener("change", function() {
            const selectedLanguage = languageSelect.value;
            localStorage.setItem("preferredLanguage", selectedLanguage);
            switchLanguage(selectedLanguage);
        });

        const preferredLanguage = localStorage.getItem("preferredLanguage") || "en";
        languageSelect.value = preferredLanguage;
        switchLanguage(preferredLanguage);
    }
});
