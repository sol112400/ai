document.addEventListener("DOMContentLoaded", () => {
    // "공지 작성" 버튼 클릭 이벤트
    const writeButton = document.getElementById("bt01");

    writeButton.addEventListener("click", () => {
        // 알림 메시지로 비밀번호 입력 받기
        const adminPassword = "1234"; // 관리자 비밀번호 (예시)
        const userInput = prompt("관리자 비밀번호를 입력하세요:");

        if (userInput === adminPassword) {
            // 비밀번호가 맞으면 다른 페이지로 이동
            alert("비밀번호가 맞습니다. 해당 페이지로 이동합니다.");
            window.location.href = "noticewrite.html"; // 이동할 HTML 파일 경로
        } else {
            // 비밀번호가 틀리면 경고 메시지
            alert("권한이 없습니다.");
        }
    });
});
