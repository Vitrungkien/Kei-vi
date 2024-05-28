
renderOrder();
function renderOrder() {
    fetch(serverPort + '/api/v1/seller/my-store/all-order', getAuth)
    .then(response => response.json())
    .then(orders => {
        const tableOrder = document.getElementById('tb-order');
        var stt = 1;
        orders.forEach(order => {
        const formattedPickTime = moment(order['pickTime']).format('HH:mm DD/MM/YYYY');
        const formattedCreatedAt = moment(order['createdAt']).format('HH:mm DD/MM/YYYY');
        const row = tableOrder.insertRow();
        row.insertCell().textContent = stt++;
        row.insertCell().textContent = order['orderId'];
        row.insertCell().textContent = order['productName'];
        row.insertCell().textContent = order['pickUpAddress'];
        row.insertCell().textContent = order['destinationAddress'];

        row.insertCell().textContent = formattedPickTime;
        row.insertCell().textContent = order['phoneNumber'];
        // row.insertCell().textContent = order['message'];
        row.insertCell().textContent = order['quantity'];
        row.insertCell().textContent = order['totalPrice'];
        row.insertCell().textContent = formattedCreatedAt;
        row.insertCell().textContent = order['orderStatus'];

        // Kiểm tra orderStatus để đặt màu nền
        switch (order['orderStatus']) {
            case 'Chờ xác nhận':
            row.style.backgroundColor = '#f7f699';
            break;
            case 'Đã xác nhận':
            row.style.backgroundColor = '#abe4f7';
            break;
            case 'Đã hoàn thành':
            row.style.backgroundColor = '#cbf7d7';
            break;
            case 'Đã hủy':
            row.style.backgroundColor = '#f5b0b0';
            break;
            default:
            break;
        }
        row.insertCell().innerHTML = 
        ` <button class="chi-tiet" onclick="showOrderForm(${order.orderId})">Xem chi tiết</button>
            <div id="frmDatVe${order.orderId}" class="frmDatVe-modal">
            <form class="frmDatVe p-4 rounded-1 m-auto"id="formDatVe${order.orderId}">
                <h3 class="text-center">Vé ${order.productName}</h3>

                <div class="row mb-3 d-flex">
                    <p class="col-sm-3">Giá vé:</p>
                    <div class="col-sm-9">
                    <p class="">${order.price}</p>
                    </div>
                </div>

                <div class="row mb-3 d-flex">
                    <p class="col-sm-3">Điểm đón:</p>
                    <div class="col-sm-9">
                    <p class="">${order.pickUpAddress}</p>
                    </div>
                </div>

                <div class="row mb-3 d-flex">
                    <p class="col-sm-3">Điểm đến:</p>
                    <div class="col-sm-9">
                    <p class="">${order.destinationAddress}</p>
                    </div>
                </div>

                <div class="row mb-3 d-flex">
                    <p class="col-sm-3">Thời gian đón:</p>
                    <div class="col-sm-9">
                    <p class="">${formattedPickTime}</p>
                    </div>
                </div>

                <div class="row mb-3 d-flex">
                    <p class="col-sm-3">Lời nhắn:</p>
                    <div class="col-sm-9">
                    <p class="">${order.message}</p>
                    </div>
                </div>

                <div class="row mb-3 d-flex">
                    <p class="col-sm-3">Số điện thoại:</p>
                    <div class="col-sm-9">
                    <p class="">${order.phoneNumber}</p>
                    </div>
                </div>

                <div class="row mb-3 d-flex">
                    <p class="col-sm-3">Số lượng:</p>
                    <div class="col-sm-9">
                    <p class="">${order.quantity}</p>
                    </div>
                </div>

                <div class="totalPrice row mb-3" id="confirmPrice${order.orderId}">
                    <label for="totalPrice" class="col-sm-3 col-form-label">Tổng tiền:</label>
                    <div class="col-sm-9">
                    <input type="number" step="10000" class="form-control" id="totalPrice${order.orderId}" name="totalPrice"
                    placeholder="Tổng tiền" required autofocus="autofocus" value="${order.totalPrice}"
                    />
                    </div>
                </div>

                <div class="totalPrice row mb-3" id="totalPrices${order.orderId}">
                    <p class="col-sm-3">Tổng tiền:</p>
                    <div class="col-sm-9">
                    <p class="">${order.totalPrice}</p>
                    </div>
                </div>

                <div class="row mb-3 d-flex">
                    <p class="col-sm-3">Trạng thái:</p>
                    <div class="col-sm-9">
                    <p class="order-status" id="order-status">${order.orderStatus}</p>
                    </div>
                </div>

                <input type="hidden" id="hiddenInput${order.orderId}" name="orderAction" value="Xác nhận">

                <div class="row mb-3">
                    <div class="col-sm-9 offset-sm-3 d-flex">
                    <button type="button" class="btn-order btn btn-primary" id="confirmButton${order.orderId}"
                    onclick="setActionAndSubmit(${order.orderId}, 'Xác nhận')" >Xác nhận</button>

                    <button type="button" class="btn-order btn btn-success" id="completedButton${order.orderId}"
                    onclick="setActionAndSubmit(${order.orderId}, 'Hoàn thành')">Hoàn thành</button>

                    <button type="button" class="btn-order btn btn-danger" id="cancelButton${order.orderId}"
                    onclick="setActionAndSubmit(${order.orderId}, 'Hủy')">Hủy đơn</button>

                    <button type="button" class="btn btn-secondary" onclick="dismissForm(${order.orderId})">
                        Thoát
                    </button>
                    </div>
                </div>
            </form>
            </div>
        `;

        switch(order['orderStatus']) {
            case 'Chờ xác nhận':
                $('#confirmButton' + order['orderId']).css("display", "block");
                $('#cancelButton' + order['orderId']).css("display", "block");
                $('#confirmPrice' + order['orderId']).css("display", "flex");
                break;
            case 'Đã xác nhận':
                $('#completedButton' + order['orderId']).css("display", "block");
                $('#cancelButton' + order['orderId']).css("display", "block");
                $('totalPrices' + order['orderId']).css("display", "flex");
                break;
            case 'Đã hoàn thành':
            case 'Đã hủy':
                $('totalPrices' + order['orderId']).css("display", "flex");
                break;
            default:
                break;
        }

        });
    })
    .catch(error => console.error('Error fetching orders:', error));
}

//handle update order status
function setActionAndSubmit(orderId, action) {
    const totalPrice = $('#totalPrice' + orderId).val();
    const orderAction = action;
    const data = {totalPrice, orderAction};

    fetch(serverPort + `/management/my-store/${orderId}/except`, postAuth(data))
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        const tr = $("tr").first();
        $(tr).nextAll().remove();
        renderOrder();
      })
}

function showOrderForm(productId) {
    hideAllOrderForm();
    $('#frmDatVe' + productId).show();
  }

  function hideAllOrderForm() {
    $('.frmDatVe-modal').hide();
  }

  function dismissForm(orderId) {
    $('#frmDatVe' + orderId).hide();
  }


