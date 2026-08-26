    $(document).ready(function () {

      /* ── PROGRAMME HIGHLIGHTS SLIDER ── */
      const track = $('.slider-track');
      const items = $('.slider-item');
      let current = 0;

      function getVisible() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
      }

      function updateSlider() {
        const visibleCount = getVisible();
        const wrapperWidth = $('.slider-wrapper').width();
        const itemWidth = wrapperWidth / visibleCount;
        items.css({ 'min-width': itemWidth + 'px', 'max-width': itemWidth + 'px', 'width': itemWidth + 'px' });
        track.css('transform', 'translateX(-' + (current * itemWidth) + 'px)');
      }

      $('.right-btn').on('click', function () {
        const visibleCount = getVisible();
        if (current < items.length - visibleCount) { current++; updateSlider(); }
      });

      $('.left-btn').on('click', function () {
        if (current > 0) { current--; updateSlider(); }
      });

      $(window).on('resize', function () { current = 0; updateSlider(); updateFaculty(); updateTest(); updateRecognitions(); });
      updateSlider();

      /* ── WHAT'S IN IT FOR YOU CAROUSEL ── */
      (function () {
        const $wTrack = $('.wiifu-track');
        if (!$wTrack.length) return;
        const $wItems = $wTrack.children('.wiifu-item');
        const $wViewport = $('.wiifu-viewport');
        const $wPrev = $('.wiifu-prev');
        const $wNext = $('.wiifu-next');
        const GAP = 24;
        let wIdx = 0;

        function wVisible() {
          const w = window.innerWidth;
          if (w < 576) return 1;
          if (w < 992) return 2;
          return 3;
        }

        function wLayout() {
          const vis = wVisible();
          const vw = $wViewport.width();
          const itemW = (vw - GAP * (vis - 1)) / vis;
          $wItems.css('width', itemW + 'px');
          const maxIdx = Math.max(0, $wItems.length - vis);
          if (wIdx > maxIdx) wIdx = maxIdx;
          $wTrack.css('transform', 'translateX(-' + (wIdx * (itemW + GAP)) + 'px)');
          $wPrev.prop('disabled', wIdx === 0);
          $wNext.prop('disabled', wIdx >= maxIdx);
        }

        $wNext.on('click', function () {
          const maxIdx = Math.max(0, $wItems.length - wVisible());
          if (wIdx < maxIdx) { wIdx++; wLayout(); }
        });
        $wPrev.on('click', function () {
          if (wIdx > 0) { wIdx--; wLayout(); }
        });
        $(window).on('resize', wLayout);
        wLayout();
      })();

      /* ── RECOGNITIONS CAROUSEL FOR MOBILE ── */
      const $reconBadge = $('.recognitions-badges');
      function updateRecognitions() {
        if (window.innerWidth <= 768) {
          if (!$reconBadge.hasClass('owl-carousel')) {
            $reconBadge.addClass('owl-carousel owl-theme').owlCarousel({
              items: 1,
              margin: 20,
              loop: true,
              nav: false,
              dots: true,
              autoplay: true,
              autoplayTimeout: 3500
            });
          }
        } else {
          if ($reconBadge.hasClass('owl-carousel')) {
            $reconBadge.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-theme');
          }
        }
      }
      updateRecognitions();

      /* ── FACULTY CAROUSEL ── */
      const facultyGrid = document.querySelector('.faculty-grid');
      const facultyCards = document.querySelectorAll('.faculty-card');
      const prevBtn = document.querySelector('.faculty-prev-btn');
      const nextBtn = document.querySelector('.faculty-next-btn');
      let fIdx = 0;

      function updateFaculty() {
        if (!facultyGrid || !facultyCards.length) return;
        const gap = parseFloat(window.getComputedStyle(facultyGrid).gap) || 0;
        const w = facultyCards[0].offsetWidth + gap;
        facultyGrid.style.transform = 'translateX(-' + (fIdx * w) + 'px)';
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => { if (fIdx > 0) { fIdx--; updateFaculty(); } });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (!facultyGrid) return;
          const gap = parseFloat(window.getComputedStyle(facultyGrid).gap) || 0;
          const w = facultyCards[0].offsetWidth + gap;
          const visible = Math.floor(facultyGrid.parentElement.offsetWidth / w) || 1;
          const maxIdx = Math.max(0, facultyCards.length - visible);
          if (fIdx < maxIdx) { fIdx++; updateFaculty(); }
        });
      }
      updateFaculty();

      /* ── TESTIMONIALS SLIDER ── */
      const testGrid = document.querySelector('.test-grid');
      const testCards = document.querySelectorAll('.test-card');
      let tIdx = 0;

      function updateTest() {
        if (!testGrid || !testCards.length) return;
        const gap = parseFloat(window.getComputedStyle(testGrid).gap) || 0;
        const w = testCards[0].offsetWidth + gap;
        testGrid.style.transform = 'translateX(-' + (tIdx * w) + 'px)';
      }

      document.getElementById('testPrev')?.addEventListener('click', () => {
        if (tIdx > 0) { tIdx--; updateTest(); }
      });

      document.getElementById('testNext')?.addEventListener('click', () => {
        if (!testGrid) return;
        const gap = parseFloat(window.getComputedStyle(testGrid).gap) || 0;
        const w = testCards[0].offsetWidth + gap;
        const sliderWrap = document.querySelector('.sc-slider-wrap');
        const visible = Math.floor((sliderWrap ? sliderWrap.offsetWidth : testGrid.parentElement.offsetWidth) / w) || 1;
        const maxIdx = Math.max(0, testCards.length - visible);
        if (tIdx < maxIdx) { tIdx++; updateTest(); }
      });

      updateTest();

      /* ── VIDEO BOX ── */
      const videoBox = document.querySelector('.video-box[data-youtube]');
      if (videoBox) {
        videoBox.addEventListener('click', function () {
          const url = this.getAttribute('data-youtube');
          if (url && url.indexOf('REPLACE_VIDEO_ID') === -1) {
            window.open(url, '_blank');
          }
        });
      }

      /* ── DYNAMIC BACKGROUND SWAP FOR ELIGIBILITY SECTION ── */
      $('#eligTabs button').on('shown.bs.tab', function (e) {
        const targetId = $(e.target).attr('data-bs-target');
        const $sec = $('.eligibility-section');
        $sec.removeClass('bg-eligibility bg-fees bg-payment');
        if (targetId === '#tab-elig') {
          $sec.addClass('bg-eligibility');
        } else if (targetId === '#tab-fees') {
          $sec.addClass('bg-fees');
        } else if (targetId === '#tab-payment') {
          $sec.addClass('bg-payment');
        }
      });

