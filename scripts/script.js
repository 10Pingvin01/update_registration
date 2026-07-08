window.onload = function () {
    let fullName = $('#FullName');
    let username = $('#Username');
    let email = $('#Email');
    let password = $('#Password');
    let repeat = $('#RepeatPassword');
    let checkbox = $('#checkbox');
    let form = $("#registration-form");
    let button = $('#btn')[0];
    let account = $('#account')[0];
    let error = $('.error');
    let popup = $('.popup');
    let popbtn = $('#popbtn')[0];
    let Welcome = $('#text');
    let clients = localStorage.getItem('clients');
    let clientsArray = [];
    let user = {};

    button.addEventListener('click', registration);
    function registration() {
        let hasError = false;
        let clientsArray = JSON.parse(localStorage.getItem('clients')) || [];
        let currentEmail = email.val().trim().toLowerCase();
        let emailExists = clientsArray.some(client => client.Email === currentEmail);
        if (!fullName.val()) {
            fullName.addClass('error__text');
            fullName.next().show();
            hasError = true;
        } else if (!fullName.val().match(/^([A-Za-zА-Яа-яёЁ\s]+)$/)) {
            fullName.addClass('error__text');
            fullName.next().text("Имя не должно содержать цифры!").show();
            hasError = true;
        } else {
            fullName.removeClass('error__text');
            fullName.next().hide();
        }
        if (!username.val()) {
            username.addClass('error__text');
            username.next().show();
            hasError = true;
        } else if (!username.val().match(/^[A-Za-z0-9\-\w]+$/)) {
            username.addClass('error__text');
            username.next().text("Логин содержит только латинские буквы, цифры и тире!").show();
            hasError = true;
        } else {
            username.removeClass('error__text');
            username.next().hide();
        }
        if (!email.val()) {
            email.addClass('error__text');
            email.next().show();
            hasError = true;
        } else if (!email.val().match((/^[^\s@]+@[^\s@]+\.[^\s@]+$/))) {
            email.addClass('error__text');
            email.next().text("Введите существующий email!").show();
            hasError = true;
        }
        else if (emailExists) {
            email.next().text('Пользователь с такой почтой уже зарегистрирован').show();
            hasError = true;
        }
        else {
            email.removeClass('error__text');
            email.next().hide();
        }
        if (!password.val()) {
            password.addClass('error__text');
            password.next().show();
            hasError = true;
        } else if (!password.val().match(/^(?=.*[A-Z])(?=.*\d)(?=.*[+*/!?@#$%^&()_={};:,.<>|]).{8,}$/)) {
            password.addClass('error__text');
            password.next().text("Пароль состоит из 8 символов и включает заглавную букву, цифру и спецсимвол").show();
            hasError = true;
        } else {
            password.removeClass('error__text');
            password.next().hide();
        }
        if (!repeat.val()) {
            repeat.addClass('error__text');
            repeat.next().show();
            hasError = true;
        } else if (password.val() !== repeat.val()) {
            repeat.addClass('error__text');
            repeat.next().text("Пароли не совпадают").show();
            hasError = true;
        }
        else {
            repeat.removeClass('error__text');
            repeat.next().hide();
        }
        if (!checkbox.prop('checked')) {
            popup.show()
            popup.css('display', 'flex');
            $('.popup__content').text('Согласитесь с правилами');
            hasError = true;
            popbtn.addEventListener("click", function (e) {
                e.preventDefault();
                popup.hide();
            })
        }
        popbtn.removeEventListener("click",  popup.hide);
        if (!hasError) {
            popup.show();
            $('.popup__content').text('На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию');
            if (clients) {
                clientsArray = JSON.parse(clients);
            }
            user.Fullname = fullName.val();
            user.Username = username.val();
            user.Email = email.val();
            user.Password = password.val();
            clientsArray.push(user);
            localStorage.setItem('clients', JSON.stringify(clientsArray));
            popbtn.addEventListener("click", function (e) {
                e.preventDefault();
                form.trigger('reset');
                LogInAccount();
            })
        }
    }
    const onAccountClick = (e) => {
        e.preventDefault();
        LogInAccount();
    };
    account.addEventListener("click", onAccountClick);

    function LogInAccount() {
        account.removeEventListener("click", onAccountClick)
        popup.hide();
        error.hide();
        password.removeClass('error__text');
        username.removeClass('error__text');
        $('#full').remove();
        $('#mail').remove();
        $('#pass').remove();
        $('#check').remove();
        account.innerText = 'Registration';
        Welcome.text("Log in to the system");
        button.value = "Sign In";
        button.removeEventListener("click", registration);
        button.addEventListener('click', login);
        function login() {
            if (!username.val()) {
                username.next().show();
                username.addClass('error__text');
                return;
            } else {
                username.removeClass('error__text');
                username.next().hide();
            }
            if (!password.val()) {
                password.next().show();
                password.addClass('error__text');
                return;
            } else {
                password.removeClass('error__text');
                password.next().hide();
            }
            let userName = username.val().trim();
            let Password = password.val()
            clients = localStorage.getItem('clients')
            clientsArray = JSON.parse(clients);
            const user = clientsArray.find(clients => clients.Username === userName);
            if (!user) {
                username.addClass('error__text');
                username.next().show();
                error.text('Такой пользователь не зарегистрирован')
            } else {
                if (user.Password !== Password) {
                    password.addClass('error__text');
                    password.next().show();
                    error.text('Неверный пароль')
                } else {
                    button.value = "Exit";
                    $('#USER').remove();
                    $('#PASSW').remove();
                    $('.text').remove();
                    Welcome.text(`Welcome to ${user.Fullname}!`);
                    account.remove();
                    button.removeEventListener("click", login);
                    button.addEventListener("click", () => location.reload())
                }
            }
        }
        form.trigger('reset');
        account.addEventListener('click', () => location.reload())
    }
}