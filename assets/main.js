// =============================================
// 共通定数・ユーティリティ
// =============================================
const STORAGE_KEYS = {
  members: "canary_members",
  gallery: "canary_gallery",
  inquiries: "canary_inquiries",
};

// 日時を YYYY-MM-DD HH:mm 形式で整形
function formatTimestamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// JSON を安全にパースするユーティリティ
function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch (error) {
    console.warn("JSON のパースに失敗したため、デフォルト値を使用します", error);
    return fallback;
  }
}

// localStorage からデータを取得し、必要であれば初期値を保存
function ensureData(key, defaultData) {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }
  const parsed = safeParse(stored, defaultData);
  return Array.isArray(parsed) ? parsed : structuredClone(defaultData);
}

// データを localStorage に保存
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// データのディープコピーを安全に作成
function structuredClone(data) {
  return JSON.parse(JSON.stringify(data));
}

// =============================================
// デフォルトデータ（メンバー）
// =============================================
function getDefaultMembers() {
  return [
    {
      id: 1,
      number: 1,
      name: "五十嵐　優歩",
      position: "投手",
      handed: "右投げ右打ち",
      comment: "ポルシェ",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/igarashi.jpg",
    },
    {
      id: 2,
      number: 2,
      name: "岩崎　航",
      position: "内野手",
      handed: "右投げ右打ち",
      comment: "※サイト管理者",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/iwasaki2.jpg",
    },
    {
      id: 3,
      number: 3,
      name: "内田 良太",
      position: "外野手",
      handed: "右投げ右打ち",
      comment: "ボーリング大会のみ参加します",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/uchida.jpg",
    },
    {
      id: 4,
      number: 4,
      name: "馬場　弦也",
      position: "内野手",
      handed: "左投げ右打ち",
      comment: "レアキャラ",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/baba.jpg",
    },
    {
      id: 5,
      number: 5,
      name: "井戸本　麻美",
      position: "内野手",
      handed: "右投げ右打ち",
      comment: "Welcome to 野毛",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/asami.jpg",
    },
    {
      id: 6,
      number: 6,
      name: "荒木　潤平",
      position: "捕手",
      handed: "右投げ右打ち",
      comment: "媚びぬ！退かぬ！省みぬ！",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/araki.jpg",
    },
    {
      id: 7,
      number: 7,
      name: "長谷　悠樹",
      position: "外野手",
      handed: "右投げ右打ち",
      comment: "Ohana",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/nagatani3.jpg",
    },
    {
      id: 8,
      number: 9,
      name: "井戸本　たけし",
      position: "外野手",
      handed: "右投げ左打ち",
      comment: "夢にときめけ！ 明日にきらめけ！",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/takeshi.jpg",
    },
    {
      id: 9,
      number: 30,
      name: "高橋　拓",
      position: "投手",
      handed: "左投げ左打ち",
      comment: "好きな言葉「地主」",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/takahashi.jpg",
    },
    {
      id: 10,
      number: 10,
      name: "宮城　有弥",
      position: "内野手",
      handed: "右投げ右打ち",
      comment: "右打ちと目押しが得意",
      photoUrl: "https://www1833.github.io/Team-Canary4/images/miyashiro.jpg",
    },
  ];
}

// =============================================
// デフォルトデータ（ギャラリー）
// =============================================
function getDefaultGallery() {
  return [
    {
      id: 1,
      imageUrl: "https://www1833.github.io/Team-Canary4/images/1.jpg",
      caption: "バッティング練習",
    },
    {
      id: 2,
      imageUrl: "https://www1833.github.io/Team-Canary4/images/2.jpg",
      caption: "メンタルトレーニング",
    },
    {
      id: 3,
      imageUrl: "https://www1833.github.io/Team-Canary4/images/3.jpg",
      caption: "懇親会",
    },
    {
      id: 4,
      imageUrl: "https://www1833.github.io/Team-Canary4/images/4.jpg",
      caption: "視察風景",
    },
  ];
}

