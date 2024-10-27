const questions = [
    { question: "Kızınca tüküren hayvan hangisidir?", answers: ["Lama", "Panda"], correct: 1 },
    { question: "İstanbul hangi coğrafi bölgemizde yer almaktadır?", answers: ["Ege Bölgesi", "Marmara Bölgesi"], correct: 1 },
    { question: "Türk tarihinin en ünlü mimarı kimdir?", answers: ["Mimar Sinan", "Mimar Kemalettin"], correct: 1 },
    { question: "Aşağıdaki dağlardan hangisi volkanik bir dağdır?", answers: ["Toroslar", "Erciyes"], correct: 1 },
    { question: "İstiklal Şairi olarak anılan şair aşağıdakilerden hangisidir?", answers: ["Mehmet Akif Ersoy", "Yahya Kemal Beyatlı"], correct: 1 },
    { question: "Hangisi sürüngen hayvan değildir?", answers: ["Bukalemun", "Kaplumbağa"], correct: 1 },
    { question: "Duvara asılı bir haritanın sağı her zaman hangi yönü gösterir ?", answers: ["Kuzey", "Doğu"], correct: 1 },
    { question: "Çinlilerin Hun, Tunguz ve Moğol akımlarını durdurmak için inşa ettiği yapı hangisidir?", answers: ["Çin Seddi", "Çin Kalesi"], correct: 1 },
    { question: "Türkçe hangi dil grubuna girmektedir?", answers: ["Batı-Cermen", "Ural-Altay"], correct: 0 },
    { question: "Gezilerini ‘Seyahatname’ adlı eserde toplayan Türk gezgin kimdir?", answers: ["Evliya Çelebi", "Katip Çelebi"], correct: 0 }
];

let currentQuestionIndex = 0;

document.getElementById('startButton').addEventListener('click', startQuiz);

function startQuiz() {
    // Tam ekran moduna geçiş
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari ve Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }

    currentQuestionIndex = 0; // Soruların sıfırlanması
    document.getElementById('welcomeMessage').style.display = 'none'; // Karşılama mesajını gizle
    document.getElementById('welcomeTitle').style.display = 'none'; // Hoş geldin başlığını gizle
    document.getElementById('startButton').style.display = 'none'; // Başla butonunu gizle
    document.getElementById('quiz').style.display = 'block'; // Quiz alanını göster
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.innerText = currentQuestion.answers[index];
        option.classList.remove('correct', 'incorrect');
        option.disabled = false; // Seçenekleri tekrar etkinleştir
        option.style.backgroundColor = '#fff'; // Seçeneklerin arka plan rengi
    });
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', selectOption);
});

function selectOption(e) {
    const selectedOption = e.target;

    // Seçenekleri devre dışı bırak
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.disabled = true); // Tüm seçenekleri devre dışı bırak

    // Seçilen cevabı açık yeşil yap
    selectedOption.classList.add('correct');

    // Sonraki soruya geçiş
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 500); // 0.5 saniye bekle ve sonraki soruya geç
    } else {
        // 1 saniye beklemeden sonra kontrol mesajını göster
        setTimeout(showCheckingMessage, 500); // 1 saniye bekleme süresi
    }
}

function showCheckingMessage() {
    document.getElementById('quiz').style.display = 'none'; // Quiz alanını gizle

    const checkingMessage = document.createElement('div');
    checkingMessage.innerText = "Cevapların kontrol ediliyor lütfen birkaç saniye bekle!";
    checkingMessage.className = 'checking-message';
    document.body.appendChild(checkingMessage);

    // 2.5 saniye bekledikten sonra cevap anahtarını göster
    setTimeout(() => {
        checkingMessage.remove(); // Mesajı kaldır
        showAnswerKey();
    }, 2500);
}

function showAnswerKey() {
    const answerKeyContainer = document.createElement('div');
    answerKeyContainer.className = 'answer-key';
    
    // 1'den 10'a kadar olan cevap anahtarı
    for (let i = 1; i <= 10; i++) {
        const answerItem = document.createElement('div');
        answerItem.className = 'answer-item';
        answerItem.innerHTML = `Soru ${i}: <span class="incorrect">X</span>`;
        answerKeyContainer.appendChild(answerItem);
    }

    document.body.appendChild(answerKeyContainer);

    // 2.5 saniye bekledikten sonra final mesajını göster
    setTimeout(() => {
        answerKeyContainer.remove(); // Cevap anahtarını kaldır
        showFinalMessage();
    }, 2500);
}

function showFinalMessage() {
    const finalMessage = document.createElement('div');
    finalMessage.innerText = "Bütün cevapların yanlış. \n\n Burada doğru veya yanlışı gerçek dünyanın aksine, geçmişten gelenler ya da çoğunluk olduğu için kabul görülenler değil, soruyu hazırlayan kişi belirliyor. \n \n Genel geçerliliği olan şeyler dışında görünmeyen şeyler de vardır ve benim için şimdiye kadar sorulmuş ve bundan sonra sorulacak olan bütün soruların tek doğru cevabı yalnızca 'sen'.";
    finalMessage.className = 'final-message';
    
    // Geçici bir animasyon ile ekle
    finalMessage.style.opacity = 0; // Başlangıçta görünmez yap
    document.body.appendChild(finalMessage);

    // Yavaşça görünür hale getirme
    setTimeout(() => {
        finalMessage.style.transition = "opacity 0.5s"; // Geçiş süresi
        finalMessage.style.opacity = 1; // Görünür hale getir
    }, 50); // Küçük bir gecikme ekleyin
}
