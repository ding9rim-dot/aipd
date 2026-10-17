document.querySelectorAll('.prompt').forEach(function (box) {
  var btn = box.querySelector('button.copy');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var text = box.querySelector('pre').innerText;
    var done = function () { btn.textContent = '복사됨 ✓'; btn.classList.add('done');
      setTimeout(function () { btn.textContent = '복사하기'; btn.classList.remove('done'); }, 1600); };
    if (navigator.clipboard) { navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); }); }
    else { fallback(text); done(); }
  });
});
function fallback(t) {
  var a = document.createElement('textarea'); a.value = t; document.body.appendChild(a);
  a.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(a);
}
// [바꿀 자리] 강조 (복사되는 글자는 그대로)
document.querySelectorAll('.prompt pre').forEach(function (p) {
  p.innerHTML = p.innerHTML.replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>');
});
