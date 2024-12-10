const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        try {
            // 로그아웃 요청
            const response = await fetch("/logout", {
                method: "POST",  // POST 방식
                headers: {
                    "Content-Type": "application/json", // 필요한 헤더 추가
                },
            });

            if (response.ok) {
                window.location.href = "/"; // 메인 페이지로 리디렉션
            } else {
                alert("로그아웃 실패.");
            }
        } catch (error) {
            console.error("로그아웃 요청 오류:", error);
            alert("로그아웃 처리 중 오류가 발생했습니다.");
        }
    });
}
