let fullName = $('#FullName');
let username = $('#Username');
let email = $('#Email');
let password = $('#Password');
let repeat = $('#RepeatPassword');
let checkbox = $('#checkbox');
let form = $("#registration-form");
let button = $('#btn');
let account = $('#account')
let error = $('#error');
let clients = localStorage.getItem('clients');
let clientsArray = [];
let user = {};
checkbox.click(function (e) {
    e.target.checked ? console.log("Согласен") : console.log("Не согласен");
});

button.click(function () {
    if (!fullName.val().match(/^[A-Za-zА-Яа-яёЁ_]+$/)) {
        fullName.next().show();
        fullName.css('border-bottom', '1px solid red');
        return;
    } else {
        fullName.css('border-bottom', '1px solid rgba(198, 198, 196, 1)');
        fullName.next().hide();
        user.Name = $('#FullName').val();
    }
    if (!username.val().match(/^[A-Za-z0-9\-\w]+$/)) {
        username.next().show();
        username.css('border-bottom', '1px solid red');
        return;
    } else {
        username.css('border-bottom', '1px solid rgba(198, 198, 196, 1)');
        username.next().hide();
        user.Username = $('#Username').val();
    }
    if (!email.val().match((/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/))) {
        email.next().show();
        email.css('border-bottom', '1px solid red');
        return;
    } else {
        email.css('border-bottom', '1px solid rgba(198, 198, 196, 1)');
        email.next().hide();
        user.Email = $('#Email').val();

    }
    if (!password.val().match(/^(?=.*[A-Z])(?=.*\d)(?=.*[+*/!?@#$%^&()_={};:,.<>|]).{8,}$/)) {
        password.next().show();
        password.css('border-bottom', '1px solid red');
        return;
    } else {
        password.css('border-bottom', '1px solid rgba(198, 198, 196, 1)');
        password.next().hide();
        user.Password = $('#Password').val();
    }
    if (!repeat.val().match(/^(?=.*[A-Z])(?=.*\d)(?=.*[+*/!?@#$%^&()_={};:,.<>|]).{8,}$/)) {
        repeat.next().show();
        repeat.css('border-bottom', '1px solid red');
        return;
    } else {
        repeat.css('border-bottom', '1px solid rgba(198, 198, 196, 1)');
        repeat.next().hide();
    }
    if (password.val() !== repeat.val()) {
        alert("Пароли не совпадают");
        return;
    }
    if (!checkbox.prop('checked')) {
        alert("Согласитесь с правилами")
        return;
    }
    confirm("На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию");
    if (clients) {
        clientsArray = JSON.parse(clients);
    }
    clientsArray.push(user);
    localStorage.setItem('clients', JSON.stringify(clientsArray));
    form.trigger('reset');
    LogInAccount();
});


account.click(function () {
    LogInAccount();
});


function LogInAccount() {
    $('#full').remove();
    $('#mail').remove();
    $('#pass').remove();
    $('#check').remove();
    account.text('Registration');
    $('#text').text("Log in to the system");
    button.val("Sign In");
    button.click(function () {
        if (!username.val()) {
            username.next().show();
            username.css('border-bottom', '1px solid red');
            return;
        } else {
            username.css('border-bottom', '1px solid rgba(198, 198, 196, 1)');
            username.next().hide();
        }
        if (!password.val()) {
            password.next().show();
            password.css('border-bottom', '1px solid red');
            return;
        } else {
            password.css('border-bottom', '1px solid rgba(198, 198, 196, 1)');
            password.next().hide();
        }
        let userName = username.val().trim();
        let Password = password.val()
        localStorage.getItem('clients')
        clientsArray = JSON.parse(clients);
        const user = clientsArray.find(clients => clients.Username === userName);
        if (!user) {
            username.css('border-bottom', '1px solid red');
            username.next().show();
            error.text('Такой пользователь не зарегистрирован')
        }
        else {
            if (user.Password !== Password) {
                password.css('border-bottom', '1px solid red');
                password.next().show();
                error.text('Неверный пароль')
            }
            else {
                button.val("Exit");
                $('#USER').remove();
                $('#PASSW').remove();
                $('.text').remove();
                $('#text').text(`Welcome to ${user.FullName}!`);
                account.remove();
                button.click(function () {
                    location.reload();
                });
            }
        }
    })
    form.trigger('reset');
}


account.click(function () {
    location.reload();
});

