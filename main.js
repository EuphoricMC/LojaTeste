document.addEventListener("DOMContentLoaded", function () {
    var copyBtn = document.getElementById("copy-ip");
    var ipSpan = document.getElementById("server-ip");
    if (copyBtn && ipSpan && navigator.clipboard) {
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(ipSpan.textContent.trim()).then(function () {
                copyBtn.textContent = "Copiado!";
                setTimeout(function () {
                    copyBtn.textContent = "Copiar IP";
                }, 1500);
            }).catch(function () {});
        });
    }

    var tabButtons = document.querySelectorAll(".store-tab");
    var contents = {
        ranks: document.getElementById("store-ranks"),
        kits: document.getElementById("store-kits"),
        cosmetics: document.getElementById("store-cosmetics")
    };
    tabButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var target = btn.getAttribute("data-target");
            tabButtons.forEach(function (b) {
                b.classList.remove("active");
            });
            btn.classList.add("active");
            Object.keys(contents).forEach(function (key) {
                if (contents[key]) {
                    contents[key].classList.toggle("active", key === target);
                }
            });
        });
    });
});

