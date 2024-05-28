


render(`
        <div class="left-menu"> 
           <a href="/"><img src="./assets/img/logo2.png" alt=""></a>
        </div>
        
            <ul class="right-menu">
                <li class="main-menu"><a class="main-menu-a" href="/">Trang chủ</a></li>
                <li class="main-menu"><a class="main-menu-a" href="/uplopad-file.html">Gửi hàng</a></li>
                <li class="main-menu">
                    <a class="main-menu-a" href="">Thuê xe</a>
                    <ul class="sub-main-menu">
                        <li>Hợp đồng du lịch</li>
                        <li>Thuê xe tự lái</li>
                    </ul>
                </li>
                <li class="main-menu"><a class="main-menu-a" href="">Giới thiệu</a></li>
                <li class="main-menu">
                    <a class="main-menu-a" href="">Tin tức</a>
                    <ul class="sub-main-menu">
                        <li>Thông báo nghỉ tết</li>
                        <li>Thông báo bảo trì 30/12</li>
                    </ul>
                </li>
                <li class="main-menu" id="me">
                    <a class="main-menu-a" href="" >Tôi</a>
                    <ul class="sub-main-menu sub-main-menu-toi">
                        <li><a href="/profile.html">Tài khoản</a></li>
                        <div id="management" class="some-element"
                             >
                            <li><a href="/management.html" >Quản lý sản phẩm</a></li>
                        </div>
                        <li><a href="/my-order.html" >Quản lý đơn hàng</a></li>

                        <li id="logoutButton"> <a >Đăng xuất</a> </li>
                    </ul>
                </li>

                <li class="main-menu" id="login">
                    <a class="main-menu-a" href="./signin.html">Đăng nhập</a>
                </li>
            </ul>`);

handleLogout();

            // <!--Handle render Ui for Guest-->

function renderRoleUI() {
    // Kiểm tra xem có cookie có tên "Authorization" hay không
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Lấy giá trị của cookie "Authorization"
    const authToken = getCookie('Authorization') ;

    // Lấy phần tử cần ẩn
    const meElement = document.getElementById('me');
    const loginElement = document.getElementById('login');

    // Kiểm tra và ẩn phần tử nếu không có cookie "Authorization"
    if (!authToken) {
        meElement.style.display = 'none'; // Ẩn phần tử
        loginElement.style.display = 'block'

    }
}

//renderRoleUI();
function render(header) {
    var myheader = document.querySelector('#header');
    if (!myheader) console.log('nullheader');
    myheader.innerHTML = header;
    isGuest();
}


// <!--Logout click-->
function handleLogout() {
    // Gán sự kiện click cho thẻ button
    var logoutBtn = document.getElementById("logoutButton");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        // Gửi yêu cầu POST đến endpoint /logout khi người dùng nhấn vào nút đăng xuất
        fetch("http://localhost:8080/logout", {
          method: "POST",
          credentials: "same-origin", // Đảm bảo gửi cookie (nếu có) kèm theo yêu cầu
          
        })
          .then((response) => {
            //console.log(response.status);
            if (response.ok) {
              // Nếu đăng xuất thành công, bạn có thể thực hiện các bước cần thiết
              console.log("logout successful!");
              document.cookie = "Authorization" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            //   window.location.href = "./login.html"; // Chuyển hướng đến trang đăng nhập, ví dụ '/login'
              window.location.href = "./signin.html";
              
            } else {
              console.error("Logout failed:", response.status);
            }
          })
          .catch((error) => console.error("Error during logout:", error));
      });
    }
}

function isGuest() {
    if(!isExistCookie('Authorization')) {
        document.querySelector('#me').remove();
    }
    else {
        document.querySelector('#login').remove();
    }
}

function isExistCookie(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return true;
        }  
    }
    return false;
}







