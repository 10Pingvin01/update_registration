window.onload = function () {
    let fullName = $('#FullName');
    let username = $('#Username');
    let email = $('#Email');
    let password = $('#Password');
    let repeat = $('#RepeatPassword');
    let checkbox = $('#checkbox');
    let form = $("#registration-form");
    let button = $('#btn');
    let account = $('#account')[0];
    let error = $('.error');
    let popup = $('.popup');
    let popbtn = $('#popbtn')[0];
    let clients = localStorage.getItem('clients');
    let clientsArray = [];
    let user = {};
    popup.hide();
    button.click(function () {
        let hasError = false;
        if (!fullName.val()) {
            fullName.addClass('error__text');
            fullName.next().show();
            hasError = true;
        } else if (!fullName.val().match(/^([A-Za-zА-Яа-яёЁ]+)\s+([A-Za-zА-Яа-яёЁ]+)$/)) {
            fullName.addClass('error__text');
            fullName.next().text("Полное имя должно состоять из двух слов!").show();
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
        } else {
            username.removeClass('error__text');
            username.next().hide();
        }
        if (!email.val()) {
            email.addClass('error__text');
            email.next().show();
            hasError = true;
        } else if (!email.val().match((/^\w+@[a-zA-Z0-9/._]+?\.[a-zA-Z]{2,6}/))) {
            email.addClass('error__text');
            email.next().text("Введите существующий email!").show();
        }
        else if (email.val() === clients.Email) {
            email.next().text('Пользователь с такой почтой уже зарегистрирован').show();
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
        }
        else {
            repeat.removeClass('error__text');
            repeat.next().hide();
        }
        if (!checkbox.prop('checked')) {
            popup.show();
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
            user.Fullname = $('#FullName').val();
            user.Username = $('#Username').val();
            user.Email = $('#Email').val();
            user.Password = $('#Password').val();
            clientsArray.push(user);
            localStorage.setItem('clients', JSON.stringify(clientsArray));
            popbtn.addEventListener("click", function (e) {
                e.preventDefault();
                form.trigger('reset');
                LogInAccount();
            })
        }
    });

    account.addEventListener("click", function (e) {
        e.preventDefault();
        LogInAccount();
    })
    
    function LogInAccount() {
        account.removeEventListener("click", LogInAccount)
        popup.hide();
        error.hide();
        password.removeClass('error__text');
        username.removeClass('error__text');
        $('#full').remove();
        $('#mail').remove();
        $('#pass').remove();
        $('#check').remove();
        account.innerText = 'Registration';
        $('#text').text("Log in to the system");
        button.val("Sign In");
        button.click(function () {
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
                    button.val("Exit");
                    $('#USER').remove();
                    $('#PASSW').remove();
                    $('.text').remove();
                    $('#text').text(`Welcome to ${user.Fullname}!`);
                    account.remove();
                    button.click(function () {
                        location.reload();
                    });
                }
            }
        })
        form.trigger('reset');
        account.addEventListener('click', function (e) {
            e.preventDefault();
            location.reload();
        })
    }
}