// =============================================
// ナビゲーションのアクティブ表示
// =============================================
function highlightNavigation() {
  const page = document.body.dataset.page;
  const links = document.querySelectorAll("nav a[data-page]");
  links.forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// =============================================
// ホーム（index.html）の処理
// =============================================
function initHomePage() {
  // ギャラリーの初期化
  const galleryContainer = document.getElementById("gallery-grid");
  if (galleryContainer) {
    const galleryData = ensureData(STORAGE_KEYS.gallery, getDefaultGallery());
    renderGallery(galleryContainer, galleryData);
  }

  // お問い合わせフォームの処理
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const entry = {
        id: Date.now(),
        name: formData.get("name")?.trim() ?? "",
        email: formData.get("email")?.trim() ?? "",
        message: formData.get("message")?.trim() ?? "",
        submittedAt: formatTimestamp(),
      };

      if (!entry.name || !entry.email || !entry.message) {
        alert("全ての項目を入力してください。");
        return;
      }

      const inquiries = ensureData(STORAGE_KEYS.inquiries, []);
      inquiries.push(entry);
      saveData(STORAGE_KEYS.inquiries, inquiries);

      contactForm.reset();
      alert("送信ありがとうございました（ダミーです）。");
    });
  }
}

// ギャラリーを描画
function renderGallery(container, galleryData) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  galleryData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "gallery-item";
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.caption}" loading="lazy">
      <div class="gallery-caption">${item.caption}</div>
    `;
    card.addEventListener("click", () => openGalleryModal(item));
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// ギャラリーモーダルを開く
function openGalleryModal(item) {
  const modal = document.getElementById("gallery-modal");
  if (!modal) return;
  modal.querySelector(".modal-image").src = item.imageUrl;
  modal.querySelector(".modal-image").alt = item.caption;
  modal.querySelector(".modal-body h3").textContent = item.caption;
  modal.classList.add("active");
}

// ギャラリーモーダルを閉じる
function closeGalleryModal() {
  const modal = document.getElementById("gallery-modal");
  if (!modal) return;
  modal.classList.remove("active");
}

// =============================================
// メンバー紹介ページ（members.html）の処理
// =============================================
function initMembersPage() {
  const members = ensureData(STORAGE_KEYS.members, getDefaultMembers());
  const filterSelect = document.getElementById("position-filter");
  const sortButton = document.getElementById("sort-number");
  const container = document.getElementById("member-list");

  let currentMembers = [...members];
  let currentFilter = "全て";

  function applyFilterAndRender() {
    let filtered = structuredClone(currentMembers);
    if (currentFilter !== "全て") {
      filtered = filtered.filter((member) => member.position === currentFilter);
    }
    filtered.sort((a, b) => a.number - b.number);
    renderMemberCards(container, filtered);
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      currentFilter = filterSelect.value;
      applyFilterAndRender();
    });
  }

  if (sortButton) {
    sortButton.addEventListener("click", () => {
      currentMembers.sort((a, b) => a.number - b.number);
      applyFilterAndRender();
    });
  }

  applyFilterAndRender();
}

// メンバーカードを描画
function renderMemberCards(container, members) {
  if (!container) return;
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = "member-card";
    const hasPhoto = Boolean(member.photoUrl);
    card.innerHTML = `
      <div class="member-photo">
        ${hasPhoto ? `<img src="${member.photoUrl}" alt="${member.name}">` : `<span>${member.name.charAt(0)}</span>`}
      </div>
      <div class="member-info">
        <h3>${member.number} ${member.name}</h3>
        <div class="member-meta">
          <span>${member.position}</span>
          <span>${member.handed}</span>
        </div>
        <p class="member-comment">${member.comment}</p>
      </div>
    `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// =============================================
// 管理画面（admin.html）の処理
// =============================================
function initAdminPage() {
  const loginForm = document.getElementById("login-form");
  const adminArea = document.getElementById("admin-area");

  if (!loginForm || !adminArea) return;

  const STATE = {
    loggedIn: false,
    editingMemberId: null,
    editingGalleryId: null,
  };

  function showAdminArea() {
    loginForm.parentElement.style.display = "none";
    adminArea.style.display = "block";
    STATE.loggedIn = true;
    renderMemberTable();
    renderGalleryTable();
    renderInquiryTable();
  }

  // ログイン処理
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const loginId = formData.get("loginId");
    const password = formData.get("password");
    if (loginId === "admin" && password === "user") {
      showAdminArea();
    } else {
      alert("ログインに失敗しました。ID とパスワードを確認してください。");
    }
  });

  // メンバー管理
  const memberForm = document.getElementById("member-form");
  const memberResetButton = document.getElementById("member-reset");
  const memberTableBody = document.querySelector("#member-table tbody");

  function renderMemberTable() {
    const members = ensureData(STORAGE_KEYS.members, getDefaultMembers());
    if (!memberTableBody) return;
    memberTableBody.innerHTML = "";

    members
      .slice()
      .sort((a, b) => a.number - b.number)
      .forEach((member) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${member.number}</td>
          <td>${member.name}</td>
          <td>${member.position}</td>
          <td>${member.handed}</td>
          <td>${member.comment}</td>
          <td>${member.photoUrl ? `<img src="${member.photoUrl}" alt="${member.name}" style="width:60px;height:60px;object-fit:cover;border-radius:0.5rem;">` : "-"}</td>
          <td>
            <div class="table-actions">
              <button type="button" class="button-edit" data-action="edit" data-id="${member.id}">編集</button>
              <button type="button" class="button-delete" data-action="delete" data-id="${member.id}">削除</button>
            </div>
          </td>
        `;
        memberTableBody.appendChild(row);
      });
  }

  memberForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(memberForm);
    const member = {
      id: STATE.editingMemberId ?? Date.now(),
      number: Number(formData.get("number")),
      name: formData.get("name")?.trim() ?? "",
      position: formData.get("position") ?? "",
      handed: formData.get("handed")?.trim() ?? "",
      comment: formData.get("comment")?.trim() ?? "",
      photoUrl: formData.get("photoUrl")?.trim() ?? "",
    };

    if (!member.number || !member.name) {
      alert("背番号と名前は必須です。");
      return;
    }

    const members = ensureData(STORAGE_KEYS.members, getDefaultMembers());
    const existingIndex = members.findIndex((item) => item.id === member.id);
    if (existingIndex >= 0) {
      members[existingIndex] = member;
    } else {
      members.push(member);
    }
    saveData(STORAGE_KEYS.members, members);
    memberForm.reset();
    STATE.editingMemberId = null;
    memberForm.querySelector("button[type='submit']").textContent = "追加";
    renderMemberTable();
    alert("メンバー情報を保存しました。");
  });

  memberTableBody?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    const id = Number(target.dataset.id);
    if (!action || !id) return;

    const members = ensureData(STORAGE_KEYS.members, getDefaultMembers());
    const index = members.findIndex((member) => member.id === id);
    if (index === -1) return;

    if (action === "edit") {
      const member = members[index];
      memberForm.number.value = member.number;
      memberForm.name.value = member.name;
      memberForm.position.value = member.position;
      memberForm.handed.value = member.handed;
      memberForm.comment.value = member.comment;
      memberForm.photoUrl.value = member.photoUrl;
      STATE.editingMemberId = member.id;
      memberForm.querySelector("button[type='submit']").textContent = "更新";
      memberForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (action === "delete") {
      if (confirm("このメンバーを削除しますか？")) {
        members.splice(index, 1);
        saveData(STORAGE_KEYS.members, members);
        renderMemberTable();
      }
    }
  });

  memberResetButton?.addEventListener("click", () => {
    if (confirm("メンバーを初期状態に戻しますか？")) {
      const defaults = getDefaultMembers();
      saveData(STORAGE_KEYS.members, defaults);
      renderMemberTable();
    }
  });

  // ギャラリー管理
  const galleryForm = document.getElementById("gallery-form");
  const galleryResetButton = document.getElementById("gallery-reset");
  const galleryTableBody = document.querySelector("#gallery-table tbody");
  const galleryFileInput = document.getElementById("gallery-file");

  function renderGalleryTable() {
    const gallery = ensureData(STORAGE_KEYS.gallery, getDefaultGallery());
    if (!galleryTableBody) return;
    galleryTableBody.innerHTML = "";

    gallery.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.imageUrl}" alt="${item.caption}" style="width:80px;height:60px;object-fit:cover;border-radius:0.5rem;"></td>
        <td>${item.caption}</td>
        <td>
          <div class="table-actions">
            <button type="button" class="button-edit" data-action="edit" data-id="${item.id}">編集</button>
            <button type="button" class="button-delete" data-action="delete" data-id="${item.id}">削除</button>
          </div>
        </td>
      `;
      galleryTableBody.appendChild(row);
    });
  }

  galleryForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(galleryForm);
    const caption = formData.get("caption")?.trim() ?? "";
    const urlInput = formData.get("imageUrl")?.trim() ?? "";

    function saveGalleryItem(imageUrl) {
      if (!imageUrl) {
        alert("画像URL またはファイルを指定してください。");
        return;
      }
      const gallery = ensureData(STORAGE_KEYS.gallery, getDefaultGallery());
      const item = {
        id: STATE.editingGalleryId ?? Date.now(),
        imageUrl,
        caption,
      };
      const index = gallery.findIndex((g) => g.id === item.id);
      if (index >= 0) {
        gallery[index] = item;
      } else {
        gallery.push(item);
      }
      saveData(STORAGE_KEYS.gallery, gallery);
      galleryForm.reset();
      STATE.editingGalleryId = null;
      galleryForm.querySelector("button[type='submit']").textContent = "追加";
      renderGalleryTable();
      alert("ギャラリーを保存しました。");
    }

    const file = galleryFileInput?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => saveGalleryItem(reader.result);
      reader.readAsDataURL(file);
    } else {
      saveGalleryItem(urlInput);
    }
  });

  galleryTableBody?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    const id = Number(target.dataset.id);
    if (!action || !id) return;

    const gallery = ensureData(STORAGE_KEYS.gallery, getDefaultGallery());
    const index = gallery.findIndex((item) => item.id === id);
    if (index === -1) return;

    if (action === "edit") {
      const item = gallery[index];
      galleryForm.imageUrl.value = item.imageUrl;
      galleryForm.caption.value = item.caption;
      if (galleryFileInput) {
        galleryFileInput.value = "";
      }
      STATE.editingGalleryId = item.id;
      galleryForm.querySelector("button[type='submit']").textContent = "更新";
      galleryForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (action === "delete") {
      if (confirm("このギャラリーを削除しますか？")) {
        gallery.splice(index, 1);
        saveData(STORAGE_KEYS.gallery, gallery);
        renderGalleryTable();
      }
    }
  });

  galleryResetButton?.addEventListener("click", () => {
    if (confirm("ギャラリーを初期状態に戻しますか？")) {
      const defaults = getDefaultGallery();
      saveData(STORAGE_KEYS.gallery, defaults);
      renderGalleryTable();
    }
  });

  // お問い合わせ管理
  const inquiryContainer = document.getElementById("inquiry-list");

  function renderInquiryTable() {
    const inquiries = ensureData(STORAGE_KEYS.inquiries, []);
    if (!inquiryContainer) return;

    if (inquiries.length === 0) {
      inquiryContainer.innerHTML =
        '<div class="empty-state">現在お問い合わせはありません。</div>';
      return;
    }

    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>送信日時</th>
          <th>名前</th>
          <th>メール</th>
          <th>メッセージ</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");
    inquiries
      .slice()
      .sort((a, b) => a.submittedAt.localeCompare(b.submittedAt))
      .forEach((inquiry) => {
        const row = document.createElement("tr");
        const shortenedMessage =
          inquiry.message.length > 40
            ? `${inquiry.message.slice(0, 40)}…`
            : inquiry.message;
        row.innerHTML = `
          <td>${inquiry.submittedAt}</td>
          <td>${inquiry.name}</td>
          <td>${inquiry.email}</td>
          <td>${shortenedMessage}</td>
          <td><button type="button" class="button-delete" data-id="${inquiry.id}">削除</button></td>
        `;
        tbody.appendChild(row);
      });

    inquiryContainer.innerHTML = "";
    inquiryContainer.appendChild(table);

    tbody.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const id = Number(target.dataset.id);
      if (!id) return;
      if (confirm("このお問い合わせを削除しますか？")) {
        const updated = inquiries.filter((inquiry) => inquiry.id !== id);
        saveData(STORAGE_KEYS.inquiries, updated);
        renderInquiryTable();
      }
    });
  }

  // 初期表示ではログインフォームのみ
  adminArea.style.display = "none";
}

// =============================================
// 初期化処理
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  highlightNavigation();
  const page = document.body.dataset.page;

  if (page === "home") {
    initHomePage();
  }
  if (page === "members") {
    initMembersPage();
  }
  if (page === "admin") {
    initAdminPage();
  }

  // モーダルの共通イベント
  const modal = document.getElementById("gallery-modal");
  if (modal) {
    const closeButton = modal.querySelector(".modal-close");
    closeButton?.addEventListener("click", closeGalleryModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeGalleryModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeGalleryModal();
      }
    });
  }
});
