const USE_MOCK = true;

const MOCK_RESPONSE = {
    data: {
        persianTitle: "رضا ساری اصلانی",
        merchantName: "آکادمی اصلانی",
        createdOn: "1405/01/24 16:03:35.523",
        terminalNumber: 15478028,
        businessId: "add5b482-d04e-42d6-892b-34dd40b6740e"
    },
    status: {
        isSuccess: true,
        name: "Success",
        value: 2000
    },
    validationErrors: null
};


$(document).ready(function () {
    initializeHomePage();
});

function initializeHomePage() {
    hideEmptyState();
    fetchMerchantData();
    initializeReportBox();
}

function hideEmptyState() {
    $('.empty-state').hide();
}

function getParamsFromPath() {
    const path = window.location.pathname;
    const match = path.match(/\/views\/merchant-info\/([^\/]+)\/([^\/]+)/);
    if (match) {
        return {
            businessId: match[1],
            terminalNumber: match[2]
        };
    }
    return null;
}

function fetchMerchantData() {

    if (USE_MOCK) {
        // ----- MOCK (simulate network delay) -----
        const deferred = $.Deferred();
        setTimeout(function () {
            deferred.resolve(MOCK_RESPONSE);
        }, 1500); // 1.5s skeleton

        deferred
            .done(function (response) {
                if (response && response.status && response.status.isSuccess && response.data) {
                    populateMerchantCard(response.data);
                    hideSkeletonShowContent();
                } else {
                    showEmptyState();
                }
            })
            .fail(function () {
                showEmptyState();
            });
        // ----- end mock -----
        return;
    }

    // ----- REAL API CALL -----
    const params = getParamsFromPath();
    if (!params) {
        showEmptyState();
        return;
    }
    const { businessId, terminalNumber } = params;
    const apiUrl = `/api/v1/merchant-info/${businessId}/${terminalNumber}`;

    $.getJSON(apiUrl)
        .done(function (response) {
            if (response && response.status && response.status.isSuccess && response.data) {
                populateMerchantCard(response.data);
                hideSkeletonShowContent();
            } else {
                showEmptyState();
            }
        })
        .fail(function () {
            showEmptyState();
        });
}

function populateMerchantCard(data) {
    $('.merchant-information-row:contains("نام پذیرنده") .merchant-information-value')
        .text(data.persianTitle || '---');

    $('.merchant-information-row:contains("صاحب امتیاز") .merchant-information-value')
        .text(data.merchantName || '---');

    const datePart = data.createdOn ? data.createdOn.split(' ')[0] : '---';
    const relativeTime = data.createdOn ? getRelativeTime(datePart) : '';
    const displayDate = relativeTime ? `${datePart} - ${relativeTime}` : datePart;
    $('.merchant-information-row:contains("تاریخ آغاز فعالیت") .merchant-information-value')
        .text(displayDate);

    $('.merchant-information-row:contains("شماره ترمینال") .merchant-information-value')
        .text(data.terminalNumber || '---');
}

function hideSkeletonShowContent() {
    $('.merchant-skeleton').fadeOut(300, function () {
        $('.merchant-card__content').removeClass('merchant-card__content--hidden');
    });
}

function showEmptyState() {
    $('.merchant-skeleton').hide();
    $('.details-card').hide();
    $('.empty-state').show();
}

$('.empty-state-button').on('click', function () {
    window.history.back();
});

function initializeReportBox() {
    $('.report-box').on('click', function () {
        console.log('Report section clicked');
    });
}

function getRelativeTime(createdDate) {
    try {
        const m = moment.from(createdDate, 'fa', 'YYYY/MM/DD');
        if (!m.isValid()) return '';
        m.locale('fa');
        return m.fromNow();
    } catch (e) {
        return '';
    }
}