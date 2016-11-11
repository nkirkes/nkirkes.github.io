var app = (function() {
  var api = {
      _isWithTooltips: false,
      views: {},
      models: {},
      collections: {},
      content: null,
      router: null,
      eventList: null,
      map: null,
      init: function() {
          this.content = $("#content");
          this.eventList = new api.collections.eventList();
          Backbone.history.start();
          
          this._tableSorters();
          this._tooltips();
          this._navDoc();

          $(window).on('resize', this._tooltips)

          $(document).on('shown.bs.tab', function () {
            $(document).trigger('redraw.bs.charts')
          })

          // docs top button
          if ($('.docs-top').length) {
            this._backToTopButton()
            $(window).on('scroll', this._backToTopButton)
          }
      },
      filterResults: function() {
          console.dir(this);
      },
      _navDoc: function () {
        // doc nav js
        var $toc    = $('#markdown-toc')
        var $window = $(window)

        if ($toc[0]) {

          maybeActivateDocNavigation()
          $window.on('resize', maybeActivateDocNavigation)

          function maybeActivateDocNavigation () {
            if ($window.width() > 768) {
              activateDocNavigation()
            } else {
              deactivateDocNavigation()
            }
          }

          function deactivateDocNavigation() {
            $window.off('resize.theme.nav')
            $window.off('scroll.theme.nav')
            $toc.css({
              position: '',
              left: '',
              top: ''
            })
          }

          function activateDocNavigation() {

            var cache = {}

            function updateCache() {
              cache.containerTop   = $('.docs-content').offset().top - 40
              cache.containerRight = $('.docs-content').offset().left + $('.docs-content').width() + 45
              measure()
            }

            function measure() {
              var scrollTop = $window.scrollTop()
              var distance =  Math.max(scrollTop - cache.containerTop, 0)

              if (!distance) {
                $($toc.find('li')[1]).addClass('active')
                return $toc.css({
                  position: '',
                  left: '',
                  top: ''
                })
              }

              $toc.css({
                position: 'fixed',
                left: cache.containerRight,
                top: 40
              })
            }

            updateCache()

            $(window)
              .on('resize.theme.nav', updateCache)
              .on('scroll.theme.nav', measure)

            $('body').scrollspy({
              target: '#markdown-toc',
              selector: 'li > a'
            })

            setTimeout(function () {
              $('body').scrollspy('refresh')
            }, 1000)
          }
        }
      },

      _backToTopButton: function () {
        if ($(window).scrollTop() > $(window).height()) {
          $('.docs-top').fadeIn()
        } else {
          $('.docs-top').fadeOut()
        }
      },

      _tooltips: function () {
        if ($(window).width() > 768) {
          if (this._isWithTooltips) return
          this._isWithTooltips = true
          $('[data-toggle="tooltip"]').tooltip()

        } else {
          if (!this._isWithTooltips) return
          this._isWithTooltips = false
          $('[data-toggle="tooltip"]').tooltip('destroy')
        }

      },

      _tableSorters: function () {
        $('[data-sort="table"]').tablesorter( {sortList: [[1,0]]} )
      }
  };

  // init views
  var ViewFactory = {
      listView: function() {
          if(!this.eventListView) {
              this.eventListView = new api.views.eventListView({
                  model: api.eventList
              });
          }
          return this.eventListView;
      }
  };

  // init routing
  var Router = Backbone.Router.extend({
      routes: {
          "": "listView"
      },
      listView: function() {
          var view = ViewFactory.listView({ map: this.map });
          view.render();
      }
  });
  api.router = new Router();
  return api;
})();
