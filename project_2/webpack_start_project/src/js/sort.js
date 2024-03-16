/* SORT */

  const gal = $(".items-isopote");
  gal.isotope({
    itemSelector: ".item",
    getSortData: {
      number: ".number parseInt",
      name: ".name",
      category: "[data-category]",
    },
  });

  gal.imagesLoaded().progress(function () {
    gal.isotope("layout");
  });

  $("#sort-select").on("change", function () {
    if ($("#sort-select :selected").text() == "Preis")
      gal.isotope({ sortBy: "number" });
    else if ($("#sort-select :selected").text() == "Name")
      gal.isotope({ sortBy: "name" });
    else if ($("#sort-select :selected").text() == "Sortieren nach")
      gal.isotope({ sortBy: "original-order" });
  });

  $(document).on("click", ".nav__item", function () {
    const $this = $(this);
    const filter = "." + $this.data("filter");
    console.log(filter);
    gal.isotope({ filter });
  });
