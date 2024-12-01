document.addEventListener("DOMContentLoaded", () => {
    const backToBooks = document.querySelector(".back-btn");

    if (backToBooks) {
        backToBooks.addEventListener("click", () => {
            console.log('Tombol kembali ditekan'); // Debugging log

            const reviewSection = document.getElementById("reviewSection");
            const bookList = document.querySelector(".book-list");

            // Menyembunyikan bagian review dan menampilkan kembali daftar buku
            reviewSection.classList.add("hidden"); // Sembunyikan review
            bookList.style.display = "flex"; // Tampilkan daftar buku
        });
    } else {
        console.log("Tombol Kembali tidak ditemukan");
    }
});

// Fungsi untuk kembali ke kategori
function goBackToCategories() {
    const bookSection = document.getElementById('bookSection');
    const categoryCards = document.getElementById('categoryCards');
    
    // Menyembunyikan bagian buku dan menampilkan kategori
    bookSection.style.display = 'none';
    categoryCards.style.display = 'flex';
}

        
// Menampilkan Buku Berdasarkan Kategori
function showBooks(category) {
    // Sembunyikan kategori
    document.getElementById('categoryCards').style.display = 'none';

    // Tampilkan daftar buku
    const bookSection = document.getElementById('bookSection');
    bookSection.style.display = 'block';

    // Filter buku berdasarkan kategori
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        const bookCategory = card.getAttribute('data-category');
        if (bookCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Kembali ke kategori
function goBackToCategories() {
    document.getElementById('bookSection').style.display = 'none';
    document.getElementById('categoryCards').style.display = 'flex';
}

// Fungsi pencarian
document.getElementById('searchInput').addEventListener('input', function () {
    const searchText = this.value.toLowerCase();
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        const title = card.querySelector('p').textContent.toLowerCase();
        card.style.display = title.includes(searchText) ? 'block' : 'none';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // Fungsi untuk menyimpan data pengguna
    function saveUserData(username, data) {
        localStorage.setItem(username, JSON.stringify(data));
    }

    // Fungsi untuk mengambil data pengguna
    function getUserData(username) {
        const data = localStorage.getItem(username);
        return data ? JSON.parse(data) : null;
    }

    // Fungsi untuk logout
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        location.reload(); // Muat ulang halaman
    });

    // Fungsi untuk login
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && password) {
            // Simpan username sebagai pengguna saat ini
            localStorage.setItem("currentUser", username);

            // Periksa apakah pengguna sudah memiliki data
            let userData = getUserData(username);
            if (!userData) {
                // Buat data default untuk pengguna baru
                userData = {
                    username: username,
                    password: password,
                    description: "Deskripsi Anda belum diatur.",
                    profilePic: "https://via.placeholder.com/150" // Default foto profil
                };
                saveUserData(username, userData);
            }

            // Sembunyikan modal login
            loginModal.style.display = "none";

            // Perbarui profil dengan data pengguna
            updateProfile(userData);
        } else {
            alert("Silakan isi username dan password!");
        }
    });

    // Fungsi untuk memperbarui tampilan profil
    function updateProfile(userData) {
        document.getElementById("name").textContent = userData.username;
        document.getElementById("description").textContent = userData.description;
        document.querySelector(".profile-picture").src = userData.profilePic;
    }

    // Fungsi untuk memuat data pengguna saat halaman dimuat
    function loadProfile() {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            const userData = getUserData(currentUser);
            if (userData) {
                updateProfile(userData);
                loginModal.style.display = "none"; // Sembunyikan modal jika sudah login
            }
        }
    }

    // Fungsi untuk mengedit deskripsi
    document.getElementById("editDescBtn").addEventListener("click", () => {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) return;

        const userData = getUserData(currentUser);
        const newDesc = prompt("Edit Deskripsi Anda:", userData.description);
        if (newDesc !== null) {
            userData.description = newDesc;
            saveUserData(currentUser, userData);
            updateProfile(userData);
        }
    });

    // Fungsi untuk mengedit foto profil
    document.getElementById("editPicBtn").addEventListener("click", () => {
        const fileInput = document.getElementById("uploadProfilePic");
        fileInput.click();
    });

    document.getElementById("uploadProfilePic").addEventListener("change", (event) => {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) return;

        const userData = getUserData(currentUser);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                userData.profilePic = reader.result;
                saveUserData(currentUser, userData);
                updateProfile(userData);
            };
            reader.readAsDataURL(file);
        }
    });

    // Panggil fungsi untuk memuat profil saat halaman dimuat
    loadProfile();
});

        // Mengedit foto profil
