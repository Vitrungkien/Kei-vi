//<!--Danh sach products-->
//<script>
//$(`#qltb`).hide();
    function displayValue(value) {
        return (value !== null && value !== undefined) ? value : 'null';
    }

    //START RENDER danh sach ve xe của nhà xe
    fetch('http://localhost:8080/api/v1/seller/my-store/all-product', getAuth)
        .then(response => response.json())
        .then(products => {

        const table = document.getElementById('tb-product');
        var stt = 1;
        products.forEach(product => {
            let curLocation = [];
            const timeDifferenceString = calculateTimeDifference(product['startTime'], product['endTime']);
            const formattedStartTime = moment(product['startTime'], "HH:mm:ss").format('HH:mm');
            const formattedEndTime = moment(product['endTime'], "HH:mm:ss").format('HH:mm');
            const formattedCreatedAt = moment(product['createdAt']).format('HH:mm DD/MM/YYYY');
            const row = table.insertRow();
            row.id = 'row' + product['productID'];
            row.insertCell().textContent = stt++;
            row.insertCell().textContent = product['productID'];
            row.insertCell().innerHTML = '<img src="./assets/img/Picture1.png" alt="Image">';
            row.insertCell().textContent = product['productName'];
            row.insertCell().textContent = product['startAddress'];
            row.insertCell().textContent = product['endAddress'];
            row.insertCell().textContent = formattedStartTime;
            row.insertCell().textContent = product['remainSeat'] + ' ghế';
            row.insertCell().textContent = product['price'];
            row.insertCell().textContent = product['phoneNumber'];
            row.insertCell().textContent = formattedCreatedAt;
            var displays = product['display'] ? 'Hiển thị' : 'Ẩn';
            row.insertCell().textContent = displays;
            var detailP = renderOneProduct(product);
            // console.log(typeof detailP, detailP);
            row.insertCell().innerHTML = `
            <div class="actions">
            <button class="chi-tiet btn-action btn btn-info" onclick="showDetailProduct(${product.productID})">Chi tiết</button>
            ${detailP} 
            <button class="update btn-action btn btn-primary"> <a href="update-product.html?id=${product.productID}" >Sửa</a> </button>
            
            <button class="delete btn-action btn btn-danger"
                    data-bs-toggle="modal" data-bs-target="#myModal${product.productID}"
                >
                Xóa
            </button>            
                <!-- The Modal delete-->
                <div class="modal" id="myModal${product.productID}">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title">Xóa vé</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body">
                                Bạn có chắc chắn muốn xóa vé này?
                            </div>

                            <!-- Modal footer -->
                            <div class="modal-footer">                         
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                    onclick="softDelete(${product.productID})">
                                    Đồng ý
                                </button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>

            
             <!-- Hide button -->    
            <button class="hide btn-action btn btn-dark" id="hide${product.productID}"
                onclick="hideProduct(${product.productID})">
                Ẩn
            </button>

            <!-- Show button -->  
            <button class="show btn-action btn btn-success" id="show${product.productID}"
                onclick="displayProduct(${product.productID})">
                Hiện
            </button>
            
            <!-- Share location button -->      
            <button class="show btn-action btn btn-primary"
                onclick="openMarkStopForm(${product.productID})">
                Chia sẻ vị trí
            </button>


            <div id="mark-stop-backgr${product.productID}" class="mark-stop-backgr">
                <form class="mark-stop-form" id="mark-stop-form${product.productID}"
                >
                    <!-- Form content here!  -->  
                </form>
            </div>
        </div>`;
        
            document.querySelector('#order-btn-m').remove();
            document.querySelector('#exit-p-view' + product.productID).style.display = 'block';

            
            // Hiển thị/ẩn sản phẩm
            const showBtn = document.getElementById(`show${product.productID}`);
            const hideBtn = document.getElementById(`hide${product.productID}`);
            if (displays == 'Ẩn') {
                showBtn.style.display = 'block';
                hideBtn.style.display = 'none';
            }
            else {
                showBtn.style.display = 'none';
                hideBtn.style.display = 'block';
            }

            //START Thêm list stop và xử lý
            const markStopListDiv = document.getElementById(`mark-stop-form${product.productID}`);
            const h3 = document.createElement('h3');
            h3.textContent = 'Chia sẻ vị trí';
            markStopListDiv.appendChild(h3);

            if (product.stopList && product.stopList.length > 0) {
                let stopCount = 0;
                product.stopList.forEach(function (stop) {
                    // Tạo một div mới cho điểm dừng
                    const newStopDiv = document.createElement('div');
                    newStopDiv.classList.add('stop-at');
                    newStopDiv.style.display = 'flex';
                    newStopDiv.id = 'stop-at' + stopCount;
                    // var newStopDiv = `
                    // <div id="stop-at${stopCount}" class="stop-at" style="display: flex;">
                    // </div>`;
                    newStopDiv.innerHTML = `
                        <input type="hidden" class="form-control m-2" placeholder="Nhập stopId"
                            name="stopID" value="${stop.stopID}"
                        >
                        <input type="text" class="form-control m-2"
                            name="stopAddress" value="${stop.stopAddress}"
                            style="width: 65%;"
                            readonly
                        >
                        <input type="time" class="form-control m-2 w-25"
                            name="stopTime" value="${stop.stopTime}"
                            readonly
                        >
                        <input type="radio" class="rightNow${product.productID}" style="width: 30px;"
                            name="rightNow"
                            value="${stop.rightNow}" 
                            id="rightNow${stopCount}${product.productID}"
                            ${stop.rightNow ? "checked" : ''}
                            onchange="toggleInputs(${stopCount}, ${product.productID})"
                            
                        >`;
                    curLocation[stopCount] = stop.rightNow;
                        // ${stop.rightNow ? 'checked' : ''}
                    
                    markStopListDiv.appendChild(newStopDiv);
                    stopCount++;
                })

                //console.log(`id(${product.productID}): ` + curLocation);

                //START tạo các nút trong form share vị trí
                const div = document.createElement('div');
                div.innerHTML = `
                    <button class="resetMarkBtn btn btn-dark" type="button"
                            style="width: 100px;" onclick="resetChecked(${stopCount}, ${product.productID})">
                            Tắt chia sẻ
                    </button>
                    <button type="button" class="btn btn-danger" 
                        style="float: right; margin-left: 8px"
                        id= "close-mark-btn-${product.productID}">
                        Hủy
                    </button>
                    <button 
                        type="submit" 
                        id="mark-stop-btn${product.productID}" 
                        class="btn btn-primary" 
                        style="margin-left: 8px; float: right">
                        Xong
                    </button>
                        `;
                        // onclick="closeMarkStopForm(${product.productID}, [${curLocation}])"
                markStopListDiv.appendChild(div);
                //END tạo các nút trong form share vị trí

                // START Xử lý click nút close form share vị trí
                var closeMarkBtn = document.querySelector(`#close-mark-btn-${product.productID}`);
                closeMarkBtn.onclick = e => {
                    const newNotice = document.getElementById('mark-stop-backgr' + product.productID);
                    newNotice.style.display = 'none';

                    const checkboxes = document.querySelectorAll(`.rightNow${product.productID}`);
                    checkboxes.forEach( (element, i) => {
                        element.value = curLocation[i];
                        if (curLocation[i] == 'true') {
                            element.checked = true;
                        }
                        else {
                            element.checked = false;
                        }
                        console.log(curLocation[i], element.value, element.checked, element.id);
                    });
                    
                    // element.checked = curLocation[i] ? true : false;
                    console.log('closeBtn: ' + curLocation);
                }
                // END Xử lý click nút close form share vị trí

                // START Xử lý click nút xong khi thay đổi vị trí
                var markStopfm = document.querySelector(`#mark-stop-btn${product.productID}`);
                    markStopfm.onclick = e => {
                        e.preventDefault();
                        updateCurLocation();//cập nhật thay đổi của vị trí trong mảng trạng thái

                        //START lấy data đã cập nhật
                        const stopListForm = []; //Mảng lưu data(id và trạng thái vị trí) để gửi 
                        const stopList = markStopListDiv.querySelectorAll('.stop-at');
                        stopList.forEach(stop => {
                            const stopId = stop.querySelector(`input[name="stopID"]`).value;
                            const rightNow = stop.querySelector(`input[name="rightNow"]`).value;
                            const stopObj = {stopId, rightNow};
                            stopListForm.push(stopObj);
                            
                        })
                        //END lấy data đã cập nhật
                        //START gửi yêu cầu cập nhật vị trí và xử lý phản hồi
                        fetch('http://localhost:8080/management/my-store/mark-stop', postAuth(stopListForm))
                            .then(response => response.json())
                            .then(result => {
                                //console.log('Mark successfully');
                                const newNotice = document.getElementById('mark-stop-backgr' + product.productID);
                                newNotice.style.display = 'none';
                                setTimeout(() => {
                                    alert('Cập nhật vị trí thành công');                             
                                }, 100);
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        //END gửi yêu cầu cập nhật vị trí và xử lý phản hồi
                        return false;
                    }

                    //START hàm cập nhật mảng lưu trạng thái vị trí
                    function updateCurLocation() {
                        const checkboxes = document.querySelectorAll(`.rightNow${product.productID}`);
                        checkboxes.forEach( (element, i) => {
                            curLocation[i] = element.value;
                        });
                        console.log('update: ' + curLocation);
                    }
                    //END hàm cập nhật mảng lưu trạng thái vị trí
                // END Xử lý click nút xong khi thay đổi vị trí
            }
            //END thêm list stop và xử lý
        });
    })
    .catch(error => console.error('Error fetching products:', error));
    //END RENDER danh sach ve xe của nhà xe
//</script>



//<script>
//START ACTION CHI TIẾT
    //Hàm hiện chi tiết vé xe trên trang quản lý
    function showDetailProduct(productId) {
        $(".ve-xe").hide();
        //hideAllProductForm();
        const productFrm = document.getElementById('productId' + productId);
        if (productFrm.style.display === 'none' || productFrm.style.display === '') {
            productFrm.style.display = 'grid';
        }
        else if (productFrm.style.display === 'grid') {
            productFrm.style.display = "none";
        }
    }
    //Hàm ẩn toàn bộ chi tiết vé xe trên trang chủ
    function hideAllProductForm() {
        const productForms = document.querySelectorAll('.ve-xe');
        var test = $(".ve-xe");
        console.log('test: ' + test);
        productForms.forEach(function (productForm) {
            productForm.style.display = 'none';
        });
    }

    //Hàm ẩn chi tiết vé xe trên trang quản lý
    function dismissDetailProduct(productId) {
        const productFrm = document.getElementById('productId' + productId);
        productFrm.style.display = "none";
    }
//END ACTION CHI TIẾT

//START ACTION ẨN/HIỆN
    //Hàm hiển thị vé trên trang chủ
    function displayProduct(product_id) {
        const showBtn = document.getElementById('show' + product_id);
        const hideBtn = document.getElementById('hide' + product_id);
        showBtn.style.display = 'none';
        hideBtn.style.display = 'block';
        sendForm(product_id);

    }
    //Hàm ẩn vé trên trang chủ
    function hideProduct(product_id) {
        const showBtn = document.getElementById('show' + product_id);
        const hideBtn = document.getElementById('hide' + product_id);
        showBtn.style.display = 'block';
        hideBtn.style.display = 'none';

        // Kiểm tra nếu product_id không phải là undefined hoặc null trước khi gửi form
        if (product_id) {
            sendForm(product_id);
        } else {
            console.error('Invalid product_id');
        }
    }

    //Hàm gửi yêu cầu ẩn/hiện vé trên trang chủ
    function sendForm(product_id) {
        fetch(`http://localhost:8080/management/${product_id}/display-status`, postAuth(""))
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch((error) => {
                console.log(error);
            })
    }
//END ACTION ẨN/HIỆN

//ACTION DELETE Hàm xử lý xóa mềm
    function softDelete(product_id) {
         var rowIsRemoved = document.querySelector('#row' + product_id);
         rowIsRemoved.remove();
        fetch(`http://localhost:8080/management/${product_id}/remove`, postAuth(""))
        .then(response => response.json())
        .then(data => {
            console.log("Delete successfully");
        })
        .catch(err => console.error(err));
    }
//</script>



//<!-- START Xử lý chia sẻ vị trí-->
//<script>
    //Hàm Xử lý hiện form chia sẻ
    function openMarkStopForm(productID) {
        const newNotice = document.getElementById('mark-stop-backgr' + productID);
        newNotice.style.display = 'block';
    }

    //Hàm Xử lý đóng form chia sẻ
    function closeMarkStopForm(productID, curLocation) {
        //let curLocation = [false, true, false, false, false, false, false];
        //console.log('close: ' + curLocation);
        const newNotice = document.getElementById('mark-stop-backgr' + productID);
        newNotice.style.display = 'none';
        if (curLocation != null) {
            const checkboxes = document.querySelectorAll(`.rightNow${productID}`);
            checkboxes.forEach( (element, i) => {
                element.value = curLocation[i];
                element.checked = curLocation[i];
                console.log(curLocation[i], element.id);
            });
        }
    }

    //Hàm Xử lý khi tích chọn thì ô được tích sẽ có value true
    function toggleInputs(stopCount, productId) {
        const checkboxes = document.querySelectorAll(`.rightNow${productId}`);
        checkboxes.forEach(checkbox => {
            checkbox.value = 'false';
            checkbox.checked = false; // Bỏ tích chọn (nếu có)
        });
        const checkedInput = document.getElementById(`rightNow${stopCount}${productId}`);
        checkedInput.value = 'true';
        checkedInput.checked = true;
    }

    //Hàm Xử lý nút tắt chia sẻ
    function resetChecked(stopCount, productId) {
        const checkboxes = document.querySelectorAll(`.rightNow${productId}`);
        // Duyệt qua danh sách và đặt giá trị của các input
        checkboxes.forEach(checkbox => {
            // Nếu không phải là input được tích vào, đặt giá trị là false
            checkbox.value = 'false';
            checkbox.checked = false; // Bỏ tích chọn (nếu có)
        });
    }
//</script>
//<!-- END Xử lý chia sẻ vị trí-->





//<!-- START xử lý menu-->
//<script>
    function showSubMenu() {
        const subOder = document.getElementById('subOrder');
        if (subOder.style.display === 'none' || subOder.style.display === '') {
            subOder.style.display = 'block';
        }
        else {
            subOder.style.display = 'none';
        }
    }

    function showMenu(number) {
        const sanPham = document.getElementById('san-pham');
        const donHang = document.getElementById('don-hang');
        const subOder = document.getElementById('subOrder');
        const qlsp = document.getElementById('qlsp');
        const qldh = document.getElementById('qldh');
        if (number === 1) {
            sanPham.style.display = 'block';
            donHang.style.display = 'none';
            subOder.style.display = 'none';
            qlsp.style.backgroundColor = '#ccc';
            qlsp.style.color = 'black';
            qldh.style.color = 'white';
            qldh.style.backgroundColor = 'inherit';
        }
        else if (number === 2) {
            sanPham.style.display = 'none';
            donHang.style.display = 'block';
            qldh.style.backgroundColor = '#ccc';
            qldh.style.color = 'black';
            qlsp.style.color = 'white';
            qlsp.style.backgroundColor = 'inherit';

        }
    }
//</script>
//<!-- END xử lý menu-->