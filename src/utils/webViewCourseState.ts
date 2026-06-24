export function buildCourseActionStateScript(
  isEnrolled: boolean,
  isBookmarked: boolean,
): string {
  return `
(function() {
  var enrollBtn = document.getElementById('btn-enroll');
  var bookmarkBtn = document.getElementById('btn-bookmark');
  var bookmarkPath = document.getElementById('bookmark-path');

  if (enrollBtn) {
    if (${isEnrolled}) {
      enrollBtn.classList.add('btn-enrolled');
      enrollBtn.textContent = 'Enrolled';
    } else {
      enrollBtn.classList.remove('btn-enrolled');
      enrollBtn.textContent = 'Enroll now';
    }
  }

  if (bookmarkBtn && bookmarkPath) {
    if (${isBookmarked}) {
      bookmarkBtn.classList.add('btn-bookmark-active');
      bookmarkPath.setAttribute('fill', 'currentColor');
      bookmarkPath.setAttribute('stroke', 'none');
    } else {
      bookmarkBtn.classList.remove('btn-bookmark-active');
      bookmarkPath.setAttribute('fill', 'none');
      bookmarkPath.setAttribute('stroke', 'currentColor');
    }
  }
})();
true;
`;
}
