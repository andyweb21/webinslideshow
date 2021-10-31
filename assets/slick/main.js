(function($) {
    jQuery('.annual-slide').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="las la-angle-left"></i></a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="las la-angle-right"></i></a>',
        responsive: [
        {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });
    jQuery('.timeline-slide').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="las la-angle-left"></i></a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="las la-angle-right"></i></a>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
        ]
    });
    jQuery('.single-slide').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="las la-angle-left"></i></a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="las la-angle-right"></i></a>'
    });
    jQuery('.portfolio-slide').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="las la-angle-left"></i></a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="las la-angle-right"></i></a>',
        responsive: [
            {
                breakpoint: 950,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
              },
              {
                breakpoint: 450,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
    });

    var ftr = false;

    jQuery('.category-filter a').on('click', function(){
      var sid = jQuery(this).attr('data-slide');
      var par = jQuery(this).closest('.portfolio__category-list');
      var cat = jQuery(this).attr('data-cat');

      par.find('.category-item').removeClass('active');
      jQuery(this).parent().addClass('active');
      
      if (cat === 'all') {
          jQuery('#'+sid+'.portfolio-slide').slick('slickUnfilter');
          ftr = false;
      } else {
          jQuery('#'+sid+'.portfolio-slide').slick('slickUnfilter');
          ftr = false;
          jQuery('#'+sid+'.portfolio-slide').slick('slickFilter','.portfolio-cat-'+cat);
          ftr = true;
          jQuery('#'+sid + ' .slick-current .portfolio-item').click();
      }
  });

    jQuery('.people-slide').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="las la-angle-left"></i></a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="las la-angle-right"></i></a>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
    });
    jQuery('.slideshow-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slideshow-thumbnail'
    });
    jQuery('.slideshow-thumbnail').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slideshow-main',
        arrows: true,
        vertical: true,
        focusOnSelect: true,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="las la-angle-up"></i></a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="las la-angle-down"></i></a>'
    });

    $('.post-slide').each(function() {
      var $postSlide = $(this);

      var currentSlide;
      var slidesCount;
      
      var updateSliderCounter = function(slick, currentIndex) {
        currentSlide = slick.slickCurrentSlide() + 1;
        slidesCount = slick.slideCount;
        
        $postSlide.next('.slider__counter').html('<span class="current-number">' + currentSlide + '</span> | ' +slidesCount);
      };
  
      $postSlide.on('init', function(event, slick) {
        updateSliderCounter(slick);
      });
  
      $postSlide.on('afterChange', function(event, slick, currentSlide) {
        updateSliderCounter(slick, currentSlide);
      });
      
      $postSlide.slick({
          infinite: false,
          dots: false,
          slidesToShow: 3,
          adaptiveHeight: true,
          slidesToScroll: 3,
          prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="las la-angle-left"></i></a>',
          nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="las la-angle-right"></i></a>',
          responsive: [
            {
              breakpoint: 950,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                adaptiveHeight: true,
              }
            },
            {
              breakpoint: 450,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
              }
            }
          ]
      });

      var filtered = false;
      
      $postSlide.closest('.container').find('.year-filter').on('click', function(){
          // var sid = jQuery(this).attr('data-slide');
          var par = jQuery(this).parent();
          par.children('.year-item').removeClass('active');
          jQuery(this).addClass('active');
          var year = jQuery(this).attr('data-year');
          if (year === 'all') {
              $postSlide.slick('slickUnfilter');
              filtered = false;
          } else {
              $postSlide.slick('slickUnfilter');
              filtered = false;
              $postSlide.slick('slickFilter','.post-year-'+year);
              filtered = true;
          }
          $postSlide.on('reInit', function(event, slick) {
            updateSliderCounter(slick);
          });
      });

      var psftr = false;

      $postSlide.closest('.container').find('.category-filter a').on('click', function(){
          var par = jQuery(this).closest('.portfolio__category-list');
          var cat = jQuery(this).attr('data-cat');

          par.find('.category-item').removeClass('active');
          jQuery(this).parent().addClass('active');
          
          if (cat === 'all') {
              $postSlide.slick('slickUnfilter');
              psftr = false;
          } else {
              $postSlide.slick('slickUnfilter');
              psftr = false;
              $postSlide.slick('slickFilter','.post-company-'+cat);
              psftr = true;
          }
      });
      
    }); // Each Post-slide

})( jQuery );