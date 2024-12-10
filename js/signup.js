document.getElementById("signup-button").addEventListener("click", async (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  // 폼 데이터 가져오기
  const user_id = document.getElementById("user_id").value.trim();
  const username = document.getElementById("username").value.trim();
  const nickname = document.getElementById("nickname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // 입력값 검증
  if (!user_id || !username || !email || !password) {
    alert("아이디, 이름, 이메일, 비밀번호는 필수 항목입니다.");
    return;
  }

  try {
    // 서버로 POST 요청 보내기
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, username, nickname, email, password }),
    });

    const result = await response.json();
    alert(result.message);

    if (response.ok) {
      // 회원가입 성공 시 로그인 페이지로 이동
      window.location.href = "/login.html";
    }
  } catch (error) {
    console.error("회원가입 요청 오류:", error);
    alert("회원가입에 실패했습니다.");
  }
});

// 비밀번호 확인 이벤트 추가
document.getElementById("confirm-password").addEventListener("input", () => {
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  const messageElement = document.getElementById("password-message");

  if (!messageElement) {
    // 비밀번호 메시지 요소가 없으면 생성
    const newMessageElement = document.createElement("p");
    newMessageElement.id = "password-message";
    newMessageElement.className = "message";
    document.querySelector(".text-field").appendChild(newMessageElement);
  }

  if (password !== confirmPassword) {
    messageElement.textContent = "비밀번호가 일치하지 않습니다.";
    messageElement.style.color = "red";
  } else {
    messageElement.textContent = "비밀번호가 일치합니다.";
    messageElement.style.color = "green";
  }
});

// 중복 검사 버튼 이벤트 리스너 추가
document.getElementById("check-duplicate").addEventListener("click", async () => {
  const user_id = document.getElementById("user_id").value.trim();

  // 아이디 입력값이 비어있는지 확인
  if (!user_id) {
    alert("아이디를 입력해주세요.");
    return;
  }

  try {
    // 서버로 중복 검사 요청 보내기
    const response = await fetch("/check-duplicate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }

    const result = await response.json();
    document.getElementById("username-message").textContent = "사용 가능한 아이디 입니다.";
    document.getElementById("username-message").style.color = "green";
  } catch (error) {
    console.error("중복 검사 요청 오류:", error);
    document.getElementById("username-message").textContent = error.message || "중복 검사에 실패했습니다.";
    document.getElementById("username-message").style.color = "red";
  }
});
