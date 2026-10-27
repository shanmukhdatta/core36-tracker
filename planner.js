import {START,END,WEEKS} from "./plan-data.js";
import {addDays,allDates,dateIndex,dateLabel,emptyState,normalizeState,planForDate,summary,todayIndia,toUTC,validDate,weekIndex} from "./planner-core.js";

const KEY="core36.focus66.v1";
const $ = id => document.getElementById(id);
const el = (tag, className="", text="") => {
  const n=document.createElement(tag);
  if(className) n.className=className;
  if(text) n.textContent=text;
  return n;
};
let selected = todayIndia();
if(!validDate(selected)) selected=selected<START?START:END;
let state=load();
function load() {
  try {
    const json=localStorage.getItem(KEY);
    return json ? normalizeState(JSON.parse(json)) : emptyState();
  } catch(error) {
    return emptyState();
  }
}
function save() {
  try {
    localStorage.setItem(KEY,JSON.stringify(state));
    $("storage-message").textContent="Saved on this device.";
    $("notes-status").textContent="Saved on this device";
  } catch(error) {
    $("storage-message").textContent="Storage unavailable. Export a backup to avoid losing progress.";
    $("notes-status").textContent="Not saved — export a backup";
  }
}
function selectDay(iso,scroll=false) {
  if(!validDate(iso)) return;
  selected=iso;
  render();
  if(scroll) $("today").scrollIntoView({behavior:"smooth",block:"start"});
}
function statusKey(iso,id){return iso+"|"+id}
function taskStatus(iso,id){return state.statuses[statusKey(iso,id)]||"todo"}
function setTask(iso,id,value) {
  const key=statusKey(iso,id);
  if(value==="todo") delete state.statuses[key];
  else state.statuses[key]=value;
  save();
  render();
}
function dateShort(iso){
  return new Intl.DateTimeFormat("en-IN",{timeZone:"UTC",day:"numeric",month:"short"}).format(toUTC(iso));
}
function renderWeekStrip(){
  const dow=toUTC(selected).getUTCDay();
  const monday=addDays(selected,-((dow+6)%7));
  const strip=$("week-strip");
  strip.replaceChildren();
  for(let i=0;i<7;i++){
    const iso=addDays(monday,i), valid=validDate(iso);
    const btn=el("button","week-day"+(iso===selected?" current":"")+(valid?"":" outside"));
    btn.type="button";btn.disabled=!valid;btn.setAttribute("aria-pressed",String(iso===selected));
    btn.setAttribute("aria-label",valid?dateLabel(iso):"Outside plan");
    const abbr=new Intl.DateTimeFormat("en-US",{timeZone:"UTC",weekday:"short"}).format(toUTC(iso));
    btn.append(el("span","dow",abbr.toUpperCase()),el("span","daynum",iso.slice(8)),el("span","dot"));
    if(valid&&Object.keys(state.statuses).some(k=>k.startsWith(iso+"|")&&state.statuses[k]==="done"))btn.classList.add("has-done");
    if(valid)btn.addEventListener("click",()=>selectDay(iso));
    strip.appendChild(btn);
  }
}
function renderTask(task) {
  const status=taskStatus(selected,task.id);
  const card=el("article","task"+(status==="done"?" done":status==="skipped"?" skipped":""));
  const check=el("button","check-task",status==="done"?"✓":"");
  check.type="button";
  check.setAttribute("aria-label",(status==="done"?"Undo: ":"Mark completed: ")+task.title);
  check.setAttribute("aria-pressed",String(status==="done"));
  check.addEventListener("click",()=>setTask(selected,task.id,status==="done"?"todo":"done"));
  const body=el("div","task-body");
  const line=el("div","task-line");
  const tag=el("span","type-tag "+(task.type==="GATE DA"?"gate":task.type==="Projects"?"project":task.type==="Research"?"research":task.type==="College"?"college":task.type==="Wellbeing"?"wellbeing":"dsa"),task.type);
  line.append(tag,el("span","task-time",task.time));
  const title=el("h3","",task.title);
  const desc=el("p","",task.detail);
  body.append(line,title,desc);
  if(task.url) {
    const a=el("a","","Open resource ↗");
    a.href=task.url;a.target="_blank";a.rel="noopener noreferrer";
    body.appendChild(a);
  }
  const actions=el("div","task-actions");
  const skip=el("button","skip-btn",status==="skipped"?"Unskip":"Skip");
  skip.type="button";
  skip.setAttribute("aria-label",status==="skipped"?"Unskip "+task.title:"Skip "+task.title);
  skip.addEventListener("click",()=>setTask(selected,task.id,status==="skipped"?"todo":"skipped"));
  actions.appendChild(skip);
  card.append(check,body,actions);
  return card;
}
function weekTotals(index){
  const from=WEEKS[index].start;
  const next=index===WEEKS.length-1?addDays(END,1):WEEKS[index+1].start;
  let done=0,total=0;
  for(const day of allDates()) {
    if(day<from||day>=next) continue;
    for(const task of planForDate(day,Boolean(state.examDays[day])).tasks) {
      const s=taskStatus(day,task.id);
      if(s!=="skipped"){total++;if(s==="done")done++;}
    }
  }
  return {done,total};
}
function renderRoadmap(){
  const grid=$("roadmap-grid");grid.replaceChildren();
  WEEKS.forEach((w,i)=>{
    const t=weekTotals(i);
    const card=el("button","week-card"+(weekIndex(selected)===i?" selected":""));
    card.type="button";
    card.setAttribute("aria-label","Week "+(i+1)+": "+w.title);
    const n=el("strong","",String(i+1).padStart(2,"0"));
    const title=el("span","",w.title);
    const description=el("small","",w.gateArea);
    const range=el("small","",dateShort(w.start)+" – "+dateShort(i===WEEKS.length-1?END:addDays(WEEKS[i+1].start,-1)));
    const line=el("div","week-mini");const fill=el("i");
    fill.style.width=(t.total?Math.round(t.done/t.total*100):0)+"%";line.appendChild(fill);
    card.append(n,title,description,range,line);
    card.addEventListener("click",()=>selectDay(w.start,true));
    grid.appendChild(card);
  });
}
function render(){
  const p=planForDate(selected,Boolean(state.examDays[selected]));
  const w=p.week, t=weekTotals(p.weekIndex);
  const sum=summary(state,END);
  const done=p.tasks.filter(x=>taskStatus(selected,x.id)==="done").length;
  const active=p.tasks.filter(x=>taskStatus(selected,x.id)!=="skipped").length;
  $("date-picker").value=selected;
  $("prev-day").disabled=selected===START;
  $("next-day").disabled=selected===END;
  $("chosen-date").textContent=dateLabel(selected);
  $("chosen-focus").textContent="GATE DA · "+p.focus+"  •  "+(p.examMode?"COLLEGE EXAM PRIORITY":w.phase.toUpperCase());
  $("exam-mode").checked=p.examMode;
  $("exam-note").hidden=!p.examMode;
  $("task-count").textContent=done+" OF "+active+" DONE";
  $("task-list").replaceChildren(...p.tasks.map(renderTask));
  $("day-notes").value=state.notes[selected]||"";
  $("stat-completed").textContent=sum.done;
  $("stat-dsa").textContent=sum.practiced;
  $("stat-rate").textContent=sum.rate+"%";
  $("stat-bar").style.width=sum.rate+"%";
  $("stat-today").textContent=done+"/"+active;
  $("stat-today-sub").textContent=p.examMode?"College exam mode active":"Mark tasks when you finish them";
  $("week-counter").textContent="WEEK "+String(p.weekIndex+1).padStart(2,"0")+" / 10";
  $("phase-title").textContent=w.title;
  $("week-outcome").textContent=w.outcome;
  $("phase-badge").textContent=w.phase.toUpperCase();
  $("gate-area-badge").textContent=w.gateArea.toUpperCase();
  $("week-ratio").textContent=t.done+" / "+t.total;
  $("week-bar").style.width=(t.total?Math.round(t.done/t.total*100):0)+"%";
  renderWeekStrip();renderRoadmap();
}
$("date-picker").addEventListener("change",e=>selectDay(e.target.value));
$("prev-day").addEventListener("click",()=>selectDay(addDays(selected,-1)));
$("next-day").addEventListener("click",()=>selectDay(addDays(selected,1)));
$("jump-today").addEventListener("click",()=>{
  const now=todayIndia();
  selectDay(validDate(now)?now:(now<START?START:END),true);
});
$("exam-mode").addEventListener("change",event=>{
  if(event.target.checked)state.examDays[selected]=true;
  else delete state.examDays[selected];
  save();render();
});
$("day-notes").addEventListener("input",event=>{
  state.notes[selected]=event.target.value.slice(0,2000);
  save();
});
$("export").addEventListener("click",()=>{
  const backup={...state,exportedAt:new Date().toISOString(),plan:"Core36 Focus 66 Oct-Dec 2026"};
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=el("a");a.href=url;a.download="core36-focus66-backup.json";
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),5000);
  $("storage-message").textContent="Backup downloaded. Keep the JSON file safely.";
});
$("import").addEventListener("click",()=>$("import-file").click());
$("import-file").addEventListener("change",async event=>{
  const f=event.target.files?.[0];
  if(!f)return;
  try{
    if(f.size>1024*1024)throw new Error("Backup too large (maximum 1 MB).");
    const candidate=normalizeState(JSON.parse(await f.text()));
    if(!window.confirm("Replace all existing Focus 66 progress with this backup?"))return;
    state=candidate;save();render();
    $("storage-message").textContent="Backup imported.";
  }catch(error){
    $("storage-message").textContent="Could not import: "+error.message;
  }finally{event.target.value="";}
});
window.addEventListener("storage",event=>{
  if(event.key===KEY){state=load();render();}
});
render();
