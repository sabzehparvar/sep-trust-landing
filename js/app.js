$(document).ready(function () {
    initializeHomePage();
});

function initializeHomePage() {
    initializeMerchantCard();
    initializeReportBox();
}

function initializeMerchantCard() {
    console.log('Merchant card initialized');
}

function initializeReportBox() {
    $('.report-box').on('click', function () {
        console.log('Report section clicked');
    });
}