/* ── WHO IS THIS PROGRAMME FOR — drag-to-scroll carousel ── */
      (function () {
        const slider = document.querySelector('.who-cards');
        if (!slider) return;
        let isDown = false, startX = 0, startScroll = 0, moved = false;

        slider.addEventListener('mousedown', function (e) {
          isDown = true; moved = false;
          slider.classList.add('dragging');
          startX = e.pageX;
          startScroll = slider.scrollLeft;
        });
        window.addEventListener('mouseup', function () {
          isDown = false;
          slider.classList.remove('dragging');
        });
        slider.addEventListener('mousemove', function (e) {
          if (!isDown) return;
          e.preventDefault();
          const walk = e.pageX - startX;
          if (Math.abs(walk) > 4) moved = true;
          slider.scrollLeft = startScroll - walk;
        });
        /* Prevent the card link/hover from firing after a drag */
        slider.addEventListener('click', function (e) {
          if (moved) { e.preventDefault(); e.stopPropagation(); }
        }, true);

        /* Prev/Next nav buttons */
        const prevBtn = document.querySelector('.who-prev');
        const nextBtn = document.querySelector('.who-next');
        function getStep() {
          const card = slider.querySelector('.who-card2');
          if (!card) return 260;
          const gap = parseFloat(window.getComputedStyle(slider).gap) || 0;
          return card.offsetWidth + gap;
        }
        function updateWhoNavs() {
          if (!prevBtn || !nextBtn) return;
          const overflow = slider.scrollWidth > slider.clientWidth + 2;
          prevBtn.style.display = overflow ? '' : 'none';
          nextBtn.style.display = overflow ? '' : 'none';
          prevBtn.disabled = slider.scrollLeft <= 2;
          nextBtn.disabled = slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 2);
        }
        if (prevBtn) prevBtn.addEventListener('click', function () {
          slider.scrollBy({ left: -getStep(), behavior: 'smooth' });
        });
        if (nextBtn) nextBtn.addEventListener('click', function () {
          slider.scrollBy({ left: getStep(), behavior: 'smooth' });
        });
        slider.addEventListener('scroll', updateWhoNavs);
        window.addEventListener('resize', updateWhoNavs);
        updateWhoNavs();
      })();

      /* ── FACULTY — drag-to-scroll carousel ── */
      (function () {
        const slider = document.querySelector('.faculty-row');
        if (!slider) return;
        let isDown = false, startX = 0, startScroll = 0, moved = false;

        slider.addEventListener('mousedown', function (e) {
          isDown = true; moved = false;
          slider.classList.add('dragging');
          startX = e.pageX;
          startScroll = slider.scrollLeft;
        });
        window.addEventListener('mouseup', function () {
          isDown = false;
          slider.classList.remove('dragging');
        });
        slider.addEventListener('mousemove', function (e) {
          if (!isDown) return;
          e.preventDefault();
          const walk = e.pageX - startX;
          if (Math.abs(walk) > 4) moved = true;
          slider.scrollLeft = startScroll - walk;
        });
        slider.addEventListener('click', function (e) {
          if (moved) { e.preventDefault(); e.stopPropagation(); }
        }, true);

        const prevBtn = document.querySelector('.faculty-prev');
        const nextBtn = document.querySelector('.faculty-next');
        function getStep() {
          const card = slider.querySelector('.faculty-card');
          if (!card) return 260;
          const gap = parseFloat(window.getComputedStyle(slider).gap) || 0;
          return card.offsetWidth + gap;
        }
        function updateFacultyNavs() {
          if (!prevBtn || !nextBtn) return;
          prevBtn.disabled = slider.scrollLeft <= 2;
          nextBtn.disabled = slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 2);
        }
        if (prevBtn) prevBtn.addEventListener('click', function () {
          slider.scrollBy({ left: -getStep(), behavior: 'smooth' });
        });
        if (nextBtn) nextBtn.addEventListener('click', function () {
          slider.scrollBy({ left: getStep(), behavior: 'smooth' });
        });
        slider.addEventListener('scroll', updateFacultyNavs);
        window.addEventListener('resize', updateFacultyNavs);
        updateFacultyNavs();
      })();

    });
