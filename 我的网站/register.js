// 获取表单元素
const registerForm = document.getElementById("registerForm");
const emailRegisterBtn = document.querySelector('.email-register-btn');
const emailInput = document.getElementById('email');

// 获取提示系统元素
const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notificationMessage");
const notificationButton = document.getElementById("notificationButton");
const overlay = document.getElementById("overlay");

let isEmailRegister = true; // 标记当前是否是邮箱注册状态

// 显示提示函数
function showNotification(message, isSuccess = false) {
  // 设置通知类型
  notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
  
  // 设置消息内容
  notificationMessage.textContent = message;
  
  // 显示通知和遮罩
  notification.classList.add("show");
  overlay.classList.add("show");
  
  // 如果是成功提示，3秒后自动隐藏
  if (isSuccess) {
    setTimeout(() => {
      hideNotification();
      window.location.href = "index.html";
    }, 1500);
  }
}

// 隐藏提示函数
function hideNotification() {
  notification.classList.remove("show");
  overlay.classList.remove("show");
}

// 点击确定按钮隐藏提示
notificationButton.addEventListener("click", hideNotification);

// 点击关闭按钮隐藏提示
document.querySelector('.notification-close').addEventListener('click', hideNotification);

// 点击遮罩层也隐藏提示
overlay.addEventListener("click", hideNotification);

// 监听邮箱注册按钮点击事件
emailRegisterBtn.addEventListener('click', function(event) {
  event.preventDefault();
  
  isEmailRegister = !isEmailRegister; // 切换状态
  
  if (isEmailRegister) {
    // 切换到邮箱注册状态
    emailInput.placeholder = "邮箱";
    emailInput.type = "email";
    emailRegisterBtn.innerHTML = '<img class="email-icon" src="./图标/邮箱.png" alt="Email Icon"> 使用手机号注册';
  } else {
    // 切换到手机号注册状态
    emailInput.placeholder = "手机号";
    emailInput.type = "tel";
    emailRegisterBtn.innerHTML = '<img class="email-icon" src="./图标/邮箱.png" alt="Email Icon"> 使用邮箱注册';
  }
});

// 表单提交处理
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // 验证密码
  if (password.length < 6) {
    showNotification("密码长度不能少于6位");
    return;
  }

  if (password !== confirmPassword) {
    showNotification("两次输入的密码不一致");
    return;
  }

  // 根据注册类型验证输入
  if (isEmailRegister) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification("请输入有效的邮箱地址");
      return;
    }
  } else {
    if (!/^1[3-9]\d{9}$/.test(email)) {
      showNotification("请输入有效的11位手机号");
      return;
    }
  }

  // 检查是否已存在该用户
  const existingUser = localStorage.getItem("user");
  if (existingUser) {
    const parsedUser = JSON.parse(existingUser);
    if (parsedUser.email === email) {
      showNotification(isEmailRegister ? "该邮箱已被注册" : "该手机号已被注册");
      return;
    }
  }

  // 保存注册信息到 LocalStorage
  const userData = {
    email: email,
    password: password,
    isEmail: isEmailRegister
  };

  localStorage.setItem("user", JSON.stringify(userData));

  // 显示成功提示
  showNotification("注册成功！", true);
});