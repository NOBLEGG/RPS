def active_message(domain, uidb64, token):
    return f"아래 링크를 클릭하시면 인증이 완료되며, 바로 로그인하실 수 있습니다.\n\n링크 : https://{domain}/activate/{uidb64}/{token}\n\n감사합니다."

def reset_message(domain, uidb64, token):
    return f"아래 링크를 클릭하시면 비밀번호 변경을 진행하실 수 있습니다.\n\n링크 : https://{domain}/reset/{uidb64}/{token}\n\n감사합니다."
