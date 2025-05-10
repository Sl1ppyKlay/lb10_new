#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);

my $cgi = CGI->new;
my $users_file = '/var/www/html/users.txt';

my $login = $cgi->param('login') || '';
my $password = $cgi->param('password') || '';

unless ($login && $password) {
    print_json({success => 0, message => "Введите логин и пароль"});
    exit;
}

# Проверка, существует ли пользователь
if (user_exists($login)) {
    print_json({success => 0, message => "Пользователь с таким логином уже существует"});
    exit;
}

# Регистрация пользователя
if (register_user($login, $password)) {
    print_json({success => 1, message => "Регистрация успешна!"});
} else {
    print_json({success => 0, message => "Ошибка при регистрации"});
}

sub user_exists {
    my ($user) = @_;
    return 0 unless -e $users_file;

    open(my $fh, '<', $users_file) or return 0;
    while (<$fh>) {
        chomp;
        my ($u) = split /:/;
        if ($u eq $user) {
            close $fh;
            return 1;
        }
    }
    close $fh;
    return 0;
}

sub register_user {
    my ($user, $pass) = @_;
    open(my $fh, '>>', $users_file) or return 0;
    print $fh "$user:$pass:USER\n";
    close $fh;
    return 1;
}

sub print_json {
    my ($data) = @_;
    print $cgi->header('application/json');
    my $json = "{";
    $json .= "\"success\":$data->{success},";
    $json .= "\"message\":\"$data->{message}\"";
    $json .= "}";
    print $json;
}