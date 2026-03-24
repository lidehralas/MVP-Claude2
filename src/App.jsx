import { useState } from "react";

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Outfit:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#F4F5F7;font-family:'Outfit',sans-serif;}
input,textarea,select,button{font-family:'Outfit',sans-serif;}

/* LAYOUT */
.shell{display:flex;height:100vh;background:#F4F5F7;color:#1A1D2E;overflow:hidden;font-size:14px;}
.sidebar{width:224px;min-width:224px;background:#fff;border-right:1px solid #E4E6EF;display:flex;flex-direction:column;height:100vh;}
.sb-logo{padding:22px 20px 16px;border-bottom:1px solid #E4E6EF;}
.sb-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#1A1D2E;}
.sb-sub{font-size:9px;color:#A0A3B1;letter-spacing:2.5px;text-transform:uppercase;margin-top:3px;}
.sb-nav{flex:1;padding:12px 10px;overflow-y:auto;}
.sb-sect{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#C8CAD6;padding:10px 10px 5px;font-weight:600;}
.sb-item{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:7px;cursor:pointer;transition:all .12s;font-size:13px;color:#6B6E8E;margin-bottom:1px;}
.sb-item:hover{background:#F4F5F7;color:#1A1D2E;}
.sb-item.on{background:#EEF1FF;color:#3358E0;font-weight:600;}
.sb-item.on .sb-dot{background:#4169FF;}
.sb-dot{width:6px;height:6px;border-radius:50%;background:#D8DAE8;flex-shrink:0;}
.sb-badge{margin-left:auto;background:rgba(65,105,255,.1);color:#4169FF;font-size:10px;font-weight:700;padding:1px 6px;border-radius:8px;}
.sb-foot{padding:14px;border-top:1px solid #E4E6EF;}
.sb-user{display:flex;align-items:center;gap:10px;}
.sb-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#4169FF,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;}
.sb-uname{font-size:12px;font-weight:600;color:#1A1D2E;}
.sb-urole{font-size:10px;color:#A0A3B1;}
.sb-out{font-size:11px;color:#A0A3B1;cursor:pointer;padding:6px 8px 0;border:none;background:none;width:100%;text-align:left;transition:color .12s;}
.sb-out:hover{color:#EF4444;}

/* MAIN */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.topbar{padding:20px 32px 0;background:#F4F5F7;}
.pg-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:#1A1D2E;margin-bottom:3px;}
.pg-sub{font-size:12px;color:#A0A3B1;margin-bottom:20px;}
.divline{height:1px;background:#E4E6EF;}
.scroll{flex:1;overflow-y:auto;padding:24px 32px;}
.scroll::-webkit-scrollbar{width:4px;}
.scroll::-webkit-scrollbar-thumb{background:#D8DAE8;border-radius:2px;}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;}
.stat{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:16px 18px;}
.stat-lbl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#A0A3B1;font-weight:600;margin-bottom:8px;}
.stat-val{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;line-height:1;color:#1A1D2E;}
.stat-sub{font-size:11px;color:#A0A3B1;margin-top:5px;}

/* ENGAGEMENT CARDS */
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.card{background:#fff;border:1px solid #E4E6EF;border-radius:12px;padding:18px 20px;cursor:pointer;transition:all .15s;}
.card:hover{border-color:#BCC4F0;transform:translateY(-1px);box-shadow:0 6px 20px rgba(65,105,255,.08);}
.card-top{display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;}
.ava{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;}
.card-name{font-size:14px;font-weight:600;color:#1A1D2E;margin-bottom:2px;}
.card-role{font-size:11px;color:#A0A3B1;}
.pbar{display:flex;gap:3px;margin-bottom:10px;}
.pseg{height:3px;flex:1;border-radius:2px;}
.card-comps{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;}
.cc-pill{font-size:10px;color:#6B6E8E;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:4px;padding:2px 8px;}
.card-foot{display:flex;align-items:center;justify-content:space-between;}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:7px;font-size:12px;font-weight:500;cursor:pointer;transition:all .12s;border:none;}
.btn-p{background:#4169FF;color:#fff;}
.btn-p:hover{background:#3358E0;}
.btn-p:disabled{opacity:.4;cursor:not-allowed;}
.btn-g{background:#fff;color:#6B6E8E;border:1px solid #E4E6EF;}
.btn-g:hover{background:#F4F5F7;color:#1A1D2E;}
.btn-d{background:#fff;color:#EF4444;border:1px solid #FCD4D4;}
.btn-d:hover{background:#FEF2F2;}
.btn-sm{padding:5px 10px;font-size:11px;}

/* SECTION HEADER */
.sec{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.sec-lbl{font-size:9px;letter-spacing:1.8px;text-transform:uppercase;color:#A0A3B1;font-weight:600;}

/* TAGS */
.tag{font-size:10px;font-weight:600;padding:3px 9px;border-radius:5px;}
.tag-phase{display:inline-flex;}

/* TABS */
.tabs{display:flex;border-bottom:1px solid #E4E6EF;margin-top:16px;}
.tab{padding:11px 16px;font-size:13px;font-weight:500;color:#A0A3B1;cursor:pointer;border-bottom:2px solid transparent;transition:all .12s;margin-bottom:-1px;}
.tab:hover{color:#6B6E8E;}
.tab.on{color:#1A1D2E;border-bottom-color:#4169FF;font-weight:600;}

/* BACK */
.back{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:#A0A3B1;cursor:pointer;background:none;border:none;padding:0;margin-bottom:14px;transition:color .12s;}
.back:hover{color:#6B6E8E;}

/* DET HEADER */
.det-hd{display:flex;align-items:center;gap:14px;}
.det-av{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0;}
.det-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#1A1D2E;}
.det-sub{font-size:12px;color:#A0A3B1;margin-top:2px;}

/* INFO GRID */
.igrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
.icard{background:#fff;border:1px solid #E4E6EF;border-radius:9px;padding:12px 14px;}
.ilbl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#C8CAD6;font-weight:600;margin-bottom:5px;}
.ival{font-size:13px;font-weight:500;color:#1A1D2E;}

/* STAKEHOLDER LIST */
.sh-list{display:flex;flex-direction:column;gap:7px;margin-bottom:16px;}
.sh-item{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #E4E6EF;border-radius:9px;padding:10px 14px;}
.sh-av{width:30px;height:30px;border-radius:7px;background:#F4F5F7;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#6B6E8E;flex-shrink:0;}
.sh-name{font-size:13px;font-weight:500;color:#1A1D2E;}
.sh-role{font-size:11px;color:#A0A3B1;}
.badge{font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;}
.b-done{background:rgba(16,185,129,.1);color:#059669;}
.b-pend{background:rgba(245,158,11,.1);color:#D97706;}

/* ACCESS CODE BOX */
.code-box{background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:14px 16px;margin-bottom:20px;}
.code-title{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#A0A3B1;font-weight:600;margin-bottom:10px;}
.code-item{display:flex;align-items:center;gap:10px;margin-bottom:6px;}
.code-label{font-size:11px;color:#6B6E8E;min-width:130px;}
.code-val{font-size:12px;font-weight:700;color:#3358E0;background:#EEF1FF;padding:3px 9px;border-radius:5px;letter-spacing:.5px;}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(30,35,60,.4);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(4px);}
.modal{background:#fff;border:1px solid #E4E6EF;border-radius:14px;padding:28px 30px;width:480px;max-width:95vw;max-height:88vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.12);}
.modal-sm{width:360px;}
.modal-lg{width:640px;}
.modal-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#1A1D2E;margin-bottom:4px;}
.modal-sub{font-size:12px;color:#A0A3B1;margin-bottom:22px;}
.modal-foot{display:flex;justify-content:flex-end;gap:8px;margin-top:22px;padding-top:16px;border-top:1px solid #E4E6EF;}
.field{margin-bottom:15px;}
.flbl{font-size:11px;color:#6B6E8E;font-weight:600;letter-spacing:.8px;text-transform:uppercase;margin-bottom:6px;}
.finp{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:10px 13px;font-size:13px;color:#1A1D2E;outline:none;transition:border-color .12s;resize:vertical;}
.finp:focus{border-color:#4169FF;background:#fff;}
.finp::placeholder{color:#C8CAD6;}
.fsel{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:10px 13px;font-size:13px;color:#1A1D2E;outline:none;appearance:none;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* REPORT EDITOR */
.report-editor{width:100%;min-height:360px;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:10px;padding:18px;font-size:13px;color:#1A1D2E;outline:none;line-height:1.9;resize:vertical;transition:border-color .12s;}
.report-editor:focus{border-color:#4169FF;background:#fff;}
.report-view{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:20px;}
.report-text{font-size:13px;line-height:1.9;color:#3A3D58;white-space:pre-wrap;}
.approved-banner{background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.2);border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:8px;margin-bottom:16px;font-size:12px;color:#059669;}

/* SURVEY CHARTS */
.scomp{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:18px;margin-bottom:10px;}
.chart-title{font-size:12px;font-weight:600;color:#1A1D2E;margin-bottom:14px;}
.bar-grid{display:flex;gap:5px;align-items:flex-end;height:80px;margin-bottom:4px;}
.bar-col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:3px;}
.bar-cnt{font-size:10px;color:#6B6E8E;font-weight:600;}
.bar{width:100%;border-radius:3px 3px 0 0;min-height:2px;}
.bar-lbls{display:flex;gap:5px;}
.bar-lbl{flex:1;text-align:center;font-size:9px;color:#C8CAD6;}

/* PROGRESS TREND */
.trend-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #E4E6EF;}
.trend-comp{font-size:12px;color:#3A3D58;flex:1;}
.trend-bars{display:flex;gap:4px;align-items:center;}
.trend-bar{height:20px;border-radius:3px;min-width:4px;transition:width .3s;}
.trend-val{font-size:12px;font-weight:600;min-width:30px;text-align:right;}

/* JOURNEY MAP */
.jmap{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px;}
.jbox{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:16px;}
.jnum{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#C8CAD6;font-weight:600;margin-bottom:6px;}
.jtitle{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;}
.jitems{list-style:none;}
.jli{display:flex;gap:7px;font-size:11px;color:#A0A3B1;margin-bottom:6px;align-items:flex-start;line-height:1.4;}
.jdot{width:4px;height:4px;border-radius:50%;flex-shrink:0;margin-top:5px;}
.jst{margin-top:12px;padding-top:10px;border-top:1px solid #E4E6EF;font-size:10px;font-weight:600;}

/* COACHEE PORTAL */
.portal{max-width:700px;margin:0 auto;}
.portal-hero{background:linear-gradient(135deg,#EEF1FF 0%,#F0F4FF 100%);border:1px solid #D0D8F8;border-radius:14px;padding:28px 30px;margin-bottom:20px;}
.portal-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#1A1D2E;margin-bottom:4px;}
.portal-goal{font-size:13px;color:#6B6E8E;line-height:1.6;}
.priority-card{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:16px 18px;margin-bottom:10px;}
.pri-num{font-size:9px;color:#4169FF;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}
.pri-title{font-size:14px;font-weight:600;color:#1A1D2E;margin-bottom:4px;}
.pri-body{font-size:12px;color:#6B6E8E;line-height:1.6;}

/* STAKEHOLDER FORM */
.form-wrap{max-width:600px;margin:0 auto;padding:32px 16px;}
.form-hero{text-align:center;margin-bottom:32px;}
.form-hero-title{font-family:'Playfair Display',serif;font-size:22px;color:#1A1D2E;margin-bottom:8px;}
.form-hero-sub{font-size:13px;color:#6B6E8E;line-height:1.6;}
.q-block{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:20px;margin-bottom:12px;}
.q-num{font-size:9px;color:#4169FF;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;}
.q-text{font-size:13px;color:#1A1D2E;margin-bottom:12px;line-height:1.6;}
.q-area{width:100%;min-height:90px;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:12px;font-size:13px;color:#1A1D2E;outline:none;resize:vertical;line-height:1.6;transition:border-color .12s;}
.q-area:focus{border-color:#4169FF;background:#fff;}
.q-area::placeholder{color:#C8CAD6;}

/* MINI-SURVEY FORM */
.scale-row{display:flex;align-items:center;gap:8px;margin-bottom:16px;}
.scale-lbl{font-size:12px;color:#1A1D2E;flex:1;}
.scale-btns{display:flex;gap:4px;}
.scale-btn{width:32px;height:28px;border-radius:5px;border:1px solid #E4E6EF;background:#F4F5F7;color:#6B6E8E;font-size:11px;font-weight:600;cursor:pointer;transition:all .12s;}
.scale-btn:hover{background:#EEF1FF;border-color:#BCC4F0;color:#3358E0;}
.scale-btn.sel-pos{background:rgba(16,185,129,.1);border-color:#10B981;color:#059669;}
.scale-btn.sel-neg{background:rgba(239,68,68,.1);border-color:#EF4444;color:#DC2626;}
.scale-btn.sel-neu{background:rgba(65,105,255,.1);border-color:#4169FF;color:#3358E0;}

/* LOGIN */
.login-page{min-height:100vh;background:#F4F5F7;display:flex;align-items:center;justify-content:center;}
.login-box{width:420px;padding:40px;background:#fff;border:1px solid #E4E6EF;border-radius:16px;box-shadow:0 8px 32px rgba(65,105,255,.07);}
.login-logo{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#1A1D2E;margin-bottom:4px;}
.login-tagline{font-size:11px;color:#A0A3B1;letter-spacing:2px;text-transform:uppercase;margin-bottom:32px;}
.role-cards{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;}
.role-card{background:#F4F5F7;border:1px solid #E4E6EF;border-radius:10px;padding:14px 16px;cursor:pointer;transition:all .12s;display:flex;align-items:center;gap:12px;}
.role-card:hover,.role-card.sel{border-color:#4169FF;background:#EEF1FF;}
.role-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;background:#fff;}
.role-name{font-size:13px;font-weight:600;color:#1A1D2E;}
.role-desc{font-size:11px;color:#A0A3B1;margin-top:1px;}
.login-form{margin-top:20px;}
.login-inp{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:11px 14px;font-size:14px;color:#1A1D2E;outline:none;transition:border-color .12s;margin-bottom:12px;}
.login-inp:focus{border-color:#4169FF;background:#fff;}
.login-inp::placeholder{color:#C8CAD6;}
.login-btn{width:100%;background:#4169FF;color:#fff;border:none;border-radius:8px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;transition:background .12s;}
.login-btn:hover{background:#3358E0;}
.login-err{font-size:12px;color:#EF4444;margin-top:8px;text-align:center;}
.login-hint{font-size:11px;color:#C8CAD6;margin-top:14px;text-align:center;line-height:1.6;}

/* DONE PAGE */
.done-page{min-height:100vh;background:#F4F5F7;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;}
.done-icon{font-size:48px;}
.done-title{font-family:'Playfair Display',serif;font-size:24px;color:#1A1D2E;}
.done-sub{font-size:14px;color:#6B6E8E;max-width:320px;text-align:center;line-height:1.7;}

/* MISC */
.empty{text-align:center;padding:48px 20px;color:#A0A3B1;font-size:13px;}
.ei{font-size:28px;margin-bottom:10px;opacity:.4;}
.divider{height:1px;background:#E4E6EF;margin:20px 0;}
.ldots{display:flex;gap:3px;align-items:center;}
.ldot{width:5px;height:5px;border-radius:50%;background:#4169FF;animation:ld 1.2s ease-in-out infinite;}
.ldot:nth-child(2){animation-delay:.2s;}
.ldot:nth-child(3){animation-delay:.4s;}
@keyframes ld{0%,100%{opacity:.2;transform:scale(.8);}50%{opacity:1;transform:scale(1.1);}}
.resp-item{background:#F4F5F7;border:1px solid #E4E6EF;border-radius:9px;padding:14px 16px;margin-bottom:8px;}
.resp-name{font-size:13px;font-weight:600;color:#1A1D2E;margin-bottom:6px;}
.resp-q{font-size:10px;color:#A0A3B1;font-weight:600;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;margin-top:10px;}
.resp-a{font-size:12px;color:#6B6E8E;line-height:1.6;}
`;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PHASES = ["Diagnóstico","Setup","Processo","Encerramento"];
const PC = ["#4169FF","#8B5CF6","#F59E0B","#10B981"];
const ROLES = ["Líder direto","Liderado","Par","Cliente interno","Fornecedor interno","Autoavaliação"];
const Q360 = [
  {id:"strengths",label:"Quais são os pontos fortes desta pessoa? Inclua exemplos."},
  {id:"continue",label:"O que esta pessoa deve continuar fazendo? Inclua exemplos."},
  {id:"stop",label:"O que esta pessoa deve parar de fazer? Inclua exemplos."},
  {id:"start",label:"O que esta pessoa deve começar a fazer? Inclua exemplos."},
  {id:"priority",label:"O que esta pessoa deve priorizar no seu desenvolvimento?"},
];
const SCALE = ["-3","-2","-1","0","+1","+2","+3"];

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INIT = [
  {
    id:1, title:"Desenvolvimento de Liderança — Vagner Moreira",
    goal:"Transição de especialista técnico para líder estratégico com maior presença executiva",
    startDate:"2024-10-01", endDate:"2025-04-01", cadence:"quinzenal", phase:3, status:"active",
    coachee:{name:"Vagner Moreira",email:"vagner@dimas.com.br",initials:"VM",color:"#4169FF",role:"Diretor de Operações",company:"Dimas Construções"},
    competencias:["Posicionamento estratégico e presença executiva","Delegação e gestão de pessoas"],
    stakeholders:[
      {id:1,name:"Valerio Costa",email:"valerio@dimas.com.br",role:"Líder direto",initials:"VC",status:"done",
       feedback:{strengths:"Conhecimento técnico elevado e capacidade de adaptar linguagem para diferentes públicos. Bom relacionamento com os pares.",continue:"Manter comprometimento e resiliência diante das dificuldades. Continuar sendo referência técnica.",stop:"Posturas defensivas mesmo sem provocação. Conclusões rápidas com poucas informações.",start:"Desenvolver visão estratégica conectando ações do dia a dia aos objetivos. Comunicação mais assertiva.",priority:"Posicionamento estratégico e presença executiva"}},
      {id:2,name:"João Silva",email:"joao@dimas.com.br",role:"Liderado",initials:"JS",status:"done",
       feedback:{strengths:"Determinado e cumpre o que diz. Acompanha indicadores com afinco.",continue:"Ser acessível e cordial com a equipe.",stop:"Querer dizer como as pessoas devem fazer as coisas. Concentrar decisões em si mesmo.",start:"Treinar equipe e desenvolver sucessores. Dizer o 'que' e deixar as pessoas definirem o 'como'.",priority:"Delegação estruturada e desenvolvimento do time"}},
      {id:3,name:"Maria Santos",email:"maria@dimas.com.br",role:"Liderado",initials:"MS",status:"done",
       feedback:{strengths:"Mediador, justo e ético. Evita que problemas se tornem maiores.",continue:"Manter equilíbrio emocional e reconhecer as contribuições do time.",stop:"Ser tolerante demais sem cobrar procedimentos.",start:"Agenda propositiva com equipe. Compartilhar expectativas claramente.",priority:"Presença de liderança e acompanhamento estruturado"}},
      {id:4,name:"Camila Reis",email:"camila@dimas.com.br",role:"Par",initials:"CR",status:"done",
       feedback:{strengths:"Proativo e ágil quando entende prioridade. Bom relacionamento.",continue:"Manter o bom relacionamento com os pares.",stop:"Excesso de detalhes técnicos em apresentações estratégicas.",start:"Pensar em impacto financeiro ao priorizar. Usar matriz de decisão.",priority:"Comunicação estratégica e delegação eficaz"}},
      {id:5,name:"André Lima",email:"andre@dimas.com.br",role:"Cliente interno",initials:"AL",status:"done",
       feedback:{strengths:"Humilde e sempre aceita a opinião dos outros. Solícito e disponível.",continue:"Manter postura aberta e colaborativa.",stop:"Interromper as pessoas enquanto falam.",start:"Aplicar silêncio de 5-10 segundos após a fala do outro. Praticar escuta ativa.",priority:"Assertividade e presença executiva"}},
    ],
    report:{
      content:`## Relatório de Desenvolvimento de Liderança
**Coachee:** Vagner Moreira | Diretor de Operações | Dimas Construções

### Síntese do Perfil de Liderança
Vagner é reconhecido como referência técnica de alto valor, com comprometimento genuíno, integridade e habilidade relacional que constroem confiança em múltiplos níveis da organização. O desafio central está na transição para um perfil mais estratégico — ocupar o espaço executivo que sua posição exige com mais presença e assertividade.

### Pontos Fortes Consolidados
1. **Conhecimento técnico elevado** — referência reconhecida, capaz de adaptar linguagem para diferentes públicos
2. **Comprometimento e resiliência** — determinação para acompanhar indicadores mesmo diante de dificuldades
3. **Integridade e relacionamento** — percebido como justo, ético, humilde e mediador que preserva o clima organizacional

### Prioridades de Desenvolvimento
1. **Posicionamento estratégico** — comunicação mais assertiva, conectar ações aos objetivos e ocupar o espaço executivo
2. **Delegação estruturada** — matriz de decisão A/B/C, treinar sucessores e criar autonomia sustentável no time
3. **Processo de decisão** — ouvir todas as partes antes de concluir, transformar percepções em dados

### Plano de Ação

**Parar de fazer:**
- Posturas defensivas e de submissão em reuniões estratégicas
- Conclusões rápidas baseadas em informações parciais
- Microgerenciamento de tarefas operacionais
- Interromper pessoas enquanto falam

**Começar a fazer:**
- Praticar comunicação assertiva com presença e objetividade
- Usar matriz: A (urgente+importante = eu faço), B (importante = delego), C (resto = quando der)
- Silêncio de 5-10 segundos após a fala do outro antes de responder
- Pensar sempre no impacto em R$ ao priorizar assuntos
- Agenda propositiva regular com liderados diretos

### Checklist Diário de Comportamentos
☐ Antes de responder, ouvi completamente?
☐ Tomei alguma decisão com base em dados, não em percepção?
☐ Deleguei pelo menos uma tarefa que poderia ter feito eu mesmo?
☐ Fiz pelo menos uma interação proativa com meu time hoje?
☐ Minha comunicação em reuniões foi objetiva e estratégica?`,
      approved:true, sharedAt:"2024-11-15"
    },
    miniSurveys:[{
      id:1, label:"Mini-Survey 1", period:"1° trim 2025", sentAt:"2025-01-15",
      competencias:["Posicionamento estratégico e presença executiva","Delegação e gestão de pessoas"],
      responses:[
        {stakeholderId:1,name:"Valerio Costa",role:"Líder direto",scores:[2,1],overall:2,qualitative:"Evolução clara na assertividade das apresentações. Ainda precisa avançar na delegação."},
        {stakeholderId:2,name:"João Silva",role:"Liderado",scores:[1,1],overall:1,qualitative:"Começou a dar mais espaço para o time. Avanço tímido mas real."},
        {stakeholderId:3,name:"Maria Santos",role:"Liderado",scores:[2,2],overall:2,qualitative:"Melhora notável na presença. Agenda com o time está funcionando."},
        {stakeholderId:4,name:"Camila Reis",role:"Par",scores:[1,1],overall:1,qualitative:"Apresentações mais objetivas. Delegação em progresso."},
        {stakeholderId:5,name:"André Lima",role:"Cliente interno",scores:[2,1],overall:2,qualitative:"Mais escuta ativa nas reuniões. Boa evolução."},
      ]
    }],
    sessions:[
      {num:8,date:"21 Fev 2025",notes:"Revisão do plano de ação. Foco em comunicação assertiva. Exercício: apresentação estratégica para o board."},
      {num:7,date:"07 Fev 2025",notes:"Delegação via matriz A/B/C. Identificação de padrão de submissão em reuniões."},
    ]
  },
  {
    id:2, title:"Desenvolvimento de Liderança — Gabriel Freire",
    goal:"Fortalecer colaboração com pares e qualidade do acompanhamento da equipe",
    startDate:"2024-09-01", endDate:"2025-03-01", cadence:"semanal", phase:3, status:"active",
    coachee:{name:"Gabriel Freire",email:"gabriel@dimas.com.br",initials:"GF",color:"#8B5CF6",role:"Gerente Geral",company:"Dimas Construções"},
    competencias:["Colaboração com pares","Delegação e acompanhamento da equipe"],
    stakeholders:[
      {id:1,name:"Nathan Duarte",email:"nathan@dimas.com.br",role:"Liderado",initials:"ND",status:"done",
       feedback:{strengths:"Bom relacionamento e comprometimento com resultados.",continue:"Manter abertura para conversa.",stop:"Omitir-se quando a equipe precisa de direcionamento.",start:"Ouvir mais os liderados. Ser mais presente no acompanhamento diário.",priority:"Presença e acompanhamento da equipe"}},
      {id:2,name:"Willian Martins",email:"willian@dimas.com.br",role:"Liderado",initials:"WM",status:"done",
       feedback:{strengths:"Comprometimento e vontade de melhorar.",continue:"Iniciativa de registrar acordos e alinhamentos.",stop:"Deixar o time sem acompanhamento ao longo dos projetos.",start:"Criar mais pontos de contato. Acompanhar o processo, não apenas o resultado.",priority:"Qualidade e frequência do acompanhamento"}},
      {id:3,name:"Tania Nogueira",email:"tania@dimas.com.br",role:"Par",initials:"TN",status:"done",
       feedback:{strengths:"Boa intenção de colaborar.",continue:"Buscar alinhamentos antes de agir.",stop:"Alterar acordos sem comunicar previamente.",start:"Cumprir consistentemente os combinados. Buscar solução direta antes de caminhos alternativos.",priority:"Confiabilidade nos acordos com pares"}},
    ],
    report:null,
    miniSurveys:[{
      id:1, label:"Mini-Survey 1", period:"2° sem 2025", sentAt:"2025-01-10",
      competencias:["Colaboração com pares","Delegação e acompanhamento da equipe"],
      responses:[
        {stakeholderId:1,name:"Nathan Duarte",role:"Liderado",scores:[0,-1],overall:0,qualitative:"Não percebi mudanças significativas ainda."},
        {stakeholderId:2,name:"Willian Martins",role:"Liderado",scores:[0,-1],overall:0,qualitative:"Começou a anotar mais, mas a distância do time continua."},
        {stakeholderId:3,name:"Tania Nogueira",role:"Par",scores:[-1,0],overall:-1,qualitative:"Há um distanciamento geral no dia a dia."},
      ]
    }],
    sessions:[
      {num:10,date:"25 Fev 2025",notes:"Devolutiva do mini-survey. Análise da divergência entre autopercepção e percepção externa."},
    ]
  }
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const ini = name => name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
function Dots(){ return <div className="ldots"><div className="ldot"/><div className="ldot"/><div className="ldot"/></div>; }
function PhaseBar({phase}){ return <div className="pbar">{[1,2,3,4].map(p=><div key={p} className="pseg" style={{background:p<phase?PC[p-1]:p===phase?PC[p-1]+'55':'#E4E6EF'}}/>)}</div>; }
function PhasePill({phase}){ return <span className="tag tag-phase" style={{background:PC[phase-1]+'18',color:PC[phase-1]}}>{phase}. {PHASES[phase-1]}</span>; }
function Overlay({children,onClose}){ return <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>{children}</div>; }

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const ROLES_LOGIN = [
  {id:"coach",icon:"🧭",name:"Sou Coach",desc:"Acesso completo à plataforma"},
  {id:"coachee",icon:"🎯",name:"Sou Coachee",desc:"Ver minha jornada e plano de desenvolvimento"},
  {id:"stakeholder",icon:"💬",name:"Sou Stakeholder",desc:"Responder avaliação ou pesquisa de progresso"},
];
function Login({onLogin}){
  const [role,setRole]=useState('coach');
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [code,setCode]=useState('');
  const [err,setErr]=useState('');
  const submit=()=>{
    if(role==='coach'){
      if(email==='marcio@lidehra.com.br'&&pass==='lidehra2025') onLogin({role:'coach',name:'Marcio Rezende',initials:'MR'});
      else { setErr('E-mail ou senha incorretos.'); setTimeout(()=>setErr(''),3000); }
    } else {
      const c=code.trim().toUpperCase();
      if(role==='coachee'){
        const m=c.match(/^CE-(\d+)$/);
        if(m) onLogin({role:'coachee',engId:parseInt(m[1])});
        else { setErr('Código inválido. Use o formato CE-{número}.'); setTimeout(()=>setErr(''),3000); }
      } else {
        const m=c.match(/^ST-(\d+)-(\d+)$/);
        if(m) onLogin({role:'stakeholder',engId:parseInt(m[1]),shId:parseInt(m[2])});
        else { setErr('Código inválido. Use o formato ST-{eng}-{id}.'); setTimeout(()=>setErr(''),3000); }
      }
    }
  };
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">Lidehra</div>
        <div className="login-tagline">Coach Platform · MGSCC</div>
        <div className="role-cards">
          {ROLES_LOGIN.map(r=>(
            <div key={r.id} className={`role-card${role===r.id?' sel':''}`} onClick={()=>{setRole(r.id);setErr('');}}>
              <div className="role-icon" style={{background:role===r.id?'rgba(65,105,255,.12)':'#111426'}}>{r.icon}</div>
              <div><div className="role-name">{r.name}</div><div className="role-desc">{r.desc}</div></div>
            </div>
          ))}
        </div>
        <div className="login-form">
          {role==='coach' && <>
            <input className="login-inp" type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
            <input className="login-inp" type="password" placeholder="Senha" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
          </>}
          {(role==='coachee'||role==='stakeholder') && <>
            <input className="login-inp" placeholder={role==='coachee'?'Código de acesso (ex: CE-1)':'Código de acesso (ex: ST-1-2)'} value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
          </>}
          <button className="login-btn" onClick={submit}>Entrar</button>
          {err&&<div className="login-err">{err}</div>}
          <div className="login-hint">
            {role==='coach'&&'Coach: marcio@lidehra.com.br · lidehra2025'}
            {role==='coachee'&&'Coachee: use o código recebido do seu coach (ex: CE-1)'}
            {role==='stakeholder'&&'Stakeholder: use o código recebido do coach (ex: ST-1-2)'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NEW ENGAGEMENT MODAL ─────────────────────────────────────────────────────
function NewEngagementModal({onSave,onClose}){
  const [f,setF]=useState({title:'',goal:'',coacheeName:'',coacheeEmail:'',coacheeRole:'',coacheeCompany:'',startDate:'',endDate:'',cadence:'quinzenal'});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const valid=f.title&&f.coacheeName&&f.startDate&&f.endDate;
  const save=()=>{
    if(!valid) return;
    const color=['#4169FF','#8B5CF6','#F59E0B','#10B981','#EC4899'][Math.floor(Math.random()*5)];
    onSave({
      id:Date.now(), title:f.title, goal:f.goal, startDate:f.startDate, endDate:f.endDate,
      cadence:f.cadence, phase:1, status:'active',
      coachee:{name:f.coacheeName,email:f.coacheeEmail,initials:ini(f.coacheeName),color,role:f.coacheeRole,company:f.coacheeCompany},
      competencias:[], stakeholders:[], report:null, miniSurveys:[], sessions:[]
    });
  };
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-lg">
        <div className="modal-title">Novo Processo de Coaching</div>
        <div className="modal-sub">Preencha as informações para iniciar o engajamento</div>
        <div className="field"><div className="flbl">Título do processo</div><input className="finp" placeholder="Ex: Desenvolvimento de Liderança — Nome" value={f.title} onChange={e=>set('title',e.target.value)}/></div>
        <div className="field"><div className="flbl">Objetivo do processo</div><textarea className="finp" rows={2} placeholder="O que este processo busca alcançar?" value={f.goal} onChange={e=>set('goal',e.target.value)}/></div>
        <div className="frow">
          <div className="field"><div className="flbl">Nome do coachee</div><input className="finp" placeholder="Nome completo" value={f.coacheeName} onChange={e=>set('coacheeName',e.target.value)}/></div>
          <div className="field"><div className="flbl">E-mail do coachee</div><input className="finp" type="email" placeholder="email@empresa.com" value={f.coacheeEmail} onChange={e=>set('coacheeEmail',e.target.value)}/></div>
        </div>
        <div className="frow">
          <div className="field"><div className="flbl">Cargo</div><input className="finp" placeholder="Ex: Diretor de Operações" value={f.coacheeRole} onChange={e=>set('coacheeRole',e.target.value)}/></div>
          <div className="field"><div className="flbl">Empresa</div><input className="finp" placeholder="Nome da empresa" value={f.coacheeCompany} onChange={e=>set('coacheeCompany',e.target.value)}/></div>
        </div>
        <div className="frow">
          <div className="field"><div className="flbl">Data de início</div><input className="finp" type="date" value={f.startDate} onChange={e=>set('startDate',e.target.value)}/></div>
          <div className="field"><div className="flbl">Data de encerramento</div><input className="finp" type="date" value={f.endDate} onChange={e=>set('endDate',e.target.value)}/></div>
        </div>
        <div className="field"><div className="flbl">Cadência das sessões</div>
          <select className="fsel" value={f.cadence} onChange={e=>set('cadence',e.target.value)}>
            <option value="semanal">Semanal</option>
            <option value="quinzenal">Quinzenal</option>
          </select>
        </div>
        <div className="modal-foot">
          <button className="btn btn-g" onClick={onClose}>Cancelar</button>
          <button className="btn btn-p" onClick={save} disabled={!valid}>Criar Processo</button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── ADD STAKEHOLDER MODAL ────────────────────────────────────────────────────
function AddStakeholderModal({onSave,onClose}){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [role,setRole]=useState(ROLES[0]);
  const save=()=>{
    if(!name.trim()) return;
    onSave({id:Date.now(),name:name.trim(),email:email.trim(),role,initials:ini(name),status:'pending',feedback:null});
  };
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-sm">
        <div className="modal-title">Novo Stakeholder</div>
        <div className="modal-sub">Adicionar respondente ao processo</div>
        <div className="field"><div className="flbl">Nome completo</div><input className="finp" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)}/></div>
        <div className="field"><div className="flbl">E-mail</div><input className="finp" type="email" placeholder="email@empresa.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <div className="field"><div className="flbl">Tipo de relacionamento</div>
          <select className="fsel" value={role} onChange={e=>setRole(e.target.value)}>
            {ROLES.map(r=><option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="modal-foot">
          <button className="btn btn-g" onClick={onClose}>Cancelar</button>
          <button className="btn btn-p" onClick={save} disabled={!name.trim()}>Adicionar</button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── VIEW RESPONSE MODAL ──────────────────────────────────────────────────────
function ViewResponseModal({sh,onClose}){
  if(!sh.feedback) return null;
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-lg">
        <div className="modal-title">{sh.name}</div>
        <div className="modal-sub">{sh.role}</div>
        {Q360.map(q=>(
          <div key={q.id} className="resp-item">
            <div className="resp-q">{q.label}</div>
            <div className="resp-a">{sh.feedback[q.id]||<span style={{color:'#1A1E32'}}>Não respondido</span>}</div>
          </div>
        ))}
        <div className="modal-foot"><button className="btn btn-g" onClick={onClose}>Fechar</button></div>
      </div>
    </Overlay>
  );
}

// ─── COACH DASHBOARD ──────────────────────────────────────────────────────────
function Dashboard({engs,onSelect,onCreate}){
  const [showNew,setShowNew]=useState(false);
  const sessions=engs.reduce((s,e)=>s+e.sessions.length,0);
  const surveys=engs.reduce((s,e)=>s+e.miniSurveys.length,0);
  const reports=engs.filter(e=>e.report?.approved).length;
  return (
    <>
      {showNew&&<NewEngagementModal onSave={e=>{onCreate(e);setShowNew(false);}} onClose={()=>setShowNew(false)}/>}
      <div className="stats">
        <div className="stat"><div className="stat-lbl">Processos Ativos</div><div className="stat-val" style={{color:'#4169FF'}}>{engs.length}</div><div className="stat-sub">em andamento</div></div>
        <div className="stat"><div className="stat-lbl">Sessões Registradas</div><div className="stat-val">{sessions}</div><div className="stat-sub">histórico total</div></div>
        <div className="stat"><div className="stat-lbl">Relatórios Aprovados</div><div className="stat-val" style={{color:'#10B981'}}>{reports}</div><div className="stat-sub">de {engs.length} processos</div></div>
        <div className="stat"><div className="stat-lbl">Mini-Surveys</div><div className="stat-val" style={{color:'#F59E0B'}}>{surveys}</div><div className="stat-sub">aplicados</div></div>
      </div>
      <div className="sec"><span className="sec-lbl">Processos</span><button className="btn btn-p" onClick={()=>setShowNew(true)}>+ Novo Processo</button></div>
      <div className="grid">
        {engs.map(e=>(
          <div key={e.id} className="card" onClick={()=>onSelect(e.id)}>
            <div className="card-top">
              <div className="ava" style={{background:e.coachee.color+'20',border:`1px solid ${e.coachee.color}35`}}>
                <span style={{color:e.coachee.color}}>{e.coachee.initials}</span>
              </div>
              <div style={{flex:1}}>
                <div className="card-name">{e.coachee.name}</div>
                <div className="card-role">{e.coachee.role} · {e.coachee.company}</div>
              </div>
            </div>
            <PhaseBar phase={e.phase}/>
            {e.competencias.length>0&&<div className="card-comps">{e.competencias.map((c,i)=><span key={i} className="cc-pill">{c}</span>)}</div>}
            <div className="card-foot">
              <PhasePill phase={e.phase}/>
              <span style={{fontSize:11,color:'#A0A3B1'}}>{e.stakeholders.length} stakeholders · cadência {e.cadence}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── TAB SETUP ────────────────────────────────────────────────────────────────
function TabSetup({eng,onUpdate}){
  const [showAdd,setShowAdd]=useState(false);
  const addSh=sh=>onUpdate({stakeholders:[...eng.stakeholders,sh]});
  const removeSh=id=>onUpdate({stakeholders:eng.stakeholders.filter(s=>s.id!==id)});
  const toggleSh=id=>onUpdate({stakeholders:eng.stakeholders.map(s=>s.id===id?{...s,status:s.status==='done'?'pending':'done'}:s)});
  const addComp=()=>{
    const v=window.prompt('Nova competência:');
    if(v&&v.trim()) onUpdate({competencias:[...eng.competencias,v.trim()]});
  };
  const removeComp=i=>onUpdate({competencias:eng.competencias.filter((_,idx)=>idx!==i)});
  return (
    <>
      {showAdd&&<AddStakeholderModal onSave={sh=>{addSh(sh);setShowAdd(false);}} onClose={()=>setShowAdd(false)}/>}
      <div className="igrid" style={{marginTop:20}}>
        <div className="icard"><div className="ilbl">Coachee</div><div className="ival">{eng.coachee.name}</div></div>
        <div className="icard"><div className="ilbl">Período</div><div className="ival">{eng.startDate} → {eng.endDate}</div></div>
        <div className="icard"><div className="ilbl">Cadência</div><div className="ival" style={{textTransform:'capitalize'}}>{eng.cadence}</div></div>
      </div>

      <div style={{background:'#fff',border:'1px solid #E4E6EF',borderRadius:10,padding:'16px 18px',marginBottom:20}}>
        <div className="sec" style={{marginBottom:10}}>
          <span className="sec-lbl">Competências em Desenvolvimento</span>
          <button className="btn btn-g btn-sm" onClick={addComp}>+ Adicionar</button>
        </div>
        {eng.competencias.length===0&&<div style={{fontSize:12,color:'#A0A3B1'}}>Nenhuma competência definida.</div>}
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
          {eng.competencias.map((c,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',gap:6,background:'#111426',border:'1px solid #222840',borderRadius:15,padding:'5px 10px 5px 12px',fontSize:12,color:'#8B8EAA'}}>
              <span style={{width:5,height:5,borderRadius:'50%',background:'#4169FF',flexShrink:0,display:'inline-block'}}/>
              {c}
              <button onClick={()=>removeComp(i)} style={{background:'none',border:'none',color:'#A0A3B1',cursor:'pointer',fontSize:14,lineHeight:1,padding:'0 0 0 2px'}}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="sec">
        <span className="sec-lbl">Stakeholders ({eng.stakeholders.filter(s=>s.status==='done').length}/{eng.stakeholders.length} responderam)</span>
        <button className="btn btn-p btn-sm" onClick={()=>setShowAdd(true)}>+ Adicionar</button>
      </div>
      {eng.stakeholders.length===0&&<div className="empty"><div className="ei">◌</div>Nenhum stakeholder cadastrado.</div>}
      <div className="sh-list">
        {eng.stakeholders.map(s=>(
          <div key={s.id} className="sh-item">
            <div className="sh-av">{s.initials}</div>
            <div style={{flex:1}}>
              <div className="sh-name">{s.name}</div>
              <div className="sh-role">{s.role}{s.email?` · ${s.email}`:''}</div>
            </div>
            <span className={`badge ${s.status==='done'?'b-done':'b-pend'}`} style={{cursor:'pointer',marginRight:8}} onClick={()=>toggleSh(s.id)}>{s.status==='done'?'Respondido':'Pendente'}</span>
            <button className="btn btn-d btn-sm" onClick={()=>removeSh(s.id)}>×</button>
          </div>
        ))}
      </div>

      {eng.stakeholders.length>0&&(
        <div className="code-box">
          <div className="code-title">Códigos de Acesso — compartilhe com cada pessoa</div>
          <div className="code-item">
            <span className="code-label">Coachee ({eng.coachee.name})</span>
            <span className="code-val">CE-{eng.id}</span>
          </div>
          {eng.stakeholders.map(s=>(
            <div key={s.id} className="code-item">
              <span className="code-label">{s.name}</span>
              <span className="code-val">ST-{eng.id}-{s.id}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── TAB 360 ─────────────────────────────────────────────────────────────────
function Tab360({eng,onUpdate}){
  const [viewSh,setViewSh]=useState(null);
  const [loading,setLoading]=useState(false);
  const done=eng.stakeholders.filter(s=>s.status==='done');

  const generate=async()=>{
    if(!done.length) return;
    setLoading(true);
    const feedbacks=done.map(s=>`--- ${s.name} (${s.role}) ---
Pontos fortes: ${s.feedback?.strengths||'N/A'}
Continuar: ${s.feedback?.continue||'N/A'}
Parar: ${s.feedback?.stop||'N/A'}
Começar: ${s.feedback?.start||'N/A'}
Prioridade: ${s.feedback?.priority||'N/A'}`).join('\n\n');

    const prompt=`Você é especialista em coaching executivo com a metodologia Marshall Goldsmith Stakeholder Centered Coaching (MGSCC).

Com base nos feedbacks 360° abaixo, gere um relatório de desenvolvimento profissional. Escreva em português brasileiro.

COACHEE: ${eng.coachee.name} | ${eng.coachee.role} | ${eng.coachee.company}
OBJETIVO DO PROCESSO: ${eng.goal}
COMPETÊNCIAS PRIORITÁRIAS: ${eng.competencias.join(' / ')||'a definir'}

FEEDBACKS DOS STAKEHOLDERS:
${feedbacks}

ESTRUTURA DO RELATÓRIO (use ## para seções, ### para subseções):

## Síntese do Perfil de Liderança
(2 parágrafos: quem é esse líder hoje, o que o diferencia)

## Pontos Fortes Consolidados
(top 3, numerados, com evidências dos feedbacks)

## Prioridades de Desenvolvimento
(top 3, numeradas, conectadas ao objetivo e competências)

## Plano de Ação

**Parar de fazer:**
(lista de comportamentos a eliminar)

**Começar a fazer:**
(lista de comportamentos a adotar, concretos e mensuráveis)

## Checklist Diário de Comportamentos
(5-7 itens com ☐, ações simples e observáveis)

Tom: profissional, respeitoso, orientado ao desenvolvimento, sem julgamentos. Foco em comportamentos observáveis.`;

    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const text=data.content?.[0]?.text||"Erro ao gerar.";
      onUpdate({report:{content:text,approved:false,sharedAt:null}});
    }catch(e){alert("Erro ao conectar com a IA.");}
    setLoading(false);
  };

  return (
    <>
      {viewSh&&<ViewResponseModal sh={viewSh} onClose={()=>setViewSh(null)}/>}
      <div className="sec" style={{marginTop:20}}>
        <span className="sec-lbl">Stakeholders ({done.length}/{eng.stakeholders.length} responderam)</span>
      </div>
      {eng.stakeholders.length===0&&<div className="empty"><div className="ei">◌</div>Adicione stakeholders na aba Setup.</div>}
      <div className="sh-list">
        {eng.stakeholders.map(s=>(
          <div key={s.id} className="sh-item">
            <div className="sh-av">{s.initials}</div>
            <div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}</div></div>
            <span className={`badge ${s.status==='done'?'b-done':'b-pend'}`} style={{marginRight:8}}>{s.status==='done'?'Respondido':'Pendente'}</span>
            {s.status==='done'&&s.feedback&&<button className="btn btn-g btn-sm" onClick={()=>setViewSh(s)}>Ver resposta</button>}
          </div>
        ))}
      </div>
      <div className="divider"/>
      <div className="sec">
        <span className="sec-lbl">Gerar Relatório com IA</span>
        <button className="btn btn-p" onClick={generate} disabled={loading||done.length===0}>{loading?<Dots/>:'✦ Gerar Relatório'}</button>
      </div>
      {done.length===0&&<div style={{fontSize:12,color:'#A0A3B1'}}>Aguardando respostas dos stakeholders para gerar o relatório.</div>}
      {loading&&<div style={{fontSize:13,color:'#A0A3B1',marginTop:8}}>Analisando {done.length} feedbacks e gerando relatório...</div>}
      {!loading&&eng.report&&<div style={{fontSize:12,color:'#10B981',marginTop:8}}>✓ Relatório gerado. Edite e aprove na aba Relatório.</div>}
    </>
  );
}

// ─── TAB REPORT ──────────────────────────────────────────────────────────────
function TabReport({eng,onUpdate}){
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(eng.report?.content||'');
  if(!eng.report) return (
    <div className="empty" style={{marginTop:24}}><div className="ei">◌</div>Nenhum relatório gerado ainda.<br/>Gere o relatório na aba Avaliação 360°.</div>
  );
  const approve=()=>onUpdate({report:{...eng.report,approved:true,sharedAt:new Date().toISOString().split('T')[0]}});
  const saveEdit=()=>{onUpdate({report:{...eng.report,content:draft}});setEditing(false);};
  return (
    <>
      {eng.report.approved&&(
        <div className="approved-banner" style={{marginTop:20}}>
          ✓ Relatório aprovado e compartilhado em {eng.report.sharedAt} · O coachee já pode visualizar
        </div>
      )}
      <div className="sec" style={{marginTop:eng.report.approved?0:20}}>
        <span className="sec-lbl">{editing?'Editando relatório':'Relatório de Desenvolvimento'}</span>
        <div style={{display:'flex',gap:8}}>
          {!eng.report.approved&&!editing&&<button className="btn btn-p" onClick={approve}>✓ Aprovar e Compartilhar</button>}
          {!editing&&<button className="btn btn-g" onClick={()=>{setDraft(eng.report.content);setEditing(true);}}>Editar</button>}
          {editing&&<><button className="btn btn-g" onClick={()=>setEditing(false)}>Cancelar</button><button className="btn btn-p" onClick={saveEdit}>Salvar</button></>}
        </div>
      </div>
      {editing
        ?<textarea className="report-editor" value={draft} onChange={e=>setDraft(e.target.value)}/>
        :<div className="report-view"><div className="report-text">{eng.report.content}</div></div>
      }
    </>
  );
}

// ─── TAB MINI-SURVEY ─────────────────────────────────────────────────────────
function TabMiniSurvey({eng,onUpdate}){
  const [sel,setSel]=useState(eng.miniSurveys[0]||null);
  const [loading,setLoading]=useState(false);
  const [analysis,setAnalysis]=useState('');
  const keys=['-3','-2','-1','0','+1','+2','+3'];
  const barColor=k=>{const n=parseInt(k);return n>0?'#10B981':n<0?'#EF4444':'#4169FF';};
  const barH=(c,t)=>t===0?0:Math.max(3,(c/t)*72);

  const sendNew=()=>{
    if(!eng.competencias.length){alert('Defina as competências no Setup antes de enviar o mini-survey.');return;}
    const ms={id:Date.now(),label:`Mini-Survey ${eng.miniSurveys.length+1}`,period:'',sentAt:new Date().toISOString().split('T')[0],competencias:eng.competencias,responses:[]};
    onUpdate({miniSurveys:[...eng.miniSurveys,ms]});
    setSel(ms);
    alert('Mini-Survey criado. Compartilhe o código de acesso dos stakeholders para que eles respondam.');
  };

  const analyze=async()=>{
    if(!sel||!sel.responses.length) return;
    setLoading(true);setAnalysis('');
    const compScores=sel.competencias.map((c,ci)=>{
      const scores=sel.responses.map(r=>r.scores[ci]||0);
      const avg=(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1);
      const dist={};keys.forEach(k=>{dist[k]=sel.responses.filter(r=>(r.scores[ci]>=0?'+':'')+r.scores[ci]===k).length;});
      return `${c}: média ${avg>0?'+'+avg:avg} | distribuição: ${Object.entries(dist).filter(([,v])=>v>0).map(([k,v])=>`${k}:${v}`).join(', ')}`;
    });
    const prompt=`Você é especialista em coaching executivo MGSCC. Analise os resultados do mini-survey. Português brasileiro.

COACHEE: ${eng.coachee.name} | PERÍODO: ${sel.period||sel.sentAt}
RESPONDENTES: ${sel.responses.length} stakeholders
COMPETÊNCIAS E RESULTADOS:
${compScores.join('\n')}
COMENTÁRIOS:
${sel.responses.map(r=>`${r.name} (${r.role}): "${r.qualitative||'Sem comentário'}"`).join('\n')}

Gere uma análise em 3 partes:
1. **Síntese dos Resultados** (o que os dados revelam, 2 parágrafos)
2. **Insights Críticos** (padrões, divergências, o que está por baixo dos números)
3. **Prioridades para o Próximo Ciclo** (3 ações concretas)

Máximo 300 palavras. Tom profissional e orientado ao desenvolvimento.`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      setAnalysis(data.content?.[0]?.text||"Erro ao gerar.");
    }catch(e){setAnalysis("Erro de conexão.");}
    setLoading(false);
  };

  const buildDist=(responses,ci)=>{
    const dist={};keys.forEach(k=>{dist[k]=0;});
    responses.forEach(r=>{const v=r.scores[ci]||0;const k=(v>=0?'+':'')+v;if(dist[k]!==undefined)dist[k]++;});
    return dist;
  };

  return (
    <>
      <div className="sec" style={{marginTop:20}}>
        <span className="sec-lbl">Mini-Surveys ({eng.miniSurveys.length})</span>
        <button className="btn btn-p" onClick={sendNew}>+ Enviar Mini-Survey</button>
      </div>
      {eng.miniSurveys.length===0&&<div className="empty"><div className="ei">◌</div>Nenhum mini-survey enviado ainda.<br/>Envie na metade do processo para medir progresso.</div>}
      {eng.miniSurveys.length>0&&(
        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {eng.miniSurveys.map(ms=>(
            <button key={ms.id} className={`btn ${sel?.id===ms.id?'btn-p':'btn-g'}`} onClick={()=>{setSel(ms);setAnalysis('');}}>
              {ms.label}{ms.period?` · ${ms.period}`:''}
            </button>
          ))}
        </div>
      )}
      {sel&&sel.responses.length===0&&<div style={{fontSize:12,color:'#A0A3B1',marginBottom:16}}>Aguardando respostas dos stakeholders.</div>}
      {sel&&sel.responses.length>0&&sel.competencias.map((comp,ci)=>{
        const dist=buildDist(sel.responses,ci);
        const total=sel.responses.length;
        return (
          <div key={ci} className="scomp">
            <div className="chart-title">{comp}</div>
            <div className="bar-grid">
              {keys.map(k=>{
                const count=dist[k]||0;
                return <div key={k} className="bar-col">{count>0&&<div className="bar-cnt">{count}</div>}<div className="bar" style={{height:barH(count,total),background:barColor(k),opacity:count===0?0.08:1}}/></div>;
              })}
            </div>
            <div className="bar-lbls">{keys.map(k=><div key={k} className="bar-lbl">{k}</div>)}</div>
          </div>
        );
      })}
      {sel&&sel.responses.length>0&&(
        <>
          <div className="divider"/>
          <div className="sec">
            <span className="sec-lbl">Análise IA</span>
            <button className="btn btn-p" onClick={analyze} disabled={loading}>{loading?<Dots/>:'✦ Analisar'}</button>
          </div>
          {(analysis||loading)&&(
            <div className="report-view">
              {loading&&!analysis?<div style={{color:'#A0A3B1',fontSize:13}}>Analisando resultados...</div>:<div className="report-text">{analysis}</div>}
            </div>
          )}
        </>
      )}
    </>
  );
}

// ─── TAB PROGRESS ────────────────────────────────────────────────────────────
function TabProgress({eng}){
  if(!eng.miniSurveys.length) return <div className="empty" style={{marginTop:24}}><div className="ei">◌</div>Nenhum mini-survey aplicado ainda.<br/>O progresso será exibido aqui conforme os dados forem coletados.</div>;
  const compKeys=eng.competencias.length?eng.competencias:eng.miniSurveys[0]?.competencias||[];
  return (
    <div style={{marginTop:20}}>
      <div className="sec-lbl" style={{marginBottom:16}}>Evolução por Competência</div>
      {compKeys.map((comp,ci)=>(
        <div key={ci} style={{marginBottom:24}}>
          <div style={{fontSize:12,fontWeight:600,color:'#1A1D2E',marginBottom:10}}>{comp}</div>
          {eng.miniSurveys.map(ms=>{
            const scores=ms.responses.map(r=>r.scores[ci]||0);
            const avg=scores.length?scores.reduce((a,b)=>a+b,0)/scores.length:0;
            const pct=((avg+3)/6)*100;
            const col=avg>0.5?'#10B981':avg<-0.5?'#EF4444':'#4169FF';
            return (
              <div key={ms.id} className="trend-row">
                <div className="trend-comp" style={{fontSize:11,color:'#6B6E8E'}}>{ms.label} · {ms.period||ms.sentAt}</div>
                <div className="trend-bars" style={{flex:2}}>
                  <div style={{flex:1,height:8,background:'#111426',borderRadius:4,overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${pct}%`,background:col,borderRadius:4,transition:'width .4s'}}/>
                  </div>
                </div>
                <div className="trend-val" style={{color:col}}>{avg>=0?'+':''}{avg.toFixed(1)}</div>
                <div style={{fontSize:10,color:'#A0A3B1',marginLeft:8,minWidth:60}}>{ms.responses.length} resp.</div>
              </div>
            );
          })}
        </div>
      ))}
      <div className="divider"/>
      <div className="sec-lbl" style={{marginBottom:12}}>Respostas Individuais — Último Survey</div>
      {eng.miniSurveys.slice(-1)[0]?.responses.map((r,i)=>(
        <div key={i} className="sh-item" style={{marginBottom:7}}>
          <div className="sh-av">{ini(r.name)}</div>
          <div style={{flex:1}}><div className="sh-name">{r.name}</div><div className="sh-role">{r.role}</div></div>
          <div style={{display:'flex',gap:6}}>
            {r.scores.map((s,si)=>{
              const col=s>0?'#10B981':s<0?'#EF4444':'#4169FF';
              return <span key={si} style={{fontSize:11,fontWeight:700,color:col,background:col+'15',padding:'2px 7px',borderRadius:5}}>{s>=0?'+':''}{s}</span>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ENGAGEMENT DETAIL ────────────────────────────────────────────────────────
function EngagementDetail({id,engs,onBack,onUpdateEng}){
  const [tab,setTab]=useState('setup');
  const eng=engs.find(e=>e.id===id);
  if(!eng) return null;
  const upd=patch=>onUpdateEng(id,patch);
  const TABS=[
    {id:'setup',label:'Setup'},
    {id:'360',label:`Avaliação 360°${eng.stakeholders.filter(s=>s.status==='done').length>0?' ✓':''}`},
    {id:'report',label:`Relatório${eng.report?.approved?' ✓':eng.report?' (rascunho)':''}`},
    {id:'minisurvey',label:`Mini-Survey${eng.miniSurveys.length?` (${eng.miniSurveys.length})`:''}`},
    {id:'progress',label:'Progresso'},
  ];
  return (
    <>
      <div className="topbar">
        <button className="back" onClick={onBack}>← Todos os processos</button>
        <div className="det-hd">
          <div className="det-av" style={{background:eng.coachee.color+'18',border:`1px solid ${eng.coachee.color}35`}}>
            <span style={{color:eng.coachee.color}}>{eng.coachee.initials}</span>
          </div>
          <div>
            <div className="det-name">{eng.coachee.name}</div>
            <div className="det-sub">{eng.coachee.role} · {eng.coachee.company}</div>
          </div>
          <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
            <PhasePill phase={eng.phase}/>
            <span style={{fontSize:11,color:'#A0A3B1'}}>cadência {eng.cadence}</span>
          </div>
        </div>
        <div className="tabs">
          {TABS.map(t=><div key={t.id} className={`tab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>{t.label}</div>)}
        </div>
      </div>
      <div className="scroll">
        {tab==='setup'&&<TabSetup eng={eng} onUpdate={upd}/>}
        {tab==='360'&&<Tab360 eng={eng} onUpdate={upd}/>}
        {tab==='report'&&<TabReport eng={eng} onUpdate={upd}/>}
        {tab==='minisurvey'&&<TabMiniSurvey eng={eng} onUpdate={upd}/>}
        {tab==='progress'&&<TabProgress eng={eng}/>}
      </div>
    </>
  );
}

// ─── COACHEE PORTAL ───────────────────────────────────────────────────────────
function CoacheePortal({eng,onLogout}){
  const [tab,setTab]=useState('jornada');
  const c=eng.coachee;
  const hasReport=eng.report?.approved;
  const phases=[
    {n:1,name:"Diagnóstico",items:["Assessment 360° com stakeholders","Pontos fortes mapeados","Prioridade de desenvolvimento definida"],state:eng.phase>1?'done':eng.phase===1?'current':'wait'},
    {n:2,name:"Setup",items:["Stakeholders escolhidos e engajados","Plano de ações definido"],state:eng.phase>2?'done':eng.phase===2?'current':'wait'},
    {n:3,name:"Processo",items:["Sessões de coaching","Coleta de feedbacks periódica","Mini-survey de progresso"],state:eng.phase>3?'done':eng.phase===3?'current':'wait'},
    {n:4,name:"Encerramento",items:["Mini-survey final","Apresentação dos resultados"],state:eng.phase===4?'current':'wait'},
  ];
  const dotColor={done:'#10B981',current:'#4169FF',wait:'#1A1E32'};
  const dotText={done:'#5A5D7A',current:'#7B7E9A',wait:'#242640'};

  const parsePriorities=()=>{
    if(!hasReport) return [];
    const text=eng.report.content;
    const m=text.match(/## Prioridades[\s\S]*?(?=##|$)/);
    if(!m) return [];
    return m[0].split('\n').filter(l=>l.match(/^\d\./)).map(l=>l.replace(/^\d\.\s*/,'').trim()).slice(0,3);
  };
  const priorities=parsePriorities();

  const parseChecklist=()=>{
    if(!hasReport) return [];
    const text=eng.report.content;
    const m=text.match(/## Checklist[\s\S]*?(?=##|$)/);
    if(!m) return [];
    return m[0].split('\n').filter(l=>l.includes('☐')).map(l=>l.replace('☐','').trim()).filter(Boolean);
  };
  const checklist=parseChecklist();

  return (
    <div style={{minHeight:'100vh',background:'#F4F5F7',color:'#1A1D2E',fontFamily:"'Outfit',sans-serif",fontSize:14}}>
      <style>{CSS}</style>
      <div style={{background:'#fff',borderBottom:'1px solid #E4E6EF',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Lidehra</div>
          <div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase'}}>Minha Jornada</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:13,fontWeight:600,color:'#1A1D2E'}}>{c.name}</div>
            <div style={{fontSize:11,color:'#3A3D58'}}>{c.role} · {c.company}</div>
          </div>
          <button className="btn btn-g btn-sm" onClick={onLogout}>Sair</button>
        </div>
      </div>
      <div style={{maxWidth:760,margin:'0 auto',padding:'28px 20px'}}>
        <div className="portal-hero">
          <div className="portal-name">{c.name}</div>
          <div style={{fontSize:11,color:'#3A3D58',letterSpacing:'1.5px',textTransform:'uppercase',margin:'4px 0 10px'}}>Processo de Desenvolvimento · Metodologia MGSCC</div>
          <div className="portal-goal">{eng.goal}</div>
          <div style={{marginTop:14}}><PhasePill phase={eng.phase}/></div>
        </div>
        <div className="tabs" style={{marginBottom:0}}>
          {[{id:'jornada',l:'Minha Jornada'},{id:'prioridades',l:'Prioridades'},{id:'plano',l:'Plano de Ação'},{id:'progresso',l:'Progresso'}].map(t=>(
            <div key={t.id} className={`tab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>{t.l}</div>
          ))}
        </div>
        <div style={{paddingTop:24}}>
          {tab==='jornada'&&(
            <div className="jmap">
              {phases.map(ph=>(
                <div key={ph.n} className="jbox" style={{borderColor:ph.state==='current'?PC[ph.n-1]+'50':ph.state==='done'?PC[ph.n-1]+'28':'#E4E6EF'}}>
                  <div className="jnum">Etapa {ph.n}</div>
                  <div className="jtitle" style={{color:ph.state==='wait'?'#C8CAD6':'#1A1D2E'}}>{ph.name}</div>
                  <ul className="jitems">{ph.items.map((it,i)=>(
                    <li key={i} className="jli">
                      <span className="jdot" style={{background:dotColor[ph.state]}}/>
                      <span style={{color:dotText[ph.state]}}>{it}</span>
                    </li>
                  ))}</ul>
                  <div className="jst"><span style={{color:ph.state==='done'?'#10B981':ph.state==='current'?PC[ph.n-1]:'#242640'}}>{ph.state==='done'?'✓ Concluído':ph.state==='current'?'● Em andamento':'○ Aguardando'}</span></div>
                </div>
              ))}
            </div>
          )}
          {tab==='prioridades'&&(
            <>
              {!hasReport&&<div className="empty"><div className="ei">◌</div>Seu relatório de desenvolvimento ainda está sendo preparado pelo seu coach.</div>}
              {hasReport&&priorities.length===0&&<div className="report-view"><div className="report-text">{eng.report.content}</div></div>}
              {hasReport&&priorities.length>0&&priorities.map((p,i)=>(
                <div key={i} className="priority-card">
                  <div className="pri-num">Prioridade {i+1}</div>
                  <div className="pri-title">{p}</div>
                </div>
              ))}
              {hasReport&&eng.competencias.length>0&&(
                <div style={{marginTop:16}}>
                  <div className="sec-lbl" style={{marginBottom:10}}>Competências em Desenvolvimento</div>
                  {eng.competencias.map((c,i)=>(
                    <div key={i} className="priority-card"><div className="pri-body">{c}</div></div>
                  ))}
                </div>
              )}
            </>
          )}
          {tab==='plano'&&(
            <>
              {!hasReport&&<div className="empty"><div className="ei">◌</div>Seu plano de ação estará disponível assim que o coach aprovar o relatório.</div>}
              {hasReport&&(
                <>
                  {checklist.length>0&&(
                    <div style={{background:'#EEF1FF',border:'1px solid #D0D8F8',borderRadius:10,padding:20,marginBottom:16}}>
                      <div className="sec-lbl" style={{marginBottom:14}}>Checklist Diário de Comportamentos</div>
                      {checklist.map((item,i)=>(
                        <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:12}}>
                          <div style={{width:18,height:18,border:'1px solid #E4E6EF',borderRadius:4,flexShrink:0,marginTop:1}}/>
                          <span style={{fontSize:13,color:'#8B8EAA',lineHeight:1.5}}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="report-view"><div className="report-text">{eng.report.content}</div></div>
                </>
              )}
            </>
          )}
          {tab==='progresso'&&(
            <>
              {eng.miniSurveys.length===0&&<div className="empty"><div className="ei">◌</div>O acompanhamento de progresso será exibido aqui após o primeiro mini-survey.</div>}
              {eng.miniSurveys.map(ms=>(
                <div key={ms.id} className="scomp" style={{marginBottom:16}}>
                  <div className="chart-title">{ms.label} — {ms.period||ms.sentAt}</div>
                  {ms.competencias.map((comp,ci)=>{
                    const scores=ms.responses.map(r=>r.scores[ci]||0);
                    const avg=scores.length?scores.reduce((a,b)=>a+b,0)/scores.length:0;
                    const col=avg>0.5?'#10B981':avg<-0.5?'#EF4444':'#4169FF';
                    return (
                      <div key={ci} style={{marginBottom:12}}>
                        <div style={{fontSize:11,color:'#6B6E8E',marginBottom:5}}>{comp}</div>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <div style={{flex:1,height:8,background:'#111426',borderRadius:4,overflow:'hidden'}}>
                            <div style={{height:'100%',width:`${((avg+3)/6)*100}%`,background:col,borderRadius:4}}/>
                          </div>
                          <span style={{fontSize:12,fontWeight:700,color:col,minWidth:32}}>{avg>=0?'+':''}{avg.toFixed(1)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── STAKEHOLDER FORM ─────────────────────────────────────────────────────────
function StakeholderForm({eng,sh,onSubmit}){
  const [answers,setAnswers]=useState({strengths:'',continue:'',stop:'',start:'',priority:''});
  const [done,setDone]=useState(false);
  const set=(k,v)=>setAnswers(p=>({...p,[k]:v}));
  const complete=Object.values(answers).filter(v=>v.trim()).length>=3;
  const submit=()=>{
    if(!complete) return;
    onSubmit(answers);
    setDone(true);
  };
  if(done) return (
    <div className="done-page">
      <style>{CSS}</style>
      <div className="done-icon">✓</div>
      <div className="done-title">Obrigado!</div>
      <div className="done-sub">Suas respostas foram registradas. O coach utilizará este feedback para apoiar o desenvolvimento de {eng.coachee.name}.</div>
    </div>
  );
  return (
    <div style={{minHeight:'100vh',background:'#F4F5F7',color:'#1A1D2E',fontFamily:"'Outfit',sans-serif",fontSize:14}}>
      <style>{CSS}</style>
      <div style={{background:'#fff',borderBottom:'1px solid #E4E6EF',padding:'14px 24px'}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Lidehra</div>
        <div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase'}}>Avaliação 360°</div>
      </div>
      <div className="form-wrap">
        <div className="form-hero">
          <div className="form-hero-title">Avaliação de Desenvolvimento</div>
          <div className="form-hero-sub">
            Você está avaliando <strong style={{color:'#1A1D2E'}}>{eng.coachee.name}</strong> ({eng.coachee.role} na {eng.coachee.company}).<br/>
            Responda com honestidade — seu feedback é fundamental para o desenvolvimento desta pessoa.<br/>
            <span style={{fontSize:11,color:'#A0A3B1'}}>Respondente: {sh.name} · {sh.role}</span>
          </div>
        </div>
        {Q360.map((q,i)=>(
          <div key={q.id} className="q-block">
            <div className="q-num">Pergunta {i+1} de {Q360.length}</div>
            <div className="q-text">{q.label}</div>
            <textarea className="q-area" placeholder="Sua resposta..." value={answers[q.id]} onChange={e=>set(q.id,e.target.value)}/>
          </div>
        ))}
        <button className="login-btn" onClick={submit} disabled={!complete} style={{opacity:complete?1:.5}}>Enviar Avaliação</button>
        {!complete&&<div style={{fontSize:11,color:'#A0A3B1',marginTop:8,textAlign:'center'}}>Responda pelo menos 3 perguntas para enviar.</div>}
      </div>
    </div>
  );
}

// ─── MINI-SURVEY FORM (stakeholder) ──────────────────────────────────────────
function MiniSurveyForm({eng,sh,ms,onSubmit}){
  const [scores,setScores]=useState(ms.competencias.map(()=>null));
  const [overall,setOverall]=useState(null);
  const [qualitative,setQualitative]=useState('');
  const [done,setDone]=useState(false);
  const setScore=(i,v)=>setScores(p=>{const n=[...p];n[i]=v;return n;});
  const complete=scores.every(s=>s!==null)&&overall!==null;
  const submit=()=>{
    if(!complete) return;
    onSubmit({stakeholderId:sh.id,name:sh.name,role:sh.role,scores,overall,qualitative});
    setDone(true);
  };
  if(done) return (
    <div className="done-page"><style>{CSS}</style><div className="done-icon">✓</div><div className="done-title">Obrigado!</div><div className="done-sub">Suas respostas foram registradas com sucesso.</div></div>
  );
  const ScaleRow=({label,val,onChange})=>(
    <div className="scale-row">
      <div className="scale-lbl">{label}</div>
      <div className="scale-btns">
        {SCALE.map(k=>{
          const n=parseInt(k);
          const cls=val===n?(n>0?'sel-pos':n<0?'sel-neg':'sel-neu'):'';
          return <button key={k} className={`scale-btn ${cls}`} onClick={()=>onChange(n)}>{k}</button>;
        })}
      </div>
    </div>
  );
  return (
    <div style={{minHeight:'100vh',background:'#F4F5F7',color:'#1A1D2E',fontFamily:"'Outfit',sans-serif",fontSize:14}}>
      <style>{CSS}</style>
      <div style={{background:'#fff',borderBottom:'1px solid #E4E6EF',padding:'14px 24px'}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Lidehra</div>
        <div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase'}}>Pesquisa de Progresso</div>
      </div>
      <div className="form-wrap">
        <div className="form-hero">
          <div className="form-hero-title">Pesquisa de Acompanhamento</div>
          <div className="form-hero-sub">
            Avalie o progresso de <strong style={{color:'#1A1D2E'}}>{eng.coachee.name}</strong> nas competências abaixo.<br/>
            Escala: -3 (piorou muito) a +3 (melhorou muito). 0 = sem mudança percebida.<br/>
            <span style={{fontSize:11,color:'#A0A3B1'}}>Respondente: {sh.name} · {sh.role}</span>
          </div>
        </div>
        <div className="q-block">
          <div className="q-num">Avaliação de Progresso</div>
          {ms.competencias.map((comp,i)=>(
            <ScaleRow key={i} label={comp} val={scores[i]} onChange={v=>setScore(i,v)}/>
          ))}
          <ScaleRow label="Efetividade geral de liderança" val={overall} onChange={setOverall}/>
        </div>
        <div className="q-block">
          <div className="q-num">Comentário (opcional)</div>
          <div className="q-text">O que você observou de mais relevante no desenvolvimento desta pessoa?</div>
          <textarea className="q-area" placeholder="Seu comentário..." value={qualitative} onChange={e=>setQualitative(e.target.value)}/>
        </div>
        <button className="login-btn" onClick={submit} disabled={!complete} style={{opacity:complete?1:.5}}>Enviar Pesquisa</button>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  const [engs,setEngs]=useState(INIT);
  const [view,setView]=useState('dash');
  const [activeEng,setActiveEng]=useState(null);
  const [navItem,setNavItem]=useState('processos');

  const updateEng=(id,patch)=>setEngs(p=>p.map(e=>e.id===id?{...e,...patch}:e));
  const addEng=e=>setEngs(p=>[...p,e]);

  const handleLogin=u=>{
    setUser(u);
    if(u.role==='coachee'){ setView('coachee'); setActiveEng(u.engId); }
    else if(u.role==='stakeholder'){ setView('stakeholder'); setActiveEng(u.engId); }
    else setView('dash');
  };
  const logout=()=>{ setUser(null); setView('dash'); setActiveEng(null); };

  if(!user) return <><style>{CSS}</style><Login onLogin={handleLogin}/></>;

  // COACHEE PORTAL
  if(user.role==='coachee'){
    const eng=engs.find(e=>e.id===activeEng);
    if(!eng) return <div className="done-page"><style>{CSS}</style><div className="done-icon">⚠</div><div className="done-title">Processo não encontrado</div></div>;
    return <CoacheePortal eng={eng} onLogout={logout}/>;
  }

  // STAKEHOLDER — detect if pending 360 or mini-survey
  if(user.role==='stakeholder'){
    const eng=engs.find(e=>e.id===activeEng);
    const sh=eng?.stakeholders.find(s=>s.id===user.shId);
    if(!eng||!sh) return <div className="done-page"><style>{CSS}</style><div className="done-icon">⚠</div><div className="done-title">Acesso não encontrado</div></div>;
    // Check if there's an open mini-survey without this stakeholder's response
    const openMs=eng.miniSurveys.find(ms=>!ms.responses.find(r=>r.stakeholderId===sh.id));
    if(openMs){
      return <MiniSurveyForm eng={eng} sh={sh} ms={openMs} onSubmit={resp=>{
        const updated=eng.miniSurveys.map(ms=>ms.id===openMs.id?{...ms,responses:[...ms.responses,resp]}:ms);
        updateEng(eng.id,{miniSurveys:updated});
      }}/>;
    }
    if(sh.status!=='done'){
      return <StakeholderForm eng={eng} sh={sh} onSubmit={answers=>{
        const updated=eng.stakeholders.map(s=>s.id===sh.id?{...s,status:'done',feedback:answers}:s);
        updateEng(eng.id,{stakeholders:updated});
      }}/>;
    }
    return <div className="done-page"><style>{CSS}</style><div className="done-icon">✓</div><div className="done-title">Avaliação já realizada</div><div className="done-sub">Você já respondeu a avaliação para este processo. Obrigado pela sua contribuição!</div></div>;
  }

  // COACH APP
  const NAV=[{id:'processos',label:'Processos',badge:engs.length},{id:'briefings',label:'Briefings'},{id:'biblioteca',label:'Biblioteca'}];
  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <div className="sidebar">
          <div className="sb-logo"><div className="sb-name">Lidehra</div><div className="sb-sub">Coach Platform</div></div>
          <nav className="sb-nav">
            <div className="sb-sect">Workspace</div>
            {NAV.map(n=>(
              <div key={n.id} className={`sb-item${navItem===n.id?' on':''}`} onClick={()=>{setNavItem(n.id);if(n.id==='processos'){setView('dash');setActiveEng(null);}}}>
                <span className="sb-dot"/>{n.label}{n.badge&&<span className="sb-badge">{n.badge}</span>}
              </div>
            ))}
          </nav>
          <div className="sb-foot">
            <div className="sb-user">
              <div className="sb-av">{user.initials}</div>
              <div><div className="sb-uname">{user.name}</div><div className="sb-urole">Executive Coach · MGSCC</div></div>
            </div>
            <button className="sb-out" onClick={logout}>Sair da conta</button>
          </div>
        </div>

        <div className="main">
          {view==='dash'&&navItem==='processos'&&(
            <>
              <div className="topbar">
                <div className="pg-title">Dashboard</div>
                <div className="pg-sub">Processos de coaching ativos — {new Date().toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}</div>
                <div className="divline"/>
              </div>
              <div className="scroll"><Dashboard engs={engs} onSelect={id=>{setActiveEng(id);setView('eng');}} onCreate={addEng}/></div>
            </>
          )}
          {view==='eng'&&activeEng&&(
            <EngagementDetail id={activeEng} engs={engs} onBack={()=>{setView('dash');setActiveEng(null);}} onUpdateEng={updateEng}/>
          )}
          {navItem!=='processos'&&(
            <>
              <div className="topbar"><div className="pg-title" style={{textTransform:'capitalize'}}>{navItem}</div><div className="pg-sub">Em breve</div><div className="divline"/></div>
              <div className="scroll" style={{display:'flex',alignItems:'center',justifyContent:'center'}}><div className="empty"><div className="ei">◌</div>Esta seção estará disponível em breve.</div></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
