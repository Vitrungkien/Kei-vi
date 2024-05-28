// <!--Lấy ra tất cả sản phẩm    -->


// var currentHTMLFileName = window.location.pathname.split("/").pop();
// if (currentHTMLFileName == "index.html") {
  
// }

//<!-- --------------------------------------------------------------------------------------------- -->
function handleRenderAllProducts(searchResult) {
    var products = []; // Khai báo mảng products ở đây
    // Số sản phẩm trên mỗi trang
    var currentPage = 0;
    var pageSize = 10;

    if (searchResult) {
        products = searchResult;
        renderProducts(currentPage);
        if (products.length > 10) {
            displayPagination();
        }
    }
    else {
        homeProducts();
    }
    function displayValue(value) {
        return (value !== null && value !== undefined) ? value : 'null';
    }

    // Gọi API để lấy danh sách sản phẩm khi trang web được tải
    function homeProducts() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/all-product', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                products = JSON.parse(xhr.responseText);
                renderProducts(currentPage);
                if (products.length > 10) {
                    displayPagination();
                }
            }
        };
        xhr.send();
    }


    //Hiển thị phân trang
    function displayPagination() {
        // Tính toán tổng số trang
        var totalPages = Math.ceil(products.length / pageSize);

        // Hiển thị liên kết phân trang
        var paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        // Hiển thị nút trở về trang trước
        var prevPageLink = document.createElement('a');
        prevPageLink.href = '#';
        prevPageLink.id = 'preP';
        prevPageLink.textContent = '< Trang trước ';
        prevPageLink.onclick = function (event) {
            if (currentPage > 0) {
                changePage(currentPage - 1, event);
            }
        };
        paginationContainer.appendChild(prevPageLink);

        // Hiển thị liên kết phân trang
        var startPage = Math.max(0, currentPage - 2);
        var endPage = Math.min(totalPages - 1, currentPage + 2);

        var pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.id = 'curP';
        pageLink.textContent = currentPage + 1;
        paginationContainer.appendChild(pageLink);

        // Hiển thị nút chuyển đến trang tiếp theo
        var nextPageLink = document.createElement('a');
        nextPageLink.href = '#';
        nextPageLink.id = 'nextP';
        nextPageLink.textContent = ' Trang sau >';
        nextPageLink.onclick = function (event) {
            if (currentPage < totalPages - 1) {
                changePage(currentPage + 1, event);
            }
        };
        paginationContainer.appendChild(nextPageLink);
    }
    //<!-- --------------------------------------------------------------------------------------------- -->

    //Hiển thị sản phẩm
    function renderProducts(page) {
        // Tính toán vị trí bắt đầu và kết thúc của danh sách sản phẩm trên trang
        var start = page * pageSize;
        var end = Math.min((page + 1) * pageSize, products.length);

        // Hiển thị sản phẩm trên trang hiện tại
        var productListDiv = document.getElementById('productList');
        productListDiv.innerHTML = ''; // Xóa nội dung cũ

        for (var i = start; i < end; i++) {
            renderOneProduct(products[i], productListDiv);
            // console.log(productListDiv);
            // console.log("Hien thi san pham");
        }
    }
    //<!-- --------------------------------------------------------------------------------------------- -->
    
    //<!-- Chuyển trang -->
    function changePage(page, event) {
      currentPage = page;
      renderProducts(currentPage);
      var curP = document.getElementById('curP');
      curP.innerHTML = '';
      curP.textContent = currentPage + 1;
      event.preventDefault();
    }
    //<!-- --------------------------------------------------------------------------------------------- -->
}
//<!-- --------------------------------------------------------------------------------------------- -->



