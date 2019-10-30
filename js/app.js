function ArtHorn(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allimages.push(this);
}

let allimages = [];

$(document).ready(function() {
  $.get("data/page-1.json").then(function(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      new ArtHorn(
        data[i].image_url,
        data[i].title,
        data[i].description,
        data[i].keyword,
        data[i].horns
      );
      //   for (let j = 0; j < data[i].keyword.length; j++)

      $("#key-container").html(`<option>${data[i].keyword}</option>`);
      console.log(data[i].keyword);
    }

    renderImages();
  });
  console.log(allimages);
});

// let images = new artHorn(
// );

function renderImages() {
  for (let i = 0; i < allimages.length; i++) {
    $("#photo-template").append(
      `<section><h2>${allimages[i].title}</h2><img src="${allimages[i].image_url}"><p>${allimages[i].description}<p></section>`
    );
  }
}
