var translations = {
    "en": {
        "profileLink":"PROFILE",
        "home": "HOME",
        "playButton": "Play",
        "howToPlayHeader": "HOW TO PLAY ?",
        "howToPlayText": "A small ball moves across the screen, bouncing off the top and bottom ledges, and the two players each control a pad, sliding it vertically between the ends of the screen using the controls. If the ball hits the pad, it bounces back to the other player. If it misses the pad, the other player scores a point. The ball bounces in different ways depending on how it hits the pad."
    },
    "hy": {
        "profileLink":"ՊՐՈՖԻԼ",
        "home": "ԳԼԽԱՎՈՐ",
        "playButton": "Խաղալ",
        "howToPlayHeader": "ԻՆՉՊԵՍ ԽԱՂԱԼ?",
        "howToPlayText": "Մի փոքրիկ գնդակը շարժվում է էկրանով, ցատկելով վերևի և ներքևի եզրերից, և երկու խաղացողներից յուրաքանչյուրը կառավարում է մի պահոց՝ այն ուղղահայաց սահեցնելով էկրանի ծայրերի միջև՝ օգտագործելով կառավարները: Եթե գնդակը դիպչում է խաղադաշտին, այն ետ է վերադառնում դեպի մյուս խաղացողը: Եթե այն բաց է թողնում պահոցը, մյուս խաղացողը միավոր է վաստակում: Գնդակը ցատկում է տարբեր ձևերով՝ կախված նրանից, թե ինչպես է այն հարվածում բարձիկին:"
    },
    "ru": {
        "profileLink":"ПРОФИЛЬ",
        "home": "ГЛАВНАЯ",
        "playButton": "Играть",
        "howToPlayHeader": "КАК ИГРАТЬ ?",
        "howToPlayText": "Маленький шарик движется по экрану, отскакивая от верхних и нижних выступов, и каждый из двух игроков управляет панелью, перемещая ее вертикально между концами экрана с помощью элементов управления. Если мяч попадает на площадку, он отскакивает обратно к другому игроку. Если он не попадает в площадку, другой игрок получает очко. Мяч отскакивает по-разному в зависимости от того, как он попадает на площадку."
    },
    "cn": {
      "profileLink":"档案",
      "home": "家",
      "playButton":"玩",
      "howToPlayHeader": "怎麼玩？",
      "howToPlayText": "一個小球在螢幕上移動，從頂部和底部的壁架上彈起，兩個玩家各自控制一個墊子，使用控制在螢幕兩端之間垂直滑動它。 如果球擊中墊子，它會彈回給其他玩家。 如果它錯過了墊子，則其他玩家得分。 球以不同的方式彈跳，這取決於它擊中墊的方式。"
  }
}

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
