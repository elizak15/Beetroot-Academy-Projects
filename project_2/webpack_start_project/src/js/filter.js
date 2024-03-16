 /* Filter */

  (function ($) {
    function setChecked(target) {
      var checked = $(target).find("input[type='checkbox']:checked").length;
      if (checked) {
        $(target)
          .find("select option:first")
          .html("Alle filter: " + checked);
      } else {
        $(target).find("select option:first").html("Alle filter");
      }
    }

    $.fn.checkselect = function () {
      this.wrapInner('<div class="checkselect-popup"></div>');
      this.prepend(
        '<div class="checkselect-control">' +
        '<select class="form-control"><option></option></select>' +
        '<div class="checkselect-over"></div>' +
        "</div>"
      );

      this.each(function () {
        setChecked(this);
      });
      this.find('input[type="checkbox"]').click(function () {
        setChecked($(this).parents(".checkselect"));
      });

      this.parent()
        .find(".checkselect-control")
        .on("click", function () {
          $popup = $(this).next();
          $(".checkselect-popup").not($popup).css("display", "none");
          if ($popup.is(":hidden")) {
            $popup.css("display", "block");
            $(this).find("select").focus();
          } else {
            $popup.css("display", "none");
          }
        });

      $("html, body").on("click", function (e) {
        if ($(e.target).closest(".checkselect").length == 0) {
          $(".checkselect-popup").css("display", "none");
        }
      });
    };
  })(jQuery);

  $(".checkselect").checkselect();

  $(".filters").on("change", function () {
    let filters = [];
    // get checked checkboxes values
    $(".filters")
      .filter(":checked")
      .each(function () {
        filters.push(this.id);
      });

    let filtersString = filters.length > 0 ? "." + filters.join(".") : "";

    console.log(filtersString);

    gal.isotope({
      filter: filtersString,
    });
  });

