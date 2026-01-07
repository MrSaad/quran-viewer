// Verse counts per surah (1-114)
const verseCounts = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109,
    123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
    112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
    34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
    54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
    60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44,
    28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
    29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3,
    5, 4, 5, 6
];

const surahNames = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
    "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
    "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
    "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
    "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
    "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
    "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
    "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
    "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
    "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
    "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
    "المسد", "الإخلاص", "الفلق", "الناس"
];

const surahNamesEnglish = [
    "Al-Fatihah", "Al-Baqarah", "Al-Imran", "An-Nisa'", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
    "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra'", "Al-Kahf", "Maryam", "Ta-Ha",
    "Al-Anbiya'", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara'", "An-Naml", "Al-Qasas", "Al-'Ankabut", "Ar-Rum",
    "Luqman", "As-Sajdah", "Al-Ahzab", "Saba'", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
    "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf",
    "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", "Al-Mujadilah", "Al-Hashr", "Al-Mumtahanah",
    "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij",
    "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba'", "An-Nazi'at", "'Abasa",
    "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad",
    "Ash-Shams", "Al-Layl", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat",
    "Al-Qari'ah", "At-Takathur", "Al-'Asr", "Al-Humazah", "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr",
    "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

let currentSurah = 1;
let quranData = [];
let isScrolling = false;
let scrollTimeout = null;

// Initialize surah drawer
function initSurahDrawer() {
    const container = $('#surah-list');
    for (let i = 1; i <= 114; i++) {
        container.append(`
            <button
                id="surah-btn-${i}"
                class="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 hover:bg-slate-50 group relative"
                data-surah="${i}"
            >
                <span class="text-[10px] sm:text-xs text-slate-400 min-w-[18px] sm:min-w-[20px] text-center sm:text-left">${i}</span>
                <span class="hidden sm:block text-sm text-slate-600 group-hover:text-gold-600 transition-colors font-medium text-left truncate flex-1">${surahNamesEnglish[i-1]}</span>
                <div class="absolute left-0 w-1 h-0 bg-gold-500 rounded-full transition-all duration-300 group-[.active]:h-6"></div>
            </button>
        `);
    }
}

// Update verse drawer for current surah
function updateVerseDrawer(surahNum) {
    const container = $('#verse-list');
    container.empty();
    const count = verseCounts[surahNum - 1];
    for (let i = 1; i <= count; i++) {
        container.append(`
            <button
                id="verse-btn-${surahNum}-${i}"
                class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[10px] sm:text-xs rounded-lg transition-all duration-200 hover:bg-white hover:shadow-sm text-slate-500 hover:text-gold-600 relative group"
                data-surah="${surahNum}"
                data-verse="${i}"
            >
                ${i}
                <div class="absolute left-0 w-1 h-0 bg-gold-400 rounded-full transition-all duration-200 group-[.active]:h-4"></div>
            </button>
        `);
    }
}

// Highlight current surah in drawer
function highlightSurah(surahNum) {
    $('.surah-drawer button').removeClass('active bg-gold-50 shadow-sm').find('span:last-child').removeClass('text-gold-700');
    const $btn = $(`#surah-btn-${surahNum}`);
    $btn.addClass('active bg-gold-50 shadow-sm');
    $btn.find('span:last-child').addClass('text-gold-700');

    // Scroll surah into view in drawer
    const btn = document.getElementById(`surah-btn-${surahNum}`);
    if (btn) {
        btn.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
}

// Highlight current verse in drawer
function highlightVerse(surahNum, verseNum) {
    $('.verse-drawer button').removeClass('active bg-white shadow-sm text-gold-600');
    const $btn = $(`#verse-btn-${surahNum}-${verseNum}`);
    $btn.addClass('active bg-white shadow-sm text-gold-600');

    $('.verse-item').removeClass('active-verse');
    $(`#verse-${surahNum}-${verseNum}`).addClass('active-verse');

    // Scroll verse into view in drawer
    const btn = document.getElementById(`verse-btn-${surahNum}-${verseNum}`);
    if (btn) {
        btn.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
}

// Parse and render Quran data
function renderQuran(text) {
    const lines = text.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    const container = $('#quran-content');
    let currentSurahInRender = 0;

    lines.forEach((line, index) => {
        const parts = line.split('|');
        if (parts.length >= 3) {
            const surah = parseInt(parts[0]);
            const verse = parseInt(parts[1]);
            const text = parts.slice(2).join('|');

            quranData.push({ surah, verse, text });

            // Add surah header
            if (surah !== currentSurahInRender) {
                currentSurahInRender = surah;
                container.append(`
                    <div id="surah-${surah}" class="surah-header pt-12 sm:pt-16 pb-8 sm:pb-10 first:pt-4 text-center">
                        <h2 class="text-2xl sm:text-4xl font-bold text-slate-800 mb-2 font-['Noto_Sans_Arabic']">${surahNames[surah-1]}</h2>
                        <div class="text-slate-400 text-sm sm:text-lg">${surahNamesEnglish[surah-1]}</div>
                    </div>
                `);
            }

            // Add verse
            container.append(`
                <div
                    id="verse-${surah}-${verse}"
                    class="verse-item group flex gap-2 sm:gap-8 py-3 sm:py-6 px-1 sm:px-6 rounded-2xl"
                    data-surah="${surah}"
                    data-verse="${verse}"
                >
                    <div class="flex-shrink-0 pt-1">
                        <div class="w-10 sm:w-14 h-8 sm:h-10 flex items-center justify-center text-slate-300 group-hover:text-gold-500 transition-colors font-sans text-[9px] sm:text-xs font-bold">
                            ${surah}:${verse}
                        </div>
                    </div>
                    <div class="flex-grow">
                        <p class="quran-text text-lg sm:text-3xl text-slate-800 leading-[2.0] sm:leading-[2.5] text-right" dir="rtl">${text}</p>
                    </div>
                </div>
            `);
        }
    });
}

// Setup Intersection Observer for scroll tracking
function setupScrollTracking() {
    const options = {
        root: document.getElementById('main-content'),
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        if (isScrolling) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const surah = parseInt(entry.target.dataset.surah);
                const verse = parseInt(entry.target.dataset.verse);

                if (surah !== currentSurah) {
                    currentSurah = surah;
                    updateVerseDrawer(surah);
                    highlightSurah(surah);
                }
                highlightVerse(surah, verse);
            }
        });
    }, options);

    $('.verse-item').each(function() {
        observer.observe(this);
    });
}

