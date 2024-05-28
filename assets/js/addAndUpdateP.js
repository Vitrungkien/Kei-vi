var desEditor;    
var poEditor;
var tienEditor;
renderCreateProductForm();
fetchData();

//START BOTH CREATE AND UPDATE AREA
//START Hàm xử lý submit cập nhật sản phẩm - (gọi inline trong button submit)
function putProduct(productId) {
        //var submitBtn = $("#submit-btn");
        var data = {};
        data['productName'] = $('#productName').val();
        data['productImage'] = $('#productImage').val();
        data['remainSeat'] = $('#remainSeat').val();
        data['price'] = $('#price').val();
        data['bienSoXe'] = $('#bienSoXe').val();
        data['type'] = $('#type').val();
        data['phoneNumber'] = $('#phoneNumber').val();
        data['phoneNumber2'] = $('#phoneNumber2').val();
        data['startTime'] = $('#startTime').val();
        data['endTime'] = $('#endTime').val();
        data['startAddress'] = $('#startAddress').val();
        data['endAddress'] = $('#endAddress').val();
        data['description'] = desEditor.getData();
        data['policy'] = poEditor.getData();
        data['tienIch'] = tienEditor.getData();

        var listStops = [];//Khởi tạo mảng để lưu danh sách điểm dừng
        var stopArr = document.querySelectorAll('.stop-at');//Lấy các elements chứa điểm dừng
        stopArr.forEach( (stop) => {
            //Khởi tạo đối tượng stopObj để lưu giá trị các thuộc tính của đối tượng
            var stopObj = {};
            //Lấy các giá trị từ các input trong el là giá trị của thuộc tính 
            if (productId) {
                stopObj['stopID'] = $(stop).find('input[name="stopID"]').val();
            }
            stopObj['stopAddress'] = $(stop).find('input[name="stopAddress"]').val();
            stopObj['stopTime'] = $(stop).find('input[name="stopTime"]').val();
            stopObj['deleted'] = $(stop).find('input[name="deleted"]').val();
            //Thêm điểm dừng vào danh sách các điểm dừng
            listStops.push(stopObj);
        })

        data['stopList'] = listStops;

        productId ? sendUpdateForm(data, productId) : sendCreateForm(data); 

}
function createCkeditor(){
    //Start Config ck editor
    let options = {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        },
        language: 'vi'
    }
        ClassicEditor.create( document.querySelector('#description'),  options)
            .then(newEditor => {
                desEditor = newEditor;
            })
            .catch( error => {
                console.log( error );
            } );
    
        ClassicEditor.create( document.querySelector( '#policy' ), options )
            .then (newEditor => {
                poEditor = newEditor;
            })
            .catch( error => {
                console.log( error );
            } );
    
        ClassicEditor.create( document.querySelector( '#tien-ich' ), options )
            .then(newEditor => {
                tienEditor = newEditor;
            })
            .catch( error => {
                console.log( error );
            } );
    //End config ckedior

}
//END BOTH CREATE AND UPDATE AREA    



