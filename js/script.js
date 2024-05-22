$(document).ready(function () {
  $(".header-lang__top").on("click", function () {
    $(".header__lang").toggleClass("active"); // Сначала удалить класс у всех элементов
  });

  $(".header__menu").on("click", function () {
    $(this).toggleClass("active");
    $(".header-list__wrapper, .header__right").toggleClass("active");
  });
  if ($(window).width() > 1200) {
    var sections = $(".section-class");
    var navItems = $(".section-list__item");
    var currentSection = 0;
    var isAnimating = false;
    var isHoveringDiscordRightBottom = false;

    function scrollToSection(index) {
      if (index >= 0 && index < sections.length && !isAnimating) {
        isAnimating = true;
        $("html, body").animate(
          {
            scrollTop: sections.eq(index).offset().top,
          },
          300,
          function () {
            isAnimating = false;
            setActiveSection(index);
          }
        );
      }
    }

    function setActiveSection(index) {
      sections.removeClass("active");
      sections.eq(index).addClass("active");
      navItems.removeClass("active");
      navItems.eq(index).addClass("active");
    }

    // Adding click event listener to each nav item
    navItems.each(function (index) {
      $(this).on("click", function () {
        scrollToSection(index);
      });
    });

    $(window).on("wheel", function (e) {
      if (isAnimating || isHoveringDiscordRightBottom) return;

      if (e.originalEvent.deltaY > 0) {
        // Scroll down
        currentSection++;
      } else {
        // Scroll up
        currentSection--;
      }

      currentSection = Math.max(
        0,
        Math.min(sections.length - 1, currentSection)
      );
      scrollToSection(currentSection);
    });

    $(window).on("keydown", function (e) {
      if (isAnimating || isHoveringDiscordRightBottom) return;

      if (e.which == 40) {
        // Down arrow
        currentSection++;
      } else if (e.which == 38) {
        // Up arrow
        currentSection--;
      }

      currentSection = Math.max(
        0,
        Math.min(sections.length - 1, currentSection)
      );
      scrollToSection(currentSection);
    });

    // Adding hover event listeners to the discord-right__bottom element
    $(".discord-right__bottom").on("mouseenter", function () {
      isHoveringDiscordRightBottom = true;
    });

    $(".discord-right__bottom").on("mouseleave", function () {
      isHoveringDiscordRightBottom = false;
    });

    // Set the initial active section
    setActiveSection(currentSection);
  }
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".header-lang__dropdown, .header-lang__top")
        .length
    ) {
      $(".header__lang").removeClass("active");
    }
  });
  $(".spoiler-item__top").on("click", function () {
    var $currentParent = $(this).closest(".spoiler__item");
    var $currentBottom = $currentParent.find(".spoiler-item__bottom");

    // Закрываем все открытые спойлеры, кроме текущего
    $(".spoiler__item")
      .not($currentParent)
      .removeClass("active")
      .find(".spoiler-item__bottom")
      .css("height", 0);

    // Переключаем состояние текущего спойлера
    $currentParent.toggleClass("active");

    if ($currentParent.hasClass("active")) {
      var bottomHeight = $currentBottom[0].scrollHeight;
      $currentBottom.css("height", bottomHeight);
    } else {
      $currentBottom.css("height", 0);
    }
  });
  $(".deskr-aside__item")
    .click(function () {
      if (!$(this).hasClass("deskr-aside__item--empty")) {
        // Удалить класс active у всех aside-элементов и добавить к текущему
        $(".deskr-aside__item").removeClass("deskr-aside__item--active");
        $(this).addClass("deskr-aside__item--active");

        // Показать соответствующий контент-элемент
        var index = $(this).index(
          ".deskr-aside__item:not(.deskr-aside__item--empty)"
        );
        $(".deskr-content__item").hide().eq(index).fadeIn();
      }
    })
    .eq(0)
    .click();
  function wrapTable() {
    if ($(window).width() < 992) {
      $(".text-area table").each(function () {
        if (!$(this).parent().hasClass("table-box")) {
          $(this).wrap('<div class="table-box"></div>');
        }
      });
    } else {
      $(".text-area .table-box").each(function () {
        $(this).find("table").unwrap();
      });
    }
  }

  wrapTable();

  $(window).resize(function () {
    wrapTable();
  });
  $(".changes__slider").owlCarousel({
    loop: false,
    nav: true,
    items: 5,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 3,
      },
      1360: {
        items: 3,
      },
      1601: {
        items: 4,
      },
      1921: {
        items: 5,
      },
    },
  });
});
