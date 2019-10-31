("use strict");

HornImage.all = [];

function HornImage(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

HornImage.prototype.render = function() {
  $("main").append('<div class="image-container"></div>');
  let $imageContainer = $('div[class="image-container"]');
  $imageContainer.html($("#photo-template").html());
  $imageContainer.find("h2").text(this.title);
  $imageContainer.find("img").attr("src", this.image_url);
  $imageContainer.find("p").text(this.description);
  $imageContainer.attr("class", this.keyword);
  $imageContainer.removeClass("image-container");
};

HornImage.requestData = () => {
  $.get("./data/page-1.json")
    .then(data => {
      data.forEach(item => {
        HornImage.all.push(new HornImage(item));
        var theTemplateScript = $("#address-template").html();

        // Compile the template
        var theTemplate = Handlebars.compile(theTemplateScript);

        // Define our data object
        var context2 = {
          image_url: item.image_url,
          title: item.title,
          description: item.description,
          keyword: item.keyword,
          horns: item.horns
        };

        // Pass our data to the template
        var theCompiledHtml = theTemplate(context2);

        // Add the compiled html to the page
        $(".content-placeholder").html(theCompiledHtml);
      });

      HornImage.all.forEach(image => {
        $("main").append(image.render());
      });
      HornImage.populateFilters();
    })
    .then(HornImage.filterSelected);
};

HornImage.populateFilters = () => {
  let selectedItems = [];

  HornImage.all.forEach(image => {
    if (!selectedItems.includes(image.keyword)) {
      selectedItems.push(image.keyword);
      $("select").append(`<option>${image.keyword}</option>`);
    }
  });
};

HornImage.filterSelected = () => {
  $("select").on("change", function() {
    let selection = $(this).val();
    if (selection !== "filter by keyword") {
      $("div").hide();
      $("div").removeClass("selected");
      HornImage.all.forEach(image => {
        if (image.keyword === selection) {
          $(`div[class="${selection}"]`)
            .addClass("selected")
            .fadeIn();
        }
      });
      $(`option[value="${selection}"]`).fadeIn();
    }
  });
};

$(() => HornImage.requestData());

// ======================================================================

// ===========================================

// $(function() {
//   // Grab the template script
//   var theTemplateScript = $("#address-template").html();

//   // Compile the template
//   var theTemplate = Handlebars.compile(theTemplateScript);

//   // Define our data object
//   var context2 = {
//     image_url:
//       "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
//     title: "UniWhal",
//     description:
//       "A unicorn and a narwhal nuzzling their horns dfdfdfdfdfdfdfdfdf",
//     keyword: "narwhal",
//     horns: 1
//   };

//   // Pass our data to the template
//   var theCompiledHtml = theTemplate(context2);

//   // Add the compiled html to the page
//   $(".content-placeholder").html(theCompiledHtml);
// });
