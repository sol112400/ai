document.getElementById("deleteAccountLink").addEventListener("click", () => {
    // 사용자에게 확인 창 표시
    const userConfirmed = confirm("정말 탈퇴하시겠습니까?");
    
    if (userConfirmed) {
        // 탈퇴 API 호출
        fetch('/api/delete-user', { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("회원탈퇴 실패");
                }
                return response.json();
            })
            .then((data) => {
                // 성공 메시지 표시
                alert(data.message);

                // 메인 페이지로 이동
                window.location.href = '/';
            })
            .catch((error) => {
                console.error("회원탈퇴 처리 중 오류:", error);
                alert("탈퇴 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
            });
    } else {
        alert("탈퇴가 취소되었습니다.");
    }
});