document.getElementById("editPicBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("uploadProfilePic");
    fileInput.click();
});

document.getElementById("uploadProfilePic").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result;
            localStorage.setItem("profilePic", base64Image); // Simpan di localStorage
            document.querySelector(".profile-picture").src = base64Image; // Perbarui gambar di halaman
        };
        reader.readAsDataURL(file);
    }
});

// Perbarui foto profil saat halaman dimuat
function updateProfilePicture() {
    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) {
        document.querySelector(".profile-picture").src = storedPic;
    }
}

// Tambahkan panggilan ke updateProfilePicture() di DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    updateProfile();
    updateProfilePicture();
});

        document.addEventListener("DOMContentLoaded", () => {
    // Ambil elemen-elemen yang diperlukan
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const reviewButtons = document.querySelectorAll(".review-btn");
    const bookList = document.querySelector(".book-list");
    const reviewSection = document.getElementById("reviewSection");
    const backToBooks = document.querySelector(".back-btn");
    const reviewCards = document.querySelectorAll(".review-card");

    // Fungsi untuk login
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validasi login
        if (username && password) {
            loginModal.style.display = "none"; // Sembunyikan modal login
        } else {
            alert("Silakan isi username dan password!"); // Tampilkan pesan peringatan
        }
    });

    // Fungsi untuk menampilkan review buku
    reviewButtons.forEach(button => {
        button.addEventListener("click", () => {
            const bookId = button.getAttribute("data-book");
            let hasReviews = false;

            // Periksa review yang sesuai dengan bookId
            reviewCards.forEach(card => {
                if (card.getAttribute("data-book") === bookId) {
                    card.style.display = "block"; // Tampilkan review yang cocok
                    hasReviews = true;
                } else {
                    card.style.display = "none"; // Sembunyikan review lainnya
                }
            });

            if (hasReviews) {
                bookList.style.display = "none"; // Sembunyikan daftar buku
                reviewSection.classList.remove("hidden"); // Tampilkan bagian review
            } else {
                alert("Tidak ada review untuk buku ini."); // Pesan jika tidak ada review
            }
        });
    });


    loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        loginModal.style.display = "none"; // Sembunyikan modal login
        localStorage.setItem("username", username); // Simpan nama pengguna di localStorage
        updateProfile(); // Perbarui profil
    } else {
        alert("Silakan isi username dan password!");
    }
});

// Fungsi untuk memperbarui nama di profil
function updateProfile() {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        document.getElementById("name").textContent = storedUsername;
    }
}

// Perbarui profil saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    updateProfile();
});


    // Fungsi untuk kembali ke daftar buku
    backToBooks.addEventListener("click", () => {
        reviewSection.classList.add("hidden"); // Sembunyikan bagian review
        bookList.style.display = "flex"; // Tampilkan daftar buku
    });
});

// seacrh
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const bookCards = document.querySelectorAll(".book-card");
    const reviewCards = document.querySelectorAll(".review-card");

    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();

        // Filter buku berdasarkan judul
        bookCards.forEach(card => {
            const bookTitle = card.querySelector("p").textContent.toLowerCase();
            if (bookTitle.includes(searchText)) {
                card.style.display = "block"; // Tampilkan buku yang cocok
            } else {
                card.style.display = "none"; // Sembunyikan buku yang tidak cocok
            }
        });
        // Filter review berdasarkan konten
        reviewCards.forEach(card => {
            const reviewContent = card.querySelector("p").textContent.toLowerCase();
            if (reviewContent.includes(searchText)) {
                card.style.display = "block"; // Tampilkan review yang cocok
            } else {
                card.style.display = "none"; // Sembunyikan review yang tidak cocok
            }
        });
    });
});
// Fungsi untuk memperbarui nama di profil
function updateProfile() {
    const storedUsername = localStorage.getItem("username");
    const storedDescription = localStorage.getItem("description") || "Deskripsi Anda belum diatur.";
    if (storedUsername) {
        document.getElementById("name").textContent = storedUsername;
    }
    document.getElementById("description").textContent = storedDescription;
}
// Fungsi untuk mengedit deskripsi
document.getElementById("editDescBtn").addEventListener("click", () => {
    const currentDesc = document.getElementById("description").textContent;
    const newDesc = prompt("Edit Deskripsi Anda:", currentDesc);
    if (newDesc !== null) {
        localStorage.setItem("description", newDesc);
        document.getElementById("description").textContent = newDesc;
    }
});
// Perbarui profil saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    updateProfile();
});