//Tính tổng thời gian di chuyển
function calculateTimeDifference(startTimeString, endTimeString) {
    // Chuyển đổi chuỗi thời gian thành số giây
    function timeStringToSeconds(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    // Lấy số giây từ chuỗi thời gian
    const startTimeInSeconds = timeStringToSeconds(startTimeString);
    const endTimeInSeconds = timeStringToSeconds(endTimeString);

    // Tính chênh lệch thời gian trong giây
    const timeDifferenceInSeconds = endTimeInSeconds - startTimeInSeconds;

    // Chuyển đổi chênh lệch thời gian thành giờ, phút, giây
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = Math.floor(timeDifferenceInSeconds % 60);

    // Định dạng chuỗi kết quả
    const resultString = `${hours} Giờ ${minutes} phút`;

    return resultString;
}
//<!-- --------------------------------------------------------------------------------------------- -->







// <!--    Ẩn hiện thông báo bằng hover-->
// Hàm để hiển thị thẻ chứa noticeList
function showNoticeList(id) {
    var noticeList = document.getElementById('noticeList' + id);
    if (noticeList.style.display == 'block') {
        noticeList.style.display = 'none';
    }
    else {
        noticeList.style.display = 'block';
    }

}
// Hàm để ẩn thẻ chứa noticeList
function hideNoticeList(id) {
    document.getElementById('noticeList' + id).style.display = 'none';
}
//<!-- --------------------------------------------------------------------------------------------- -->



// <!--Xử lý ẩn thông tin chi tiết của tất cả sản phẩm và hiện khi ấn vào-->

// Hàm JavaScript để hiển thị thông tin chi tiết của sản phẩm khi click
function showProductDetail(productId) {
    // Ẩn tất cả các chi tiết sản phẩm
    // hideAllProductDetails();

    // Hiển thị chi tiết của sản phẩm được click
    const productDetailDiv = document.getElementById('productDetail' + productId);
    if (productDetailDiv.style.display === 'none' || productDetailDiv.style.display === '') {
        productDetailDiv.style.display = 'block';
    }
    else {
        productDetailDiv.style.display = 'none';
    }

    const arrow_icon = document.getElementById('arrow-icon' + productId);
    //xoay mũi tên
    if (arrow_icon.style.transform === 'rotate(0deg)') {
        arrow_icon.style.transform = 'rotate(180deg)';
    }
    else {
        arrow_icon.style.transform = 'rotate(0deg)';
    }
}

// Hàm JavaScript để ẩn tất cả các chi tiết sản phẩm
function hideAllProductDetails() {
    const productDetails = document.querySelectorAll('[id^="productDetail"]');
    productDetails.forEach(function (detail) {
        detail.style.display = 'none';
    });


}
//<!-- --------------------------------------------------------------------------------------------- -->



// <!--Ẩn/hiện order form-->

    function showOrderForm(productId) {
        hideAllOrderForm();
        const clickedForm = document.getElementById('frmDatVe' + productId);
        clickedForm.style.display = 'block';
    }

    function hideAllOrderForm() {
        const orderForms = document.querySelectorAll('.frmDatVe-modal');
        orderForms.forEach(function (orderForm) {
            orderForm.style.display = 'none';
        });
    }

    function dismissForm(productId) {
        // Get the form element
        var formDatVe = document.getElementById('frmDatVe' + productId);
        // Change the display property of the form to none
        formDatVe.style.display = "none";
    }
//<!-- --------------------------------------------------------------------------------------------- -->



function renderOneProduct(product, productListDiv){
    let temp1 = productListDiv ? true : false;
    var temp2 = document.createElement('div');;
  productListDiv = productListDiv ??  temp2;
  
  const timeDifferenceString = calculateTimeDifference(product.startTime, product.endTime);
  const formattedStartTime = moment(product.startTime, "HH:mm:ss").format('HH:mm');
  const formattedEndTime = moment(product.endTime, "HH:mm:ss").format('HH:mm');
  var productDiv = document.createElement('div');
  productDiv.classList.add('product-div');

  const formattedPrice = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  productDiv.innerHTML =
`<div class="ve-xe" id="productId${product.productID}">
    <div>
        <h6 id="n-hover${product.productID}" 
        onclick="showNoticeList(${product.productID})" 
        class="icon-notice"        
        >
            Thông báo
            <i class="fa-solid fa-bell" style="color: #fff"></i>
        </h6>

<!--       <img id="anh-xe" src="/assets/img/Picture1.png" alt="Anh xe" />-->
        <img id="anh-xe" src="${product.productImage}" alt="Anh xe" />
    </div>

    <div class="info-ve">
        <div class="info-ve-p1">
            <div class="ten-nha-xe-rate">
                <p class="ten-nha-xe">${product.storeName}</p>

    <!--            <i class="fa-solid fa-star" style="color: #ffd500"></i>-->
    <!--            <i class="fa-solid fa-star" style="color: #ffd500"></i>-->
    <!--            <i class="fa-solid fa-star" style="color: #ffd500"></i>-->
    <!--            <i class="fa-solid fa-star" style="color: #ffd500"></i>-->
    <!--            <i class="fa-solid fa-star" style="color: #ffd500"></i>-->
            </div>
            <p class="price">${formattedPrice}</p>
        </div>
        <p class="productName" style="font-weight: bold">Tuyến: ${product.productName}</p>
        <p class="car-type">${product.type} ${product.bienSoXe ? ` - ${product.bienSoXe}` : ''}</p>
        <div class="info-ve-p2">
            <div class="info-ve-p2-1">
                <div class="info-p2-1-1">
                    <img class="start-icon" src="/assets/img/clock-regular.svg" alt="" />
                    <p class="info-time">${formattedStartTime}</p>
                    <p>- ${product.startAddress}</p>
                </div>

            <div class="info-p2-1-1">
                <img class="dot-dot" src="/assets/img/dot.png" alt="" />
                <p class="info-time" id="info-take-time">${timeDifferenceString}</p>
            </div>
            <div class="info-p2-1-1">
                <img class="start-icon" src="/assets/img/location.png" alt="" />
                <p class="info-time">${formattedEndTime}</p>
                <p>- ${product.endAddress}</p>
            </div>
        </div>
        <div class="info-ve-p2-2">
            <p id="blank">Còn ${product.remainSeat} chỗ trống</p>
            <p class="contact">Liên hệ: ${product.phoneNumber}${product.phoneNumber2 ? ` - ${product.phoneNumber2}` : ''}</p>

            <div>
                <p id="info-button" class="info-button" onclick="showProductDetail(${product.productID})">
                Thông tin chi tiết
                <i
                style="transform: rotate(0deg)"
                id="arrow-icon${product.productID}"
                class="fa-solid fa-caret-down"
                ></i>
                </p>
                <!-- <p>Thông tin chi tiết</p> -->
                <button onclick="showOrderForm(${product.productID})" id="order-btn-m">Đặt xe</button>
                <button type="button" class="btn btn-danger exit-p-view" 
                    id="exit-p-view${product.productID}"
                    onclick="dismissDetailProduct(${product.productID})"
                    style="display: none;"
                    >
                    Thoát
                </button>
            </div>
        </div>
    </div>
</div>
<p class="type-pay">KHÔNG CẦN THANH TOÁN TRƯỚC</p>

<div id="noticeList${product.productID}" class="noticeList">
    <h5 style="margin: 10px; text-align: center">Thông báo</h5>
    ${renderNoticeList(product)}
</div>
<div id="productDetail${product.productID}" class="detail" style="display: none">
    <div class="detail-info">
        <ul class="list-info">
            <li>
                <button class="menu-detail${product.productID} detail-img-b" id="detail-img-b${product.productID}"
                onclick="showPartDetail(${product.productID}, 1)">
                Hình ảnh
                </button>

            </li>
            <li>
                <button class="menu-detail${product.productID} tien-ich-b" id="tien-ich-b${product.productID}"
                onclick="showPartDetail(${product.productID}, 2)">
                Tiện ích
                </button>
            </li>
            <li>
                <button class="menu-detail${product.productID} diem-don-tra-b" id="diem-don-tra-b${product.productID}"
                onclick="showPartDetail(${product.productID}, 3)">
                Điểm đón trả
                </button>
            </li>
            <li>
                <button class="menu-detail${product.productID} chinh-sach-b" id="chinh-sach-b${product.productID}"
                onclick="showPartDetail(${product.productID}, 4)"> Chính sách </button>
            </li>
            <li>
                <button class="menu-detail${product.productID} review-b" id="review-b${product.productID}"
                onclick="showPartDetail(${product.productID}, 5)"> Thông tin </button>
            </li>
        </ul>
    </div>

    <div class="five-info" id="five-info">
        <!--Hinh anh-->
        <div class="part-detail${product.productID} detai-img" id="detai-img${product.productID}">
            <img class="main-detail-img" src="https://static.vexere.com/production/images/1691571338555.jpeg" alt="" />
            <img class="main-detail-img" src="https://static.vexere.com/production/images/1691571338859.jpeg" alt="" />
            <img class="main-detail-img" src="https://static.vexere.com/production/images/1691571339090.jpeg" alt="" />
            <img class="main-detail-img" src="https://static.vexere.com/production/images/1692701522841.jpeg" alt="" />
            <div class="sub-img">
            </div>
        </div>
        <!--Diem don tra-->
        <div class="part-detail${product.productID} diem-don-tra" id="diem-don-tra${product.productID}">
            <div class="luu-y">
                <h3>Lưu ý</h3>
                <p>
                Các mốc thời gian đón trả bên dưới là thời gian dự kiến. <br />
                Lịch này có thể thay đổi tùy tình hình thực tế
                </p>
            </div>

            <div id="stopList${product.productID}">
                ${renderStopList(product)}
            </div>
        </div>
<!--Tien ich-->
<div class="part-detail${product.productID} tien-ich" id="tien-ich${product.productID}">
<ul class="list-tien-ich">
<h3>Tiện ích</h3>
${product.tienIch}
</ul>
</div>
<!--Chinh sach -->
<div class="part-detail${product.productID} chinh-sach" id="chinh-sach${product.productID}">
<!--            <h3>Chính sách nhà xe</h3>-->
${product.policy}
</div>
<!--Review-->
<div class="part-detail${product.productID} review" id="review${product.productID}">
<!--          <h3>Mô tả</h3>-->
${product.description}
</div>
</div>
</div>
</div>

        <!-- START Form đặt vé -->
    <div id="frmDatVe${product.productID}" class="frmDatVe-modal">
        <form class="frmDatVe p-4 rounded-1 m-auto">
            <h3 class="text-center">Đặt vé</h3>

            <div class="row d-flex">
                <p class="col-sm-3">Tên vé:</p>
                <div class="col-sm-9">
                <p class="">${product.productName}</p>
                </div>
            </div>

            <div class="row d-flex">
                <p class="col-sm-3">Nhà Xe:</p>
                <div class="col-sm-9">
                <p class="">${product.storeName}</p>
                </div>
            </div>

            <div class="row mb-3 d-flex">
                <p class="col-sm-3">Giá vé:</p>
                <div class="col-sm-9">
                <p class="">${product.price}đ</p>
                </div>
            </div>

            <div class="row mb-3">
                <label for="pickUpAddress" class="col-sm-3 col-form-label"
                >Điểm đón:</label
                >
                <div class="col-sm-9">
                <input type="text" class="form-control" id="pickUpAddress" name="pickUpAddress" placeholder="Điểm đón"
                    required autofocus="autofocus"
                />
                </div>
            </div>

            <div class="row mb-3">
                <label for="destinationAddress" class="col-sm-3 col-form-label"
                >Điểm đến:</label
                >
                <div class="col-sm-9">
                <input type="text" class="form-control" id="destinationAddress" name="destinationAddress"
                    placeholder="Điểm đến" required autofocus="autofocus"
                />
                </div>
            </div>

            <div class="row mb-3">
                <label for="pickTime" class="col-sm-3 col-form-label">Thời gian đón:</label>
                <div class="col-sm-9">
                    <input type="datetime-local"  required autofocus="autofocus"
                        class="form-control" id="pickTime" name="pickTime" 
                    />
                </div>
            </div>

            <div class="row mb-3">
                <label for="message" class="col-sm-3 col-form-label" >Lời nhắn:</label>
                <div class="col-sm-9">
                <textarea class="form-control" id="message" name="message" rows="3"></textarea>
                </div>
            </div>

            <div class="row mb-3">
                <label for="phoneNumber" class="col-sm-3 col-form-label">Số điện thoại:</label>
                <div class="col-sm-9">
                    <input type="number" placeholder="Số điện thoại" required autofocus="autofocus"
                        class="form-control" id="phoneNumber" name="phoneNumber" 
                    />
                </div>
            </div>

            <div class="row mb-3">
                <label for="quantity" class="col-sm-3 col-form-label">Số lượng vé:</label>
                <div class="col-sm-9">
                    <input type="number" placeholder="Số lượng vé" required autofocus="autofocus"
                        class="form-control" id="quantity" name="quantity"
                    />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-sm-6 offset-sm-3">
                    <button type="button" class="btn btn-primary" onclick="handleOrder(${product.productID})">Đặt vé</button>
                    <button type="button" class="btn btn-danger"onclick="dismissForm(${product.productID})">Hủy</button>
                </div>
            </div>
        </form>
    </div>
    <!-- END Form đặt vé -->
`;

  productListDiv.appendChild(productDiv);
  if (!temp1) {
      return productDiv.outerHTML;    
  }


}

function handleOrder(productID) {
    var data = {};
    data.pickUpAddress = $('#pickUpAddress').val();
    data.destinationAddress = $('#destinationAddress').val();
    data.pickTime = $('#pickTime').val();
    data.message = $('#message').val();
    data.phoneNumber = $('#phoneNumber').val();
    data.quantity = $('#quantity').val();
    console.log(data);
    fetch(serverPort + `/api/v1/user/${productID}/order`, postAuth(data))
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log('Lỗi đặt vé: ', error)
    })
}

