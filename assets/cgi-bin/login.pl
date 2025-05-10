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

my ($success, $role) = check_credentials($login, $password);

if ($success) {
    print_json({
        success => 1,
        message => "Успешная авторизация!",
        role => $role,
        login => $login
    });
} else {
    print_json({success => 0, message => "Неверный логин или пароль"});
}

sub check_credentials {
    my ($user, $pass) = @_;
    return (0, '') unless -e $users_file;

    open(my $fh, '<', $users_file) or return (0, '');
    while (<$fh>) {
        chomp;
        my ($u, $p, $role) = split /:/;
        if ($u eq $user && $p eq $pass) {
            close $fh;
            return (1, $role || 'USER');
        }
    }
    close $fh;
    return (0, '');
}

sub print_json {
    my ($data) = @_;
    print $cgi->header('application/json');
    my $json = "{";
    $json .= "\"success\":$data->{success},";
    $json .= "\"message\":\"$data->{message}\"";
    if (exists $data->{role}) {
        $json .= ",\"role\":\"$data->{role}\"";
    }
    if (exists $data->{login}) {
        $json .= ",\"login\":\"$data->{login}\"";
    }
    $json .= "}";
    print $json;
}