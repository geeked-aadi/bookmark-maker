let bookmarkForm = document.getElementById("bookmarkForm");
let siteNameInput = document.getElementById("siteNameInput");
let siteUrlInput = document.getElementById("siteUrlInput");

let siteNameErrMsg = document.getElementById("siteNameErrMsg");
let siteUrlErrMsg = document.getElementById("siteUrlErrMsg");

let bookmarksList = document.getElementById("bookmarksList");

let list = JSON.parse(sessionStorage.getItem("bookmarks")) || [];
let count = list.length;

function createAndAppendBookmark(bookmark) {
    let liEle = document.createElement("li");

    let divEle = document.createElement("div");
    divEle.classList.add("list-card");

    let h3Ele = document.createElement("h3");
    h3Ele.textContent = bookmark.siteName;

    let aEle = document.createElement("a");
    aEle.textContent = bookmark.siteUrl;
    aEle.href = bookmark.siteUrl;
    aEle.target = "_blank";

    divEle.appendChild(h3Ele);
    divEle.appendChild(aEle);

    liEle.appendChild(divEle);
    bookmarksList.appendChild(liEle);
}
for (let bookmark of list) {
    createAndAppendBookmark(bookmark);
}

siteNameInput.addEventListener("change", function () {
    if (siteNameInput.value === "") {
        siteNameErrMsg.textContent = "*Required";
    } else {
        siteNameErrMsg.textContent = "";
    }
});
siteUrlInput.addEventListener("change", function () {
    if (siteUrlInput.value === "") {
        siteUrlErrMsg.textContent = "*Required";
    } else {
        siteUrlErrMsg.textContent = "";
    }
});

bookmarkForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    if (siteNameInput.value === "") {
        siteNameErrMsg.textContent = "*Required";
        isValid = false;
    } else {
        siteNameErrMsg.textContent = "";
    }

    if (siteUrlInput.value === "") {
        siteUrlErrMsg.textContent = "*Required";
        isValid = false;
    } else {
        siteUrlErrMsg.textContent = "";
    }

    if (!isValid) {
        return;
    }

    let bookmark = {
        id: count++,
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value
    };

    list.push(bookmark);

    sessionStorage.setItem(
        "bookmarks",
        JSON.stringify(list)
    );

    createAndAppendBookmark(bookmark);

    siteNameInput.value = "";
    siteUrlInput.value = "";
});
