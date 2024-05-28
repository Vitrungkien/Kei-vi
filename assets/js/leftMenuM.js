var leftMenu = `
<div class="col-2 position-fixed bg-dark top-0 text-white p-0" style="height: 713px;">
<div class="me row ">
    <h5 class="me1 " id="qlsp" onclick="showMenu(1)"><a href="./management.html">Quản lý sản phẩm</a></h5>
</div>
<div class="me row " >
<!--                <h5 class="me1 p-2" id="qldh" onclick="showSubMenu(), showMenu(2)">Quản lý đơn hàng</h5>-->
    <h5 class="me1 " id="qldh" ><a href="./management-order.html">Quản lý đơn hàng</a></h5>
    <ul class="" id="subOrder" style="display: none; margin-left: 15px;">
        <li class="me2">Tất cả đơn hàng</li>
        <li class="me2">Đơn chờ xác nhận</li>
        <li class="me2">Đơn đã đã xác nhận</li>
        <li class="me2">Đơn đã hoàn thành</li>
    </ul>
</div>
<div class="me row " >
    <h5 class="me1 " id="qltb" ><a href="./management-notice.html">Quản lý thông báo</a></h5>
</div>
</div>`;
$('#main-body').prepend(leftMenu);