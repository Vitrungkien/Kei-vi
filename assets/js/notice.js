
renderNotice();

function renderNotice() {
    fetch(serverPort + '/api/v1/seller/my-store/all-notices', getAuth)
    .then(response => response.json())
    .then(notices => {
      const tableOrder = document.getElementById('tb-notice');
      var stt = 1;
      notices.forEach(notice => {
        const formattedStartTime = moment(notice['startTime'], "HH:mm:ss").format('HH:mm');
        const formattedCreatedAt = moment(notice['createdAt']).format('HH:mm DD/MM/YYYY');
        const row = tableOrder.insertRow();
        row.insertCell().textContent = stt++;
        row.insertCell().textContent = notice['noticeId'];
        row.insertCell().textContent = notice['productName'];
        row.insertCell().textContent = formattedStartTime;
        row.insertCell().textContent = notice['bienSoXe'];
        row.insertCell().textContent = notice['title'];
        row.insertCell().textContent = notice['content'];
        row.insertCell().textContent = formattedCreatedAt;
        var status = notice['expired'] ? 'Hết hiệu lực' : 'Còn hiệu lực';
        row.insertCell().textContent = status;
        row.insertCell().innerHTML = `
        <button class="btn btn-primary" onclick="showUpdateNotice(${notice.noticeId})"> Sửa </button>

        <div id="update-notice-frm${notice.noticeId}" class="update-notice-div">

          <form class="update-notice-form">
            <h3 style="align-content: center">Sửa thông báo</h3>
            <div class="row mb-3">
              <label for="title${notice.noticeId}" class="form-label">Tiêu đề:</label>
              <input type="text" id="title${notice.noticeId}" name="title" class="form-control" value="${notice.title}" required/>
            </div>
            <div class="row mb-3">
              <label for="content${notice.noticeId}" class="form-label">Nội dung:</label>
              <textarea id="content${notice.noticeId}" name="content" class="form-control">${notice.content}</textarea><br/>
            </div>

            <div class="row mb-3">
              <label for="expired${notice.noticeId}" class="form-label">Hiệu lực:</label>
              <select id="expired${notice.noticeId}" name="expired" class="is-expired w-100 ">
              </select>
            </div>
            <input type="hidden" id="noticeID${notice.noticeId}" name="noticeID" class="form-control" value="${notice.noticeId}" required/>
            <button type="button" class="btn btn-primary" onclick="updateNotice(${notice.noticeId})">Xong</button>
            <button type="button" class="btn btn-danger" onclick="closeUpdateNotice(${notice.noticeId})">Hủy</button>
          </form>

        </div>

  `;
        // if (status == 'Còn hiệu lực') {
        //   row.style.backgroundColor = '#cbf7d7';
        // }
        // else {
        //   row.style.backgroundColor = '#ccc';
        // }

        (status == 'Còn hiệu lực') ? $(row).css("background-color", "#cbf7d7") : $(row).css("background-color", "#ccc");


        const expiredElment = document.getElementById(`expired${notice.noticeId}`);
        if (notice['expired']) {
          const option1 = document.createElement('option');
          option1.value = 'true';
          option1.text = 'Hết hiệu lực';
          expiredElment.appendChild(option1);

          const option2 = document.createElement('option');
          option2.value = 'false';
          option2.text = 'Còn hiệu lực';


          expiredElment.appendChild(option2);
        }
        else {
          const option1 = document.createElement('option');
          option1.value = 'false';
          option1.text = 'Còn hiệu lực';
          const option2 = document.createElement('option');
          option2.value = 'true';
          option2.text = 'Hết hiệu lực';
          expiredElment.appendChild(option1);
          expiredElment.appendChild(option2);
        }

    });
    })
    .catch(error => console.error('Error fetching notices:', error));

    createNewNoticeForm();
}

//create new notice form
function createNewNoticeForm() {
    fetch(serverPort + '/api/v1/seller/my-store/all-product', getAuth)
        .then(response => response.json())
        .then(products => {
        const newNoticeDiv = document.getElementById('new-notice-div');
        newNoticeDiv.innerHTML = 
        `   <button class="add btn btn-primary" id="show-c-f-btn" onclick="showCreateForm()">
                Tạo thông báo mới
            </button>
            <div class="" id="new-notice" style="display: none">
                <form class="new-notice-form">
                    <h3 style="align-content: center">Tạo thông báo mới</h3>
                    <div class="">
                        <div class="row mb-3">
                            <label for="title" class="form-label">Tiêu đề:</label>
                            <input type="text" id="title" name="title" class="form-control" required/>
                        </div>
                        <div class="row mb-3">
                            <label for="content" class="form-label">Nội dung:</label>
                            <textarea id="content" name="content" class="form-control"></textarea>
                        </div>
                        <div class="row mb-3">
                            <label for="productID-option" class="form-label">Vé:</label>
                            <select id="productID-option" name="productID" class=" w-100 ">
                                <!--  option ...-->
                            </select>
                        </div>              
                    </div>
                    <div class="">
                        <button type="button" 
                            class="btn btn-primary" id="create-n-btn"
                            onclick="createNotice()">
                            Xong
                        </button>
                        <button type="button" class="btn btn-danger" onclick="hideCreateForm()">Hủy</button>
                    </div>
                </form>
            </div>
        `;

        const productIDOption = document.getElementById('productID-option');
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product['productID'];
            const formattedStartTime = moment(product['startTime'], "HH:mm:ss").format('HH:mm');
            option.text = product['productName'] + ' - ' +  formattedStartTime +  (product.bienSoXe ? ` - ${product.bienSoXe}` : '');
            productIDOption.appendChild(option);
        });
        })
        .catch(error => console.error('Error fetching products:', error));

}

//handle create new notice
function createNotice() {
    const title = $('#title').val();
    const content = $('#content').val();
    const productID = $('#productID-option').val();
  
    console.log(title, content, productID);
  
    var data = {title, content, productID};
    console.log('data:', data);
    fetch(serverPort + '/management/my-store/create-notice', postAuth(data))
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        const tr = $("tr").first();
        $(tr).nextAll().remove();
        renderNotice();
      })
      .catch(error => {
        console.error('Error creating notice:', error);
      })
  }

//handle update notice
function updateNotice(noticeId) {
    const noticeID = noticeId;
    const title = $('#title' + noticeId).val();
    const content = $('#content' + noticeId).val();
    const expired = $('#expired' + noticeId).val();

    const data = {noticeID, title, content, expired};

    fetch(serverPort + '/management/my-store/update-notice', postAuth(data))
        .then(response => response.json())
        .then(response => {
            //console.log(response);
            const tr = $("tr").first();
            $(tr).nextAll().remove();
            renderNotice();
        })
        .catch(error => {
            console.error('Error updating notice:', error);
        })
}
//show create form
function showCreateForm() {
    $('#new-notice').show();
}

//hide create form
function hideCreateForm() {
    $('#new-notice').hide();
}

//show update notice form
function showUpdateNotice(noticeID) {
    $('#update-notice-frm'+ noticeID).show();
}

//Hide update notice form
function closeUpdateNotice(noticeID) {
    $('#update-notice-frm'+ noticeID).hide();
}


