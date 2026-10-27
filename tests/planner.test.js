import test from "node:test";
import assert from "node:assert/strict";
import {START,END,WEEKS,DSA} from "../plan-data.js";
import {addDays,allDates,dateIndex,emptyState,normalizeState,planForDate,summary,toUTC,validDate,weekIndex} from "../planner-core.js";

test("plan spans exactly 66 inclusive calendar days",()=>{
  const days=allDates();
  assert.equal(days.length,66);
  assert.equal(days[0],START);
  assert.equal(days.at(-1),END);
  assert.equal(addDays("2026-10-31",1),"2026-11-01");
  assert.equal(dateIndex(START),0);
  assert.equal(dateIndex(END),65);
});

test("invalid or out-of-range dates are rejected",()=>{
  for(const iso of ["2026-02-30","2026-10-26","2027-01-01","nonsense"]) {
    assert.equal(validDate(iso),false);
    assert.throws(()=>planForDate(iso));
  }
  assert.equal(toUTC("2026-02-30"),null);
});

test("each day has an unambiguous GATE DA, college and DSA session",()=>{
  for(const day of allDates()){
    const p=planForDate(day);
    assert.ok(p.weekIndex>=0&&p.weekIndex<WEEKS.length,day);
    assert.equal(p.examMode,false);
    assert.equal(new Set(p.tasks.map(t=>t.id)).size,p.tasks.length,day);
    for(const id of ["dsa","college","gate","family"])assert.ok(p.tasks.some(t=>t.id===id),day+":"+id);
    assert.ok(p.tasks.find(t=>t.id==="gate").title.length>3);
    assert.ok(p.tasks.every(t=>t.time&&t.detail&&t.title));
  }
});

test("plan picks the correct week and covers revised GATE DA subjects",()=>{
  assert.equal(weekIndex("2026-10-27"),0);
  assert.equal(weekIndex("2026-11-02"),1);
  assert.equal(weekIndex("2026-12-31"),9);
  const subjects=WEEKS.map(w=>w.gateArea).join("|");
  for(const sub of ["Probability","Linear Algebra","Calculus","Programming","DBMS","Machine Learning","Artificial Intelligence"]){
    assert.match(subjects,new RegExp(sub));
  }
  assert.equal(WEEKS.length,10);
});

test("DSA titles link to valid LeetCode slugs and Sunday is review",()=>{
  for(const [title,slug,pattern] of DSA){
    assert.ok(title&&pattern);
    assert.match(slug,/^[a-z0-9-]+$/);
  }
  const first=planForDate(START).tasks.find(t=>t.id==="dsa");
  assert.equal(first.title,"Contains Duplicate");
  assert.equal(first.url,"https://leetcode.com/problems/contains-duplicate/");
  const sunday=planForDate("2026-11-01").tasks.find(t=>t.id==="dsa");
  assert.match(sunday.title,/review/i);
});

test("exam mode preserves college tasks and removes mandatory project/GATE blocks",()=>{
  const original=planForDate("2026-11-12");
  const exam=planForDate("2026-11-12",true);
  assert.ok(original.tasks.some(t=>t.type==="Projects"));
  assert.ok(exam.tasks.some(t=>t.type==="College"));
  assert.ok(exam.tasks.some(t=>t.type==="DSA"));
  assert.ok(!exam.tasks.some(t=>t.type==="GATE DA"||t.type==="Projects"||t.type==="Research"));
  assert.equal(original.date,exam.date);
});

test("backups normalize valid progress and discard malformed values",()=>{
  const backup={version:1,statuses:{
    "2026-10-27|dsa":"done",
    "2026-10-27|gate":"skipped",
    "2026-10-27|hack<script>":"done",
    "2027-04-01|dsa":"done",
    "2026-10-27|college":"invalid"
  },notes:{"2026-10-27":"I solved it.","2027-01-01":"bad"},examDays:{"2026-11-03":true,"2026-11-04":"true"}};
  const s=normalizeState(backup);
  assert.equal(s.statuses["2026-10-27|dsa"],"done");
  assert.equal(s.statuses["2026-10-27|gate"],"skipped");
  assert.equal(Object.keys(s.statuses).length,2);
  assert.deepEqual(s.examDays,{"2026-11-03":true});
  assert.equal(s.notes["2026-10-27"],"I solved it.");
  assert.throws(()=>normalizeState({version:2}),/Unsupported/);
  assert.deepEqual(emptyState(),{version:1,statuses:{},notes:{},examDays:{}});
});

test("statistics count real completion and exclude skipped tasks",()=>{
  const s=emptyState();
  let stats=summary(s,START);
  assert.equal(stats.done,0);
  assert.ok(stats.available>0);
  s.statuses[START+"|dsa"]="done";
  s.statuses[START+"|gate"]="skipped";
  stats=summary(s,START);
  assert.equal(stats.done,1);
  assert.equal(stats.practiced,1);
  assert.equal(stats.skipped,1);
  assert.ok(stats.rate>0);
});
