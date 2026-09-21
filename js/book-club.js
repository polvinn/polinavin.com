document.querySelectorAll('.club-faq-answer').forEach(answer => {
  answer.addEventListener('click', event => {
    if (event.target.closest('a, button, input, textarea, select') || window.getSelection()?.toString()) return;
    const item = answer.closest('details');
    item.open = false;
    item.querySelector('summary').focus({ preventScroll: true });
  });
});
