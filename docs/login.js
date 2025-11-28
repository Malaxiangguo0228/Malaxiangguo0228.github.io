// 获取登录表单和元素
const loginForm = document.getElementById("loginForm");
const emailLoginBtn = document.querySelector('.email-login-btn');
const emailInput = document.getElementById('email');

let isEmailLogin = false; // 标记当前是否是邮箱登录状态

// 监听邮箱登录按钮点击事件
emailLoginBtn.addEventListener('click', function(event) {
  event.preventDefault();
  
  isEmailLogin = !isEmailLogin; // 切换状态
  
  if (isEmailLogin) {
    // 切换到邮箱登录状态
    emailInput.placeholder = "邮箱登录";
    emailInput.type = "email";
    emailLoginBtn.innerHTML = '<img class="email-icon" src="./图标/邮箱.png" alt="Email Icon"> 使用手机号登录';
  } else {
    // 切换到手机号登录状态
    emailInput.placeholder = "手机号登录";
    emailInput.type = "tel";
    emailLoginBtn.innerHTML = '<img class="email-icon" src="./图标/邮箱.png" alt="Email Icon"> 使用邮箱登录';
  }
});

// 监听表单提交事件
loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = document.getElementById("password").value;
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  if (!storedUserData) {
    alert("没有找到注册用户，请先注册！");
    return;
  }

  // 验证输入
  if (isEmailLogin) {
    if (!email.includes("@") || !email.includes(".")) {
      alert("请输入有效的邮箱地址！");
      return;
    }
  } else {
    if (!/^\d{11}$/.test(email)) {
      alert("请输入有效的11位手机号！");
      return;
    }
  }

  // 无论是邮箱还是手机号登录，都使用同一个字段验证
  if (email === storedUserData.email && password === storedUserData.password) {
    alert("登录成功！");
    window.location.href = "main.html";
  } else {
    alert((isEmailLogin ? "邮箱" : "手机号") + "或密码错误，请重试！");
  }
});