//START UPDATE PRODUCT AREA
async function fetchData() {
    try {
        // var desEditor;    
        // var poEditor;
        // var tienEditor;
        let stopCount = 0;
        const productListDiv = document.getElementById('productUpdateForm');
        if (productListDiv) {
        const currentUrl = window.location.href;
        var urlParams = new URLSearchParams(window.location.search);
        var productId = urlParams.get('id');
        const response = await fetch('http://localhost:8080/api/v1/seller/my-store/' + productId, getAuth);
        const product = await response.json();
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
        <form  class="row addform">

        <div class="row" style="padding-left: 60px;">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6">
                <!--        Tên sản phẩm-->
                        <div class="mb-3">
                            <label for="productName" class="form-label">Tên vé</label>
                            <input type="text" class="form-control" id="productName" name="productName"
                                placeholder="Nhập tên sản phẩm" value="${product.productName}"
                                required
                            >
                        </div>

                <!--        Ảnh sản phẩm-->
                        <div class="mb-3">
                            <label for="productImage" class="form-label">URL hình ảnh sản phẩm</label>
                            <input type="text" class="form-control" id="productImage" name="productImage"
                                placeholder="Nhập URL hình ảnh sản phẩm" value="${product.productImage}"
                            >
                        </div>

                <!--        Chỗ trống-->
                        <div class="mb-3">
                            <label for="remainSeat" class="form-label">Số lượng chỗ còn lại</label>
                            <input type="number" class="form-control" id="remainSeat" name="remainSeat"
                                placeholder="Nhập số lượng chỗ còn lại" value="${product.remainSeat}"
                            >
                        </div>

                <!--        Giá vé-->
                        <div class="mb-3">
                            <label for="price" class="form-label">Giá vé</label>
                            <input type="number" class="form-control" id="price" name="price"
                                placeholder="Nhập giá" value="${product.price}"
                            >
                        </div>

                <!--        Biển số xe     -->
                        <div class="mb-3">
                            <label for="bienSoXe" class="form-label">Biển số xe</label>
                            <input type="text" class="form-control" id="bienSoXe" name="bienSoXe"
                                placeholder="Nhập biển số xe" value="${product.bienSoXe}"
                            >
                        </div>
                        <!-- Loại xe-->
                        <div class="mb-3">
                        <label for="type" class="form-label">Loại xe</label>
                        <input type="text" class="form-control" id="type" name="type" placeholder="Nhập loại xe" value="${product.type}" required>
                        </div>

                    </div>

                    <div class="col-lg-6 " style="padding-left: 30px;">
                <!--    Số điện thoại 1-->
                        <div class="mb-3">
                            <label for="phoneNumber" class="form-label">Số điện thoại 1</label>
                            <input type="text" class="form-control" id="phoneNumber" name="phoneNumber"
                                placeholder="Nhập số điện thoại 1" value="${product.phoneNumber}"
                            >
                        </div>

                <!--    Số điện thoại 2-->
                        <div class="mb-3">
                            <label for="phoneNumber2" class="form-label">Số điện thoại 2</label>
                            <input type="text" class="form-control" id="phoneNumber2" name="phoneNumber2"
                                placeholder="Nhập số điện thoại 2" value="${product.phoneNumber2}"
                            >
                        </div>
                <!--    Giờ xuất phát-->
                        <div class="mb-3">
                            <label for="startTime" class="form-label">Thời gian xuất phát</label>
                            <input type="time" class="form-control" id="startTime" name="startTime"
                                placeholder="Nhập thời gian bắt đầu" value="${product.startTime}"
                                required
                            >
                        </div>

                <!--    Giờ đến dự tính-->
                        <div class="mb-3">
                            <label for="endTime" class="form-label">Thời gian đến dự kiến</label>
                            <input type="time" class="form-control" id="endTime" name="endTime"
                                placeholder="Nhập thời gian đến dự kiến" value="${product.endTime}"
                            >
                        </div>

                <!--    Địa chỉ xuất phát-->
                        <div class="mb-3">
                            <label for="startAddress" class="form-label">Địa chỉ xuất phát</label>
                            <input type="text" class="form-control" id="startAddress" name="startAddress"
                                placeholder="Nhập địa chỉ bắt đầu" value="${product.startAddress}"
                            >
                        </div>

                <!--    Địa chỉ điểm đến cuối-->
                        <div class="mb-3">
                            <label for="endAddress" class="form-label">Địa chỉ điểm đến cuối</label>
                            <input type="text" class="form-control" id="endAddress" name="endAddress"
                                placeholder="Nhập địa đích đến" value="${product.endAddress}"
                            >
                        </div>
                    </div>
                </div>

                <div class="row" >

                    <div class="col-lg-12">
                        <div class="mb-3">
                            <h4 class="m-2">Các điểm dừng</h4>
                            <div id="stopList">
                            <div class="d-flex">
                                <h5 class="m-2" style="width: 70%; font-weight: bold">Địa chỉ</h5>
                                <h5 style="font-weight: bold; margin: 8px 8px 8px 0">Thời gian</h5>
                            </div>
                            
                            </div>
                            <input type="button" class="btn btn-primary m-2" id="addStop" value="Thêm địa chỉ dừng chân">
                        </div>
                    </div>
            </div>
            </div>

            <div class="col-lg-6">
                        <!-- Mô tả sản phẩm-->
                        <div class="mb-3">
                            <label for="description" class="form-label">Mô tả chuyến xe</label>
                            <textarea class="form-control" id="description" name="description" rows="3"
                                placeholder="Nhập mô tả"
                            >${product.description}</textarea>
                        </div>
                        <!--Chính sách nhà xe-->
                        <div class="mb-3">
                            <label for="policy" class="form-label">Chính sách</label>
                            <textarea class="form-control" id="policy" name="policy" rows="3" placeholder="Nhập chính sách">
                                ${product.policy}
                            </textarea>
                        </div>
                        <!--Tiện ích của xe-->
                        <div class="mb-3">
                            <label for="tien-ich" class="form-label">Tiện ích</label>
                            <textarea class="form-control" id="tien-ich" name="tienIch" rows="3" placeholder="Nhập tiện ích">
                                ${product.tienIch}
                            </textarea>
                        </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary" id="submit-btn" onclick="putProduct(${productId})">Submit</button>

        </form>
        `;

        productListDiv.appendChild(productDiv);

            //START hiển thị điểm dừng
        const stopListDiv = document.getElementById('stopList');
        if (product.stopList && product.stopList.length > 0) {
            product.stopList.forEach(function (stop) {
            // Tạo một div mới cho điểm dừng
                const newStopDiv = document.createElement('div');
                newStopDiv.classList.add('stop-at');
                newStopDiv.id = 'stop-at' + stopCount;
                newStopDiv.innerHTML = 
                `
                    <input type="hidden" class="form-control m-2" placeholder="Nhập stopId" name="stopID" value="${stop.stopID}">
                    <input type="text" class="form-control m-2" placeholder="Nhập địa chỉ" name="stopAddress" value="${stop.stopAddress}"
                        id="stopAddress${stopCount}" required
                    >
                    <input type="time" class="form-control m-2 w-25" name="stopTime" value="${stop.stopTime}" id="stopTime${stopCount}" required>
                    <input type="hidden" class="form-control m-2" name="deleted" value="${stop.deleted}" id="deleted${stopCount}">
                    <button type="button" class="btn btn-danger m-2" onclick="removeStopUpdate(${stopCount})">Xóa</button>
                `;
                stopCount++;
                stopListDiv.appendChild(newStopDiv);
            })
        }
        //END hiển thị điểm dừng


                //START thêm 1 điểm dừng
                document.getElementById('addStop').addEventListener('click', function () {
                    // Tạo một div mới cho điểm dừng
                    const newStopDiv = document.createElement('div');
                    newStopDiv.classList.add('stop-at');

                    newStopDiv.innerHTML = 
                    `
                        <input type="hidden" class="form-control m-2" name="stopID" value="-1" placeholder="Nhập stopId">
                        <input type="text" class="form-control m-2" name="stopAddress" placeholder="Nhập địa chỉ" required>
                        <input type="time" class="form-control m-2 w-25" name="stopTime" placeholder="Nhập thời gian">          
                        <input type="hidden" name="deleted" value="false" id="deleted'+ stopCount">  
                    `;
                    // Tạo nút xóa
                    const deleteButton = document.createElement('button');
                    deleteButton.type = 'button';
                    deleteButton.classList.add('btn', 'btn-danger', 'm-2');
                    deleteButton.textContent = 'Xóa';

                    deleteButton.addEventListener('click', function () {
                        newStopDiv.remove();
                    });

                    // Thêm input và nút xóa vào div mới
                    newStopDiv.appendChild(deleteButton);

                    // Thêm div mới vào #stopList
                    document.getElementById('stopList').appendChild(newStopDiv);

                    // Tăng số đếm
                    stopCount++;
                });   
                //END thêm 1 điểm dừng   

        createCkeditor();
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
function removeStopUpdate(num) {
    const stop = document.getElementById('stop-at' + num);
    const deleted = document.getElementById('deleted' + num);
    const stopAddress = document.getElementById('stopAddress' + num);
    const stopTime = document.getElementById('stopTime' + num);
    stopAddress.required = false;
    stopTime.required = false;
    deleted.value = 'true';
    stop.style.display = 'none';
}
function sendUpdateForm(data, productId) {
    fetch(serverPort + `/management/my-store/${productId}/update-product`, postAuth(data))
    .then(response => response.json())
    .then(result => {
        console.log('Kết quả data cập nhật: ', result);
    })
    .catch(error => {
        console.log('Fetch error(add product):', error);
    })
}
//END UPDATE PRODUCT AREA


//CREATE PRODUCT AREA
function renderCreateProductForm() {
    const addProduct = $('#add-product');
    // const addProduct = document.querySelector('#add-product');
    // console.log(test, addProduct);
    if (addProduct.length) {
        console.log('Có add-product');
        addProduct.html(
            `
            <h1 style="text-align: center" class="m-2">Thêm vé xe</h1>

            <form class="row addform">
        
            <div class="row" style="padding-left: 60px;">
        
                <div class="col-lg-6">
        
                <div class="row">
                    <div class="col-lg-6 ">
                    <!--        Tên sản phẩm-->
                    <div class="mb-3">
                        <label for="productName" class="form-label">Tên vé</label>
                        <input type="text" class="form-control" id="productName" name="productName"
                            placeholder="Nhập tên sản phẩm" value=""
                            required
                        >
                    </div>
        
                    <!--        Ảnh sản phẩm-->
                    <div class="mb-3">
                        <label for="productImage" class="form-label">URL hình ảnh sản phẩm</label>
                        <input type="text" class="form-control" id="productImage" name="productImage"
                            placeholder="Nhập URL hình ảnh sản phẩm" value=""
                        >
                    </div>
        
                    <!--        Chỗ trống-->
                    <div class="mb-3">
                        <label for="remainSeat" class="form-label">Số lượng chỗ còn lại</label>
                        <input type="number" class="form-control" id="remainSeat" name="remainSeat"
                            placeholder="Nhập số lượng chỗ còn lại" value=""
                        >
                    </div>
        
                    <!--        Giá vé-->
                    <div class="mb-3">
                        <label for="price" class="form-label">Giá vé</label>
                        <input type="number" class="form-control" id="price" name="price"
                            placeholder="Nhập giá" value=""
                        >
                    </div>
        
                    <!--        Biển số xe     -->
                    <div class="mb-3">
                        <label for="bienSoXe" class="form-label">Biển số xe</label>
                        <input type="text" class="form-control" id="bienSoXe" name="bienSoXe"
                            placeholder="Nhập biển số xe" value=""
                        >
                    </div>
        
                    <div class="mb-3">
                        <label for="type" class="form-label">Loại xe</label>
                        <input type="text" class="form-control" id="type" name="type" placeholder="Nhập loại xe" required>
                    </div>
        
                    </div>
        
                    <div class="col-lg-6" style="padding-left: 30px;">
        
                    <div class="mb-3">
                        <label for="phoneNumber" class="form-label">Số điện thoại 1</label>
                        <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Nhập số điện thoại 1" required>
                    </div>
        
                    <div class="mb-3">
                        <label for="phoneNumber2" class="form-label">Số điện thoại 2</label>
                        <input type="text" class="form-control" id="phoneNumber2" name="phoneNumber2" placeholder="Nhập số điện thoại 2" >
                    </div>
        
                    <div class="mb-3">
                        <label for="startTime" class="form-label">Thời gian xuất phát</label>
                        <input type="time" class="form-control" id="startTime" name="startTime" placeholder="Nhập thời gian xuất phát" required>
                    </div>
        
                    <div class="mb-3">
                        <label for="endTime" class="form-label">Thời gian đến dự kiến</label>
                        <input type="time" class="form-control" id="endTime" name="endTime" placeholder="Nhập thời gian đến dự kiến" >
                    </div>
        
                    <div class="mb-3">
                        <label for="startAddress" class="form-label">Địa chỉ xuất phát</label>
                        <input type="text" class="form-control" id="startAddress" name="startAddress" placeholder="Nhập địa chỉ bắt đầu" required>
                    </div>
        
                    <div class="mb-3">
                        <label for="endAddress" class="form-label">Địa chỉ đích đến</label>
                        <input type="text" class="form-control" id="endAddress" name="endAddress" placeholder="Nhập địa đích đến" required>
                    </div>
                    </div>
        
                </div>
        
                <div class="row">
        
                    <div class="mb-3">
                    <h4 class="m-2">Các điểm dừng</h4>
                    <div id="stopList">
                        <div class="d-flex">
                        <h5 class="m-2" style="width: 70%; font-weight: bold">Địa chỉ</h5>
                        <h5 style="font-weight: bold; margin: 8px 8px 8px 0">Thời gian</h5>
                        </div>
                        <div class="stop-at" id="stop-at0">
                        <input type="text" class="form-control m-2" id="stopAddress0" name="stopAddress" placeholder="Nhập địa chỉ">
                        <input type="time" class="form-control m-2 w-25" id="stopTime0" name="stopTime" placeholder="Nhập thời gian">
                        <input type="hidden" class="form-control m-2" id="stop-deleted0" name="deleted" value="false">
                        <button type="button" class="btn btn-danger m-2" onclick="removeStopCreate(0)">Xóa</button>
                        </div>
        
                        <div class="stop-at" id="stop-at1">
                        <input type="text" class="form-control m-2" id="stopAddress1" name="stopAddress" placeholder="Nhập địa chỉ">
                        <input type="time" class="form-control m-2 w-25" id="stopTime1" name="stopTime" placeholder="Nhập thời gian">
                        <input type="hidden" class="form-control m-2" id="stop-deleted1" name="deleted" value="false">
                        <button type="button" class="btn btn-danger m-2" onclick="removeStopCreate(1)">Xóa</button>
                        </div>
        
                    </div>
                    <input type="button" class="btn btn-primary m-2" id="addStop" value="Thêm địa chỉ dừng chân">
                    </div>
        
                </div>
        
                </div>
        
                <div class="col-lg-6">
                <div class="col-lg-12">
                    <!--    Mô tả sản phẩm-->
                    <div class="mb-3">
                    <label for="description" class="form-label">Mô tả chuyến xe</label>
                    <textarea class="form-control" id="description" name="description" rows="3"
                                placeholder="Nhập mô tả"
                    ></textarea>
                    </div>
        
                    <div class="mb-3">
                    <label for="policy" class="form-label">Chính sách</label>
                    <textarea class="form-control" id="policy" name="policy" rows="3" placeholder="Nhập chính sách">
                    <h5><strong>Chính sách nhà xe</strong></h5><h6><strong>Yêu cầu khi lên xe</strong></h6><ul><li>Không vứt rác trên xe</li><li>Không mang đồ ăn, thức ăn có mùi lên xe</li><li>Không hút thuốc, uống rượu, sử dụng chất kích thích trên xe</li><li>Không mang các vật dễ cháy nổ lên xe</li><li>Không làm ồn, gây mất trật tự trên xe</li></ul><h6><strong>Hành lý sách tay</strong></h6><ul><li>Tổng trọng lượng sách tay không quá 10kg</li></ul><h6><strong>Trẻ em và phụ nữ có thai</strong></h6><ul><li>Trẻ em dưới 3 tuổi hoặc dưới 110 cm được miễn phí vé nếu ngồi cùng ghế/giường với bố mẹ</li><li>Trẻ em từ 3 tuổi hoặc cao từ 110 cm trở lên mua vé như người lớn</li></ul><h6><strong>Động vật cảnh/thú cưng</strong></h6><ul><li>Nhận chở chó, mèo</li></ul>
                </textarea>
                    </div>
        
                    <div class="mb-3">
                    <label for="tien-ich" class="form-label">Tiện ích</label>
                    <textarea class="form-control" id="tien-ich" name="tienIch" rows="3"
                                placeholder="Nhập tiện ích"
                    ></textarea>
                    </div>
        
                </div>
                </div>
            </div>
        
            <button type="button" class="btn btn-primary" id="submit-btn" onclick="putProduct()">Submit</button>
        
            </form>        
            `
        );
        createCkeditor();
        handleCreateStop();
    }
}
function handleCreateStop() {
    let stopCount = 2; // Bắt đầu với 2 vì đã có 2 điểm dừng mặc định

    document.getElementById('addStop').addEventListener('click', function () {
        // Tạo một div mới cho điểm dừng
        const newStopDiv = document.createElement('div');
        newStopDiv.classList.add('stop-at', 'remove-flag-'+stopCount);
        newStopDiv.innerHTML = 
        `
        <input type="text" name="stopAddress" class="form-control m-2" placeholder="Nhập địa chỉ">
        <input type="time" name="stopTime" class="form-control m-2 w-25" placeholder="Nhập địa chỉ">
        <input type="hidden" name="deleted" class="form-control m-2">
        <button class="btn btn-danger m-2" onclick="removeStopDiv(${stopCount})">Xóa</button>
        `;
        document.getElementById('stopList').appendChild(newStopDiv);
        // Tăng số đếm
        stopCount++;
    });
}
function removeStopCreate(num) {
    const stop = document.getElementById('stop-at' + num);
    const stopDeleted = document.getElementById('stop-deleted' + num);
    stop.style.display = 'none';
    stopDeleted.value = 'true';
}
function removeStopDiv(stopCount) {
    $('.remove-flag-'+stopCount).remove();
}
function sendCreateForm(data) {
    fetch(serverPort + `/management/my-store/add-product`, postAuth(data))
      .then(response => response.json())
      .then(result => {
          console.log('Kết quả vé đã thêm: ', result);
      })
      .catch(error => {
        console.log('Fetch error(add product):', error);
      })
}
//END CREATE PRODUCT AREA