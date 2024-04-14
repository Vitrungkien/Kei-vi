// <!--    Lấy tất cả thông báo-->
renderNotice();

function displayValue(value) {
    return (value !== null && value !== undefined) ? value : 'null';
}

function renderNotice() {
    // Gọi API để lấy danh sách sản phẩm khi trang web được tải
    var notices = [];
    var xhe1 = new XMLHttpRequest();
    xhe1.open('GET', 'http://localhost:8080/all-notice', true);
    xhe1.onreadystatechange = function () {
        if (xhe1.readyState == 4 && xhe1.status == 200) {
            notices = JSON.parse(xhe1.responseText);
            const allNotice = document.getElementById('all-notice');
            notices.forEach(function (notice) {
                var lastUpdate = moment(notice['lastUpdate']).format('HH:mm DD/MM/YYYY');
                const noticeDiv = document.createElement('div');
                noticeDiv.classList.add('notice-div');
                noticeDiv.innerHTML = `
                            <h6 style="color: green">${notice.storeName}</h6>
                            <h6 style="color: red">Thông báo: ${notice.title}</h6>
                            <p>${notice.content}</p>
                            <p>${notice.expired ? 'Hết hiệu lực' : 'Còn hiệu lực'}</p>
                            <p>Sửa đổi lần cuối: ${lastUpdate}</p>
                            `;

                allNotice.appendChild(noticeDiv);
            })
        }
    };
    xhe1.send();
}


