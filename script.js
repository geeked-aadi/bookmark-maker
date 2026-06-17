let bookmarkForm = document.getElementById("bookmarkForm");
let siteNameInput = document.getElementById("siteNameInput");
let siteUrlInput = document.getElementById("siteUrlInput");

let siteNameErrMsg = document.getElementById("siteNameErrMsg");
let siteUrlErrMsg = document.getElementById("siteUrlErrMsg");

let bookmarksList = document.getElementById("bookmarksList");

let list = JSON.parse(sessionStorage.getItem("bookmarks")) || [{
    id: count++,
    siteName: "Bookmarks Bar",
    siteUrl: "https://geeked-aadi.github.io/bookmark-maker/"
}];
let count = list.length;

function normalizeUrl(rawUrl) {
    const trimmedUrl = rawUrl.trim();
    const prefixedUrl = /^(https?:)?\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;

    try {
        const parsed = new URL(prefixedUrl);
        if (!/^https?:$/i.test(parsed.protocol)) {
            return null;
        }
        return parsed.href;
    } catch {
        return null;
    }
}

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
    aEle.rel = "noopener noreferrer";

    divEle.appendChild(h3Ele);
    divEle.appendChild(aEle);

    liEle.appendChild(divEle);
    bookmarksList.appendChild(liEle);
}
for (let bookmark of list) {
    createAndAppendBookmark(bookmark);
}

siteNameInput.addEventListener("change", function () {
    if (siteNameInput.value.trim() === "") {
        siteNameErrMsg.textContent = "*Required";
    } else {
        siteNameErrMsg.textContent = "";
    }
});
siteUrlInput.addEventListener("change", function () {
    if (siteUrlInput.value.trim() === "") {
        siteUrlErrMsg.textContent = "*Required";
    } else if (!normalizeUrl(siteUrlInput.value)) {
        siteUrlErrMsg.textContent = "*Enter a valid URL";
    } else {
        siteUrlErrMsg.textContent = "";
    }
});

bookmarkForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    if (siteNameInput.value.trim() === "") {
        siteNameErrMsg.textContent = "*Required";
        isValid = false;
    } else {
        siteNameErrMsg.textContent = "";
    }

    if (siteUrlInput.value.trim() === "") {
        siteUrlErrMsg.textContent = "*Required";
        isValid = false;
    } else if (!normalizeUrl(siteUrlInput.value)) {
        siteUrlErrMsg.textContent = "*Enter a valid URL";
        isValid = false;
    } else {
        siteUrlErrMsg.textContent = "";
    }

    if (!isValid) {
        return;
    }

    const normalizedSiteUrl = normalizeUrl(siteUrlInput.value);

    let bookmark = {
        id: count++,
        siteName: siteNameInput.value.trim(),
        siteUrl: normalizedSiteUrl
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
