document.addEventListener("DOMContentLoaded", () => {
  const profilePhoto = document.getElementById("profile-photo"); // 기존 프로필 사진
  const uploadPhotoBtn = document.getElementById("upload-photo-btn");
  const fileInput = document.getElementById("file");

  // 페이지 로드 시 사용자 정보 가져오기
  fetch("/api/user")
    .then((response) => {
      if (!response.ok) {
        throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.picture) {
        profilePhoto.src = data.picture; // 저장된 프로필 사진 URL 반영
      }
    })
    .catch((error) => {
      console.error("사용자 정보 가져오기 오류:", error);
    });

  // 프로필 사진 업로드
  uploadPhotoBtn.addEventListener("click", () => {
    const file = fileInput.files[0];

    if (!file) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", file);

    fetch("/api/user/upload-photo", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("프로필 사진이 성공적으로 업로드되었습니다.");
          profilePhoto.src = data.photoUrl; // 업로드된 사진 URL 반영
        } else {
          alert(data.message || "프로필 사진 업로드에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("프로필 사진 업로드 중 오류:", error);
        alert("프로필 사진 업로드에 실패했습니다.");
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 닉네임 변경 로직
  const nicknameChangeBtn = document.getElementById("nickname-change-btn");
  const nicknameInput = document.getElementById("nickname");

  nicknameChangeBtn.addEventListener("click", () => {
    const nickname = nicknameInput.value.trim(); // 입력된 닉네임 값에서 공백 제거

    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 닉네임 변경 요청을 서버로 보냄
    fetch("/api/user/nickname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname }), // 서버에 전달할 데이터
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("닉네임이 성공적으로 변경되었습니다.");
          window.location.href = "/mypage.html"; // 마이페이지로 이동
        } else {
          alert(data.message || "닉네임 변경에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("닉네임 변경 중 오류:", error);
        alert("닉네임 변경에 실패했습니다.");
      });
  });

  // 비밀번호 재설정 로직
  const resetPasswordBtn = document.querySelector(".reset-password-btn");
  const currentPasswordInput = document.getElementById("current-password");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const verifyPasswordBtn = document.querySelector(".verify-password-btn");
  const savePasswordBtn = document.querySelector(".save-btn");

  // 비밀번호 재설정 버튼 클릭 시 현재 비밀번호 입력 섹션 표시
  resetPasswordBtn.addEventListener("click", () => {
    document.getElementById("password-reset-section").style.display = "block";
  });

  // 현재 비밀번호 확인
  verifyPasswordBtn.addEventListener("click", () => {
    const currentPassword = currentPasswordInput.value.trim();

    if (!currentPassword) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    fetch("/api/user/verify-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("현재 비밀번호가 확인되었습니다.");
          document.getElementById("password-reset-section").style.display = "none";
          document.getElementById("new-password-section").style.display = "block";
        } else {
          alert(data.message || "현재 비밀번호 확인에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("현재 비밀번호 확인 중 오류:", error);
        alert("현재 비밀번호 확인에 실패했습니다.");
      });
  });

  // 새 비밀번호 변경 요청
  savePasswordBtn.addEventListener("click", () => {
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!newPassword || !confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인을 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    fetch("/api/user/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword,
        confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          window.location.href = "/mypage.html"; // 마이페이지로 이동
        } else {
          alert(data.message || "비밀번호 변경에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("비밀번호 변경 중 오류:", error);
        alert("비밀번호 변경에 실패했습니다.");
      });
  });
});
