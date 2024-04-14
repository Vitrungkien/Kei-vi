// <!--Chuyển đổi giữa các tab menu chi tiet-->

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