// Scroll to specific verse
function scrollToVerse(surah, verse) {
    isScrolling = true;

    const element = document.getElementById(`verse-${surah}-${verse}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Update drawers immediately
        if (surah !== currentSurah) {
            currentSurah = surah;
            updateVerseDrawer(surah);
            highlightSurah(surah);
        }
        highlightVerse(surah, verse);
    }

    // Reset scrolling flag after animation
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

// Scroll to surah start
function scrollToSurah(surah) {
    scrollToVerse(surah, 1);
}

// Event handlers
$(document).on('click', '.surah-drawer button', function() {
    const surah = parseInt($(this).data('surah'));
    scrollToSurah(surah);
});

$(document).on('click', '.verse-drawer button', function() {
    const surah = parseInt($(this).data('surah'));
    const verse = parseInt($(this).data('verse'));
    scrollToVerse(surah, verse);
});

// Search functionality
function setupSearch() {
    const overlay = $('#search-overlay');
    const input = $('#search-input');

    const openSearch = () => {
        overlay.removeClass('hidden').addClass('active flex');
        input.val('').focus();
    };

    const closeSearch = () => {
        overlay.addClass('hidden').removeClass('active flex');
        input.val('');
    };

    $('#mobile-search-trigger').on('click', openSearch);

    const performSearch = () => {
        const query = input.val().trim();
        const parts = query.split(':');
        
        if (parts.length === 2) {
            const surah = parseInt(parts[0]);
            const verse = parseInt(parts[1]);

            if (!isNaN(surah) && !isNaN(verse) && surah >= 1 && surah <= 114) {
                const maxVerse = verseCounts[surah - 1];
                if (verse >= 1 && verse <= maxVerse) {
                    scrollToVerse(surah, verse);
                    closeSearch();
                    return;
                }
            }
        }
        
        // Visual feedback for invalid input
        input.addClass('ring-2 ring-red-400');
        setTimeout(() => input.removeClass('ring-2 ring-red-400'), 500);
    };

    $(document).on('keydown', function(e) {
        // Only open if not already open and not typing in another input
        if (e.key.toLowerCase() === 'f' && !overlay.hasClass('active') && !$(e.target).is('input, textarea')) {
            e.preventDefault();
            openSearch();
        }
        
        if (overlay.hasClass('active')) {
            if (e.key === 'Escape') {
                closeSearch();
            } else if (e.key === 'Enter') {
                performSearch();
            }
        }
    });

    overlay.on('click', function(e) {
        if (e.target === this) {
            closeSearch();
        }
    });
}

// Load and initialize
$(document).ready(function() {
    initSurahDrawer();
    updateVerseDrawer(1);
    highlightSurah(1);
    setupSearch();

    // Load Quran text
    fetch('/public/quran-uthmani.txt')
        .then(response => response.text())
        .then(text => {
            renderQuran(text);
            setupScrollTracking();
            highlightVerse(1, 1);
        })
        .catch(error => {
            console.error('Error loading Quran text:', error);
            $('#quran-content').html('<p class="text-red-500 text-center py-8">Error loading Quran text. Please ensure quran-uthmani.txt is in the same directory.</p>');
        });
});
