document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginMessage = document.getElementById("login-message");

  // 폼 제출 이벤트
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const user_id = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!user_id || !password) {
      loginMessage.textContent = "아이디와 비밀번호를 입력하세요.";
      loginMessage.style.color = "red";
      return;
    }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, password }),
      });

      const result = await response.json();

      if (response.ok) {
        loginMessage.textContent = "로그인 성공! 메인 페이지로 이동합니다.";
        loginMessage.style.color = "green";

        // 메인 페이지로 리디렉션
        setTimeout(() => {
          window.location.href = "/"; // 메인 페이지로 리디렉션
        }, 2000);
      } else {
        loginMessage.textContent = result.message || "로그인 실패. 다시 시도해주세요.";
        loginMessage.style.color = "red";
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      loginMessage.textContent = "서버 오류가 발생했습니다.";
      loginMessage.style.color = "red";
    }
  });
});
