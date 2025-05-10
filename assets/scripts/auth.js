document.addEventListener('DOMContentLoaded', () => {
    const modalWindow = document.getElementById('modal-window');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const menuRightNoAuth = document.getElementById('modal-open');
    const menuRight = document.querySelector('.menu__right');
    const modalProfile = document.getElementById('modal-profile');

    // Проверка сохраненной сессии в localStorage при загрузке страницы
    checkAuthStatus();

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;

            fetch('/cgi-bin/login.pl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        const user = { login: data.login, role: data.role };
                        localStorage.setItem('user', JSON.stringify(user));
                        modalWindow.style.display = 'none';
                        document.getElementById('auth-form').reset();
                        updateUIAfterLogin(data.login, data.role);
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Ошибка сервера: ' + error.message);
                });
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;

            fetch('/cgi-bin/register.pl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`
            })
                .then(response => {
                    console.log('HTTP Status:', response.status);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Server Response:', data);
                    alert(data.message);
                    if (data.success) {
                        // Сохраняем пользователя с ролью USER
                        const user = { login: login, role: 'USER' };
                        localStorage.setItem('user', JSON.stringify(user));
                        console.log('Сохранен пользователь:', user);
                        // Принудительная перезагрузка
                        window.location.reload(true);
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Ошибка сервера: ' + error.message);
                });
        });
    }

    function checkAuthStatus() {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            updateUIAfterLogin(savedUser.login, savedUser.role);
        } else {
            fetch('/cgi-bin/login.pl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=check_auth'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const user = { login: data.login, role: data.role };
                        localStorage.setItem('user', JSON.stringify(user));
                        updateUIAfterLogin(data.login, data.role);
                    } else {
                        menuRightNoAuth.style.display = 'flex';
                    }
                })
                .catch(error => {
                    console.error('Ошибка проверки авторизации:', error);
                    menuRightNoAuth.style.display = 'flex';
                });
        }
    }

    function updateUIAfterLogin(login, role) {
        menuRightNoAuth.style.display = 'none';
        const yesAuthDiv = document.createElement('div');
        yesAuthDiv.className = 'menu__right-yes_auth';
        const displayName = login ? login : 'Пользователь';
        const displayRole = role === 'ADMIN' ? 'Администратор' : 'Пользователь';
        yesAuthDiv.innerHTML = `
            <div class="menu__right-profile_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="44" viewBox="0 0 33 44" fill="none">
                    <!-- SVG иконка (оставляем без изменений) -->
                    <path d="M28.59 21.0799H5.21C3.92 21.0799 2.87 20.0299 2.87 18.7399V18.1899C2.87 16.8999 3.92 15.8499 5.21 15.8499H28.59C29.88 15.8499 30.93 16.8999 30.93 18.1899V18.7399C30.93 20.0299 29.88 21.0799 28.59 21.0799Z" fill="#F9B17B"/>
                    <path d="M19.98 28.5399H14.04V33.9299H19.98V28.5399Z" fill="#F9AE7B"/>
                    <g opacity="0.5">
                        <path d="M17.57 23.9899C17.47 23.9599 17.37 23.9299 17.27 23.9099C16.62 23.8899 15.97 23.9099 15.32 23.9599C14.89 24.0399 14.46 24.1299 14.04 24.2199V30.7999C14.92 31.0599 15.64 31.1599 16.04 31.2099C16.42 31.2599 16.85 31.2899 17.34 31.2699C17.76 31.2599 18.15 31.2199 18.48 31.1599C18.78 31.1199 19.33 31.0299 20.01 30.8199C20.01 30.7799 20.01 30.7399 20.01 30.6999V24.3599C19.17 24.3299 18.34 24.2199 17.57 23.9899Z" fill="#F69164"/>
                    </g>
                    <path d="M18.44 29.6999C18.1 29.7499 17.7 29.7999 17.27 29.8099C16.77 29.8199 16.33 29.7899 15.94 29.7499C14.9 29.6399 11.72 29.1599 9.21999 26.5799C8.73999 26.0899 7.48 24.7599 6.81 22.5999C6.53 21.6899 6.37 20.7199 6.37 19.7099V12.2399C6.37 6.87991 10.72 2.52991 16.08 2.52991H17.7C23.06 2.52991 27.41 6.87991 27.41 12.2399V19.7099C27.39 20.5099 27.2 23.7999 24.57 26.5799C22.19 29.0899 19.3 29.5899 18.44 29.6999Z" fill="#F9B17B"/>
                    <path d="M17.5299 22.9199C17.5099 22.9199 17.4999 22.9199 17.4799 22.9199C15.7899 22.5699 15.0199 22.1799 14.9999 21.6599C14.9799 21.3099 15.2899 21.1099 15.6199 20.8899C15.9099 20.6999 16.2599 20.4699 16.5199 20.0899C16.9199 19.4699 16.9699 18.6099 16.6599 17.5099C16.6199 17.3799 16.6999 17.2499 16.8199 17.2199C16.9499 17.1899 17.0799 17.2599 17.1099 17.3799C17.4599 18.6099 17.3899 19.6099 16.9099 20.3499C16.5999 20.8099 16.1899 21.0899 15.8799 21.2899C15.6999 21.4099 15.4699 21.5599 15.4799 21.6399C15.4799 21.6599 15.5199 22.0399 17.5899 22.4599C17.7199 22.4899 17.7999 22.6099 17.7699 22.7399C17.7399 22.8399 17.6399 22.9199 17.5299 22.9199Z" fill="#8A5D3B"/>
                    <path d="M22.6399 20.22C23.2364 20.22 23.7199 19.4633 23.7199 18.53C23.7199 17.5966 23.2364 16.84 22.6399 16.84C22.0435 16.84 21.5599 17.5966 21.5599 18.53C21.5599 19.4633 22.0435 20.22 22.6399 20.22Z" fill="#321B0F"/>
                    <path d="M11.7699 20.22C12.3664 20.22 12.8499 19.4633 12.8499 18.53C12.8499 17.5966 12.3664 16.84 11.7699 16.84C11.1735 16.84 10.6899 17.5966 10.6899 18.53C10.6899 19.4633 11.1735 20.22 11.7699 20.22Z" fill="#321B0F"/>
                    <path d="M23.17 24.51C20.6 24.51 18.52 22.42 18.52 19.86C18.52 17.3 20.61 15.21 23.17 15.21C25.74 15.21 27.82 17.3 27.82 19.86C27.82 22.42 25.73 24.51 23.17 24.51ZM23.17 15.68C20.86 15.68 18.99 17.56 18.99 19.86C18.99 22.16 20.87 24.04 23.17 24.04C25.48 24.04 27.35 22.16 27.35 19.86C27.35 17.56 25.47 15.68 23.17 15.68Z" fill="#A87C4F"/>
                    <path d="M10.87 24.51C8.29997 24.51 6.21997 22.42 6.21997 19.86C6.21997 17.3 8.30997 15.21 10.87 15.21C13.43 15.21 15.52 17.3 15.52 19.86C15.52 22.42 13.43 24.51 10.87 24.51ZM10.87 15.68C8.55997 15.68 6.68997 17.56 6.68997 19.86C6.68997 22.16 8.56997 24.04 10.87 24.04C13.18 24.04 15.05 22.16 15.05 19.86C15.05 17.56 13.17 15.68 10.87 15.68Z" fill="#A87C4F"/>
                   ۔

                    <path d="M18.79 18.88H15.24V19.35H18.79V18.88Z" fill="#A87C4F"/>
                    <path d="M17.5299 25.4399C16.7799 25.4399 16.2299 25.0999 16.0199 24.9399C15.9099 24.8599 15.8899 24.7099 15.9699 24.6099C16.0499 24.4999 16.1899 24.4799 16.2999 24.5599C16.4999 24.7099 17.0399 25.0399 17.7799 24.9499C18.4999 24.8599 18.9399 24.4299 19.0999 24.2499C19.1899 24.1499 19.3399 24.1399 19.4299 24.2299C19.5299 24.3199 19.5399 24.4699 19.4499 24.5599C19.2599 24.7799 18.7099 25.3099 17.8299 25.4199C17.7199 25.4299 17.6199 25.4399 17.5299 25.4399Z" fill="#8A5D3B"/>
                    <path d="M24.08 14.0899C23.97 14.0899 23.87 14.0499 23.78 13.9799C22.89 13.2399 21.6 13.2399 20.71 13.9799C20.51 14.1499 20.21 14.1199 20.04 13.9199C19.87 13.7199 19.9 13.4199 20.1 13.2499C21.34 12.2199 23.14 12.2199 24.38 13.2499C24.58 13.4199 24.61 13.7099 24.44 13.9199C24.35 14.0299 24.21 14.0899 24.08 14.0899Z" fill="#603813"/>
                    <path d="M12.8599 14.0899C12.7499 14.0899 12.6499 14.0499 12.5599 13.9799C11.6699 13.2399 10.3799 13.2399 9.4899 13.9799C9.2899 14.1499 8.9899 14.1199 8.8199 13.9199C8.6499 13.7199 8.6799 13.4199 8.8799 13.2499C10.1199 12.2199 11.9199 12.2199 13.1599 13.2499C13.3599 13.4199 13.3899 13.7099 13.2199 13.9199C13.1299 14.0299 12.9899 14.0899 12.8599 14.0899Z" fill="#603813"/>
                    <path d="M28.34 12.22C28.31 11.19 28.26 9.68996 27.79 8.38996C26.38 4.48996 21.27 2.58995 19.18 2.38995C18.5 1.98995 17.74 1.63995 16.93 1.34995C12.85 -0.0900451 8.85998 0.689955 8.01998 3.07996C7.73998 3.86996 7.83997 4.73996 8.24997 5.59996C5.02997 7.34996 3.08997 9.64995 3.69997 11.28C3.95997 11.98 4.64997 12.46 5.62997 12.72C5.62997 13.64 5.60997 14.41 5.57997 15.09C5.54997 15.78 5.49997 16.79 6.14997 17.48C6.22997 17.56 6.29997 17.62 6.33997 17.66C6.43997 17.74 6.72998 17.94 7.13998 17.94C7.59998 17.93 7.97997 17.65 8.15997 17.36C8.49997 16.8 8.11997 16.14 7.89997 15.31C7.74997 14.75 7.63997 13.97 7.75997 12.96C9.43997 12.95 11.47 12.56 13.56 11.78C14.5 11.43 15.37 11.03 16.17 10.59C16.59 10.66 17.01 10.7 17.41 10.72C18.08 12.01 19.2 12.86 20.47 12.86C22.31 12.86 23.83 11.08 24.14 8.73995C24.41 8.96995 24.95 9.43995 25.38 10.24C25.73 10.89 25.93 11.64 25.96 13.55C25.98 14.58 25.95 15.94 25.77 17.55C25.83 17.61 26.16 17.98 26.71 18C27.26 18.03 27.62 17.7 27.68 17.64C28.04 16.4 28.42 14.52 28.34 12.22Z" fill="#603813"/>
                    <path d="M28.5 35.99C26.26 35.03 22.55 33.76 17.8 33.59C13.11 33.42 9.35996 34.38 7.05996 35.17C6.31996 35.39 4.84996 35.95 3.47996 37.31C2.95996 37.83 1.91996 39 1.34996 40.82C1.09996 41.63 0.959961 42.48 0.959961 43.37H33.01C33 42.54 32.84 39.48 30.5 37.31C29.83 36.68 29.12 36.27 28.5 35.99Z" fill="#404041"/>
                    <path d="M21.0099 33.88C21.1199 33.78 21.1899 33.63 21.1899 33.47V32.95C21.1899 32.64 20.9399 32.38 20.6199 32.38H13.4399C13.1299 32.38 12.8699 32.63 12.8699 32.95V33.47C12.8699 33.57 12.8999 33.67 12.9499 33.75C12.5199 33.81 12.0599 33.88 11.5899 33.97C11.0899 34.06 10.6199 34.17 10.1799 34.28C10.3499 34.54 12.7199 38.04 17.1099 38.04C21.3499 38.03 23.7099 34.74 23.9099 34.45C23.0499 34.24 22.0799 34.04 21.0099 33.88Z" fill="#929497"/>
                </svg>
            </div>
            <span style="color: #DBDBDB; font-family: Montserrat-Medium, sans-serif;">${displayName} (${displayRole})</span>
            <div class="menu__right-profile_arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="8" viewBox="0 0 17 8" fill="none">
                    <path d="M15.5016 0.999942L9.53251 6.31959C8.82757 6.94783 7.67404 6.94783 6.9691 6.31959L1 0.999942" stroke="#DBDBDB" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        `;
        menuRight.appendChild(yesAuthDiv);

        const profileTitle = modalProfile.querySelector('.modal-profile__title_user p');
        if (profileTitle) {
            profileTitle.textContent = displayName;
        }
        const adminMenu = modalProfile.querySelector('.modal-profile__el-1');
        if (adminMenu) {
            adminMenu.style.display = role === 'ADMIN' ? 'flex' : 'none';
        }

        const arrow = document.querySelector('.menu__right-profile_arrow');
        yesAuthDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            modalProfile.classList.toggle('active');
            yesAuthDiv.classList.toggle('active');
            arrow.classList.toggle('transform-real');
        });

        document.addEventListener('click', (e) => {
            if (!modalProfile.contains(e.target) && !yesAuthDiv.contains(e.target)) {
                modalProfile.classList.remove('active');
                yesAuthDiv.classList.remove('active');
                arrow.classList.remove('transform-real');
            }
        });

        const exitBtn = document.querySelector('.modal-profile__el-exit');
        if (exitBtn) {
            exitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                fetch('/cgi-bin/login.pl', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'action=logout'
                })
                    .then(response => response.json())
                    .then(data => {
                        modalProfile.classList.remove('active');
                        yesAuthDiv.classList.remove('active');
                        window.location.reload(true);
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                        alert('Ошибка при выходе!');
                    });
            });
        }
    }
});