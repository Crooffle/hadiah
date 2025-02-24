document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const giftList = document.getElementById("giftList");
    const modal = document.getElementById("confirmationModal");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nama = document.getElementById("nama").value.trim();
            const hadiah = document.getElementById("hadiah").value.trim().toLowerCase();

            if (nama === "" || hadiah === "") {
                alert("Nama dan hadiah tidak boleh kosong!");
                return;
            }

            if (hadiah === "asus rog zepherus duo") {
                simpanData(nama, hadiah);
                window.location.href = "makasih.html";
            } else {
                modal.style.display = "flex"; // Tampilkan pop-up konfirmasi di tengah
            }
        });

        // Jika user menekan "Iya", simpan data dan redirect
        yesBtn.addEventListener("click", function () {
            const nama = document.getElementById("nama").value.trim();
            const hadiah = document.getElementById("hadiah").value.trim();
            simpanData(nama, hadiah);
            modal.style.display = "none"; // Tutup modal sebelum redirect
            window.location.href = "makasih.html";
        });

        // Jika user menekan "Tidak", modal akan tertutup tanpa menyimpan data
        noBtn.addEventListener("click", function () {
            modal.style.display = "none"; // Tutup modal
        });
    }

    if (giftList) {
        renderTable();
    }
});

// **Fungsi menyimpan data ke localStorage**
function simpanData(nama, hadiah) {
    let data = JSON.parse(localStorage.getItem("giftData")) || [];
    data.push({ nama, hadiah });
    localStorage.setItem("giftData", JSON.stringify(data));
}

// **Fungsi render tabel**
function renderTable() {
    const giftList = document.getElementById("giftList");
    if (!giftList) return;

    let data = JSON.parse(localStorage.getItem("giftData")) || [];

    console.log("✅ Data di localStorage:", data); // Debugging

    if (data.length === 0) {
        giftList.innerHTML = "<tr><td colspan='3'>Belum ada data</td></tr>";
        return;
    }

    giftList.innerHTML = ""; // Bersihkan tabel sebelum update

    data.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.hadiah}</td>
            <td><button class="delete-btn" data-index="${index}">Hapus</button></td>
        `;
        giftList.appendChild(row);
    });

    // **Event Listener untuk tombol hapus**
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            hapusData(index);
        });
    });
}

// **Fungsi hapus data tanpa reload**
function hapusData(index) {
    let data = JSON.parse(localStorage.getItem("giftData")) || [];
    
    if (index < data.length) {
        data.splice(index, 1); 
        localStorage.setItem("giftData", JSON.stringify(data));
        renderTable(); // Perbarui tabel tanpa reload
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Cek apakah user sudah login saat membuka admin.html
    if (window.location.pathname.includes("admin.html")) {
        const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
        if (!isLoggedIn) {
            window.location.href = "login.html";
        }
    }

    // Proses login di login.html
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Gantilah username dan password sesuai kebutuhan
            if (username === "admin" && password === "1234") {
                localStorage.setItem("isAdminLoggedIn", "true");
                window.location.href = "admin.html";
            } else {
                alert("Username atau password salah!");
            }
        });
    }

    // Tombol logout di admin.html
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isAdminLoggedIn");
            window.location.href = "login.html";
        });
    }
});
