import { START, END, WEEKS, DSA } from "./plan-data.js";

const DAY_MS = 86400000;
export function toUTC(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return null;
  const d = new Date(iso + "T00:00:00.000Z");
  return !Number.isNaN(+d) && d.toISOString().slice(0, 10) === iso ? d : null;
}
export function addDays(iso, count) {
  const d = toUTC(iso);
  if (!d) throw new Error("Invalid ISO date");
  return new Date(+d + count * DAY_MS).toISOString().slice(0, 10);
}
export function allDates() {
  const total = Math.round((+toUTC(END) - +toUTC(START)) / DAY_MS);
  return Array.from({ length: total + 1 }, (_, i) => addDays(START, i));
}
export function validDate(iso) {
  return Boolean(toUTC(iso)) && iso >= START && iso <= END;
}
export function dateIndex(iso) {
  if (!validDate(iso)) return -1;
  return Math.round((+toUTC(iso) - +toUTC(START)) / DAY_MS);
}
export function weekIndex(iso) {
  if (!validDate(iso)) return -1;
  let index = 0;
  for (let i = 0; i < WEEKS.length; i++) if (iso >= WEEKS[i].start) index = i;
  return index;
}
export function dateLabel(iso, options = {}) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric", weekday: "long", ...options }).format(toUTC(iso));
}
export function todayIndia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year:"numeric", month:"2-digit", day:"2-digit" }).format(new Date());
}
const doneBefore = (iso) => allDates().filter(day => day <= iso && toUTC(day).getUTCDay() !== 0).length;
export function planForDate(iso, examMode = false) {
  if (!validDate(iso)) throw new Error("Date outside plan");
  const day = toUTC(iso).getUTCDay();
  const w = weekIndex(iso), week = WEEKS[w];
  const pos = dateIndex(iso) - dateIndex(week.start);
  const offDay = day === 0, saturday = day === 6;
  const dsaPos = Math.max(0, doneBefore(addDays(iso, -1)));
  const problem = DSA[dsaPos % DSA.length];
  const gait = week.gate[Math.min(pos, week.gate.length - 1)];
  const cs = week.cs[Math.min(pos, week.cs.length - 1)];
  const practice = "https://leetcode.com/problems/" + problem[1] + "/";
  const project = (day === 2 || day === 4 || (saturday && w % 2 === 1))
    ? {kind:"No Hack", target:week.nohack[(day === 2) ? 0 : (day === 4) ? 1 : 2], url:"https://github.com/shanmukhdatta/No-Hack-"}
    : (day === 5)
    ? {kind:"AURA research", target:week.research, url:""}
    : {kind:"Voice Doctor", target:week.voice[(day === 1) ? 0 : (day === 3) ? 1 : saturday ? 2 : 3], url:"https://github.com/shanmukhdatta/VoiceDoc"};

  if (examMode) return {
    date:iso, day, weekIndex:w, week, examMode:true, problem, focus:week.gateArea, cs,
    tasks:[
      {id:"college",type:"College",time:"7:00–8:10 PM",title:"College exam revision",detail:"Review the next assessed ICE subject; prioritize instructor notes, derivations and problem sheets."},
      {id:"pastpapers",type:"College",time:"8:10–9:00 PM",title:"Past papers and numericals",detail:"Practice exam questions, then note mistakes and formula gaps."},
      {id:"review",type:"College",time:"9:30–10:35 PM",title:"Active recall",detail:"Recall definitions and solve another set of exam-style problems."},
      {id:"dsa",type:"DSA",time:"Optional · 10 min",title:"Review one previously solved problem",detail:"No new topic today; prioritize your college exams.",url:practice},
      {id:"family",type:"Wellbeing",time:"Dinner / before bed",title:"Dinner, family and adequate sleep",detail:"Keep meals, a short break and a consistent bedtime."}
    ]
  };
  const fitness = offDay
    ? {id:"fitness",type:"Wellbeing",time:"Flexible",title:"Recovery and personal time",detail:"Rest, connect with friends or take a relaxed walk."}
    : (day === 1 || day === 3 || day === 5)
    ? {id:"fitness",type:"Wellbeing",time:"5:45–6:30 PM",title:"Gym: technique-focused session",detail:"Use an appropriate, supervised strength session and allow recovery."}
    : {id:"fitness",type:"Wellbeing",time:saturday?"Flexible":"5:45–6:30 PM",title:"Walk, sport or active recovery",detail:"Move for enjoyment and recharge before the evening."};
  const dsa = offDay
    ? {id:"dsa",type:"DSA",time:"Flexible · 30 min",title:"DSA review: explain two old problems",detail:"Redo tricky questions without copying solutions; list patterns you still miss.",url:"https://leetcode.com/studyplan/leetcode-75/"}
    : {id:"dsa",type:"DSA",time:saturday?"Flexible · 70 min":"7:00–8:10 PM",title:problem[0],detail:problem[2] + ". Attempt independently, then explain time and space complexity.",url:practice};
  const college = {id:"college",type:"College",time:offDay?"Flexible · 30 min":"8:10–9:00 PM",title:offDay?"Prepare next week's classes":"College ICE coursework",detail:"Lecture notes, assignments, practicals and upcoming tests take priority over portfolio work."};
  const deep = offDay
    ? {id:"project",type:"Career",time:"Flexible · 30 min",title:"Weekly review and internship search",detail:"Record actual results, plan the next week, check open roles for 2028 graduates and revise your résumé. Don't invent outcomes."}
    : {id:"project",type:project.kind==="AURA research"?"Research":"Projects",time:saturday?"Flexible · 90 min":"9:30–10:35 PM",title:project.kind + " · " + project.target,detail:"One scoped change at a time: inspect, implement, test, document. Commit only verified results.",url:project.url};
  const gate = {id:"gate",type:"GATE DA",time:offDay?"Flexible · 45 min":"10:35–11:05 PM",title:gait,detail:week.gateArea + ". Learn a concept, solve 2–4 representative questions, and log mistakes."};
  const extra = saturday
    ? {id:"cs",type:"Placement CS/ML",time:"Flexible · 40 min",title:cs,detail:"Review with a one-page explanation and a small code example where relevant."}
    : null;
  const family = {id:"family",type:"Wellbeing",time:offDay?"Flexible":"9:00–9:30 PM",title:"Dinner, family and downtime",detail:"Eat, check in with parents and give yourself a break."};
  return {
    date:iso,day,weekIndex:w,week,examMode:false,problem,focus:week.gateArea,cs,
    tasks:[fitness,dsa,college,deep,gate,extra,family].filter(Boolean)
  };
}
export const emptyState = () => ({version:1,statuses:{},notes:{},examDays:{}});
export function normalizeState(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Backup must be an object");
  if (input.version !== 1) throw new Error("Unsupported backup version");
  const output = emptyState();
  for (const [key,value] of Object.entries(input.statuses || {})) {
    const [date,id] = key.split("|");
    if (validDate(date) && /^[a-z]+$/.test(id || "") && ["done","skipped"].includes(value)) output.statuses[key] = value;
  }
  for (const [day,note] of Object.entries(input.notes || {})) {
    if (validDate(day) && typeof note === "string") output.notes[day] = note.slice(0,2000);
  }
  for (const [day,flag] of Object.entries(input.examDays || {})) {
    if (validDate(day) && flag === true) output.examDays[day] = true;
  }
  return output;
}
export function summary(state, through = END) {
  const end = validDate(through) ? through : END;
  let done=0, available=0, skipped=0, practiced=0;
  for (const day of allDates()) {
    if (day > end) break;
    const planned = planForDate(day, Boolean(state.examDays[day]));
    const dsa = planned.tasks.find(t => t.id === "dsa");
    if (dsa && state.statuses[day + "|dsa"] === "done") practiced++;
    for (const task of planned.tasks) {
      const value = state.statuses[day + "|" + task.id];
      if (value === "skipped") { skipped++; continue; }
      available++;
      if (value === "done") done++;
    }
  }
  return { done,available,skipped,practiced,rate:available ? Math.round(done*100/available) : 0 };
}
