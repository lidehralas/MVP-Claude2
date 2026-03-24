import { useState } from "react";

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#F4F5F7;font-family:'Poppins',sans-serif;color:#1A1D2E;}
input,textarea,select,button{font-family:'Poppins',sans-serif;}

/* ── SHELL ── */
.shell{display:flex;height:100vh;background:#F4F5F7;overflow:hidden;font-size:14px;}

/* ── SIDEBAR ── */
.sb{width:224px;min-width:224px;background:#fff;border-right:1px solid #E4E6EF;display:flex;flex-direction:column;}
.sb-logo{padding:22px 20px 16px;border-bottom:1px solid #E4E6EF;}
.sb-title{font-size:18px;font-weight:700;color:#1A1D2E;}
.sb-sub{font-size:10px;color:#A0A3B1;letter-spacing:2px;text-transform:uppercase;margin-top:3px;}
.sb-nav{flex:1;padding:10px;overflow-y:auto;}
.sb-sect{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C8CAD6;padding:10px 8px 5px;font-weight:600;}
.sb-item{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:8px;cursor:pointer;transition:all .12s;font-size:14px;color:#6B6E8E;margin-bottom:2px;}
.sb-item:hover{background:#F4F5F7;color:#1A1D2E;}
.sb-item.on{background:#EEF1FF;color:#3358E0;font-weight:600;}
.sb-item.on .sb-dot{background:#4169FF;}
.sb-dot{width:6px;height:6px;border-radius:50%;background:#D8DAE8;flex-shrink:0;}
.sb-badge{margin-left:auto;background:rgba(65,105,255,.1);color:#4169FF;font-size:11px;font-weight:700;padding:1px 7px;border-radius:8px;}
.sb-foot{padding:14px;border-top:1px solid #E4E6EF;}
.sb-user{display:flex;align-items:center;gap:10px;margin-bottom:6px;}
.sb-av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#4169FF,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;}
.sb-uname{font-size:13px;font-weight:600;color:#1A1D2E;}
.sb-urole{font-size:11px;color:#A0A3B1;}
.sb-out{font-size:12px;color:#A0A3B1;cursor:pointer;padding:4px 0;border:none;background:none;text-align:left;transition:color .12s;}
.sb-out:hover{color:#EF4444;}

/* ── MAIN ── */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.topbar{padding:20px 32px 0;background:#F4F5F7;}
.pg-title{font-size:24px;font-weight:600;color:#1A1D2E;margin-bottom:3px;}
.pg-sub{font-size:13px;color:#A0A3B1;margin-bottom:20px;}
.divline{height:1px;background:#E4E6EF;}
.scroll{flex:1;overflow-y:auto;padding:24px 32px;}
.scroll::-webkit-scrollbar{width:4px;}
.scroll::-webkit-scrollbar-thumb{background:#D8DAE8;border-radius:2px;}

/* ── STATS ── */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;}
.stat{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:16px 18px;}
.stat-lbl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#A0A3B1;font-weight:600;margin-bottom:8px;}
.stat-val{font-size:28px;font-weight:600;line-height:1;color:#1A1D2E;}
.stat-sub{font-size:12px;color:#A0A3B1;margin-top:5px;}

/* ── DASHBOARD CARDS ── */
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.eng-card{background:#fff;border:1px solid #E4E6EF;border-radius:12px;padding:18px 20px;cursor:pointer;transition:all .15s;}
.eng-card:hover{border-color:#BCC4F0;transform:translateY(-1px);box-shadow:0 6px 20px rgba(65,105,255,.08);}
.ec-top{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;}
.ec-av{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;}
.ec-name{font-size:15px;font-weight:600;color:#1A1D2E;margin-bottom:2px;}
.ec-role{font-size:12px;color:#A0A3B1;}
.ec-stages{display:flex;gap:3px;margin-bottom:10px;}
.ec-seg{height:4px;flex:1;border-radius:3px;}
.ec-meta{display:flex;align-items:center;justify-content:space-between;}
.ec-status{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:500;}
.ec-info{font-size:11px;color:#A0A3B1;}

/* status dots */
.sdot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.s-done{background:#10B981;}
.s-active{background:#4169FF;}
.s-pending{background:#F59E0B;}
.s-idle{background:#D8DAE8;}
.s-done-txt{color:#059669;}
.s-active-txt{color:#3358E0;}
.s-pending-txt{color:#D97706;}
.s-idle-txt{color:#A0A3B1;}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .12s;border:none;}
.btn-p{background:#4169FF;color:#fff;}
.btn-p:hover{background:#3358E0;}
.btn-p:disabled{opacity:.4;cursor:not-allowed;}
.btn-g{background:#fff;color:#6B6E8E;border:1px solid #E4E6EF;}
.btn-g:hover{background:#F4F5F7;color:#1A1D2E;}
.btn-d{background:#fff;color:#EF4444;border:1px solid #FCD4D4;}
.btn-d:hover{background:#FEF2F2;}
.btn-sm{padding:5px 11px;font-size:12px;}
.btn-xs{padding:3px 8px;font-size:11px;}

/* ── SEC HEADER ── */
.sec{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.sec-lbl{font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#A0A3B1;font-weight:600;}

/* ── TABS ── */
.tabs{display:flex;border-bottom:1px solid #E4E6EF;margin-top:16px;}
.tab{padding:11px 18px;font-size:14px;font-weight:500;color:#A0A3B1;cursor:pointer;border-bottom:2px solid transparent;transition:all .12s;margin-bottom:-1px;}
.tab:hover{color:#6B6E8E;}
.tab.on{color:#1A1D2E;border-bottom-color:#4169FF;font-weight:600;}

/* ── BACK ── */
.back{display:inline-flex;align-items:center;gap:5px;font-size:13px;color:#A0A3B1;cursor:pointer;background:none;border:none;padding:0;margin-bottom:14px;transition:color .12s;}
.back:hover{color:#6B6E8E;}

/* ── DET HEADER ── */
.det-hd{display:flex;align-items:center;gap:14px;}
.det-av{width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;flex-shrink:0;}
.det-name{font-size:22px;font-weight:600;color:#1A1D2E;}
.det-sub{font-size:13px;color:#A0A3B1;margin-top:2px;}

/* ── STAGE ROADMAP ── */
.roadmap{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:20px 0;}
.rm-box{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:16px;cursor:pointer;transition:all .15s;}
.rm-box:hover{border-color:#BCC4F0;}
.rm-box.rm-active{border-color:#4169FF;box-shadow:0 0 0 3px rgba(65,105,255,.08);}
.rm-num{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C8CAD6;font-weight:600;margin-bottom:6px;}
.rm-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px;}
.rm-status{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;margin-bottom:10px;}
.rm-items{list-style:none;}
.rm-li{display:flex;align-items:flex-start;gap:7px;font-size:12px;color:#6B6E8E;margin-bottom:5px;line-height:1.4;}
.rm-idot{width:4px;height:4px;border-radius:50%;flex-shrink:0;margin-top:5px;}

/* ── STAGE DETAIL ── */
.stage-panel{background:#fff;border:1px solid #E4E6EF;border-radius:12px;padding:20px 24px;margin-top:0;}
.stage-title{font-size:16px;font-weight:600;color:#1A1D2E;margin-bottom:4px;}
.stage-desc{font-size:13px;color:#6B6E8E;margin-bottom:20px;line-height:1.6;}
.action-list{display:flex;flex-direction:column;gap:8px;}
.action-item{display:flex;align-items:center;gap:12px;padding:12px 14px;background:#F9FAFB;border:1px solid #E4E6EF;border-radius:9px;}
.action-item.ai-pending{background:#FFFBEB;border-color:#FDE68A;}
.action-item.ai-done{background:#F0FDF4;border-color:#BBF7D0;}
.ai-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.ai-label{flex:1;}
.ai-title{font-size:13px;font-weight:500;color:#1A1D2E;margin-bottom:2px;}
.ai-meta{font-size:11px;color:#A0A3B1;}
.ai-badge{font-size:11px;font-weight:600;padding:3px 8px;border-radius:5px;}
.ai-b-done{background:rgba(16,185,129,.1);color:#059669;}
.ai-b-pending{background:rgba(245,158,11,.1);color:#D97706;}
.ai-b-todo{background:#F4F5F7;color:#A0A3B1;}
.ai-b-active{background:rgba(65,105,255,.1);color:#3358E0;}

/* ── INFO GRID ── */
.igrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
.icard{background:#fff;border:1px solid #E4E6EF;border-radius:9px;padding:12px 14px;}
.ilbl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#C8CAD6;font-weight:600;margin-bottom:5px;}
.ival{font-size:14px;font-weight:500;color:#1A1D2E;}

/* ── STAKEHOLDER LIST ── */
.sh-list{display:flex;flex-direction:column;gap:7px;}
.sh-item{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #E4E6EF;border-radius:9px;padding:10px 14px;}
.sh-av{width:32px;height:32px;border-radius:8px;background:#EEF1FF;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#4169FF;flex-shrink:0;}
.sh-name{font-size:14px;font-weight:500;color:#1A1D2E;}
.sh-role{font-size:12px;color:#A0A3B1;}
.badge{font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;}
.b-done{background:rgba(16,185,129,.1);color:#059669;}
.b-pend{background:rgba(245,158,11,.1);color:#D97706;}
.b-new{background:rgba(65,105,255,.1);color:#3358E0;}

/* ── CODE BOX ── */
.code-box{background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:14px 16px;margin-top:16px;}
.code-title{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#A0A3B1;font-weight:600;margin-bottom:10px;}
.code-row{display:flex;align-items:center;gap:10px;margin-bottom:6px;}
.code-lbl{font-size:12px;color:#6B6E8E;min-width:160px;}
.code-val{font-size:12px;font-weight:700;color:#3358E0;background:#EEF1FF;padding:3px 10px;border-radius:5px;letter-spacing:.5px;}

/* ── MODAL ── */
.overlay{position:fixed;inset:0;background:rgba(30,35,60,.45);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(4px);}
.modal{background:#fff;border:1px solid #E4E6EF;border-radius:14px;padding:28px 30px;width:500px;max-width:95vw;max-height:88vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.12);}
.modal-lg{width:660px;}
.modal-sm{width:380px;}
.modal-title{font-size:20px;font-weight:600;color:#1A1D2E;margin-bottom:4px;}
.modal-sub{font-size:13px;color:#A0A3B1;margin-bottom:22px;}
.modal-foot{display:flex;justify-content:flex-end;gap:8px;margin-top:22px;padding-top:16px;border-top:1px solid #E4E6EF;}
.field{margin-bottom:15px;}
.flbl{font-size:11px;color:#6B6E8E;font-weight:600;letter-spacing:.8px;text-transform:uppercase;margin-bottom:6px;}
.finp{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:11px 14px;font-size:14px;color:#1A1D2E;outline:none;transition:border-color .12s;resize:vertical;}
.finp:focus{border-color:#4169FF;background:#fff;}
.finp::placeholder{color:#C8CAD6;}
.fsel{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:11px 14px;font-size:14px;color:#1A1D2E;outline:none;appearance:none;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.fcheck{display:flex;align-items:center;gap:8px;font-size:13px;color:#1A1D2E;cursor:pointer;}
.fcheck input{width:16px;height:16px;accent-color:#4169FF;}

/* ── 360 FORM ── */
.form-page{min-height:100vh;background:#F4F5F7;}
.form-header{background:#fff;border-bottom:1px solid #E4E6EF;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;}
.form-body{max-width:640px;margin:0 auto;padding:32px 16px;}
.form-hero{text-align:center;margin-bottom:32px;}
.form-hero-title{font-size:22px;font-weight:600;color:#1A1D2E;margin-bottom:8px;}
.form-hero-sub{font-size:14px;color:#6B6E8E;line-height:1.7;}
.q-section{margin-bottom:8px;}
.q-section-title{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#4169FF;margin-bottom:10px;padding:12px 16px 0;}
.q-block{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:18px 20px;margin-bottom:8px;}
.q-label{font-size:14px;font-weight:500;color:#1A1D2E;margin-bottom:10px;line-height:1.5;}
.q-req{color:#EF4444;margin-left:2px;}
.q-area{width:100%;min-height:88px;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:12px;font-size:14px;color:#1A1D2E;outline:none;resize:vertical;line-height:1.6;transition:border-color .12s;}
.q-area:focus{border-color:#4169FF;background:#fff;}
.q-area::placeholder{color:#C8CAD6;}
.q-sel{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:11px 14px;font-size:14px;color:#1A1D2E;outline:none;appearance:none;}
.q-hint{font-size:12px;color:#A0A3B1;margin-top:6px;}

/* ── MINI SURVEY FORM ── */
.scale-wrap{margin-top:8px;}
.scale-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #F4F5F7;}
.scale-row:last-child{border-bottom:none;}
.scale-lbl{font-size:14px;color:#1A1D2E;flex:1;line-height:1.4;}
.scale-btns{display:flex;gap:3px;}
.scale-btn{width:34px;height:30px;border-radius:6px;border:1px solid #E4E6EF;background:#F4F5F7;color:#6B6E8E;font-size:12px;font-weight:600;cursor:pointer;transition:all .12s;}
.scale-btn:hover{background:#EEF1FF;border-color:#BCC4F0;color:#3358E0;}
.scale-btn.sp{background:rgba(16,185,129,.1);border-color:#10B981;color:#059669;}
.scale-btn.sn{background:rgba(239,68,68,.1);border-color:#EF4444;color:#DC2626;}
.scale-btn.sz{background:rgba(65,105,255,.1);border-color:#4169FF;color:#3358E0;}

/* ── REPORT ── */
.report-editor{width:100%;min-height:380px;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:10px;padding:18px;font-size:14px;color:#1A1D2E;outline:none;line-height:1.9;resize:vertical;transition:border-color .12s;}
.report-editor:focus{border-color:#4169FF;background:#fff;}
.report-view{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:22px;}
.report-text{font-size:14px;line-height:1.9;color:#3A3D58;white-space:pre-wrap;}
.approved-banner{background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.2);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;margin-bottom:16px;font-size:13px;color:#059669;font-weight:500;}

/* ── MINI SURVEY CHARTS ── */
.chart-wrap{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:18px;margin-bottom:10px;}
.chart-title{font-size:14px;font-weight:600;color:#1A1D2E;margin-bottom:14px;}
.bar-grid{display:flex;gap:5px;align-items:flex-end;height:80px;margin-bottom:4px;}
.bar-col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:3px;}
.bar-cnt{font-size:11px;color:#6B6E8E;font-weight:600;}
.bar{width:100%;border-radius:3px 3px 0 0;min-height:3px;}
.bar-lbls{display:flex;gap:5px;}
.bar-lbl{flex:1;text-align:center;font-size:10px;color:#C8CAD6;}

/* ── COACHEE PORTAL ── */
.portal-page{min-height:100vh;background:#F4F5F7;}
.portal-header{background:#fff;border-bottom:1px solid #E4E6EF;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;}
.portal-body{max-width:780px;margin:0 auto;padding:28px 20px;}
.portal-hero{background:linear-gradient(135deg,#EEF1FF,#F0F4FF);border:1px solid #D0D8F8;border-radius:14px;padding:26px 28px;margin-bottom:24px;}
.portal-name{font-size:22px;font-weight:600;color:#1A1D2E;margin-bottom:4px;}
.portal-goal{font-size:14px;color:#6B6E8E;line-height:1.6;margin-top:6px;}

/* ── LEADER PORTAL ── */
.leader-page{min-height:100vh;background:#F4F5F7;}

/* ── LOGIN ── */
.login-page{min-height:100vh;background:#F4F5F7;display:flex;align-items:center;justify-content:center;}
.login-box{width:420px;padding:40px;background:#fff;border:1px solid #E4E6EF;border-radius:16px;box-shadow:0 8px 32px rgba(65,105,255,.07);}
.login-logo{font-size:26px;font-weight:700;color:#1A1D2E;margin-bottom:4px;}
.login-tagline{font-size:10px;color:#A0A3B1;letter-spacing:2px;text-transform:uppercase;margin-bottom:28px;}
.role-cards{display:flex;flex-direction:column;gap:7px;margin-bottom:22px;}
.role-card{background:#F4F5F7;border:1px solid #E4E6EF;border-radius:10px;padding:13px 15px;cursor:pointer;transition:all .12s;}
.role-card:hover,.role-card.sel{border-color:#4169FF;background:#EEF1FF;}
.role-name{font-size:14px;font-weight:600;color:#1A1D2E;}
.role-desc{font-size:12px;color:#6B6E8E;margin-top:2px;}
.login-inp{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:12px 14px;font-size:14px;color:#1A1D2E;outline:none;transition:border-color .12s;margin-bottom:10px;}
.login-inp:focus{border-color:#4169FF;background:#fff;}
.login-inp::placeholder{color:#C8CAD6;}
.login-btn{width:100%;background:#4169FF;color:#fff;border:none;border-radius:8px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;transition:background .12s;margin-top:4px;}
.login-btn:hover{background:#3358E0;}
.login-err{font-size:12px;color:#EF4444;margin-top:8px;text-align:center;}
.login-hint{font-size:11px;color:#C8CAD6;margin-top:14px;text-align:center;line-height:1.7;}

/* ── MISC ── */
.empty{text-align:center;padding:48px 20px;color:#A0A3B1;font-size:14px;}
.ei{font-size:30px;margin-bottom:10px;opacity:.35;}
.divider{height:1px;background:#E4E6EF;margin:20px 0;}
.tag{font-size:11px;font-weight:600;padding:3px 9px;border-radius:5px;}
.ldots{display:flex;gap:3px;align-items:center;}
.ldot{width:5px;height:5px;border-radius:50%;background:#4169FF;animation:ld 1.2s ease-in-out infinite;}
.ldot:nth-child(2){animation-delay:.2s;}
.ldot:nth-child(3){animation-delay:.4s;}
@keyframes ld{0%,100%{opacity:.2;transform:scale(.8);}50%{opacity:1;transform:scale(1.1);}}
.done-page{min-height:100vh;background:#F4F5F7;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;}
.done-icon{font-size:48px;}
.done-title{font-size:24px;font-weight:600;color:#1A1D2E;}
.done-sub{font-size:14px;color:#6B6E8E;max-width:340px;text-align:center;line-height:1.7;}
.info-box{background:#EEF1FF;border:1px solid #D0D8F8;border-radius:8px;padding:12px 16px;font-size:13px;color:#3358E0;margin-bottom:16px;}
.warn-box{background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:12px 16px;font-size:13px;color:#D97706;margin-bottom:16px;}
`;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const STAGES = ["Diagnóstico","Setup","Processo","Encerramento"];
const STAGE_COLORS = ["#4169FF","#8B5CF6","#F59E0B","#10B981"];
const SH_ROLES = ["Sou a pessoa avaliada (autoavaliação)","Sou líder da pessoa","Sou / já fui liderado/a da pessoa (direto ou indireto)","Sou par da pessoa","Sou de outra área ou fora da empresa","Outro"];
const MS_ROLES = ["Sou a pessoa avaliada (autoavaliação)","Sou líder da pessoa / já liderei no passado","Sou / já fui liderado/a da pessoa (direto ou indireto)","Sou / já fui par da pessoa","Sou cliente / fornecedor interno ou externo"];
const SCALE = ["-3","-2","-1","0","+1","+2","+3"];
const FREQ_OPTS = ["Nenhuma","Um pouco (ao menos 1x/mês)","Moderado (2x/mês)","Frequente (acima de 3x/mês)"];

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const STATUS = {
  done:    {label:"Concluída",       dot:"s-done",    txt:"s-done-txt"},
  active:  {label:"Em andamento",    dot:"s-active",  txt:"s-active-txt"},
  pending: {label:"Pendência(s)",    dot:"s-pending", txt:"s-pending-txt"},
  idle:    {label:"Não iniciada",    dot:"s-idle",    txt:"s-idle-txt"},
};

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const mkStages = (phase, report, miniSurveys) => [
  {
    id:"diagnostico", label:"Diagnóstico", phase:1,
    status: phase > 1 ? "done" : phase === 1 ? (report ? "active" : "pending") : "idle",
    actions:[
      {id:"onboarding",       label:"Onboarding do coachee",                    who:"coach",    status: phase>=1?"done":"idle"},
      {id:"cronograma",       label:"Cronograma gerado e compartilhado",         who:"app",      status: phase>=1?"done":"idle"},
      {id:"assessment",       label:"Assessment de perfil (se aplicável)",       who:"coach",    status: phase>=1?"done":"idle"},
      {id:"lista360",         label:"Coachee cadastra lista de stakeholders 360°",who:"coachee", status: phase>=1?"done":"idle"},
      {id:"valida360",        label:"Líder(es) validam a lista 360°",            who:"lider",    status: phase>=1?"done":"idle"},
      {id:"envia360",         label:"Formulário 360° enviado aos stakeholders",  who:"app",      status: phase>=1?"done":"idle"},
      {id:"coleta360",        label:"Stakeholders respondem o 360°",             who:"stk",      status: phase>=1?"done":"idle"},
      {id:"relatorio360",     label:"Coach compila e aprova relatório 360°",     who:"coach",    status: phase>=1?(report?"done":"pending"):"idle"},
      {id:"devolutiva",       label:"Devolutiva do relatório ao coachee",        who:"coach",    status: phase>1?"done":phase===1&&report?"active":"idle"},
    ],
  },
  {
    id:"setup", label:"Setup", phase:2,
    status: phase > 2 ? "done" : phase === 2 ? "active" : "idle",
    actions:[
      {id:"competencias",     label:"Coachee escolhe 2 competências prioritárias", who:"coachee", status: phase>=2?"done":"idle"},
      {id:"listams",          label:"Coachee cadastra lista de stakeholders mini-survey", who:"coachee", status: phase>=2?"done":"idle"},
      {id:"validams",         label:"Líder(es) validam a lista mini-survey",      who:"lider",   status: phase>=2?"done":"idle"},
      {id:"alinhamento",      label:"Alinhamento com liderança (coach + coachee + líder)", who:"coach", status: phase>=2?"done":"idle"},
      {id:"planoacao",        label:"Coachee elabora plano de ação",              who:"coachee", status: phase>=2?"done":"idle"},
      {id:"engajamento",      label:"Reunião de engajamento com stakeholders",    who:"coachee", status: phase>=2?"done":"idle"},
      {id:"agenda",           label:"Agenda fixa e periodicidade definidas",      who:"coach",   status: phase>=2?"done":"idle"},
    ],
  },
  {
    id:"processo", label:"Processo", phase:3,
    status: phase > 3 ? "done" : phase === 3 ? (miniSurveys?.length > 0 ? "active" : "pending") : "idle",
    actions:[
      {id:"sessoes1a5",       label:"Sessões 1 a 5 + reuniões mensais com stakeholders", who:"coach", status: phase>=3?"active":"idle"},
      {id:"minisurvey1",      label:"Mini-survey de meio de processo",            who:"coach",   status: phase>=3&&miniSurveys?.length>0?"done":"idle"},
      {id:"relatorioMS1",     label:"Coach aprova relatório do mini-survey",      who:"coach",   status: phase>=3&&miniSurveys?.length>0?"done":"idle"},
      {id:"sessoes6a10",      label:"Sessões 6 a 10 + reuniões mensais com stakeholders", who:"coach", status: phase>=3?"active":"idle"},
    ],
  },
  {
    id:"encerramento", label:"Encerramento", phase:4,
    status: phase === 4 ? "active" : "idle",
    actions:[
      {id:"minisurveyFinal",  label:"Mini-survey final enviado",                  who:"coach",   status: phase===4?"active":"idle"},
      {id:"relatorioFinal",   label:"Coach compila e apresenta resultado final",  who:"coach",   status:"idle"},
      {id:"apresentacao",     label:"Coachee apresenta síntese ao líder",         who:"coachee", status:"idle"},
      {id:"depoimentos",      label:"Líder(es) e RH registram depoimentos",       who:"lider",   status:"idle"},
      {id:"encerrado",        label:"Processo encerrado",                         who:"coach",   status:"idle"},
    ],
  },
];

const INIT_ENGS = [
  {
    id:1,
    title:"Desenvolvimento de Liderança",
    coachee:{name:"Vagner Moreira",initials:"VM",color:"#4169FF",role:"Diretor de Operações",company:"Dimas Construções",email:"vagner@dimas.com.br"},
    leaders:[{id:1,name:"Roberto Fonseca",email:"roberto@dimas.com.br",initials:"RF"}],
    rh:[{id:1,name:"Carla Mendes",email:"carla.rh@dimas.com.br",initials:"CM"}],
    goal:"Transição de especialista técnico para líder de visão estratégica com maior presença executiva",
    startDate:"2024-10-01", endDate:"2025-04-01", cadence:"quinzenal", sessions:10, phase:3,
    competencias:["Posicionamento estratégico e presença executiva","Delegação e gestão de pessoas"],
    hasAssessment:true, assessmentType:"DISC",
    stakeholders360:[
      {id:1,name:"Valerio Costa",email:"valerio@dimas.com.br",role:"Líder direto",initials:"VC",status:"done",
       feedback:{tipo:"Sou líder da pessoa",pos1:"Conhecimento técnico elevado",pos1ex:"Adapta linguagem para públicos diferentes com facilidade.",pos2:"Proatividade e agilidade",pos2ex:"Não procrastina quando algo é prioritário.",pos3:"Integridade e ética",pos3ex:"Reconhecido por ser justo nas decisões.",cont1:"Manter comprometimento",cont1ex:"Acompanha indicadores com afinco.",cont2:"Ser referência técnica",cont2ex:"Time recorre a ele para dúvidas complexas.",par1:"Posturas defensivas",par1ex:"Reage mal a feedbacks mesmo sem provocação.",par2:"Conclusões rápidas",par2ex:"Toma decisões com informações parciais.",inic1:"Comunicação assertiva",inic1ex:"Praticar posicionamentos mais diretos em reuniões.",inic2:"Delegação estruturada",inic2ex:"Usar matriz A/B/C para delegar tarefas ao time.",prior:"Posicionamento estratégico e presença executiva"}},
      {id:2,name:"João Silva",email:"joao@dimas.com.br",role:"Liderado",initials:"JS",status:"done",
       feedback:{tipo:"Sou / já fui liderado/a da pessoa (direto ou indireto)",pos1:"Determinado",pos1ex:"Cumpre com o que fala.",pos2:"Acessível",pos2ex:"Sempre cordial com a equipe.",par1:"Microgerenciamento",par1ex:"Quer dizer como as pessoas devem fazer as coisas.",inic1:"Treinar o time",inic1ex:"Desenvolver sucessores e dar mais autonomia.",prior:"Delegação eficaz"}},
      {id:3,name:"Camila Reis",email:"camila@dimas.com.br",role:"Par",initials:"CR",status:"done",
       feedback:{tipo:"Sou / já fui par da pessoa",pos1:"Bom relacionamento",pos1ex:"Mantém clima positivo com os pares.",par1:"Excesso de detalhes técnicos",par1ex:"Perde o fio estratégico em apresentações.",inic1:"Pensar em impacto financeiro",inic1ex:"Priorizar assuntos pelo retorno em R$.",prior:"Comunicação estratégica"}},
    ],
    report:{content:`## Relatório de Desenvolvimento de Liderança\n**Coachee:** Vagner Moreira | Diretor de Operações | Dimas Construções\n\n### Síntese do Perfil de Liderança\nVagner é reconhecido como referência técnica de alto valor, com comprometimento genuíno e integridade que constroem confiança em múltiplos níveis da organização. O desafio central está na transição para um perfil mais estratégico — ocupar o espaço executivo que sua posição exige com mais presença e assertividade.\n\n### Pontos Fortes Consolidados\n1. **Conhecimento técnico elevado** — referência reconhecida, adapta linguagem para diferentes públicos\n2. **Comprometimento e proatividade** — não procrastina, acompanha indicadores com afinco\n3. **Integridade e relacionamento** — percebido como justo, ético e acessível\n\n### Prioridades de Desenvolvimento\n1. **Posicionamento estratégico** — comunicação mais assertiva e presença executiva\n2. **Delegação estruturada** — matriz A/B/C, treinar sucessores, criar autonomia no time\n3. **Processo de decisão** — ouvir todas as partes antes de concluir\n\n### Plano de Ação\n**Parar de fazer:**\n- Posturas defensivas em reuniões estratégicas\n- Conclusões rápidas com informações parciais\n- Microgerenciamento de tarefas operacionais\n\n**Começar a fazer:**\n- Comunicação assertiva e objetiva em reuniões\n- Delegar usando matriz: A (eu faço), B (delego), C (quando der)\n- Silêncio de 5-10s após a fala do outro antes de responder\n\n### Checklist Diário de Comportamentos\n☐ Antes de responder, ouvi completamente?\n☐ Tomei alguma decisão baseada em dados, não em percepção?\n☐ Deleguei pelo menos uma tarefa que poderia ter feito eu mesmo?\n☐ Fiz pelo menos uma interação proativa com meu time hoje?\n☐ Minha comunicação em reuniões foi objetiva e estratégica?`,approved:true,sharedAt:"2024-11-15"},
    miniSurveys:[{
      id:1,label:"Mini-Survey 1",period:"1° trim 2025",sentAt:"2025-01-15",
      competencias:["Posicionamento estratégico e presença executiva","Delegação e gestão de pessoas"],
      responses:[
        {shId:1,name:"Valerio Costa",role:"Líder direto",scores:[2,1],overall:2,mudancas:"Evolução clara na assertividade.",sugestoes:"Continuar avançando na delegação."},
        {shId:2,name:"João Silva",role:"Liderado",scores:[1,1],overall:1,mudancas:"Começou a dar mais espaço ao time.",sugestoes:"Manter a agenda regular com a equipe."},
        {shId:3,name:"Camila Reis",role:"Par",scores:[1,1],overall:1,mudancas:"Apresentações mais objetivas.",sugestoes:"Delegação ainda em progresso."},
      ]
    }],
    stakeholdersMS:[
      {id:1,name:"Valerio Costa",email:"valerio@dimas.com.br",role:"Líder direto",initials:"VC",status:"done"},
      {id:2,name:"João Silva",email:"joao@dimas.com.br",role:"Liderado",initials:"JS",status:"done"},
      {id:3,name:"Camila Reis",email:"camila@dimas.com.br",role:"Par",initials:"CR",status:"done"},
    ],
    sessions:[
      {num:8,date:"21 Fev 2025",notes:"Revisão do plano de ação. Foco em comunicação assertiva."},
      {num:7,date:"07 Fev 2025",notes:"Delegação via matriz A/B/C."},
    ],
    comments:[],
  },
  {
    id:2,
    title:"Desenvolvimento de Liderança",
    coachee:{name:"Gabriel Freire",initials:"GF",color:"#8B5CF6",role:"Gerente Geral",company:"Dimas Construções",email:"gabriel@dimas.com.br"},
    leaders:[{id:1,name:"Roberto Fonseca",email:"roberto@dimas.com.br",initials:"RF"}],
    rh:[{id:1,name:"Carla Mendes",email:"carla.rh@dimas.com.br",initials:"CM"}],
    goal:"Fortalecer colaboração com pares e qualidade do acompanhamento da equipe",
    startDate:"2024-09-01", endDate:"2025-03-01", cadence:"semanal", sessions:10, phase:2,
    competencias:["Colaboração com pares","Delegação e acompanhamento da equipe"],
    hasAssessment:false, assessmentType:"",
    stakeholders360:[
      {id:1,name:"Nathan Duarte",email:"nathan@dimas.com.br",role:"Liderado",initials:"ND",status:"done",
       feedback:{tipo:"Sou / já fui liderado/a da pessoa (direto ou indireto)",pos1:"Comprometimento",pos1ex:"Quer melhorar e tem abertura.",par1:"Distância do time",par1ex:"Pontos de contato são escassos.",inic1:"Mais presença",inic1ex:"Criar agenda regular com liderados.",prior:"Proximidade e acompanhamento"}},
      {id:2,name:"Tania Nogueira",email:"tania@dimas.com.br",role:"Par",initials:"TN",status:"pending",feedback:null},
    ],
    report:null,
    miniSurveys:[],
    stakeholdersMS:[],
    sessions:[
      {num:4,date:"20 Fev 2025",notes:"Engajamento dos stakeholders. Plano de ações em construção."},
    ],
    comments:[],
  },
  {
    id:3,
    title:"Desenvolvimento de Liderança",
    coachee:{name:"Roberto Menezes",initials:"RM",color:"#10B981",role:"VP Comercial",company:"PayFácil Fintech",email:"roberto@payfacil.com.br"},
    leaders:[{id:1,name:"Ana Paula Vaz",email:"ana@payfacil.com.br",initials:"AV"}],
    rh:[],
    goal:"Desenvolver visão estratégica e habilidades de gestão de pessoas",
    startDate:"2025-02-01", endDate:"2025-08-01", cadence:"quinzenal", sessions:10, phase:1,
    competencias:[],
    hasAssessment:true, assessmentType:"Gallup",
    stakeholders360:[
      {id:1,name:"Ana Paula Vaz",email:"ana@payfacil.com.br",role:"Líder direto",initials:"AV",status:"pending",feedback:null},
      {id:2,name:"Marcos Lima",email:"marcos@payfacil.com.br",role:"Liderado",initials:"ML",status:"pending",feedback:null},
    ],
    report:null, miniSurveys:[], stakeholdersMS:[], sessions:[
      {num:1,date:"13 Fev 2025",notes:"Sessão de kickoff. Alinhamento da metodologia MGSCC."},
    ],
    comments:[],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const ini = n => n.split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
function Dots(){ return <div className="ldots"><div className="ldot"/><div className="ldot"/><div className="ldot"/></div>; }
function Overlay({children,onClose}){ return <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>{children}</div>; }

function StageBar({eng}){
  const stages = mkStages(eng.phase, eng.report, eng.miniSurveys);
  return (
    <div className="ec-stages">
      {stages.map((s,i)=>(
        <div key={i} className="ec-seg" style={{
          background: s.status==='done' ? STAGE_COLORS[i] :
                      s.status==='active' ? STAGE_COLORS[i]+'88' :
                      s.status==='pending' ? '#FDE68A' : '#E4E6EF'
        }}/>
      ))}
    </div>
  );
}

function StatusBadge({status}){
  const s = STATUS[status];
  return (
    <div className="ec-status">
      <span className={`sdot ${s.dot}`}/>
      <span className={s.txt}>{s.label}</span>
    </div>
  );
}

function currentStageStatus(eng){
  const stages = mkStages(eng.phase, eng.report, eng.miniSurveys);
  return stages.find(s=>s.phase===eng.phase)?.status || 'idle';
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const LOGIN_ROLES = [
  {id:"coach",   name:"Sou Coach",       desc:"Acesso completo — gerenciar todos os processos"},
  {id:"coachee", name:"Sou Coachee",     desc:"Acompanhar minha jornada e plano de desenvolvimento"},
  {id:"lider",   name:"Sou Líder",       desc:"Validar listas e acompanhar progresso do meu liderado"},
  {id:"rh",      name:"Sou RH",          desc:"Visão geral dos processos da empresa"},
  {id:"stk",     name:"Sou Stakeholder", desc:"Responder avaliação ou pesquisa de progresso"},
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
      else{setErr('E-mail ou senha incorretos.');setTimeout(()=>setErr(''),3000);}
    } else {
      const c=code.trim().toUpperCase();
      if(role==='coachee'){
        const m=c.match(/^CE-(\d+)$/);
        if(m) onLogin({role:'coachee',engId:parseInt(m[1])});
        else{setErr('Código inválido. Ex: CE-1');setTimeout(()=>setErr(''),3000);}
      } else if(role==='lider'){
        const m=c.match(/^LD-(\d+)-(\d+)$/);
        if(m) onLogin({role:'lider',engId:parseInt(m[1]),liderId:parseInt(m[2])});
        else{setErr('Código inválido. Ex: LD-1-1');setTimeout(()=>setErr(''),3000);}
      } else if(role==='rh'){
        const m=c.match(/^RH-(.+)$/);
        if(m) onLogin({role:'rh',company:m[1]});
        else{setErr('Código inválido. Ex: RH-dimas');setTimeout(()=>setErr(''),3000);}
      } else {
        const m=c.match(/^ST-(\d+)-(\d+)$/);
        if(m) onLogin({role:'stk',engId:parseInt(m[1]),shId:parseInt(m[2])});
        else{setErr('Código inválido. Ex: ST-1-2');setTimeout(()=>setErr(''),3000);}
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">Lidehra</div>
        <div className="login-tagline">Coach Platform Lidehra</div>
        <div className="role-cards">
          {LOGIN_ROLES.map(r=>(
            <div key={r.id} className={`role-card${role===r.id?' sel':''}`} onClick={()=>{setRole(r.id);setErr('');}}>
              <div className="role-name">{r.name}</div>
              <div className="role-desc">{r.desc}</div>
            </div>
          ))}
        </div>
        {role==='coach'&&<>
          <input className="login-inp" type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
          <input className="login-inp" type="password" placeholder="Senha" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
        </>}
        {role!=='coach'&&<input className="login-inp" placeholder={
          role==='coachee'?'Código de acesso (ex: CE-1)':
          role==='lider'?'Código de acesso (ex: LD-1-1)':
          role==='rh'?'Código de acesso (ex: RH-dimas)':
          'Código de acesso (ex: ST-1-2)'
        } value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>}
        <button className="login-btn" onClick={submit}>Entrar</button>
        {err&&<div className="login-err">{err}</div>}
        <div className="login-hint">
          Coach: marcio@lidehra.com.br · lidehra2025<br/>
          Coachee: CE-1 (Vagner) · CE-2 (Gabriel)<br/>
          Líder: LD-1-1 · Stakeholder: ST-1-1, ST-1-2, ST-1-3
        </div>
      </div>
    </div>
  );
}

// ─── NEW ENGAGEMENT MODAL ─────────────────────────────────────────────────────
function NewEngModal({onSave,onClose}){
  const [f,setF]=useState({name:'',email:'',role:'',company:'',goal:'',start:'',end:'',cadence:'quinzenal',assessment:false,assessmentType:''});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const valid=f.name&&f.company&&f.start&&f.end;
  const colors=['#4169FF','#8B5CF6','#F59E0B','#10B981','#EC4899'];
  const save=()=>{
    if(!valid)return;
    const color=colors[Math.floor(Math.random()*colors.length)];
    onSave({
      id:Date.now(),title:"Desenvolvimento de Liderança",
      coachee:{name:f.name,initials:ini(f.name),color,role:f.role,company:f.company,email:f.email},
      leaders:[],rh:[],goal:f.goal,startDate:f.start,endDate:f.end,
      cadence:f.cadence,sessions:10,phase:1,competencias:[],
      hasAssessment:f.assessment,assessmentType:f.assessmentType,
      stakeholders360:[],report:null,miniSurveys:[],stakeholdersMS:[],sessions:[],comments:[],
    });
  };
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-lg">
        <div className="modal-title">Novo Processo de Coaching</div>
        <div className="modal-sub">Preencha os dados para iniciar o engajamento</div>
        <div className="frow">
          <div className="field"><div className="flbl">Nome do coachee</div><input className="finp" placeholder="Nome completo" value={f.name} onChange={e=>set('name',e.target.value)}/></div>
          <div className="field"><div className="flbl">E-mail</div><input className="finp" type="email" placeholder="email@empresa.com" value={f.email} onChange={e=>set('email',e.target.value)}/></div>
        </div>
        <div className="frow">
          <div className="field"><div className="flbl">Cargo</div><input className="finp" placeholder="Ex: Diretor de Operações" value={f.role} onChange={e=>set('role',e.target.value)}/></div>
          <div className="field"><div className="flbl">Empresa</div><input className="finp" placeholder="Nome da empresa" value={f.company} onChange={e=>set('company',e.target.value)}/></div>
        </div>
        <div className="field"><div className="flbl">Objetivo do processo</div><textarea className="finp" rows={2} placeholder="O que este processo busca alcançar?" value={f.goal} onChange={e=>set('goal',e.target.value)}/></div>
        <div className="frow">
          <div className="field"><div className="flbl">Início</div><input className="finp" type="date" value={f.start} onChange={e=>set('start',e.target.value)}/></div>
          <div className="field"><div className="flbl">Encerramento</div><input className="finp" type="date" value={f.end} onChange={e=>set('end',e.target.value)}/></div>
        </div>
        <div className="field"><div className="flbl">Cadência das sessões</div>
          <select className="fsel" value={f.cadence} onChange={e=>set('cadence',e.target.value)}>
            <option value="semanal">Semanal</option>
            <option value="quinzenal">Quinzenal</option>
          </select>
        </div>
        <label className="fcheck"><input type="checkbox" checked={f.assessment} onChange={e=>set('assessment',e.target.checked)}/> Incluir assessment de perfil</label>
        {f.assessment&&<div className="field" style={{marginTop:10}}><div className="flbl">Tipo de assessment</div>
          <select className="fsel" value={f.assessmentType} onChange={e=>set('assessmentType',e.target.value)}>
            <option value="">Selecione...</option>
            <option value="DISC">DISC</option>
            <option value="Gallup">Gallup CliftonStrengths</option>
            <option value="Thomas PPA">Thomas PPA</option>
            <option value="Outro">Outro</option>
          </select>
        </div>}
        <div className="modal-foot">
          <button className="btn btn-g" onClick={onClose}>Cancelar</button>
          <button className="btn btn-p" onClick={save} disabled={!valid}>Criar Processo</button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── ADD STAKEHOLDER MODAL ────────────────────────────────────────────────────
function AddShModal({tipo,onSave,onClose}){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [role,setRole]=useState(tipo==='360'?SH_ROLES[2]:MS_ROLES[2]);
  const roles=tipo==='360'?SH_ROLES:MS_ROLES;
  const save=()=>{
    if(!name.trim())return;
    onSave({id:Date.now(),name:name.trim(),email:email.trim(),role,initials:ini(name),status:'pending',feedback:null});
  };
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-sm">
        <div className="modal-title">Novo Stakeholder</div>
        <div className="modal-sub">Adicionar respondente {tipo==='360'?'ao 360°':'ao mini-survey'}</div>
        <div className="field"><div className="flbl">Nome completo</div><input className="finp" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)}/></div>
        <div className="field"><div className="flbl">E-mail</div><input className="finp" type="email" placeholder="email@empresa.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <div className="field"><div className="flbl">Tipo de relacionamento</div>
          <select className="fsel" value={role} onChange={e=>setRole(e.target.value)}>
            {roles.map(r=><option key={r}>{r}</option>)}
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

// ─── COACH DASHBOARD ──────────────────────────────────────────────────────────
function Dashboard({engs,onSelect,onCreate}){
  const [showNew,setShowNew]=useState(false);
  const total=engs.length;
  const sessions=engs.reduce((s,e)=>s+e.sessions.length,0);
  const pending=engs.filter(e=>currentStageStatus(e)==='pending').length;
  const done=engs.filter(e=>e.phase>4).length;
  return (
    <>
      {showNew&&<NewEngModal onSave={e=>{onCreate(e);setShowNew(false);}} onClose={()=>setShowNew(false)}/>}
      <div className="stats">
        <div className="stat"><div className="stat-lbl">Processos Ativos</div><div className="stat-val" style={{color:'#4169FF'}}>{total}</div><div className="stat-sub">em andamento</div></div>
        <div className="stat"><div className="stat-lbl">Sessões Realizadas</div><div className="stat-val">{sessions}</div><div className="stat-sub">histórico total</div></div>
        <div className="stat"><div className="stat-lbl">Com Pendências</div><div className="stat-val" style={{color:'#D97706'}}>{pending}</div><div className="stat-sub">requerem atenção</div></div>
        <div className="stat"><div className="stat-lbl">Concluídos</div><div className="stat-val" style={{color:'#10B981'}}>{done}</div><div className="stat-sub">processos</div></div>
      </div>
      <div className="sec">
        <span className="sec-lbl">Processos ({total})</span>
        <button className="btn btn-p" onClick={()=>setShowNew(true)}>+ Novo Processo</button>
      </div>
      <div className="grid">
        {engs.map(e=>{
          const css=currentStageStatus(e);
          return (
            <div key={e.id} className="eng-card" onClick={()=>onSelect(e.id)}>
              <div className="ec-top">
                <div className="ec-av" style={{background:e.coachee.color+'18',border:`1px solid ${e.coachee.color}35`}}>
                  <span style={{color:e.coachee.color}}>{e.coachee.initials}</span>
                </div>
                <div style={{flex:1}}>
                  <div className="ec-name">{e.coachee.name}</div>
                  <div className="ec-role">{e.coachee.role} · {e.coachee.company}</div>
                </div>
              </div>
              <StageBar eng={e}/>
              {e.competencias.length>0&&(
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:10}}>
                  {e.competencias.map((c,i)=><span key={i} style={{fontSize:11,color:'#6B6E8E',background:'#F4F5F7',border:'1px solid #E4E6EF',borderRadius:4,padding:'2px 8px'}}>{c}</span>)}
                </div>
              )}
              <div className="ec-meta">
                <StatusBadge status={css}/>
                <span className="ec-info">{STAGES[e.phase-1]} · cadência {e.cadence}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── ENGAGEMENT DETAIL ────────────────────────────────────────────────────────
function EngDetail({id,engs,onBack,onUpdate}){
  const [tab,setTab]=useState('roadmap');
  const [activeStage,setActiveStage]=useState(null);
  const eng=engs.find(e=>e.id===id);
  if(!eng)return null;
  const upd=patch=>onUpdate(id,patch);
  const stages=mkStages(eng.phase,eng.report,eng.miniSurveys);
  const css=currentStageStatus(eng);

  const TABS=[
    {id:'roadmap',label:'Jornada'},
    {id:'360',label:`Avaliação 360°${eng.stakeholders360.filter(s=>s.status==='done').length>0?' ✓':''}`},
    {id:'report',label:`Relatório${eng.report?.approved?' ✓':eng.report?' (rascunho)':''}`},
    {id:'minissurvey',label:`Mini-Survey${eng.miniSurveys.length>0?` (${eng.miniSurveys.length})`:''}`},
    {id:'sessions',label:`Sessões (${eng.sessions.length})`},
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
            <StatusBadge status={css}/>
            <span style={{fontSize:12,color:'#A0A3B1'}}>{STAGES[eng.phase-1]} · {eng.cadence}</span>
          </div>
        </div>
        <div className="tabs">{TABS.map(t=><div key={t.id} className={`tab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>{t.label}</div>)}</div>
      </div>
      <div className="scroll">
        {tab==='roadmap'&&<RoadmapTab eng={eng} stages={stages} activeStage={activeStage} setActiveStage={setActiveStage} onUpdate={upd}/>}
        {tab==='360'&&<Tab360Coach eng={eng} onUpdate={upd}/>}
        {tab==='report'&&<TabReport eng={eng} onUpdate={upd}/>}
        {tab==='minissurvey'&&<TabMiniSurvey eng={eng} onUpdate={upd}/>}
        {tab==='sessions'&&<TabSessions eng={eng}/>}
      </div>
    </>
  );
}

// ─── ROADMAP TAB ──────────────────────────────────────────────────────────────
function RoadmapTab({eng,stages,activeStage,setActiveStage,onUpdate}){
  const sel=activeStage!==null?stages.find(s=>s.id===activeStage):stages.find(s=>s.phase===eng.phase);
  const whoLabel={coach:'Coach',app:'App',coachee:'Coachee',lider:'Líder',stk:'Stakeholder'};
  const actionBg={done:'ai-done',pending:'ai-pending',active:'',idle:''};

  return (
    <div style={{marginTop:20}}>
      <div className="igrid">
        {[{l:'Início',v:eng.startDate},{l:'Encerramento',v:eng.endDate},{l:'Cadência',v:eng.cadence},{l:'Nº de Sessões',v:eng.sessions},{l:'Assessment',v:eng.hasAssessment?eng.assessmentType:'Não aplicável'},{l:'Competências',v:eng.competencias.length>0?eng.competencias.join(' / '):'A definir no Setup'}].map(it=>(
          <div key={it.l} className="icard"><div className="ilbl">{it.l}</div><div className="ival" style={{fontSize:13}}>{it.v}</div></div>
        ))}
      </div>

      <div className="sec-lbl" style={{marginBottom:12}}>Mapa da Jornada — clique em uma etapa para ver as ações</div>
      <div className="roadmap">
        {stages.map(s=>(
          <div key={s.id} className={`rm-box${(sel?.id===s.id)?' rm-active':''}`} onClick={()=>setActiveStage(s.id)}>
            <div className="rm-num">Etapa {s.phase}</div>
            <div className="rm-title" style={{color:STAGE_COLORS[s.phase-1]}}>{s.label}</div>
            <div className="rm-status">
              <span className={`sdot ${STATUS[s.status].dot}`}/>
              <span className={STATUS[s.status].txt} style={{fontSize:11}}>{STATUS[s.status].label}</span>
            </div>
            <ul className="rm-items">
              {s.actions.slice(0,3).map((a,i)=>(
                <li key={i} className="rm-li">
                  <span className="rm-idot" style={{background:a.status==='done'?'#10B981':a.status==='pending'?'#F59E0B':a.status==='active'?'#4169FF':'#D8DAE8'}}/>
                  <span>{a.label}</span>
                </li>
              ))}
              {s.actions.length>3&&<li className="rm-li" style={{color:'#C8CAD6'}}>+{s.actions.length-3} mais...</li>}
            </ul>
          </div>
        ))}
      </div>

      {sel&&(
        <div className="stage-panel">
          <div className="stage-title">{sel.phase}. {sel.label}</div>
          <div className="stage-desc">Ações desta etapa e seus responsáveis</div>
          <div className="action-list">
            {sel.actions.map(a=>(
              <div key={a.id} className={`action-item ${actionBg[a.status]}`}>
                <div className="ai-icon" style={{
                  background:a.status==='done'?'rgba(16,185,129,.1)':a.status==='pending'?'rgba(245,158,11,.1)':a.status==='active'?'rgba(65,105,255,.1)':'#F4F5F7'
                }}>
                  {a.status==='done'?'✓':a.status==='pending'?'⏳':a.status==='active'?'→':'○'}
                </div>
                <div className="ai-label">
                  <div className="ai-title">{a.label}</div>
                  <div className="ai-meta">Responsável: {whoLabel[a.who]||a.who}</div>
                </div>
                <span className={`ai-badge ${a.status==='done'?'ai-b-done':a.status==='pending'?'ai-b-pending':a.status==='active'?'ai-b-active':'ai-b-todo'}`}>
                  {a.status==='done'?'Concluído':a.status==='pending'?'Pendente':a.status==='active'?'Em andamento':'A fazer'}
                </span>
              </div>
            ))}
          </div>

          {sel.id==='diagnostico'&&(
            <div className="code-box">
              <div className="code-title">Códigos de acesso — compartilhe com cada pessoa</div>
              <div className="code-row"><span className="code-lbl">Coachee ({eng.coachee.name})</span><span className="code-val">CE-{eng.id}</span></div>
              {eng.leaders.map(l=><div key={l.id} className="code-row"><span className="code-lbl">{l.name} (Líder)</span><span className="code-val">LD-{eng.id}-{l.id}</span></div>)}
              {eng.stakeholders360.map(s=><div key={s.id} className="code-row"><span className="code-lbl">{s.name} (Stakeholder 360°)</span><span className="code-val">ST-{eng.id}-{s.id}</span></div>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── 360 TAB (COACH) ─────────────────────────────────────────────────────────
function Tab360Coach({eng,onUpdate}){
  const [showAdd,setShowAdd]=useState(false);
  const [viewSh,setViewSh]=useState(null);
  const [loading,setLoading]=useState(false);
  const done=eng.stakeholders360.filter(s=>s.status==='done');

  const addSh=sh=>onUpdate({stakeholders360:[...eng.stakeholders360,sh]});
  const removeSh=id=>onUpdate({stakeholders360:eng.stakeholders360.filter(s=>s.id!==id)});
  const toggleSh=id=>onUpdate({stakeholders360:eng.stakeholders360.map(s=>s.id===id?{...s,status:s.status==='done'?'pending':'done'}:s)});

  const generate=async()=>{
    if(!done.length)return;
    setLoading(true);
    const feedbacks=done.filter(s=>s.feedback).map(s=>{
      const f=s.feedback;
      return `--- ${s.name} (${s.role}) ---
Pontos positivos: ${[f.pos1&&`${f.pos1} (ex: ${f.pos1ex})`,f.pos2&&`${f.pos2} (ex: ${f.pos2ex})`,f.pos3&&`${f.pos3} (ex: ${f.pos3ex})`].filter(Boolean).join('; ')}
Continuar fazendo: ${[f.cont1&&`${f.cont1} (ex: ${f.cont1ex})`,f.cont2&&`${f.cont2} (ex: ${f.cont2ex})`].filter(Boolean).join('; ')}
Parar de fazer: ${[f.par1&&`${f.par1} (ex: ${f.par1ex})`,f.par2&&`${f.par2} (ex: ${f.par2ex})`].filter(Boolean).join('; ')}
Começar a fazer: ${[f.inic1&&`${f.inic1} (ex: ${f.inic1ex})`,f.inic2&&`${f.inic2} (ex: ${f.inic2ex})`].filter(Boolean).join('; ')}
Prioridade: ${f.prior||''}`;
    }).join('\n\n');
    const prompt=`Você é especialista em coaching executivo com a metodologia MGSCC (Marshall Goldsmith Stakeholder Centered Coaching). Gere um relatório de desenvolvimento profissional em português brasileiro.

COACHEE: ${eng.coachee.name} | ${eng.coachee.role} | ${eng.coachee.company}
OBJETIVO: ${eng.goal}
RESPONDENTES: ${done.length} stakeholders

FEEDBACKS:
${feedbacks}

ESTRUTURA (use ## para seções):

## Síntese do Perfil de Liderança
(2 parágrafos — quem é esse líder hoje, o que o diferencia)

## Pontos Fortes Consolidados
(top 3, numerados, com evidências dos feedbacks)

## Prioridades de Desenvolvimento
(top 3, numeradas, baseadas nos padrões identificados)

## Plano de Ação

**Parar de fazer:**
(lista de comportamentos a eliminar)

**Começar a fazer:**
(lista de comportamentos concretos a adotar)

## Checklist Diário de Comportamentos
(5-7 itens com ☐, ações simples e observáveis)

Tom: profissional, respeitoso, orientado ao desenvolvimento. Foco em comportamentos observáveis.`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const text=data.content?.[0]?.text||"Erro ao gerar.";
      onUpdate({report:{content:text,approved:false,sharedAt:null}});
    }catch(e){alert("Erro ao conectar com a IA.");}
    setLoading(false);
  };

  return (
    <div style={{marginTop:20}}>
      {showAdd&&<AddShModal tipo="360" onSave={sh=>{addSh(sh);setShowAdd(false);}} onClose={()=>setShowAdd(false)}/>}
      {viewSh&&<ViewFeedbackModal sh={viewSh} onClose={()=>setViewSh(null)}/>}
      <div className="sec">
        <span className="sec-lbl">Stakeholders 360° ({done.length}/{eng.stakeholders360.length} responderam)</span>
        <button className="btn btn-p btn-sm" onClick={()=>setShowAdd(true)}>+ Adicionar</button>
      </div>
      {eng.stakeholders360.length===0&&<div className="empty"><div className="ei">◌</div>Nenhum stakeholder cadastrado.<br/>O coachee pode cadastrar no portal dele.</div>}
      <div className="sh-list">
        {eng.stakeholders360.map(s=>(
          <div key={s.id} className="sh-item">
            <div className="sh-av">{s.initials}</div>
            <div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}{s.email?` · ${s.email}`:''}</div></div>
            <span className={`badge ${s.status==='done'?'b-done':'b-pend'}`} style={{cursor:'pointer',marginRight:8}} onClick={()=>toggleSh(s.id)}>{s.status==='done'?'Respondido':'Pendente'}</span>
            {s.status==='done'&&s.feedback&&<button className="btn btn-g btn-xs" style={{marginRight:8}} onClick={()=>setViewSh(s)}>Ver</button>}
            <button className="btn btn-d btn-xs" onClick={()=>removeSh(s.id)}>×</button>
          </div>
        ))}
      </div>
      <div className="divider"/>
      <div className="sec">
        <span className="sec-lbl">Gerar Relatório com IA</span>
        <button className="btn btn-p" onClick={generate} disabled={loading||!done.filter(s=>s.feedback).length}>{loading?<Dots/>:'✦ Gerar Relatório'}</button>
      </div>
      {!done.filter(s=>s.feedback).length&&<div style={{fontSize:13,color:'#A0A3B1'}}>Aguardando respostas dos stakeholders para gerar o relatório.</div>}
      {loading&&<div style={{fontSize:13,color:'#A0A3B1',marginTop:8}}>Analisando feedbacks e gerando relatório...</div>}
      {!loading&&eng.report&&<div className="info-box">✓ Relatório gerado. Edite e aprove na aba Relatório.</div>}
    </div>
  );
}

// ─── VIEW FEEDBACK MODAL ──────────────────────────────────────────────────────
function ViewFeedbackModal({sh,onClose}){
  const f=sh.feedback;
  if(!f) return null;
  const sections=[
    {label:"Pontos positivos",items:[[f.pos1,f.pos1ex],[f.pos2,f.pos2ex],[f.pos3,f.pos3ex]]},
    {label:"Continuar fazendo",items:[[f.cont1,f.cont1ex],[f.cont2,f.cont2ex],[f.cont3,f.cont3ex]]},
    {label:"Parar de fazer",items:[[f.par1,f.par1ex],[f.par2,f.par2ex],[f.par3,f.par3ex]]},
    {label:"Começar a fazer",items:[[f.inic1,f.inic1ex],[f.inic2,f.inic2ex],[f.inic3,f.inic3ex]]},
  ];
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-lg">
        <div className="modal-title">{sh.name}</div>
        <div className="modal-sub">{sh.role} · Tipo: {f.tipo}</div>
        {sections.map(sec=>(
          <div key={sec.label} style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'#4169FF',marginBottom:8}}>{sec.label}</div>
            {sec.items.filter(([v])=>v).map(([v,ex],i)=>(
              <div key={i} style={{background:'#F9FAFB',border:'1px solid #E4E6EF',borderRadius:8,padding:'10px 12px',marginBottom:6}}>
                <div style={{fontSize:14,fontWeight:500,color:'#1A1D2E',marginBottom:4}}>{v}</div>
                {ex&&<div style={{fontSize:12,color:'#6B6E8E'}}>Exemplo: {ex}</div>}
              </div>
            ))}
          </div>
        ))}
        {f.prior&&<div className="info-box">Prioridade indicada: {f.prior}</div>}
        <div className="modal-foot"><button className="btn btn-g" onClick={onClose}>Fechar</button></div>
      </div>
    </Overlay>
  );
}

// ─── REPORT TAB ───────────────────────────────────────────────────────────────
function TabReport({eng,onUpdate}){
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(eng.report?.content||'');
  if(!eng.report) return <div className="empty" style={{marginTop:24}}><div className="ei">◌</div>Nenhum relatório gerado ainda.<br/>Gere na aba Avaliação 360°.</div>;
  const approve=()=>onUpdate({report:{...eng.report,approved:true,sharedAt:new Date().toISOString().split('T')[0]}});
  const saveEdit=()=>{onUpdate({report:{...eng.report,content:draft}});setEditing(false);};
  return (
    <div style={{marginTop:20}}>
      {eng.report.approved&&<div className="approved-banner">✓ Aprovado e compartilhado em {eng.report.sharedAt} — coachee pode visualizar</div>}
      <div className="sec">
        <span className="sec-lbl">{editing?'Editando':'Relatório de Desenvolvimento'}</span>
        <div style={{display:'flex',gap:8}}>
          {!eng.report.approved&&!editing&&<button className="btn btn-p" onClick={approve}>✓ Aprovar e Compartilhar</button>}
          {!editing&&<button className="btn btn-g" onClick={()=>{setDraft(eng.report.content);setEditing(true);}}>Editar</button>}
          {editing&&<><button className="btn btn-g" onClick={()=>setEditing(false)}>Cancelar</button><button className="btn btn-p" onClick={saveEdit}>Salvar</button></>}
        </div>
      </div>
      {editing?<textarea className="report-editor" value={draft} onChange={e=>setDraft(e.target.value)}/>
      :<div className="report-view"><div className="report-text">{eng.report.content}</div></div>}
    </div>
  );
}

// ─── MINI SURVEY TAB ─────────────────────────────────────────────────────────
function TabMiniSurvey({eng,onUpdate}){
  const [sel,setSel]=useState(eng.miniSurveys[0]||null);
  const [showAdd,setShowAdd]=useState(false);
  const [loading,setLoading]=useState(false);
  const [analysis,setAnalysis]=useState('');
  const KEYS=['-3','-2','-1','0','+1','+2','+3'];
  const bColor=k=>{const n=parseInt(k);return n>0?'#10B981':n<0?'#EF4444':'#4169FF';};
  const bH=(c,t)=>t===0?0:Math.max(3,(c/t)*72);

  const addShMS=sh=>onUpdate({stakeholdersMS:[...eng.stakeholdersMS,sh]});

  const sendSurvey=()=>{
    if(!eng.competencias.length){alert('Defina as competências na aba Jornada antes de enviar.');return;}
    const ms={id:Date.now(),label:`Mini-Survey ${eng.miniSurveys.length+1}`,period:'',sentAt:new Date().toISOString().split('T')[0],competencias:[...eng.competencias],responses:[]};
    const updated=[...eng.miniSurveys,ms];
    onUpdate({miniSurveys:updated});
    setSel(ms);
  };

  const analyze=async()=>{
    if(!sel||!sel.responses.length)return;
    setLoading(true);setAnalysis('');
    const compScores=sel.competencias.map((c,ci)=>{
      const scores=sel.responses.map(r=>r.scores[ci]||0);
      const avg=(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1);
      const dist={};KEYS.forEach(k=>{dist[k]=sel.responses.filter(r=>{const v=r.scores[ci];return(v>=0?'+':'')+v===k;}).length;});
      return `${c}: média ${avg>=0?'+'+avg:avg} | dist: ${Object.entries(dist).filter(([,v])=>v>0).map(([k,v])=>`${k}:${v}`).join(', ')}`;
    });
    const prompt=`Especialista MGSCC. Analise os resultados do mini-survey. Português brasileiro.

COACHEE: ${eng.coachee.name} | PERÍODO: ${sel.period||sel.sentAt}
RESPONDENTES: ${sel.responses.length}
COMPETÊNCIAS:
${compScores.join('\n')}
COMENTÁRIOS:
${sel.responses.map(r=>`${r.name} (${r.role}): mudanças="${r.mudancas||''}" sugestões="${r.sugestoes||''}"`).join('\n')}

ESTRUTURA:
1. **Síntese dos Resultados** (2 parágrafos — o que os números revelam)
2. **Insights Críticos** (padrões, divergências, o que está por baixo dos dados)
3. **Prioridades para o Próximo Ciclo** (3 ações concretas)

Máximo 300 palavras. Tom profissional, baseado em dados.`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      setAnalysis(data.content?.[0]?.text||"Erro ao gerar.");
    }catch(e){setAnalysis("Erro de conexão.");}
    setLoading(false);
  };

  const buildDist=(responses,ci)=>{
    const dist={};KEYS.forEach(k=>dist[k]=0);
    responses.forEach(r=>{const v=r.scores[ci]||0;const k=(v>=0?'+':'')+v;if(dist[k]!==undefined)dist[k]++;});
    return dist;
  };

  return (
    <div style={{marginTop:20}}>
      {showAdd&&<AddShModal tipo="ms" onSave={sh=>{addShMS(sh);setShowAdd(false);}} onClose={()=>setShowAdd(false)}/>}

      <div className="sec">
        <span className="sec-lbl">Stakeholders Mini-Survey ({eng.stakeholdersMS.length})</span>
        <button className="btn btn-g btn-sm" onClick={()=>setShowAdd(true)}>+ Adicionar</button>
      </div>
      {eng.stakeholdersMS.length===0
        ?<div className="warn-box">Nenhum stakeholder cadastrado para o mini-survey. O coachee pode cadastrar no portal dele.</div>
        :<div className="sh-list" style={{marginBottom:16}}>
          {eng.stakeholdersMS.map(s=>(
            <div key={s.id} className="sh-item">
              <div className="sh-av">{s.initials}</div>
              <div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}</div></div>
              <span className={`badge ${s.status==='done'?'b-done':'b-pend'}`}>{s.status==='done'?'Respondido':'Pendente'}</span>
            </div>
          ))}
        </div>
      }

      <div className="divider"/>
      <div className="sec">
        <span className="sec-lbl">Mini-Surveys ({eng.miniSurveys.length})</span>
        <button className="btn btn-p btn-sm" onClick={sendSurvey}>+ Enviar Mini-Survey</button>
      </div>
      {eng.miniSurveys.length===0&&<div className="empty"><div className="ei">◌</div>Nenhum mini-survey enviado ainda.</div>}
      {eng.miniSurveys.length>0&&(
        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {eng.miniSurveys.map(ms=><button key={ms.id} className={`btn ${sel?.id===ms.id?'btn-p':'btn-g'}`} onClick={()=>{setSel(ms);setAnalysis('');}}>
            {ms.label}{ms.period?` · ${ms.period}`:''}
          </button>)}
        </div>
      )}
      {sel&&sel.responses.length===0&&<div className="warn-box">Aguardando respostas dos stakeholders.</div>}
      {sel&&sel.responses.length>0&&sel.competencias.map((comp,ci)=>{
        const dist=buildDist(sel.responses,ci);
        const total=sel.responses.length;
        return (
          <div key={ci} className="chart-wrap">
            <div className="chart-title">{comp}</div>
            <div className="bar-grid">{KEYS.map(k=>{const c=dist[k]||0;return <div key={k} className="bar-col">{c>0&&<div className="bar-cnt">{c}</div>}<div className="bar" style={{height:bH(c,total),background:bColor(k),opacity:c===0?.08:1}}/></div>;})}</div>
            <div className="bar-lbls">{KEYS.map(k=><div key={k} className="bar-lbl">{k}</div>)}</div>
          </div>
        );
      })}
      {sel&&sel.responses.length>0&&(
        <>
          <div className="divider"/>
          <div className="sec"><span className="sec-lbl">Análise IA</span><button className="btn btn-p" onClick={analyze} disabled={loading}>{loading?<Dots/>:'✦ Analisar'}</button></div>
          {(analysis||loading)&&<div className="report-view">{loading&&!analysis?<div style={{color:'#A0A3B1',fontSize:13}}>Analisando...</div>:<div className="report-text">{analysis}</div>}</div>}
        </>
      )}
    </div>
  );
}

// ─── SESSIONS TAB ─────────────────────────────────────────────────────────────
function TabSessions({eng}){
  const mon={Jan:'JAN',Fev:'FEV',Mar:'MAR',Abr:'ABR',Mai:'MAI',Jun:'JUN',Jul:'JUL',Ago:'AGO',Set:'SET',Out:'OUT',Nov:'NOV',Dez:'DEZ'};
  return (
    <div style={{marginTop:20}}>
      <div className="sec"><span className="sec-lbl">Histórico ({eng.sessions.length} sessões)</span><button className="btn btn-p btn-sm">+ Registrar</button></div>
      {eng.sessions.length===0&&<div className="empty"><div className="ei">◌</div>Nenhuma sessão registrada.</div>}
      {eng.sessions.map((s,i)=>{
        const [day,m]=s.date.split(' ');
        return (
          <div key={i} style={{display:'flex',gap:14,padding:'14px 0',borderBottom:'1px solid #E4E6EF'}}>
            <div style={{minWidth:44,textAlign:'center',background:'#fff',border:'1px solid #E4E6EF',borderRadius:8,padding:'7px 5px'}}>
              <div style={{fontSize:18,fontWeight:700,color:'#1A1D2E',lineHeight:1}}>{day}</div>
              <div style={{fontSize:9,color:'#A0A3B1',letterSpacing:'1px',textTransform:'uppercase',marginTop:2}}>{mon[m]||m}</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,fontWeight:600,color:'#A0A3B1',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:4}}>Sessão {s.num}</div>
              <div style={{fontSize:14,color:'#6B6E8E',lineHeight:1.5}}>{s.notes}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 360° FORM (STAKEHOLDER) ──────────────────────────────────────────────────
function Form360({eng,sh,onSubmit}){
  const [tipo,setTipo]=useState('');
  const [f,setF]=useState({pos1:'',pos1ex:'',pos2:'',pos2ex:'',pos3:'',pos3ex:'',cont1:'',cont1ex:'',cont2:'',cont2ex:'',cont3:'',cont3ex:'',par1:'',par1ex:'',par2:'',par2ex:'',par3:'',par3ex:'',inic1:'',inic1ex:'',inic2:'',inic2ex:'',inic3:'',inic3ex:'',prior:''});
  const [done,setDone]=useState(false);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const valid=tipo&&f.pos1&&f.pos1ex&&f.pos2&&f.pos2ex&&f.cont1&&f.cont1ex&&f.cont2&&f.cont2ex&&f.par1&&f.par1ex&&f.par2&&f.par2ex&&f.inic1&&f.inic1ex&&f.inic2&&f.inic2ex&&f.prior;

  const submit=()=>{
    if(!valid)return;
    onSubmit({...f,tipo});
    setDone(true);
  };

  if(done) return <div className="done-page"><style>{CSS}</style><div className="done-icon">✓</div><div className="done-title">Obrigado!</div><div className="done-sub">Suas respostas foram registradas. Sua contribuição é fundamental para o desenvolvimento de {eng.coachee.name}.</div></div>;

  const QA=({label,id,req,placeholder})=>(
    <div className="q-block">
      <div className="q-label">{label}{req&&<span className="q-req">*</span>}</div>
      <textarea className="q-area" placeholder={placeholder||"Descreva..."} value={f[id]} onChange={e=>set(id,e.target.value)}/>
    </div>
  );

  return (
    <div className="form-page">
      <style>{CSS}</style>
      <div className="form-header">
        <div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div>
        <div style={{fontSize:12,color:'#A0A3B1'}}>Avaliação 360° · Confidencial</div>
      </div>
      <div className="form-body">
        <div className="form-hero">
          <div className="form-hero-title">Feedback para Desenvolvimento de Liderança</div>
          <div className="form-hero-sub">
            Você foi convidado a contribuir com o desenvolvimento de <strong style={{color:'#1A1D2E'}}>{eng.coachee.name}</strong> ({eng.coachee.role}).<br/>
            Para cada ponto, traga um exemplo de situação vivida. Tempo estimado: 15–20 min.<br/>
            <span style={{color:'#A0A3B1',fontSize:13}}>Esta avaliação é confidencial — sua identidade não será revelada.</span>
          </div>
        </div>

        <div className="q-block">
          <div className="q-label">Qual é seu tipo de interação com a pessoa avaliada?<span className="q-req">*</span></div>
          <select className="q-sel" value={tipo} onChange={e=>setTipo(e.target.value)}>
            <option value="">Selecione...</option>
            {SH_ROLES.map(r=><option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="q-section-title">Pontos positivos (2 a 3)</div>
        <QA label="Ponto positivo 1" id="pos1" req placeholder="Ex: Proativo, conhecimento técnico..."/>
        <QA label="Exemplo para ilustrar o ponto 1" id="pos1ex" req placeholder="Descreva uma situação..."/>
        <QA label="Ponto positivo 2" id="pos2" req placeholder="Ex: Bom relacionamento..."/>
        <QA label="Exemplo para ilustrar o ponto 2" id="pos2ex" req placeholder="Descreva uma situação..."/>
        <QA label="Ponto positivo 3 (opcional)" id="pos3" placeholder="Ex: Resiliente..."/>
        {f.pos3&&<QA label="Exemplo para ilustrar o ponto 3" id="pos3ex" placeholder="Descreva uma situação..."/>}

        <div className="q-section-title">O que a pessoa deve continuar fazendo (2 a 3)</div>
        <QA label="Continuar fazendo (1)" id="cont1" req placeholder="Use verbo de ação..."/>
        <QA label="Exemplo (1)" id="cont1ex" req placeholder="Descreva uma situação..."/>
        <QA label="Continuar fazendo (2)" id="cont2" req placeholder="Use verbo de ação..."/>
        <QA label="Exemplo (2)" id="cont2ex" req placeholder="Descreva uma situação..."/>
        <QA label="Continuar fazendo (3) (opcional)" id="cont3" placeholder="Use verbo de ação..."/>
        {f.cont3&&<QA label="Exemplo (3)" id="cont3ex" placeholder="Descreva uma situação..."/>}

        <div className="q-section-title">O que a pessoa precisa parar de fazer (2 a 3)</div>
        <QA label="Parar de fazer (1)" id="par1" req placeholder="Comportamento que atrapalha..."/>
        <QA label="Exemplo (1)" id="par1ex" req placeholder="Descreva uma situação..."/>
        <QA label="Parar de fazer (2)" id="par2" req placeholder="Comportamento que atrapalha..."/>
        <QA label="Exemplo (2)" id="par2ex" req placeholder="Descreva uma situação..."/>
        <QA label="Parar de fazer (3) (opcional)" id="par3" placeholder="Comportamento que atrapalha..."/>
        {f.par3&&<QA label="Exemplo (3)" id="par3ex" placeholder="Descreva uma situação..."/>}

        <div className="q-section-title">O que a pessoa precisa começar a fazer (2 a 3)</div>
        <QA label="Começar a fazer (1)" id="inic1" req placeholder="Atitude que ajudaria..."/>
        <QA label="Exemplo (1)" id="inic1ex" req placeholder="Descreva uma situação..."/>
        <QA label="Começar a fazer (2)" id="inic2" req placeholder="Atitude que ajudaria..."/>
        <QA label="Exemplo (2)" id="inic2ex" req placeholder="Descreva uma situação..."/>
        <QA label="Começar a fazer (3) (opcional)" id="inic3" placeholder="Atitude que ajudaria..."/>
        {f.inic3&&<QA label="Exemplo (3)" id="inic3ex" placeholder="Descreva uma situação..."/>}

        <div className="q-section-title">Priorização</div>
        <div className="q-block">
          <div className="q-label">Dos pontos citados, qual é o mais relevante e que a pessoa deve priorizar?<span className="q-req">*</span></div>
          <textarea className="q-area" placeholder="Indique o ponto mais importante..." value={f.prior} onChange={e=>set('prior',e.target.value)}/>
        </div>

        <button className="login-btn" onClick={submit} disabled={!valid} style={{opacity:valid?1:.5}}>Enviar Avaliação</button>
        {!valid&&<div style={{fontSize:12,color:'#A0A3B1',marginTop:8,textAlign:'center'}}>Preencha todos os campos obrigatórios (*) para enviar.</div>}
      </div>
    </div>
  );
}

// ─── MINI SURVEY FORM (STAKEHOLDER) ──────────────────────────────────────────
function FormMiniSurvey({eng,sh,ms,onSubmit}){
  const [tipo,setTipo]=useState('');
  const [objetivos,setObjetivos]=useState('');
  const [freq,setFreq]=useState(ms.competencias.map(()=>''));
  const [scores,setScores]=useState(ms.competencias.map(()=>null));
  const [overall,setOverall]=useState(null);
  const [mudancas,setMudancas]=useState('');
  const [sugestoes,setSugestoes]=useState('');
  const [done,setDone]=useState(false);

  const setFreqI=(i,v)=>setFreq(p=>{const n=[...p];n[i]=v;return n;});
  const setScoreI=(i,v)=>setScores(p=>{const n=[...p];n[i]=v;return n;});
  const valid=tipo&&objetivos&&scores.every(s=>s!==null)&&overall!==null&&mudancas&&sugestoes;

  const submit=()=>{
    if(!valid)return;
    onSubmit({shId:sh.id,name:sh.name,role:tipo,scores,overall,mudancas,sugestoes,freq,objetivos});
    setDone(true);
  };

  if(done) return <div className="done-page"><style>{CSS}</style><div className="done-icon">✓</div><div className="done-title">Obrigado!</div><div className="done-sub">Suas respostas foram registradas com sucesso.</div></div>;

  const ScaleBtn=({k,val,onChange})=>{
    const n=parseInt(k);
    const cls=val===n?(n>0?'sp':n<0?'sn':'sz'):'';
    return <button className={`scale-btn ${cls}`} onClick={()=>onChange(n)}>{k}</button>;
  };

  return (
    <div className="form-page">
      <style>{CSS}</style>
      <div className="form-header">
        <div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div>
        <div style={{fontSize:12,color:'#A0A3B1'}}>Pesquisa de Progresso · {ms.label}</div>
      </div>
      <div className="form-body">
        <div className="form-hero">
          <div className="form-hero-title">Acompanhamento de Progresso</div>
          <div className="form-hero-sub">
            Avalie o progresso de <strong style={{color:'#1A1D2E'}}>{eng.coachee.name}</strong> desde o início do processo de desenvolvimento.<br/>
            <span style={{color:'#A0A3B1',fontSize:13}}>Suas respostas são confidenciais e serão compiladas anonimamente.</span>
          </div>
        </div>

        <div className="q-block">
          <div className="q-label">Qual é seu tipo de interação com a pessoa avaliada?<span className="q-req">*</span></div>
          <select className="q-sel" value={tipo} onChange={e=>setTipo(e.target.value)}>
            <option value="">Selecione...</option>
            {MS_ROLES.map(r=><option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="q-block">
          <div className="q-label">Os objetivos do processo de coaching foram compartilhados com você?<span className="q-req">*</span></div>
          <select className="q-sel" value={objetivos} onChange={e=>setObjetivos(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>

        <div className="q-block">
          <div className="q-label">Com que frequência o/a líder pediu feedbacks sobre as competências escolhidas?<span className="q-req">*</span></div>
          <div className="scale-wrap">
            {ms.competencias.map((c,i)=>(
              <div key={i} className="scale-row">
                <div className="scale-lbl">{c}</div>
                <select style={{background:'#F4F5F7',border:'1px solid #E4E6EF',borderRadius:7,padding:'6px 10px',fontSize:13,color:'#1A1D2E',outline:'none'}} value={freq[i]} onChange={e=>setFreqI(i,e.target.value)}>
                  <option value="">Selecione...</option>
                  {FREQ_OPTS.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="q-block">
          <div className="q-label">Em uma escala de -3 a +3, como classifica o progresso nas competências?<span className="q-req">*</span></div>
          <div style={{fontSize:12,color:'#A0A3B1',marginBottom:12}}>-3 = Piorou significativamente · 0 = Sem mudança · +3 = Melhorou significativamente</div>
          <div className="scale-wrap">
            {ms.competencias.map((c,i)=>(
              <div key={i} className="scale-row">
                <div className="scale-lbl">{c}</div>
                <div className="scale-btns">{SCALE.map(k=><ScaleBtn key={k} k={k} val={scores[i]} onChange={v=>setScoreI(i,v)}/>)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="q-block">
          <div className="q-label">De forma geral, como classifica o progresso da efetividade de liderança?<span className="q-req">*</span></div>
          <div style={{fontSize:12,color:'#A0A3B1',marginBottom:12}}>Desconsidere fatores fora do controle do líder</div>
          <div className="scale-btns">{SCALE.map(k=><ScaleBtn key={k} k={k} val={overall} onChange={setOverall}/>)}</div>
        </div>

        <div className="q-block">
          <div className="q-label">Quais foram as mudanças de comportamento mais perceptíveis?<span className="q-req">*</span></div>
          <textarea className="q-area" placeholder="Descreva o que observou..." value={mudancas} onChange={e=>setMudancas(e.target.value)}/>
        </div>

        <div className="q-block">
          <div className="q-label">Que sugestões você daria para a pessoa se tornar mais efetiva nos próximos meses?<span className="q-req">*</span></div>
          <textarea className="q-area" placeholder="Suas sugestões..." value={sugestoes} onChange={e=>setSugestoes(e.target.value)}/>
        </div>

        <button className="login-btn" onClick={submit} disabled={!valid} style={{opacity:valid?1:.5}}>Enviar Pesquisa</button>
      </div>
    </div>
  );
}

// ─── COACHEE PORTAL ───────────────────────────────────────────────────────────
function CoacheePortal({eng,onLogout,onUpdate}){
  const [tab,setTab]=useState('jornada');
  const [showAddSh360,setShowAddSh360]=useState(false);
  const [showAddShMS,setShowAddShMS]=useState(false);
  const stages=mkStages(eng.phase,eng.report,eng.miniSurveys);
  const c=eng.coachee;

  const addSh360=sh=>onUpdate(eng.id,{stakeholders360:[...eng.stakeholders360,sh]});
  const addShMS=sh=>onUpdate(eng.id,{stakeholdersMS:[...eng.stakeholdersMS,sh]});

  const TABS=[
    {id:'jornada',l:'Minha Jornada'},
    {id:'stakeholders',l:'Stakeholders'},
    {id:'prioridades',l:'Prioridades'},
    {id:'progresso',l:'Progresso'},
  ];

  return (
    <div className="portal-page">
      <style>{CSS}</style>
      {showAddSh360&&<AddShModal tipo="360" onSave={sh=>{addSh360(sh);setShowAddSh360(false);}} onClose={()=>setShowAddSh360(false)}/>}
      {showAddShMS&&<AddShModal tipo="ms" onSave={sh=>{addShMS(sh);setShowAddShMS(false);}} onClose={()=>setShowAddShMS(false)}/>}
      <div className="portal-header">
        <div>
          <div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div>
          <div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase'}}>Minha Jornada</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:14,fontWeight:600,color:'#1A1D2E'}}>{c.name}</div>
            <div style={{fontSize:12,color:'#A0A3B1'}}>{c.role} · {c.company}</div>
          </div>
          <button className="btn btn-g btn-sm" onClick={onLogout}>Sair</button>
        </div>
      </div>
      <div className="portal-body">
        <div className="portal-hero">
          <div className="portal-name">{c.name}</div>
          <div style={{fontSize:11,color:'#A0A3B1',letterSpacing:'1.5px',textTransform:'uppercase',margin:'4px 0 8px'}}>Processo de Desenvolvimento · MGSCC</div>
          <div className="portal-goal">{eng.goal}</div>
          <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}>
            <span className={`sdot ${STATUS[stages.find(s=>s.phase===eng.phase)?.status||'idle'].dot}`}/>
            <span style={{fontSize:13,color:'#6B6E8E',fontWeight:500}}>{STAGES[eng.phase-1]} · {STATUS[stages.find(s=>s.phase===eng.phase)?.status||'idle'].label}</span>
          </div>
        </div>
        <div className="tabs" style={{marginBottom:0}}>
          {TABS.map(t=><div key={t.id} className={`tab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>{t.l}</div>)}
        </div>
        <div style={{paddingTop:24}}>
          {tab==='jornada'&&(
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
              {stages.map(s=>(
                <div key={s.id} className="rm-box" style={{borderColor:s.phase===eng.phase?STAGE_COLORS[s.phase-1]+'60':'#E4E6EF'}}>
                  <div className="rm-num">Etapa {s.phase}</div>
                  <div className="rm-title" style={{color:STAGE_COLORS[s.phase-1],fontSize:12}}>{s.label}</div>
                  <div className="rm-status"><span className={`sdot ${STATUS[s.status].dot}`}/><span className={STATUS[s.status].txt} style={{fontSize:11}}>{STATUS[s.status].label}</span></div>
                  <ul className="rm-items">
                    {s.actions.filter(a=>a.who==='coachee').map((a,i)=>(
                      <li key={i} className="rm-li">
                        <span className="rm-idot" style={{background:a.status==='done'?'#10B981':a.status==='active'?'#4169FF':'#D8DAE8'}}/>
                        <span style={{fontSize:11}}>{a.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {tab==='stakeholders'&&(
            <>
              <div className="sec"><span className="sec-lbl">Minha lista — Avaliação 360° ({eng.stakeholders360.length})</span><button className="btn btn-p btn-sm" onClick={()=>setShowAddSh360(true)}>+ Adicionar</button></div>
              {eng.stakeholders360.length===0&&<div className="empty"><div className="ei">◌</div>Adicione as pessoas que participarão da sua avaliação 360°.</div>}
              <div className="sh-list" style={{marginBottom:20}}>
                {eng.stakeholders360.map(s=>(
                  <div key={s.id} className="sh-item">
                    <div className="sh-av">{s.initials}</div>
                    <div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}</div></div>
                    <span className={`badge ${s.status==='done'?'b-done':'b-pend'}`}>{s.status==='done'?'Respondido':'Aguardando'}</span>
                  </div>
                ))}
              </div>
              <div className="sec"><span className="sec-lbl">Minha lista — Mini-Survey ({eng.stakeholdersMS.length})</span><button className="btn btn-p btn-sm" onClick={()=>setShowAddShMS(true)}>+ Adicionar</button></div>
              {eng.stakeholdersMS.length===0&&<div className="empty"><div className="ei">◌</div>Adicione as pessoas que acompanharão seu progresso.</div>}
              <div className="sh-list">
                {eng.stakeholdersMS.map(s=>(
                  <div key={s.id} className="sh-item">
                    <div className="sh-av">{s.initials}</div>
                    <div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}</div></div>
                    <span className={`badge b-new`}>Mini-survey</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab==='prioridades'&&(
            <>
              {!eng.report?.approved&&<div className="warn-box">Seu relatório de desenvolvimento ainda está sendo preparado pelo seu coach.</div>}
              {eng.report?.approved&&(
                <>
                  {eng.competencias.length>0&&<div style={{marginBottom:16}}>{eng.competencias.map((c,i)=><div key={i} style={{background:'#EEF1FF',border:'1px solid #D0D8F8',borderRadius:8,padding:'10px 14px',marginBottom:8,fontSize:14,color:'#3358E0',fontWeight:500}}>{c}</div>)}</div>}
                  <div className="report-view"><div className="report-text">{eng.report.content}</div></div>
                </>
              )}
            </>
          )}
          {tab==='progresso'&&(
            <>
              {eng.miniSurveys.length===0&&<div className="empty"><div className="ei">◌</div>O progresso será exibido após o primeiro mini-survey.</div>}
              {eng.miniSurveys.map(ms=>(
                <div key={ms.id} className="chart-wrap" style={{marginBottom:16}}>
                  <div className="chart-title">{ms.label} · {ms.period||ms.sentAt}</div>
                  {ms.competencias.map((comp,ci)=>{
                    const scores=ms.responses.map(r=>r.scores[ci]||0);
                    const avg=scores.length?scores.reduce((a,b)=>a+b,0)/scores.length:0;
                    const col=avg>0.5?'#10B981':avg<-0.5?'#EF4444':'#4169FF';
                    return (
                      <div key={ci} style={{marginBottom:12}}>
                        <div style={{fontSize:13,color:'#6B6E8E',marginBottom:6}}>{comp}</div>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <div style={{flex:1,height:8,background:'#E4E6EF',borderRadius:4,overflow:'hidden'}}>
                            <div style={{height:'100%',width:`${((avg+3)/6)*100}%`,background:col,borderRadius:4}}/>
                          </div>
                          <span style={{fontSize:13,fontWeight:700,color:col}}>{avg>=0?'+':''}{avg.toFixed(1)}</span>
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

// ─── LEADER PORTAL ────────────────────────────────────────────────────────────
function LeaderPortal({engId,liderId,engs,onLogout,onUpdate}){
  const eng=engs.find(e=>e.id===engId);
  const lider=eng?.leaders.find(l=>l.id===liderId);
  if(!eng||!lider) return <div className="done-page"><style>{CSS}</style><div className="done-icon">⚠</div><div className="done-title">Acesso não encontrado</div></div>;

  const validate360=()=>{
    const updated=eng.stakeholders360.map(s=>({...s,validatedByLeader:true}));
    onUpdate(eng.id,{stakeholders360:updated});
    alert('Lista validada com sucesso!');
  };
  const validateMS=()=>{
    const updated=eng.stakeholdersMS.map(s=>({...s,validatedByLeader:true}));
    onUpdate(eng.id,{stakeholdersMS:updated});
    alert('Lista validada com sucesso!');
  };

  const stages=mkStages(eng.phase,eng.report,eng.miniSurveys);
  const css=currentStageStatus(eng);

  return (
    <div className="leader-page">
      <style>{CSS}</style>
      <div className="portal-header">
        <div><div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div><div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase'}}>Portal do Líder</div></div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{textAlign:'right'}}><div style={{fontSize:14,fontWeight:600,color:'#1A1D2E'}}>{lider.name}</div><div style={{fontSize:12,color:'#A0A3B1'}}>Líder</div></div>
          <button className="btn btn-g btn-sm" onClick={onLogout}>Sair</button>
        </div>
      </div>
      <div style={{maxWidth:720,margin:'0 auto',padding:'28px 20px'}}>
        <div className="portal-hero">
          <div style={{fontSize:13,color:'#A0A3B1',marginBottom:4}}>Processo de coaching do seu liderado</div>
          <div className="portal-name">{eng.coachee.name}</div>
          <div style={{fontSize:13,color:'#6B6E8E',marginTop:4}}>{eng.coachee.role} · {eng.coachee.company}</div>
          <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}>
            <span className={`sdot ${STATUS[css].dot}`}/>
            <span style={{fontSize:13,color:'#6B6E8E',fontWeight:500}}>{STAGES[eng.phase-1]} · {STATUS[css].label}</span>
          </div>
        </div>

        <div style={{marginBottom:24}}>
          <div className="sec-lbl" style={{marginBottom:12}}>Status da Jornada</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
            {stages.map(s=>(
              <div key={s.id} style={{background:'#fff',border:`1px solid ${s.phase===eng.phase?STAGE_COLORS[s.phase-1]+'50':'#E4E6EF'}`,borderRadius:9,padding:'12px 14px'}}>
                <div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:4}}>Etapa {s.phase}</div>
                <div style={{fontSize:13,fontWeight:600,color:STAGE_COLORS[s.phase-1],marginBottom:8}}>{s.label}</div>
                <div style={{display:'flex',alignItems:'center',gap:5}}><span className={`sdot ${STATUS[s.status].dot}`}/><span className={STATUS[s.status].txt} style={{fontSize:11}}>{STATUS[s.status].label}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginBottom:24}}>
          <div className="sec"><span className="sec-lbl">Lista de Stakeholders — 360° ({eng.stakeholders360.length})</span><button className="btn btn-p btn-sm" onClick={validate360}>✓ Validar Lista</button></div>
          {eng.stakeholders360.length===0?<div className="empty"><div className="ei">◌</div>Aguardando coachee cadastrar a lista.</div>:
          <div className="sh-list">{eng.stakeholders360.map(s=><div key={s.id} className="sh-item"><div className="sh-av">{s.initials}</div><div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}</div></div><span className={`badge ${s.validatedByLeader?'b-done':'b-pend'}`}>{s.validatedByLeader?'Validado':'Pendente'}</span></div>)}</div>}
        </div>

        <div style={{marginBottom:24}}>
          <div className="sec"><span className="sec-lbl">Lista de Stakeholders — Mini-Survey ({eng.stakeholdersMS.length})</span><button className="btn btn-p btn-sm" onClick={validateMS}>✓ Validar Lista</button></div>
          {eng.stakeholdersMS.length===0?<div className="empty"><div className="ei">◌</div>Aguardando coachee cadastrar a lista.</div>:
          <div className="sh-list">{eng.stakeholdersMS.map(s=><div key={s.id} className="sh-item"><div className="sh-av">{s.initials}</div><div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}</div></div><span className={`badge ${s.validatedByLeader?'b-done':'b-pend'}`}>{s.validatedByLeader?'Validado':'Pendente'}</span></div>)}</div>}
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  const [engs,setEngs]=useState(INIT_ENGS);
  const [view,setView]=useState('dash');
  const [activeEng,setActiveEng]=useState(null);
  const [navItem,setNavItem]=useState('processos');

  const updateEng=(id,patch)=>setEngs(p=>p.map(e=>e.id===id?{...e,...patch}:e));
  const addEng=e=>setEngs(p=>[...p,e]);
  const logout=()=>{setUser(null);setView('dash');setActiveEng(null);};

  const handleLogin=u=>{
    setUser(u);
    if(u.role==='coachee'){setView('coachee');setActiveEng(u.engId);}
    else if(u.role==='lider'){setView('lider');setActiveEng(u.engId);}
    else if(u.role==='rh'){setView('rh');}
    else if(u.role==='stk'){setView('stk');setActiveEng(u.engId);}
    else setView('dash');
  };

  if(!user) return <><style>{CSS}</style><Login onLogin={handleLogin}/></>;

  // ── COACHEE ──
  if(user.role==='coachee'){
    const eng=engs.find(e=>e.id===activeEng);
    if(!eng) return <div className="done-page"><style>{CSS}</style><div className="done-icon">⚠</div><div className="done-title">Processo não encontrado</div></div>;
    return <CoacheePortal eng={eng} onLogout={logout} onUpdate={updateEng}/>;
  }

  // ── LÍDER ──
  if(user.role==='lider'){
    return <LeaderPortal engId={activeEng} liderId={user.liderId} engs={engs} onLogout={logout} onUpdate={updateEng}/>;
  }

  // ── STAKEHOLDER ──
  if(user.role==='stk'){
    const eng=engs.find(e=>e.id===activeEng);
    const sh=eng?.stakeholders360.find(s=>s.id===user.shId)||eng?.stakeholdersMS.find(s=>s.id===user.shId);
    if(!eng||!sh) return <div className="done-page"><style>{CSS}</style><div className="done-icon">⚠</div><div className="done-title">Acesso não encontrado</div></div>;

    // Open mini-survey?
    const openMS=eng.miniSurveys.find(ms=>!ms.responses.find(r=>r.shId===sh.id));
    if(openMS){
      return <FormMiniSurvey eng={eng} sh={sh} ms={openMS} onSubmit={resp=>{
        const updated=eng.miniSurveys.map(ms=>ms.id===openMS.id?{...ms,responses:[...ms.responses,resp]}:ms);
        updateEng(eng.id,{miniSurveys:updated});
      }}/>;
    }
    // 360 pending?
    const sh360=eng.stakeholders360.find(s=>s.id===user.shId);
    if(sh360&&sh360.status!=='done'){
      return <Form360 eng={eng} sh={sh360} onSubmit={answers=>{
        const updated=eng.stakeholders360.map(s=>s.id===sh360.id?{...s,status:'done',feedback:answers}:s);
        updateEng(eng.id,{stakeholders360:updated});
      }}/>;
    }
    return <div className="done-page"><style>{CSS}</style><div className="done-icon">✓</div><div className="done-title">Avaliação concluída</div><div className="done-sub">Você já respondeu a avaliação para este processo. Obrigado pela sua contribuição!</div></div>;
  }

  // ── RH ──
  if(user.role==='rh'){
    return (
      <div className="done-page">
        <style>{CSS}</style>
        <div className="done-icon">🏢</div>
        <div className="done-title">Portal RH</div>
        <div className="done-sub">Esta área estará disponível em breve.</div>
        <button className="btn btn-g" onClick={logout}>Sair</button>
      </div>
    );
  }

  // ── COACH ──
  const NAV=[{id:'processos',label:'Processos',badge:engs.length},{id:'briefings',label:'Briefings'},{id:'biblioteca',label:'Biblioteca'}];
  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <div className="sb">
          <div className="sb-logo"><div className="sb-title">Lidehra</div><div className="sb-sub">Coach Platform Lidehra</div></div>
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
                <div className="pg-sub">Processos ativos — {new Date().toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}</div>
                <div className="divline"/>
              </div>
              <div className="scroll"><Dashboard engs={engs} onSelect={id=>{setActiveEng(id);setView('eng');}} onCreate={addEng}/></div>
            </>
          )}
          {view==='eng'&&activeEng&&(
            <EngDetail id={activeEng} engs={engs} onBack={()=>{setView('dash');setActiveEng(null);}} onUpdate={updateEng}/>
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
