# Core36 / Focus 66

A browser-based study tracker for **27 October – 31 December 2026**. This repository keeps the original Blind 75 coding sheet in [index.html](index.html) and adds [Focus 66](planner.html), an interactive study planner for GATE DA, placement preparation, college ICE coursework, AI engineering projects, research, and wellbeing.

## Open the app

Serve the repository through a local HTTP server (ES modules may not load correctly using the file:// protocol):

    python -m http.server 8000

Then visit http://localhost:8000/planner.html for Focus 66 or http://localhost:8000/ for the original Blind 75 page.

**Static hosting:** Deploy the repository root using GitHub Pages or any ordinary static host. No build step, database, secret, OAuth login, paid service, or environment variables are needed. Focus 66 is reachable at /planner.html; / continues to show the original tracker.

## Features

- Daily tasks across all 66 calendar dates, grouped into 10 weeks with specific LeetCode exercises, GATE DA topics, project actions, college study, and rest.
- Date navigation and weekly roadmap, with checked/completed vs skipped session states.
- Exam mode per date prioritizing college revision while retaining normal-mode progress.
- Private daily learning notes, with local browser persistence.
- Whole-plan and per-week progress totals; completed DSA *sessions* (not a verified LeetCode solve count).
- JSON backup export/import with schema validation. Use Export before clearing a browser, changing device, or switching browser profiles.
- Responsive mobile and desktop layout, semantic HTML, keyboard-focus styles, reduced-motion support.

## GATE DA — not GATE IN

The schedule uses the **revised GATE 2027 Data Science & Artificial Intelligence (DA)** syllabus, with General Aptitude plus the seven technical areas:

1. Probability and Statistics
2. Linear Algebra
3. Calculus and Optimization
4. Programming, Data Structures and Algorithms (Python)
5. Database Management and Warehousing
6. Machine Learning
7. Artificial Intelligence

The canonical syllabus and any further updates should be checked on the [official GATE 2027 website](https://gate2027.iitm.ac.in/exam_papers_and_syllabus). The plan is a 66-day **foundation and practice sequence**, not a claim of comprehensive GATE preparation. OS, networking, backend, Docker, etc. are placement topics; ICE lecture work is part of separate **college coursework** tasks, not DA syllabus.

### Project and research scope

- **Voice Doctor AI**: offline Telugu/English voice pipeline, retrieval, testing, measured inference, safety documentation.
- **No Hack**: Windows capture/flows, threat-detection baseline, data quality, evaluation, testing, CLI demo.
- **AURA**: finalize/check research claims and submission requirements. Submission or acceptance is never assumed.
- Do not check a task done unless you genuinely completed it; each daily task is a *proposed* target.
- During exams, activate Exam mode. Rest, meals, and enough sleep are included intentionally; do not compensate by cutting sleep.

## Repository layout

- index.html: existing Blind 75 coding tracker; preserved.
- planner.html: accessible user interface markup.
- planner.css: responsive dashboard styling.
- plan-data.js: 10-week syllabus, daily topic sets, DSA exercises, project suggestions.
- planner-core.js: date arithmetic, daily plan generation, exam-mode logic, backup validation and statistics.
- planner.js: browser interaction, local persistence, progress rendering, import/export.
- tests/planner.test.js: unit tests on calendar coverage, subject areas, links, exam mode and data validation.
- .github/workflows/focus66.yml: Node.js syntax and unit checks.

## Validate locally

Requires Node.js 20+:

    npm test
    node --check planner.js

The UI can be smoke-tested in any modern browser: open dates in both months, mark/undo a task, switch Exam mode on/off, enter a note, export progress, import it, reload and verify the same state, and open the Blind 75 link.

## Data and privacy

The app uses localStorage under key core36.focus66.v1. It does **not** send user notes or progress to a server. Data is scoped to the browser/profile and the current origin; another browser or device will not have the same state until the user imports a backup. JSON import intentionally filters invalid dates, statuses, and oversized notes. The import control replaces existing state after a confirmation dialog.

## Extending the schedule

Change WEEKS and DSA in plan-data.js, then update tests if the date range or structure changes. Dates are parsed as UTC calendar days to avoid DST bugs; today's default date is based on **Asia/Kolkata**. The tracker itself does not require the user's precise location. Weekly themes match the plan's actual start dates, not arbitrary 7-day offsets.

## Limitations

This is a **client-only personal tracker**: it cannot confirm whether a LeetCode submission is accepted, a GitHub commit exists, GATE questions were solved, or research was submitted. It does not sync or send reminders. Suggested project milestones depend on the real repository and may need adjustments after audits. Interview readiness and salary offers are not guaranteed.
