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



const updateBtn = document.getElementById('update');
const veForm = document.getElementById('ve-xe');

updateBtn.addEventListener('click', function () {
    if (veForm.style.display === 'none' || veForm.style.display === '') {
        // Nếu đang ẩn thì hiển thị lên
        veForm.style.display = 'grid';
    } else {
        // Nếu đang hiển thị thì ẩn đi
        veForm.style.display = 'none';
    }
})



