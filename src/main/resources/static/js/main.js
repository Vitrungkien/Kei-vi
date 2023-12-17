const Img_b = document.getElementById('detail-img-b');
const Don_Tra_b = document.getElementById("diem-don-tra-b");
const Tien_Ich_b = document.getElementById("tien-ich-b");
const Chinh_Sach_b = document.getElementById("chinh-sach-b");
const Review_b = document.getElementById("review-b");

const DetailImgForm = document.getElementById('detai-img');
const DiemDonTraForm = document.getElementById("diem-don-tra");
const TienIchForm = document.getElementById("tien-ich");
const ChinhSachForm = document.getElementById("chinh-sach");
const ReviewForm = document.getElementById("review");

var aClick = [Img_b, Don_Tra_b, Tien_Ich_b, Chinh_Sach_b, Review_b];
var aForm = [DetailImgForm, DiemDonTraForm, TienIchForm, ChinhSachForm, ReviewForm];

aClick[0].addEventListener('click', function () {
    aForm[0].style.display = 'block';
    aClick[0].style.color = '#2474E5';
    for (var i = 0; i < 5; i++) {
        if (i != 0 && aForm[i].style.display !== 'none') {
            aForm[i].style.display = 'none';
        }
        if (i != 0) {
            aClick[i].style.color = 'black';
        }
    }  
});

aClick[1].addEventListener('click', function () {
    aForm[1].style.display = 'grid';
    aClick[1].style.color = '#2474E5';
    for (var i = 0; i < 5; i++) {
        if (i != 1 && aForm[i].style.display !== 'none') {
            aForm[i].style.display = 'none';
        }
        if (i != 1) {
            aClick[i].style.color = 'black';
        }
    }  
});

aClick[2].addEventListener('click', function () {
    aForm[2].style.display = 'block';
    aClick[2].style.color = '#2474E5';
    for (var i = 0; i < 5; i++) {
        if (i != 2 && aForm[i].style.display !== 'none') {
            aForm[i].style.display = 'none';
        }
        if (i != 2) {
            aClick[i].style.color = 'black';
        }
    }  
});

aClick[3].addEventListener('click', function () {
    aForm[3].style.display = 'block';
    aClick[3].style.color = '#2474E5';
    for (var i = 0; i < 5; i++) {
        if (i != 3 && aForm[i].style.display !== 'none') {
            aForm[i].style.display = 'none';
        }
        if (i != 3) {
            aClick[i].style.color = 'black';
        }
    }  
});

aClick[4].addEventListener('click', function () {
    aForm[4].style.display = 'block';
    aClick[4].style.color = '#2474E5';
    for (var i = 0; i < 5; i++) {
        if (i != 4 && aForm[i].style.display !== 'none') {
            aForm[i].style.display = 'none';
        }
        if (i != 4) {
            aClick[i].style.color = 'black';
        }
    }  
});









// Ẩn hiện thông tin chi tiết 
const infoButton = document.getElementById('info-button');
const detailForm = document.getElementById('detail');

const arrow_icon = document.getElementById('arrow-icon'); 

const Img_b1 = document.getElementById('detail-img-b');
const DetailImgForm1 = document.getElementById('detai-img');

const MenuDetail = document.getElementsByClassName('menu-detail');

infoButton.addEventListener('click', infoButtonFinction);
// Gắn sự kiện click cho thẻ Thông tin chi tiết
function infoButtonFinction() {
    // Kiểm tra xem menu chi tiết đang ẩn hay hiển thị
    if (detailForm.style.display === 'none' || detailForm.style.display === '') {
        // Nếu đang ẩn thì hiển thị lên
        detailForm.style.display = 'block';
    } else {
        // Nếu đang hiển thị thì ẩn đi
        detailForm.style.display = 'none';
    }
    
    //xoay mũi tên
    if (arrow_icon.style.transform === 'rotate(0deg)') {
        arrow_icon.style.transform = 'rotate(180deg)';
    } else {
        arrow_icon.style.transform = 'rotate(0deg)';
    }

    //Ấn thông tin chi tiết thì hiển thị tab hình ảnh dù trước đó đang hiển thị ở tab khác
    DetailImgForm1.style.display = 'block';
    //chuyển hết tên tab về màu khi chưa được nhấn và đổi màu khi ấn cho tab hình ảnh
    for (var i = 1; i < 5; i++) {
        MenuDetail[i].style.color = 'black';
    }
    Img_b1.style.color = '#2474E5';

}







































// // var thongbao = 'Xin chào các bạn';
// // alert(thongbao);


// // console.log('Sao để sửa lỗi vàng dưới này');
// // console.error('Nguy hiem cap do 1');
// // console.warn('Cảnh báo cấp độ 9');

// // var a = 2 ** 3;
// // console.log(a);

// // function writeLog() {
// //     console.log(arguments);
// // }

// // writeLog('Log 1', 'Log 2', 'Log 3');
// // var s  = 'Kien sieu dep     trai    ';

// // console.log(s.toLowerCase());
// // console.log(s.toUpperCase());
// // console.log(s.trim()); //cắt khoảng trắng đầu và cuối

// // var language  = 'javascript, java, react';

// // console.log(language.split(', '));
// // console.log(language.split(''));


// // var PI = 3.144;
// // console.log(PI.toFixed(2));

// // var date = Date();

// // console.log(typeof date);

// // var random = Math.ceil(Math.random() * 4);

// // var bonus = [
// //     '10 coin',
// //     '20 coin',
// //     '30 coin',
// //     '40 coin',
// //     '50 coin'
// // ]

// // console.log(bonus[random]);

// // console.log(Math.ceil(1.25345))
