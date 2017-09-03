﻿$(function () {
    // Wire up the hover event
    var loginLinkHover = $("#loginLink").hover(onLoginLinkHover);
    //wire up the click event for the closeout "x"
    var loginCloseButton = $("#close-login").click(onCloseLogin);
    //wire up the click event for the login button
    var loginButton = $("#login-button").click(onLoginClick);


    // The function called by the hover event
    function onLoginLinkHover() {
        $("div[data-login-user-area]").addClass('open');
    }

    //The function called by the click event
    function onCloseLogin() {
        $("div[data-login-user-area]").removeClass('open');
    }

    function onCloseLogin() {
        $("div[data-login-user-area]").removeClass('open');
    }

    function onLoginClick() {
        var url = $('#login-button').attr('data-login-action');
        var return_url = $('#login-button').attr('data-login-return-url');
        var email = $('#Email').val();
        var pwd = $('#Password').val();
        var remember_me = $('#RememberMe').prop('checked');
        var antiforgery = $('[name="__RequestVerificationToken"]').val();

        $.post(url, {
            __RequestVerificationToken: antiforgery, email: email,
            password: pwd, RememberMe: remember_me
        }, function (data) {
            var parsed = $.parseHTML(data);
            var hasErrors = $(parsed).find("[data-valmsg-summary]").text()
                .replace(/\n|\r/g, "").length > 0;

            if (hasErrors == true) {
                $('div[data-login-panel-partial]').html(data);
                $('div[data-login-user-area]').addClass('open');
                $('#Email').addClass('data-login-error');
                $('#Password').addClass('data-login-error');
            }
            else {
                $('div[data-login-user-area]').removeClass('open');
                $('#Email').removeClass('data-login-error');
                $('#Password').removeClass('data-login-error');
                location.href = return_url;
            }
            // wire up events again.
            loginLinkHover = $("#loginLink").hover(onLoginLinkHover);
            loginCloseButton = $("#close-login").click(onCloseLogin);
            loginButton = $("#login-button").click(onLoginClick);
        }).fail(function (xhr, status, error) {
            $('#Email').addClass('data-login-error');
            $('#Password').addClass('data-login-error');
            // wire up events again
            loginLinkHover = $("#loginLink").hover(onLoginLinkHover);
            loginCloseButton = $("#close-login").click(onCloseLogin);
            loginButton = $("#login-button").click(onLoginClick);
        });

    }

});