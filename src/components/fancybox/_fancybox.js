//gallery
if ($('[data-fancybox="images"]')) {
  $('[data-fancybox="images"]').fancybox({
    baseClass: 'myFancyBox',
    thumbs: {
      autoStart: true,
      axis: 'x'
    }
  });
}