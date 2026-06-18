/* ============================================================
   DataWired x DataCamp Scholarship Programme 2026/2027
   Vanilla JS interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---------- Scroll spy for active nav link ---------- */
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = navAnchors
    .map(function (a) {
      var id = a.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function onScroll() {
    var pos = window.scrollY + 120;
    var current = sections[0] ? sections[0].id : null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec.id;
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var answer = item.querySelector(".faq-a");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (open) {
        if (open !== item) {
          open.classList.remove("open");
          open.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- Peer Partners data + render ---------- */
  /* 48 pairs (96 scholars). Only the first 10 show by default; the rest
     are found via the search box or track filter above the table. */
  var peerData = [
    { scholar: "Abiola Oriola", partner: "Amanda Dube", track: "Data Analyst" },
    { scholar: "Anashe Murinda", partner: "Anesu Zoe Guveya", track: "Data Scientist" },
    { scholar: "Anesu Hannah Mbeva", partner: "Ayabulela Ndzombane", track: "Data Engineer" },
    { scholar: "Bernadette Dingwa", partner: "Abinah Bonolo", track: "Machine Learning" },
    { scholar: "Nombulelo Bopape", partner: "Chantelle Nyaude", track: "Business Analyst" },
    { scholar: "Celekazi Charles", partner: "Divine Cheure", track: "Analytics Engineer" },
    { scholar: "Chiedza Mashaire", partner: "Langelihle Chimanya", track: "Data Analyst" },
    { scholar: "Auxilia Chiromo", partner: "Rutendo Choruwa", track: "Data Scientist" },
    { scholar: "Dephine Kachara", partner: "Munenyashaishe Hove", track: "Data Engineer" },
    { scholar: "Vanessa Thando Dube", partner: "Esther Ruvimbo Mazhande", track: "Machine Learning" },
    { scholar: "Kelly Etafia", partner: "Kuvirima Ethel", track: "Business Analyst" },
    { scholar: "Mbuotidem Awak", partner: "Florence Chigwida", track: "Analytics Engineer" },
    { scholar: "Francis Oluwadamilola", partner: "Gift Awugo", track: "Data Analyst" },
    { scholar: "Makanaka Chihumbiri", partner: "Celeste Goodall", track: "Data Scientist" },
    { scholar: "Ntshwari Letsoalo", partner: "Christine Gunhu", track: "Data Engineer" },
    { scholar: "Hadiyo Letsitsi", partner: "Salome Legodi", track: "Machine Learning" },
    { scholar: "Jessica Robey", partner: "Salma Pelesi", track: "Business Analyst" },
    { scholar: "Joannah Mawutsa", partner: "Juliet Masvaure", track: "Analytics Engineer" },
    { scholar: "Munashe Kalembela", partner: "Madalitso Sambakaluma", track: "Data Analyst" },
    { scholar: "Kudzaishe Lisah Nyatsanza", partner: "Kudzai Cheure", track: "Data Scientist" },
    { scholar: "Lindsay Fuyana", partner: "Londeka Nduli", track: "Data Engineer" },
    { scholar: "Lashaine Rakabopa", partner: "Makanaka Patience Mutswiri", track: "Machine Learning" },
    { scholar: "F Magaya", partner: "Makomborero Gwanzura", track: "Business Analyst" },
    { scholar: "Ruvimbo Mambinge", partner: "Thuto Hlahla", track: "Analytics Engineer" },
    { scholar: "Mercy Matsvayi", partner: "Michelle Manda", track: "Data Analyst" },
    { scholar: "Musimamvula Ratshibvumo", partner: "Mitchell Kundaimunashe Nyangani", track: "Data Scientist" },
    { scholar: "Musa Mbedzi", partner: "Mecktilda Midziyarova", track: "Data Engineer" },
    { scholar: "Banele Mncube", partner: "Tshepang Mokone", track: "Machine Learning" },
    { scholar: "Sanelisiwe Mthethwa", partner: "Chiedza Isabel Mudimu", track: "Business Analyst" },
    { scholar: "Salome Mushakarara", partner: "Olliyander Musindo", track: "Analytics Engineer" },
    { scholar: "Musonda Katai", partner: "Natasha Taruvinga", track: "Data Analyst" },
    { scholar: "Sharleen Ngomakapile", partner: "Nigella Koma", track: "Data Scientist" },
    { scholar: "Nkhensane Maoka", partner: "Pretty N", track: "Data Engineer" },
    { scholar: "Prisca Ncube", partner: "Pertunia Bonolo Maduna", track: "Machine Learning" },
    { scholar: "Dikeledi Kwenaite", partner: "Nozipho Lerato Maquta", track: "Business Analyst" },
    { scholar: "Nozipho Zitha", partner: "Cleopatra Ndou", track: "Analytics Engineer" },
    { scholar: "Patience Mupikeni", partner: "Patience Murauro", track: "Data Analyst" },
    { scholar: "Praiseel Kachamakwara", partner: "Prisca Rahatji", track: "Data Scientist" },
    { scholar: "Netshamutavha Rofhiwa", partner: "Rufaro Zumbani", track: "Data Engineer" },
    { scholar: "Rumbidzai Mudzingwa", partner: "Sandra Usiku", track: "Machine Learning" },
    { scholar: "Unathi Siganeko", partner: "Siyamazi Hlatshwayo", track: "Business Analyst" },
    { scholar: "Siphathisile Ncube", partner: "Susan Paidamoyo Chirodzero", track: "Analytics Engineer" },
    { scholar: "Taniel Crouch", partner: "Tatenda Alicia Murwira", track: "Data Analyst" },
    { scholar: "Thabisile Mncube", partner: "Trinity Chasekwa", track: "Data Scientist" },
    { scholar: "Tanyaradzwa Shambira", partner: "Utter Ndlovu", track: "Data Engineer" },
    { scholar: "Venarate Kanhuru", partner: "Vimbai Wayne Magombedze", track: "Machine Learning" },
    { scholar: "Yonelisa Tembani", partner: "Sharmaine Zhou", track: "Business Analyst" },
    { scholar: "Rufaro Zingowo", partner: "Tadiwanashe Zinzombe", track: "Analytics Engineer" }
  ];

  var PEER_PREVIEW = 10;
  var peerBody = document.getElementById("peer-body");
  var peerSearch = document.getElementById("peer-search");
  var peerFilter = document.getElementById("peer-track-filter");
  var peerCount = document.getElementById("peer-count");

  function renderPeers() {
    if (!peerBody) return;
    var q = (peerSearch && peerSearch.value || "").trim().toLowerCase();
    var track = (peerFilter && peerFilter.value) || "all";
    var isFiltering = q !== "" || track !== "all";

    var rows = peerData.filter(function (r) {
      var matchesText =
        !q ||
        r.scholar.toLowerCase().indexOf(q) > -1 ||
        r.partner.toLowerCase().indexOf(q) > -1;
      var matchesTrack = track === "all" || r.track === track;
      return matchesText && matchesTrack;
    });

    if (!rows.length) {
      peerBody.innerHTML = '<tr><td colspan="3" class="no-results">No scholars match your search.</td></tr>';
      if (peerCount) peerCount.textContent = "No scholars match your search. Try another name.";
      return;
    }

    // Only show the first 10 by default; reveal the full match list while filtering.
    var visible = isFiltering ? rows : rows.slice(0, PEER_PREVIEW);

    peerBody.innerHTML = visible
      .map(function (r) {
        return (
          "<tr>" +
          '<td class="scholar-name">' + r.scholar + "</td>" +
          "<td>" + r.partner + "</td>" +
          "<td></td>" +
          "</tr>"
        );
      })
      .join("");

    if (peerCount) {
      if (isFiltering) {
        peerCount.textContent =
          "Showing " + visible.length + " of " + peerData.length + " pairs matching your search.";
      } else {
        peerCount.textContent =
          "Showing the first " + PEER_PREVIEW + " of " + peerData.length +
          " pairs — use the search box above to find any scholar by name.";
      }
    }
  }
  if (peerSearch) peerSearch.addEventListener("input", renderPeers);
  if (peerFilter) peerFilter.addEventListener("change", renderPeers);
  renderPeers();

  /* ---------- Leaderboard data + render ---------- */
  var boardData = [
    { name: "Lerato Nkosi", xp: 18450, courses: 22, certs: 3, projects: 4, highlight: "30-day learning streak" },
    { name: "Kwame Mensah", xp: 17120, courses: 20, certs: 2, projects: 5, highlight: "Completed Data Scientist track" },
    { name: "Aisha Yusuf", xp: 16380, courses: 19, certs: 2, projects: 3, highlight: "Top forum contributor" },
    { name: "Tariro Moyo", xp: 15240, courses: 18, certs: 2, projects: 3, highlight: "Earned SQL Associate cert" },
    { name: "Sipho Khumalo", xp: 14110, courses: 17, certs: 1, projects: 4, highlight: "Published portfolio project" },
    { name: "Chiamaka Obi", xp: 13290, courses: 16, certs: 1, projects: 2, highlight: "Most improved this week" },
    { name: "Amahle Dlamini", xp: 12640, courses: 15, certs: 1, projects: 2, highlight: "Completed Python track" },
    { name: "Emeka Okafor", xp: 11870, courses: 14, certs: 1, projects: 2, highlight: "Shared a DataLab notebook" },
    { name: "Thandeka Zulu", xp: 10930, courses: 13, certs: 1, projects: 1, highlight: "Power BI dashboard built" },
    { name: "Refilwe Modise", xp: 10210, courses: 12, certs: 1, projects: 1, highlight: "Consistent daily learner" }
  ];

  var boardBody = document.getElementById("board-body");
  function rankBadge(i) {
    var cls = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
    return '<span class="rank-badge ' + cls + '">' + (i + 1) + "</span>";
  }
  if (boardBody) {
    boardBody.innerHTML = boardData
      .map(function (r, i) {
        return (
          "<tr>" +
          "<td>" + rankBadge(i) + "</td>" +
          '<td class="scholar-name">' + r.name + "</td>" +
          "<td>" + r.xp.toLocaleString() + " XP</td>" +
          "<td>" + r.courses + "</td>" +
          "<td>" + r.certs + "</td>" +
          "<td>" + r.projects + "</td>" +
          '<td style="color:var(--grey-600)">' + r.highlight + "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
