// <!--    Lấy tên tất cả nhà xe-->
renderStoreName();

function renderStoreName() {
    // Gọi API để lấy danh sách sản phẩm khi trang web được tải
    var storeNames = [];
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://localhost:8080/all-store-name', true);
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            storeNames = JSON.parse(xhr2.responseText);
            const listNhaXe = document.getElementById('nha-xe');
            storeNames.forEach(function (storeName) {
                const p = document.createElement('p');
                p.innerText = storeName;
                p.classList = 'ten-nha-xe';
                listNhaXe.appendChild(p);
            });

        }
    };
    xhr2.send();
}