function renderStopList(product) {
    const ul = document.createElement('ul');
    product.stopList.forEach(function (stop) {
        const li = document.createElement('li');
        const formattedStopTime = moment(stop.stopTime, "HH:mm:ss").format('HH:mm');
        li.innerHTML =
            displayValue(formattedStopTime) +
            ' - ' + displayValue(stop.stopAddress) + (displayValue(stop.rightNow) ? ' - Vị trí hiện tại' : '');
        if (displayValue(stop.rightNow) == true) {
            li.style.color = 'red';
        }
        ul.appendChild(li);
    });

    //console.log(typeof ul);
    return ul.outerHTML;
  }

function renderNoticeList(product) {
    if (product.noticeList && product.noticeList.length > 0) {
        const noticeListChild = document.createElement('div');
        noticeListChild.classList.add('notice-list-child');
        // Lấy 3 notice cuối cùng
        const lastThreeNotices = product.noticeList.slice(-5);
  
        lastThreeNotices.forEach(function (notice) {
            const noticeDiv = document.createElement('div');
            noticeDiv.classList.add('notice-div');
            var status = notice['expired'] ? 'Hết hiệu lực' : 'Còn hiệu lực';
            var formattedLastUpdate = moment(notice['lastUpdate']).format('HH:mm DD/MM/YYYY');
  
            noticeDiv.innerHTML = `
                <h6 style="color: green">${notice.storeName}</h6>
                <h6 style="color: red">Thông báo: ${notice.title}</h6>
                <p>${notice.content}</p>
                <p>${notice.expired ? 'Hết hiệu lực' : 'Còn hiệu lực'}</p>
                <p>Sửa đổi lần cuối: ${formattedLastUpdate}</p>
                    `;
            noticeListChild.appendChild(noticeDiv);
        });
        //console.log(noticeListChild.toString());
        return noticeListChild.outerHTML;
    }
}


