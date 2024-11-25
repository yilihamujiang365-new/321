document.addEventListener("DOMContentLoaded", function() {
    const defaultLanguage = 'zh'; // 默认语言设为中文
    loadTranslations(defaultLanguage);
    loadContent(defaultLanguage);

    document.getElementById('language').addEventListener('change', function() {
        const selectedLanguage = this.value;
        loadTranslations(selectedLanguage);
        loadContent(selectedLanguage);
    });
});

function loadTranslations(language) {
    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            document.title = data[language].title;
            document.getElementById('main-title').textContent = data[language].mainTitle;
            document.getElementById('languageLabel').textContent = data[language].languageLabel;
            document.getElementById('heading1').textContent = data[language].heading1;
            document.getElementById('student-info-heading').textContent = data[language].studentInfoHeading;
            document.getElementById('news-heading').textContent = data[language].newsHeading;
            document.getElementById('contact-heading').textContent = data[language].contactHeading;
            document.getElementById('links-heading').textContent = data[language].linksHeading;
            document.querySelector('#contact p').innerHTML = `${data[language].developerEmail} <a href="mailto:developer@example.com">developer@example.com</a>`;
        })
        .catch(error => {
            console.error('Error fetching translations:', error);
        });
}

function loadContent(language) {
    // 清空现有内容
    document.getElementById('student-info').innerHTML = '';
    document.getElementById('news').innerHTML = '';

    // 加载学生信息
    fetch('student_information.json')
        .then(response => response.json())
        .then(data => {
            const studentInfo = document.getElementById('student-info');
            studentInfo.innerHTML = ''; // 确保清空现有内容
            data[language].forEach(student => {
                const studentItem = document.createElement('div');
                studentItem.className = 'student-card';
                studentItem.innerHTML = `
                    <h3>${student.name}</h3>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Phone:</strong> ${student.phone}</p>
                    <p><strong>Address:</strong> ${student.address}</p>
                    <p><strong>Gender:</strong> ${student.gender}</p>
                    <p><strong>Date of Birth:</strong> ${student.dob}</p>
                    <p><strong>Nationality:</strong> ${student.nationality}</p>
                `;
                studentInfo.appendChild(studentItem);
            });
        })
        .catch(error => {
            console.error('Error fetching student information:', error);
        });

    // 加载新闻
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            const newsDiv = document.getElementById('news');
            newsDiv.innerHTML = ''; // 确保清空现有内容
            data[language].forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-card';
                newsItem.innerHTML = `                    
                    <h3>${news.title}</h3>
                    <p class="news-date">${news.date}</p>
                    <p>${news.content}</p>
                `;
                newsDiv.appendChild(newsItem);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

function changeLanguage() {
    const selectedLanguage = document.getElementById('language').value;
    loadTranslations(selectedLanguage);
    loadContent(selectedLanguage);
}
