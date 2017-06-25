// Tabgreggate v1.0
// Created by Leon Chen
//
// Aimed at collating all active tabs into one viewable page, 
// and seeing productivity statistics. Written with jQuery.

Tabgreggate_Popup = {

  fillTabCount : function(int) {
    document.getElementById('num_tabs').appendChild(document.createTextNode(--int));
  },

  onAnchorClick : function(event) {
    chrome.tabs.create({
      selected: true,
      url: event.srcElement.href
    });
    return false;
  },

  createAndAppendIcon : function(icon_url, div_element) {
    var img = document.createElement('img');
    img.src = icon_url;
    img.height = '15';
    img.width = '15';
    div_element.appendChild(img);
  },

  createAndAddDiv : function(counter, icon_url, url, title) {
    var container = $('#tabs_collection');
    var textarea = document.createElement('div');
    textarea.appendChild(document.createTextNode(counter.toString() + '. '));
    if (icon_url != '') {
      Tabgreggate_Popup.createAndAppendIcon(icon_url, textarea);
    }
    var link = document.createElement('a');
    link.href = url;
    link.appendChild(document.createTextNode('\t' + title));
    link.addEventListener('click', Tabgreggate_Popup.onAnchorClick);
    textarea.appendChild(link);
    container.append(textarea);
    container.append(document.createElement('br'));
  },

  grabTabs : function() {
    chrome.tabs.query({} ,function(tabs){
        var counter = 1;
        tabs.forEach(function(tab){
          Tabgreggate_Popup.createAndAddDiv(counter, tab.favIconUrl, tab.url, tab.title);
          counter++;
        });
        Tabgreggate_Popup.fillTabCount(counter);
     });
  },

  setupEvents : function() {
    var img = $('#view_more');
    img.click(function() {
      var tabs = $('#tabs_collection');
      if (!tabs.is(':visible')) {
        tabs.show();
        img.rotate(180);
      } else {
        tabs.hide();
        img.rotate(360);
      };
    });
    var collate = $('collate');
    collate.click(function() {
      chrome.tabs.create({url: chrome.extension.getURL('tabgreggate.html')});
      window.close();
    })
  },

  onLoad : function() {
    Tabgreggate_Popup.grabTabs();
    Tabgreggate_Popup.setupEvents();
  }
}

$(window).on('load', function(){
  Tabgreggate_Popup.onLoad();
});
