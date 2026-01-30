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

    var statusUrl = "http://sd-br3.blazebr.com:25800/status";
    var statusSpan = document.getElementById("server-status");
    var onlineSpan = document.getElementById("online-players");
    if (statusSpan && onlineSpan && window.fetch) {
        var updateStatus = function () {
            fetch(statusUrl).then(function (response) {
                if (!response.ok) {
                    throw new Error("status");
                }
                return response.json();
            }).then(function (data) {
                if (typeof data.online === "boolean" && typeof data.onlinePlayers === "number" && typeof data.maxPlayers === "number") {
                    statusSpan.textContent = data.online ? "Online" : "Offline";
                    onlineSpan.textContent = data.onlinePlayers + " / " + data.maxPlayers;
                }
            }).catch(function () {
                statusSpan.textContent = "Offline";
            });
        };
        updateStatus();
        setInterval(updateStatus, 5000);
    }
});


