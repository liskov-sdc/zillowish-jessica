
var gridTemplate = (arr) => {
  var html = '';
  html += `<div class="grid-container">`;
  for (var i = 0; i < arr.length; i++) {
    html += `<div class="grid-item">${arr[i].img_url}</div>`;
  }
  html += '</div>';
  return html;
};


$(document).ready(function() {
  $('p').click(function() {
    $(this).hide();
  });
});