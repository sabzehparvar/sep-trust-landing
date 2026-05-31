$(document).ready(function () {
    initializeHomePage();
});

function initializeHomePage() {
    initializeSkeletonLoading();
    initializeMerchantCard();
    initializeReportBox();
}

function initializeSkeletonLoading() {
    setTimeout(function () {
        $('.merchant-skeleton').fadeOut(300, function () {
            $('.merchant-card__content').removeClass(
                'merchant-card__content--hidden',
            );
        });
    }, 2000);
}

function initializeMerchantCard() {
    console.log('Merchant card initialized');
}

function initializeReportBox() {
    $('.report-box').on('click', function () {
        console.log('Report section clicked');
    });
}