function showPartDetail(productId, typeDetail) {
    const partDetails = document.querySelectorAll('.part-detail' + productId);
    partDetails.forEach(function (partDetail) {
        partDetail.style.display = 'none';
    });

    const menuDetails = document.querySelectorAll('.menu-detail' + productId);
    menuDetails.forEach(function (menuDetail) {
        menuDetail.style.color = 'black';
    });

    if (typeDetail === 1) {
        const detailImgElement = document.getElementById('detai-img' + productId);
        const menuImgElement = document.getElementById('detail-img-b' + productId);
        //displayAndChangeColor(detailImgElement, menuImgElement);
        menuImgElement.style.color = '#2474E5';
        detailImgElement.style.display = 'flex';
    }
    else if (typeDetail === 2) {
        const detailTienIchElement = document.getElementById('tien-ich' + productId);
        const menuTienIchElement = document.getElementById('tien-ich-b' + productId);
        displayAndChangeColor(detailTienIchElement, menuTienIchElement);
    }
    else if (typeDetail === 3) {
        const detailDiemDonTraElement = document.getElementById('diem-don-tra' + productId);
        const menuDiemDonTraElement = document.getElementById('diem-don-tra-b' + productId);
        displayAndChangeColor(detailDiemDonTraElement, menuDiemDonTraElement);
    }
    else if (typeDetail === 4) {
        const detailChinhSachElement = document.getElementById('chinh-sach' + productId);
        const menuChinhSachElement = document.getElementById('chinh-sach-b' + productId);
        displayAndChangeColor(detailChinhSachElement, menuChinhSachElement);
    }
    else if (typeDetail === 5) {
        const detailReviewElement = document.getElementById('review' + productId);
        const menuReviewElement = document.getElementById('review-b' + productId);
        displayAndChangeColor(detailReviewElement, menuReviewElement);
    }
}

function displayAndChangeColor(detail, menu) {
    menu.style.color = '#2474E5';
    detail.style.display = 'block';
}