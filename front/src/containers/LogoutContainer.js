const LogoutContainer = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    alert("로그아웃 되었습니다.");

    document.location.href = 'https://rpspire.gg'
}

export default LogoutContainer;
