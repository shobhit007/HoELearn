import { CourseInstructor, RawCourse } from "@/api/course";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getThumbnail(course: RawCourse) {
  return course.thumbnail ?? course.images?.[0] ?? "";
}

function buildInstructorsHtml(instructors: CourseInstructor[]) {
  if (instructors.length === 0) return "";

  const items = instructors
    .map((instructor) => {
      const name = escapeHtml(instructor.name);
      const avatarUrl = escapeHtml(instructor.avatarUrl);

      return `<div class="instructor-item">
        <img
          class="instructor-avatar"
          src="${avatarUrl}"
          alt="${name}"
        />
        <div class="instructor-name">${name}</div>
      </div>`;
    })
    .join("");

  return `<div class="section-label">Instructors</div>
    <div class="instructors-row">${items}</div>`;
}

export default function useHTML() {
  const generateHTML = (
    course: RawCourse | null,
    instructors: CourseInstructor[] = [],
  ) => {
    if (!course) return null;

    const title = escapeHtml(course.title?.trim() || "Untitled course");
    const description = escapeHtml(
      course.description?.trim() || "No description available for this course.",
    );
    const thumbnail = escapeHtml(getThumbnail(course));
    const instructorsHtml = buildInstructorsHtml(instructors);
    const category = course.category
      ? escapeHtml(course.category.replace(/-/g, " "))
      : "";
    const rating = course.rating != null ? course.rating.toFixed(1) : null;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <title>${title}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #F8FAFC;
      color: #0F172A;
      line-height: 1.5;
      padding-bottom: 96px;
    }

    .hero {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #DBEAFE;
      overflow: hidden;
    }

    .hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .hero-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      color: #208AEF;
      background: linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%);
    }

    .content {
      padding: 20px 20px 0;
    }

    .badge-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.3px;
      text-transform: capitalize;
    }

    .badge-category {
      background: #208AEF;
      color: #ffffff;
    }

    .badge-rating {
      background: #FEF3C7;
      color: #92400E;
    }

    .title {
      font-size: 26px;
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: 16px;
      color: #0F172A;
    }

    .section-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #208AEF;
      margin-bottom: 8px;
    }

    .description {
      font-size: 15px;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 28px;
    }

    .instructors-row {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      padding-bottom: 4px;
      margin-bottom: 28px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .instructors-row::-webkit-scrollbar {
      display: none;
    }

    .instructor-item {
      flex: 0 0 auto;
      width: 88px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      text-align: center;
    }

    .instructor-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #DBEAFE;
      flex-shrink: 0;
      background: #EFF6FF;
    }

    .instructor-name {
      font-size: 13px;
      font-weight: 700;
      color: #0F172A;
      line-height: 1.3;
      word-break: break-word;
    }

    .action-bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.96);
      border-top: 1px solid #E2E8F0;
    }

    .btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 52px;
      padding: 14px 16px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      border: none;
      font-family: inherit;
    }

    .btn-enroll {
      background: #208AEF;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(32, 138, 239, 0.28);
    }

    .btn-enrolled {
      background: #16A34A !important;
      box-shadow: none !important;
    }

    .btn-enrolled:disabled {
      opacity: 0.95;
      cursor: default;
    }

    .btn-bookmark {
      flex: 0 0 52px;
      width: 52px;
      min-width: 52px;
      padding: 0;
      background: #EFF6FF;
      color: #208AEF;
      border: 1px solid #BFDBFE;
    }

    .btn-bookmark-active {
      background: #208AEF !important;
      color: #ffffff !important;
      border-color: #208AEF !important;
      box-shadow: 0 4px 14px rgba(32, 138, 239, 0.24);
    }

    .btn-icon {
      width: 20px;
      height: 20px;
    }
  </style>
</head>
<body>
  <div class="hero">
    ${
      thumbnail
        ? `<img src="${thumbnail}" alt="${title}" />`
        : `<div class="hero-placeholder">📚</div>`
    }
  </div>

  <div class="content">
    ${
      category || rating
        ? `<div class="badge-row">
            ${category ? `<span class="badge badge-category">${category}</span>` : ""}
            ${rating ? `<span class="badge badge-rating">★ ${rating}</span>` : ""}
          </div>`
        : ""
    }

    <h1 class="title">${title}</h1>

    <div class="section-label">About this course</div>
    <p class="description">${description}</p>

    ${instructorsHtml}
  </div>

  <div class="action-bar">
    <button type="button" class="btn btn-enroll" id="btn-enroll" onclick="sendMessageEvent('ENROLL_EVENT')">Enroll now</button>
    <button type="button" class="btn btn-bookmark" id="btn-bookmark" aria-label="Bookmark course" onclick="sendMessageEvent('BOOKMARK_EVENT')">
      <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path id="bookmark-path" d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>

  <script>
    function sendMessageEvent(action) {
      if (!window.ReactNativeWebView) {
        return;
      }

      window.ReactNativeWebView.postMessage(action);
    }
  </script>
</body>

</html>`;
  };

  return {
    generateHTML,
  };
}
