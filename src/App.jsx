import { useState, useEffect, useCallback } from "react";
import { supabase } from './supabase.js';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#F4F5F7;font-family:'Poppins',sans-serif;color:#1A1D2E;}
input,textarea,select,button{font-family:'Poppins',sans-serif;}

.shell{display:flex;height:100vh;background:#F4F5F7;overflow:hidden;font-size:14px;}
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
.sb-out{font-size:12px;color:#A0A3B1;cursor:pointer;padding:4px 0;border:none;background:none;text-align:left;transition:color .12s;width:100%;}
.sb-out:hover{color:#EF4444;}

.main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.topbar{padding:20px 32px 0;background:#F4F5F7;}
.pg-title{font-size:24px;font-weight:600;color:#1A1D2E;margin-bottom:3px;}
.pg-sub{font-size:13px;color:#A0A3B1;margin-bottom:20px;}
.divline{height:1px;background:#E4E6EF;}
.scroll{flex:1;overflow-y:auto;padding:24px 32px;}
.scroll::-webkit-scrollbar{width:4px;}
.scroll::-webkit-scrollbar-thumb{background:#D8DAE8;border-radius:2px;}

.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;}
.stat{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:16px 18px;}
.stat-lbl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#A0A3B1;font-weight:600;margin-bottom:8px;}
.stat-val{font-size:28px;font-weight:600;line-height:1;color:#1A1D2E;}
.stat-sub{font-size:12px;color:#A0A3B1;margin-top:5px;}

.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.eng-card{background:#fff;border:1px solid #E4E6EF;border-radius:12px;padding:18px 20px;cursor:pointer;transition:all .15s;}
.eng-card:hover{border-color:#BCC4F0;transform:translateY(-1px);box-shadow:0 6px 20px rgba(65,105,255,.08);}
.ec-top{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;}
.ec-av{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;}
.ec-name{font-size:15px;font-weight:600;color:#1A1D2E;margin-bottom:2px;}
.ec-role{font-size:12px;color:#A0A3B1;}
.ec-stages{display:flex;gap:3px;margin-bottom:10px;}
.ec-seg{height:4px;flex:1;border-radius:3px;}
.ec-comps{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;}
.ec-comp{font-size:11px;color:#6B6E8E;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:4px;padding:2px 8px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.ec-meta{display:flex;align-items:center;justify-content:space-between;}
.ec-status{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:500;}
.ec-info{font-size:11px;color:#A0A3B1;}

.sdot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.s-done{background:#10B981;}.s-active{background:#4169FF;}.s-pending{background:#F59E0B;}.s-idle{background:#D8DAE8;}
.s-done-txt{color:#059669;}.s-active-txt{color:#3358E0;}.s-pending-txt{color:#D97706;}.s-idle-txt{color:#A0A3B1;}

.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .12s;border:none;}
.btn-p{background:#4169FF;color:#fff;}.btn-p:hover{background:#3358E0;}.btn-p:disabled{opacity:.4;cursor:not-allowed;}
.btn-g{background:#fff;color:#6B6E8E;border:1px solid #E4E6EF;}.btn-g:hover{background:#F4F5F7;color:#1A1D2E;}
.btn-d{background:#fff;color:#EF4444;border:1px solid #FCD4D4;}.btn-d:hover{background:#FEF2F2;}
.btn-y{background:#fff;color:#D97706;border:1px solid #FDE68A;}.btn-y:hover{background:#FFFBEB;}
.btn-sm{padding:5px 11px;font-size:12px;}.btn-xs{padding:3px 8px;font-size:11px;}

.sec{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.sec-lbl{font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#A0A3B1;font-weight:600;}

.tabs{display:flex;border-bottom:1px solid #E4E6EF;margin-top:16px;}
.tab{padding:11px 18px;font-size:14px;font-weight:500;color:#A0A3B1;cursor:pointer;border-bottom:2px solid transparent;transition:all .12s;margin-bottom:-1px;}
.tab:hover{color:#6B6E8E;}.tab.on{color:#1A1D2E;border-bottom-color:#4169FF;font-weight:600;}

.back{display:inline-flex;align-items:center;gap:5px;font-size:13px;color:#A0A3B1;cursor:pointer;background:none;border:none;padding:0;margin-bottom:14px;transition:color .12s;}
.back:hover{color:#6B6E8E;}

.det-hd{display:flex;align-items:center;gap:14px;}
.det-av{width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;flex-shrink:0;}
.det-name{font-size:22px;font-weight:600;color:#1A1D2E;}
.det-sub{font-size:13px;color:#A0A3B1;margin-top:2px;}

.roadmap{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:20px 0;}
.rm-box{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:16px;cursor:pointer;transition:all .15s;}
.rm-box:hover{border-color:#BCC4F0;}
.rm-box.rm-active{border-color:#4169FF;box-shadow:0 0 0 3px rgba(65,105,255,.07);}
.rm-num{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C8CAD6;font-weight:600;margin-bottom:6px;}
.rm-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;}
.rm-status{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;margin-bottom:10px;}
.rm-items{list-style:none;}
.rm-li{display:flex;align-items:flex-start;gap:7px;font-size:12px;color:#6B6E8E;margin-bottom:5px;line-height:1.4;}
.rm-idot{width:4px;height:4px;border-radius:50%;flex-shrink:0;margin-top:5px;}

.stage-panel{background:#fff;border:1px solid #E4E6EF;border-radius:12px;padding:20px 24px;}
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

.igrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
.icard{background:#fff;border:1px solid #E4E6EF;border-radius:9px;padding:12px 14px;}
.ilbl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#C8CAD6;font-weight:600;margin-bottom:5px;}
.ival{font-size:13px;font-weight:500;color:#1A1D2E;}

.sh-list{display:flex;flex-direction:column;gap:7px;}
.sh-item{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #E4E6EF;border-radius:9px;padding:10px 14px;}
.sh-item.sh-invalid{background:#FEF2F2;border-color:#FCD4D4;}
.sh-av{width:32px;height:32px;border-radius:8px;background:#EEF1FF;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#4169FF;flex-shrink:0;}
.sh-name{font-size:14px;font-weight:500;color:#1A1D2E;}
.sh-role{font-size:12px;color:#A0A3B1;}
.badge{font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;}
.b-done{background:rgba(16,185,129,.1);color:#059669;}
.b-pend{background:rgba(245,158,11,.1);color:#D97706;}
.b-new{background:rgba(65,105,255,.1);color:#3358E0;}
.b-invalid{background:rgba(239,68,68,.1);color:#DC2626;}

.code-box{background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:14px 16px;margin-top:16px;}
.code-title{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#A0A3B1;font-weight:600;margin-bottom:10px;}
.code-row{display:flex;align-items:center;gap:10px;margin-bottom:6px;}
.code-lbl{font-size:12px;color:#6B6E8E;min-width:180px;}
.code-val{font-size:12px;font-weight:700;color:#3358E0;background:#EEF1FF;padding:3px 10px;border-radius:5px;letter-spacing:.5px;}

.overlay{position:fixed;inset:0;background:rgba(30,35,60,.45);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(4px);}
.modal{background:#fff;border:1px solid #E4E6EF;border-radius:14px;padding:28px 30px;width:500px;max-width:95vw;max-height:88vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.12);}
.modal-lg{width:680px;}.modal-sm{width:400px;}
.modal-title{font-size:20px;font-weight:600;color:#1A1D2E;margin-bottom:4px;}
.modal-sub{font-size:13px;color:#A0A3B1;margin-bottom:22px;}
.modal-foot{display:flex;justify-content:flex-end;gap:8px;margin-top:22px;padding-top:16px;border-top:1px solid #E4E6EF;}
.field{margin-bottom:15px;}
.flbl{font-size:11px;color:#6B6E8E;font-weight:600;letter-spacing:.8px;text-transform:uppercase;margin-bottom:6px;}
.flbl-hint{font-size:10px;color:#A0A3B1;font-weight:400;margin-left:6px;letter-spacing:0;text-transform:none;}
.finp{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:11px 14px;font-size:14px;color:#1A1D2E;outline:none;transition:border-color .12s;resize:vertical;}
.finp:focus{border-color:#4169FF;background:#fff;}
.finp::placeholder{color:#C8CAD6;}
.fchar{font-size:11px;color:#A0A3B1;text-align:right;margin-top:3px;}
.fsel{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:11px 14px;font-size:14px;color:#1A1D2E;outline:none;appearance:none;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.fcheck{display:flex;align-items:center;gap:8px;font-size:13px;color:#1A1D2E;cursor:pointer;}
.fcheck input{width:16px;height:16px;accent-color:#4169FF;}

/* Competencias editor */
.comp-editor{background:#F9FAFB;border:1px solid #E4E6EF;border-radius:10px;padding:16px 18px;margin-bottom:16px;}
.comp-item{background:#fff;border:1px solid #E4E6EF;border-radius:9px;padding:14px 16px;margin-bottom:8px;}
.comp-name{font-size:14px;font-weight:600;color:#1A1D2E;margin-bottom:2px;}
.comp-detail{font-size:12px;color:#6B6E8E;}
.comp-num{font-size:10px;color:#4169FF;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}

/* Progress chart */
.prog-table{width:100%;border-collapse:collapse;margin-bottom:20px;}
.prog-table th{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#A0A3B1;font-weight:600;padding:8px 12px;border-bottom:2px solid #E4E6EF;text-align:left;}
.prog-table td{padding:12px;border-bottom:1px solid #F4F5F7;vertical-align:middle;}
.prog-comp-name{font-size:13px;font-weight:500;color:#1A1D2E;}
.prog-bar-wrap{display:flex;gap:2px;height:24px;border-radius:6px;overflow:hidden;min-width:200px;}
.prog-seg{display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;transition:width .3s;min-width:0;overflow:hidden;}
.prog-pct{font-size:10px;white-space:nowrap;}

/* 360 form */
.form-page{min-height:100vh;background:#F4F5F7;}
.form-header{background:#fff;border-bottom:1px solid #E4E6EF;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;}
.form-body{max-width:640px;margin:0 auto;padding:32px 16px;}
.form-hero{text-align:center;margin-bottom:32px;}
.form-hero-title{font-size:22px;font-weight:600;color:#1A1D2E;margin-bottom:8px;}
.form-hero-sub{font-size:14px;color:#6B6E8E;line-height:1.7;}
.q-sect-lbl{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#4169FF;padding:14px 0 8px;}
.q-block{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:18px 20px;margin-bottom:8px;}
.q-label{font-size:14px;font-weight:500;color:#1A1D2E;margin-bottom:10px;line-height:1.5;}
.q-req{color:#EF4444;margin-left:2px;}
.q-area{width:100%;min-height:80px;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:12px;font-size:14px;color:#1A1D2E;outline:none;resize:vertical;line-height:1.6;transition:border-color .12s;}
.q-area:focus{border-color:#4169FF;background:#fff;}
.q-area::placeholder{color:#C8CAD6;}
.q-sel{width:100%;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:8px;padding:11px 14px;font-size:14px;color:#1A1D2E;outline:none;appearance:none;}

/* Mini survey form */
.scale-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #F4F5F7;}
.scale-row:last-child{border-bottom:none;}
.scale-lbl{font-size:14px;color:#1A1D2E;flex:1;line-height:1.4;}
.scale-btns{display:flex;gap:3px;}
.scale-btn{width:34px;height:30px;border-radius:6px;border:1px solid #E4E6EF;background:#F4F5F7;color:#6B6E8E;font-size:12px;font-weight:600;cursor:pointer;transition:all .12s;}
.scale-btn:hover{background:#EEF1FF;border-color:#BCC4F0;color:#3358E0;}
.scale-btn.sp{background:rgba(16,185,129,.1);border-color:#10B981;color:#059669;}
.scale-btn.sn{background:rgba(239,68,68,.1);border-color:#EF4444;color:#DC2626;}
.scale-btn.sz{background:rgba(65,105,255,.1);border-color:#4169FF;color:#3358E0;}
.freq-sel{background:#F4F5F7;border:1px solid #E4E6EF;border-radius:7px;padding:6px 10px;font-size:12px;color:#1A1D2E;outline:none;appearance:none;font-family:'Poppins',sans-serif;}

/* Report */
.report-editor{width:100%;min-height:380px;background:#F4F5F7;border:1px solid #E4E6EF;border-radius:10px;padding:18px;font-size:14px;color:#1A1D2E;outline:none;line-height:1.9;resize:vertical;transition:border-color .12s;}
.report-editor:focus{border-color:#4169FF;background:#fff;}
.report-view{background:#fff;border:1px solid #E4E6EF;border-radius:10px;padding:22px;}
.report-text{font-size:14px;line-height:1.9;color:#3A3D58;white-space:pre-wrap;}
.approved-banner{background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.2);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;margin-bottom:16px;font-size:13px;color:#059669;font-weight:500;}

/* Portal */
.portal-page{min-height:100vh;background:#F4F5F7;}
.portal-header{background:#fff;border-bottom:1px solid #E4E6EF;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;}
.portal-body{max-width:820px;margin:0 auto;padding:28px 20px;}
.portal-hero{background:linear-gradient(135deg,#EEF1FF,#F0F4FF);border:1px solid #D0D8F8;border-radius:14px;padding:26px 28px;margin-bottom:24px;}
.portal-name{font-size:22px;font-weight:600;color:#1A1D2E;margin-bottom:4px;}

/* Notifications */
.notif{background:#FFFBEB;border:1px solid #FDE68A;border-radius:9px;padding:12px 16px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start;}
.notif-icon{font-size:16px;flex-shrink:0;margin-top:1px;}
.notif-text{font-size:13px;color:#92400E;line-height:1.5;}
.notif-time{font-size:11px;color:#D97706;margin-top:3px;}

/* Login */
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

.empty{text-align:center;padding:48px 20px;color:#A0A3B1;font-size:14px;}
.ei{font-size:30px;margin-bottom:10px;opacity:.35;}
.divider{height:1px;background:#E4E6EF;margin:20px 0;}
.tag{font-size:11px;font-weight:600;padding:3px 9px;border-radius:5px;}
.ldots{display:flex;gap:3px;align-items:center;}
.ldot{width:5px;height:5px;border-radius:50%;background:#4169FF;animation:ld 1.2s ease-in-out infinite;}
.ldot:nth-child(2){animation-delay:.2s;}.ldot:nth-child(3){animation-delay:.4s;}
@keyframes ld{0%,100%{opacity:.2;transform:scale(.8);}50%{opacity:1;transform:scale(1.1);}}
.done-page{min-height:100vh;background:#F4F5F7;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;}
.done-icon{font-size:48px;}
.done-title{font-size:24px;font-weight:600;color:#1A1D2E;}
.done-sub{font-size:14px;color:#6B6E8E;max-width:340px;text-align:center;line-height:1.7;}
.info-box{background:#EEF1FF;border:1px solid #D0D8F8;border-radius:8px;padding:12px 16px;font-size:13px;color:#3358E0;margin-bottom:16px;}
.warn-box{background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:12px 16px;font-size:13px;color:#D97706;margin-bottom:16px;}
.char-count{font-size:11px;color:#A0A3B1;text-align:right;margin-top:3px;}
`;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const STAGES = ["Diagnóstico","Setup","Processo","Encerramento"];
const SC = ["#4169FF","#8B5CF6","#F59E0B","#10B981"];
const SH_ROLES_360 = ["Sou a pessoa avaliada (autoavaliação)","Sou líder da pessoa","Sou / já fui liderado/a da pessoa (direto ou indireto)","Sou par da pessoa","Sou de outra área ou fora da empresa","Outro"];
const SH_ROLES_MS = ["Sou a pessoa avaliada (autoavaliação)","Sou líder da pessoa / já liderei no passado","Sou / já fui liderado/a da pessoa (direto ou indireto)","Sou / já fui par da pessoa","Sou cliente / fornecedor interno ou externo"];
const SCALE = ["-3","-2","-1","0","+1","+2","+3"];
const SCALE_COLORS = {"−3":"#DC2626","−2":"#EF4444","-3":"#DC2626","-2":"#EF4444","-1":"#F97316","0":"#A0A3B1","+1":"#4169FF","+2":"#10B981","+3":"#059669"};
const FREQ_OPTS = ["Nenhuma","Um pouco (ao menos 1x/mês)","Moderado (2x/mês)","Frequente (acima de 3x/mês)"];
const STATUS = {
  done:{label:"Concluída",dot:"s-done",txt:"s-done-txt"},
  active:{label:"Em andamento",dot:"s-active",txt:"s-active-txt"},
  pending:{label:"Pendência(s)",dot:"s-pending",txt:"s-pending-txt"},
  idle:{label:"Não iniciada",dot:"s-idle",txt:"s-idle-txt"},
};

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INIT_ENGS = [
  {
    id:1,title:"Desenvolvimento de Liderança",
    coachee:{name:"Vagner Moreira",initials:"VM",color:"#4169FF",role:"Diretor de Operações",company:"Dimas Construções",email:"vagner@dimas.com.br"},
    leaders:[{id:1,name:"Roberto Fonseca",email:"roberto@dimas.com.br",initials:"RF"}],
    rh:[{id:1,name:"Carla Mendes",email:"carla.rh@dimas.com.br",initials:"CM"}],
    goal:"Transição de especialista técnico para líder de visão estratégica com maior presença executiva",
    startDate:"2024-10-01",endDate:"2025-04-01",cadence:"quinzenal",totalSessions:10,phase:3,
    competencias:[
      {id:1,nome:"Posicionamento estratégico e presença executiva",detalhe:"Comunicação assertiva, visão de farol alto, presença em reuniões"},
      {id:2,nome:"Delegação e gestão de pessoas",detalhe:"Matriz A/B/C, desenvolvimento de sucessores, autonomia do time"},
    ],
    hasAssessment:true,assessmentType:"DISC",assessmentFile:"DISC_Vagner_Moreira.pdf",
    stakeholders360:[
      {id:1,name:"Valerio Costa",email:"valerio@dimas.com.br",role:"Líder direto",initials:"VC",status:"done",validatedByLeader:true,invalid:false,leaderMsg:"",
       feedback:{tipo:"Sou líder da pessoa",pos1:"Conhecimento técnico elevado",pos1ex:"Adapta linguagem para públicos diferentes com facilidade.",pos2:"Proatividade e agilidade",pos2ex:"Não procrastina quando algo é prioritário.",pos3:"Integridade e ética",pos3ex:"Reconhecido por ser justo nas decisões.",cont1:"Manter comprometimento",cont1ex:"Acompanha indicadores com afinco.",cont2:"Ser referência técnica",cont2ex:"Time recorre a ele para dúvidas complexas.",cont3:"",cont3ex:"",par1:"Posturas defensivas",par1ex:"Reage mal a feedbacks mesmo sem provocação.",par2:"Conclusões rápidas",par2ex:"Toma decisões com informações parciais.",par3:"",par3ex:"",inic1:"Comunicação assertiva",inic1ex:"Praticar posicionamentos mais diretos em reuniões.",inic2:"Delegação estruturada",inic2ex:"Usar matriz A/B/C para delegar tarefas ao time.",inic3:"",inic3ex:"",prior:"Posicionamento estratégico e presença executiva"}},
      {id:2,name:"João Silva",email:"joao@dimas.com.br",role:"Liderado",initials:"JS",status:"done",validatedByLeader:true,invalid:false,leaderMsg:"",
       feedback:{tipo:"Sou / já fui liderado/a da pessoa (direto ou indireto)",pos1:"Determinado",pos1ex:"Cumpre com o que fala.",pos2:"Acessível",pos2ex:"Sempre cordial com a equipe.",pos3:"",pos3ex:"",cont1:"Ser referência técnica",cont1ex:"Time confia no seu julgamento.",cont2:"Manter acessibilidade",cont2ex:"Porta sempre aberta.",cont3:"",cont3ex:"",par1:"Microgerenciamento",par1ex:"Quer dizer como as pessoas devem fazer as coisas.",par2:"Interromper",par2ex:"Corta a fala antes de ouvir o ponto completo.",par3:"",par3ex:"",inic1:"Treinar o time",inic1ex:"Desenvolver sucessores e dar mais autonomia.",inic2:"Delegar com clareza",inic2ex:"Dizer o que e deixar o time decidir o como.",inic3:"",inic3ex:"",prior:"Delegação eficaz"}},
      {id:3,name:"Camila Reis",email:"camila@dimas.com.br",role:"Par",initials:"CR",status:"done",validatedByLeader:true,invalid:false,leaderMsg:"",
       feedback:{tipo:"Sou / já fui par da pessoa",pos1:"Bom relacionamento",pos1ex:"Mantém clima positivo.",pos2:"Proativo",pos2ex:"Age rapidamente quando há prioridade.",pos3:"",pos3ex:"",cont1:"Manter relacionamento",cont1ex:"Colabora bem com os pares.",cont2:"",cont2ex:"",cont3:"",cont3ex:"",par1:"Excesso técnico em apresentações",par1ex:"Perde o fio estratégico.",par2:"",par2ex:"",par3:"",par3ex:"",inic1:"Pensar em impacto financeiro",inic1ex:"Priorizar assuntos pelo retorno em R$.",inic2:"",inic2ex:"",inic3:"",inic3ex:"",prior:"Comunicação estratégica"}},
    ],
    report:{content:`## Relatório de Desenvolvimento de Liderança\n**Coachee:** Vagner Moreira | Diretor de Operações | Dimas Construções\n\n### Síntese do Perfil de Liderança\nVagner é reconhecido como referência técnica de alto valor, com comprometimento genuíno e integridade que constroem confiança em múltiplos níveis da organização. O desafio central está na transição para um perfil mais estratégico — ocupar o espaço executivo com mais presença e assertividade.\n\n### Pontos Fortes Consolidados\n1. **Conhecimento técnico elevado** — referência reconhecida, adapta linguagem para diferentes públicos\n2. **Comprometimento e proatividade** — não procrastina, acompanha indicadores com afinco\n3. **Integridade e relacionamento** — percebido como justo, ético e acessível\n\n### Prioridades de Desenvolvimento\n1. **Posicionamento estratégico** — comunicação mais assertiva e presença executiva\n2. **Delegação estruturada** — matriz A/B/C, treinar sucessores, criar autonomia no time\n3. **Processo de decisão** — ouvir todas as partes antes de concluir\n\n### Plano de Ação\n**Parar de fazer:**\n- Posturas defensivas em reuniões estratégicas\n- Conclusões rápidas com informações parciais\n- Microgerenciamento de tarefas operacionais\n\n**Começar a fazer:**\n- Comunicação assertiva e objetiva em reuniões\n- Delegar usando matriz: A (eu faço), B (delego), C (quando der)\n- Silêncio de 5-10s após a fala do outro antes de responder\n\n### Checklist Diário de Comportamentos\n☐ Antes de responder, ouvi completamente?\n☐ Tomei alguma decisão baseada em dados, não em percepção?\n☐ Deleguei pelo menos uma tarefa que poderia ter feito eu mesmo?\n☐ Fiz pelo menos uma interação proativa com meu time hoje?\n☐ Minha comunicação em reuniões foi objetiva e estratégica?`,approved:true,sharedAt:"2024-11-15"},
    miniSurveys:[{
      id:1,label:"Mini-Survey 1",period:"1° trim 2025",sentAt:"2025-01-15",
      competencias:["Posicionamento estratégico e presença executiva","Delegação e gestão de pessoas"],
      responses:[
        {shId:1,name:"Valerio Costa",role:"Líder direto",scores:[2,1],overall:2,mudancas:"Evolução clara na assertividade.",sugestoes:"Continuar avançando na delegação.",freq:["Moderado (2x/mês)","Moderado (2x/mês)"],objetivos:"Sim"},
        {shId:2,name:"João Silva",role:"Liderado",scores:[1,1],overall:1,mudancas:"Começou a dar mais espaço ao time.",sugestoes:"Manter a agenda regular.",freq:["Um pouco (ao menos 1x/mês)","Um pouco (ao menos 1x/mês)"],objetivos:"Sim"},
        {shId:3,name:"Camila Reis",role:"Par",scores:[1,2],overall:1,mudancas:"Apresentações mais objetivas.",sugestoes:"Delegação em progresso.",freq:["Nenhuma","Nenhuma"],objetivos:"Não"},
        {shId:4,name:"André Lima",role:"Cliente interno",scores:[2,1],overall:2,mudancas:"Mais escuta ativa.",sugestoes:"Agenda propositiva com o time.",freq:["Um pouco (ao menos 1x/mês)","Nenhuma"],objetivos:"Sim"},
      ]
    }],
    stakeholdersMS:[
      {id:1,name:"Valerio Costa",email:"valerio@dimas.com.br",role:"Líder direto",initials:"VC",status:"done",validatedByLeader:true,invalid:false,leaderMsg:""},
      {id:2,name:"João Silva",email:"joao@dimas.com.br",role:"Liderado",initials:"JS",status:"done",validatedByLeader:true,invalid:false,leaderMsg:""},
      {id:3,name:"Camila Reis",email:"camila@dimas.com.br",role:"Par",initials:"CR",status:"done",validatedByLeader:true,invalid:false,leaderMsg:""},
      {id:4,name:"André Lima",email:"andre@dimas.com.br",role:"Cliente interno",initials:"AL",status:"done",validatedByLeader:true,invalid:false,leaderMsg:""},
    ],
    sessions:[
      {num:8,date:"21 Fev 2025",notes:"Revisão do plano de ação. Foco em comunicação assertiva."},
      {num:7,date:"07 Fev 2025",notes:"Delegação via matriz A/B/C."},
    ],
    notifications:[],
  },
  {
    id:2,title:"Desenvolvimento de Liderança",
    coachee:{name:"Gabriel Freire",initials:"GF",color:"#8B5CF6",role:"Gerente Geral",company:"Dimas Construções",email:"gabriel@dimas.com.br"},
    leaders:[{id:1,name:"Roberto Fonseca",email:"roberto@dimas.com.br",initials:"RF"}],
    rh:[{id:1,name:"Carla Mendes",email:"carla.rh@dimas.com.br",initials:"CM"}],
    goal:"Fortalecer colaboração com pares e qualidade do acompanhamento da equipe",
    startDate:"2024-09-01",endDate:"2025-03-01",cadence:"semanal",totalSessions:10,phase:2,
    competencias:[
      {id:1,nome:"Colaboração com pares",detalhe:"Cumprir combinados, alinhamento direto, confiabilidade"},
      {id:2,nome:"Delegação e acompanhamento da equipe",detalhe:"Presença consistente, acompanhar processo e não só resultado"},
    ],
    hasAssessment:false,assessmentType:"",assessmentFile:"",
    stakeholders360:[
      {id:1,name:"Nathan Duarte",email:"nathan@dimas.com.br",role:"Liderado",initials:"ND",status:"done",validatedByLeader:true,invalid:false,leaderMsg:"",
       feedback:{tipo:"Sou / já fui liderado/a da pessoa (direto ou indireto)",pos1:"Comprometimento",pos1ex:"Quer melhorar e tem abertura.",pos2:"Relacionamento",pos2ex:"Boa comunicação interpessoal.",pos3:"",pos3ex:"",cont1:"Abertura para conversa",cont1ex:"Receptivo a feedbacks.",cont2:"",cont2ex:"",cont3:"",cont3ex:"",par1:"Distância do time",par1ex:"Pontos de contato escassos.",par2:"",par2ex:"",par3:"",par3ex:"",inic1:"Mais presença",inic1ex:"Criar agenda regular com liderados.",inic2:"",inic2ex:"",inic3:"",inic3ex:"",prior:"Proximidade e acompanhamento"}},
      {id:2,name:"Tania Nogueira",email:"tania@dimas.com.br",role:"Par",initials:"TN",status:"pending",validatedByLeader:false,invalid:false,leaderMsg:"",feedback:null},
    ],
    report:null,miniSurveys:[],
    stakeholdersMS:[],sessions:[
      {num:4,date:"20 Fev 2025",notes:"Engajamento dos stakeholders. Plano de ações em construção."},
    ],
    notifications:[],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const ini = n => n.split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
function Dots(){ return <div className="ldots"><div className="ldot"/><div className="ldot"/><div className="ldot"/></div>; }
function Overlay({children,onClose}){ return <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>{children}</div>; }

function stageStatus(eng, phase){
  if(phase === 1){
    // No activity at all → idle
    const hasAnyActivity = eng.stakeholders360.length>0 || eng.report || eng.competencias.length>0;
    if(!hasAnyActivity) return 'idle';
    if(eng.report?.approved) return 'done';
    const allDone = eng.stakeholders360.length>0 && eng.stakeholders360.filter(s=>!s.invalid).every(s=>s.status==='done');
    const hasPending = eng.stakeholders360.some(s=>s.status==='pending'&&!s.invalid);
    if(allDone && !eng.report) return 'pending';
    if(hasPending) return 'pending';
    return 'active';
  }
  if(phase === 2){
    const hasAnyActivity = eng.competencias.length>0 && eng.stakeholdersMS.length>0;
    if(!hasAnyActivity) return 'idle';
    if(eng.stakeholdersMS.every(s=>s.validatedByLeader) && eng.competencias.length>0) return 'active';
    return 'active';
  }
  if(phase === 3){
    if(eng.sessions.length===0 && eng.miniSurveys.length===0) return 'idle';
    return eng.miniSurveys.length>0?'active':'active';
  }
  if(phase === 4){
    const lastMS = eng.miniSurveys[eng.miniSurveys.length-1];
    if(!lastMS) return 'idle';
    return lastMS.reportApproved?'done':'active';
  }
  return 'idle';
}

function currentStatus(eng){ return stageStatus(eng, eng.phase); }

function StageBar({eng}){
  return (
    <div className="ec-stages">
      {[1,2,3,4].map(p=>{
        const s=stageStatus(eng,p);
        return <div key={p} className="ec-seg" style={{background:s==='done'?SC[p-1]:s==='active'?SC[p-1]+'88':s==='pending'?'#FDE68A':'#E4E6EF'}}/>;
      })}
    </div>
  );
}

function StatusBadge({status}){
  const s=STATUS[status];
  return <div className="ec-status"><span className={`sdot ${s.dot}`}/><span className={s.txt}>{s.label}</span></div>;
}

// ─── PROGRESS CHART ───────────────────────────────────────────────────────────
function ProgressChart({miniSurveys}){
  if(!miniSurveys||miniSurveys.length===0) return <div className="empty"><div className="ei">◌</div>O progresso será exibido após o primeiro mini-survey.</div>;
  const ms = miniSurveys[miniSurveys.length-1];
  const n = ms.responses.length;
  if(n===0) return <div className="warn-box">Nenhuma resposta coletada ainda.</div>;

  const segColors = {"-3":"#DC2626","-2":"#F87171","-1":"#FCA5A5","0":"#D1D5DB","+1":"#93C5FD","+2":"#3B82F6","+3":"#1D4ED8"};

  const buildDist = (scores) => {
    const dist = {};
    SCALE.forEach(k=>dist[k]=0);
    scores.forEach(v=>{const k=(v>=0?'+':'')+v;if(dist[k]!==undefined)dist[k]++;});
    return dist;
  };

  // Compile qualitative responses — mudancas = "O que melhorou", sugestoes = "Próximos desafios"
  // These are global (not per-competência in the form), so we show once for Efetividade geral row
  const mudancasTexts = ms.responses.map(r=>r.mudancas).filter(Boolean);
  const sugestoesTexts = ms.responses.map(r=>r.sugestoes).filter(Boolean);

  const allRows = [
    ...ms.competencias.map((c,ci)=>({label:c,scores:ms.responses.map(r=>r.scores[ci]||0),isGeral:false,ci})),
    {label:"Efetividade como líder (geral)",scores:ms.responses.map(r=>r.overall||0),isGeral:true},
  ];

  const QualBlock = ({texts,title,color,bg})=>(
    <div style={{background:bg,border:`1px solid ${color}30`,borderRadius:7,padding:'10px 12px',marginBottom:8}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color,marginBottom:6}}>{title}</div>
      {texts.length===0
        ?<div style={{fontSize:12,color:'#A0A3B1'}}>Sem respostas.</div>
        :texts.map((t,i)=><div key={i} style={{fontSize:12,color:'#3A3D58',lineHeight:1.5,marginBottom:i<texts.length-1?5:0}}>— {t}</div>)
      }
    </div>
  );

  return (
    <div>
      <div style={{fontSize:13,color:'#A0A3B1',marginBottom:16}}>{ms.label} · {ms.period||ms.sentAt} · {n} respondente{n!==1?'s':''}</div>

      {/* Quantitative table */}
      <div style={{overflowX:'auto'}}>
        <table className="prog-table">
          <thead>
            <tr>
              <th style={{width:'28%'}}>Temas trabalhados</th>
              <th style={{width:'38%',textAlign:'center'}}>Percepção de evolução (stakeholders)</th>
              <th style={{width:'34%'}}></th>
            </tr>
          </thead>
          <tbody>
            {allRows.map((row,ri)=>{
              const dist = buildDist(row.scores);
              return (
                <tr key={ri}>
                  <td><div className="prog-comp-name" style={{fontWeight:row.isGeral?700:500}}>{row.isGeral?<strong>{row.label}</strong>:row.label}</div></td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:2,marginBottom:4}}>
                      {SCALE.map(k=><span key={k} style={{fontSize:9,color:'#A0A3B1',width:32,textAlign:'center'}}>{k}</span>)}
                    </div>
                    <div className="prog-bar-wrap">
                      {SCALE.map(k=>{
                        const cnt=dist[k]||0;
                        const pct=n>0?Math.round(cnt/n*100):0;
                        if(cnt===0) return <div key={k} style={{width:32,background:'#F4F5F7',borderRight:'1px solid #fff',height:24}}/>;
                        return (
                          <div key={k} className="prog-seg" style={{width:32,background:segColors[k]}}>
                            {pct>0?`${pct}%`:''}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                      {SCALE.filter(k=>(dist[k]||0)>0).map(k=>{
                        const pct=Math.round((dist[k]/n)*100);
                        const nv=parseInt(k);
                        const col=nv>0?'#059669':nv<0?'#DC2626':'#6B6E8E';
                        return <span key={k} style={{fontSize:11,fontWeight:700,color:col,background:nv>0?'rgba(16,185,129,.1)':nv<0?'rgba(220,38,38,.1)':'#F4F5F7',padding:'2px 6px',borderRadius:4}}>{k}: {pct}%</span>;
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Qualitative section */}
      {(mudancasTexts.length>0||sugestoesTexts.length>0)&&(
        <div style={{marginTop:20}}>
          <div className="sec-lbl" style={{marginBottom:14}}>Respostas qualitativas — compilação das percepções</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <div>
              <QualBlock texts={mudancasTexts} title="O que melhorou (stakeholders e autopercepção)" color="#059669" bg="rgba(16,185,129,.04)"/>
            </div>
            <div>
              <QualBlock texts={sugestoesTexts} title="Próximos desafios (stakeholders e autopercepção)" color="#3358E0" bg="rgba(65,105,255,.04)"/>
            </div>
          </div>
        </div>
      )}

      {miniSurveys.length>1&&(
        <div style={{fontSize:12,color:'#A0A3B1',marginTop:12}}>Mostrando o mini-survey mais recente. Total aplicado: {miniSurveys.length}.</div>
      )}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({onLogin}){
  const [role,setRole]=useState('coach');
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [code,setCode]=useState('');
  const [err,setErr]=useState('');

  const ROLES=[
    {id:'coach',name:'Sou Coach',desc:'Acesso completo — gerenciar todos os processos'},
    {id:'coachee',name:'Sou Coachee',desc:'Acompanhar minha jornada e plano de desenvolvimento'},
    {id:'lider',name:'Sou Líder',desc:'Validar listas e acompanhar progresso do meu liderado'},
    {id:'rh',name:'Sou RH',desc:'Visão geral dos processos da empresa'},
    {id:'stk',name:'Sou Stakeholder',desc:'Responder avaliação ou pesquisa de progresso'},
  ];

  const submit=async()=>{
    if(role==='coach'){
      setErr('');
      const{data,error}=await supabase.auth.signInWithPassword({email,password:pass});
      if(error){setErr('E-mail ou senha incorretos.');setTimeout(()=>setErr(''),4000);}
      else{
        const u=data.user;
        const nm=u.user_metadata?.name||u.email;
        onLogin({role:'coach',name:nm,initials:nm.split(' ').slice(0,2).map(w=>w[0].toUpperCase()).join('')});
      }
    } else {
      const c=code.trim().toUpperCase();
      const patterns={coachee:/^CE-(\d+)$/,lider:/^LD-(\d+)-(\d+)$/,rh:/^RH-(.+)$/,stk:/^ST-(\d+)-(\d+)$/};
      const m=c.match(patterns[role]);
      if(!m){setErr('Código inválido.');setTimeout(()=>setErr(''),3000);return;}
      if(role==='coachee') onLogin({role:'coachee',engId:parseInt(m[1])});
      else if(role==='lider') onLogin({role:'lider',engId:parseInt(m[1]),liderId:parseInt(m[2])});
      else if(role==='rh') onLogin({role:'rh',company:m[1]});
      else onLogin({role:'stk',engId:parseInt(m[1]),shId:parseInt(m[2])});
    }
  };

  const hints={coach:'Use o e-mail e senha cadastrados no Supabase',coachee:'CE-1 (Vagner) · CE-2 (Gabriel)',lider:'LD-1-1 · LD-2-1',rh:'RH-dimas',stk:'ST-1-1 · ST-1-2 · ST-1-3'};

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">Lidehra</div>
        <div className="login-tagline">Coach Platform Lidehra</div>
        <div className="role-cards">
          {ROLES.map(r=><div key={r.id} className={`role-card${role===r.id?' sel':''}`} onClick={()=>{setRole(r.id);setErr('');}}>
            <div className="role-name">{r.name}</div><div className="role-desc">{r.desc}</div>
          </div>)}
        </div>
        {role==='coach'?<>
          <input className="login-inp" type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
          <input className="login-inp" type="password" placeholder="Senha" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
        </>:<input className="login-inp" placeholder={`Código (ex: ${hints[role]?.split('·')[0]?.trim()})`} value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>}
        <button className="login-btn" onClick={submit}>Entrar</button>
        {err&&<div className="login-err">{err}</div>}
        <div className="login-hint">{hints[role]}</div>
      </div>
    </div>
  );
}

// ─── COMPETENCIAS EDITOR ─────────────────────────────────────────────────────
function CompEditor({competencias,onChange}){
  const [showAdd,setShowAdd]=useState(false);
  const [nome,setNome]=useState('');
  const [detalhe,setDetalhe]=useState('');
  const [editId,setEditId]=useState(null);

  const save=()=>{
    if(!nome.trim())return;
    if(editId!==null){
      onChange(competencias.map(c=>c.id===editId?{...c,nome:nome.slice(0,40),detalhe:detalhe.slice(0,80)}:c));
      setEditId(null);
    } else {
      onChange([...competencias,{id:Date.now(),nome:nome.slice(0,40),detalhe:detalhe.slice(0,80)}]);
    }
    setNome('');setDetalhe('');setShowAdd(false);
  };

  const startEdit=(c)=>{setNome(c.nome);setDetalhe(c.detalhe);setEditId(c.id);setShowAdd(true);};
  const remove=(id)=>onChange(competencias.filter(c=>c.id!==id));

  return (
    <div className="comp-editor">
      <div className="sec" style={{marginBottom:12}}>
        <span className="sec-lbl">Competências em desenvolvimento ({competencias.length})</span>
        {competencias.length<3&&<button className="btn btn-p btn-sm" onClick={()=>{setShowAdd(true);setEditId(null);setNome('');setDetalhe('');}}>+ Adicionar</button>}
      </div>
      {competencias.length===0&&<div style={{fontSize:13,color:'#A0A3B1',marginBottom:8}}>Nenhuma competência definida. Adicione ao menos uma para avançar.</div>}
      {competencias.map((c,i)=>(
        <div key={c.id} className="comp-item">
          <div className="comp-num">Competência {i+1}</div>
          <div className="comp-name">{c.nome}</div>
          {c.detalhe&&<div className="comp-detail">{c.detalhe}</div>}
          <div style={{display:'flex',gap:6,marginTop:8}}>
            <button className="btn btn-g btn-xs" onClick={()=>startEdit(c)}>Editar</button>
            <button className="btn btn-d btn-xs" onClick={()=>remove(c.id)}>Remover</button>
          </div>
        </div>
      ))}
      {showAdd&&(
        <div style={{background:'#fff',border:'1px solid #BCC4F0',borderRadius:9,padding:16,marginTop:8}}>
          <div className="field">
            <div className="flbl">Nome da competência<span className="flbl-hint">(máx. 40 caracteres — aparece no formulário)</span></div>
            <input className="finp" maxLength={40} placeholder="Ex: Comunicação estratégica" value={nome} onChange={e=>setNome(e.target.value)}/>
            <div className="char-count">{nome.length}/40</div>
          </div>
          <div className="field">
            <div className="flbl">Mais informações<span className="flbl-hint">(máx. 80 caracteres)</span></div>
            <input className="finp" maxLength={80} placeholder="Ex: Assertividade, presença executiva, visão de farol alto" value={detalhe} onChange={e=>setDetalhe(e.target.value)}/>
            <div className="char-count">{detalhe.length}/80</div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-g btn-sm" onClick={()=>{setShowAdd(false);setEditId(null);}}>Cancelar</button>
            <button className="btn btn-p btn-sm" onClick={save} disabled={!nome.trim()}>Salvar</button>
          </div>
        </div>
      )}
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
    onSave({id:Date.now(),title:"Desenvolvimento de Liderança",
      coachee:{name:f.name,initials:ini(f.name),color,role:f.role,company:f.company,email:f.email},
      leaders:[],rh:[],goal:f.goal,startDate:f.start,endDate:f.end,cadence:f.cadence,totalSessions:10,phase:1,
      competencias:[],hasAssessment:f.assessment,assessmentType:f.assessmentType,assessmentFile:'',
      stakeholders360:[],report:null,miniSurveys:[],stakeholdersMS:[],sessions:[],notifications:[],
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
            <option value="semanal">Semanal</option><option value="quinzenal">Quinzenal</option>
          </select>
        </div>
        <label className="fcheck" style={{marginBottom:10}}><input type="checkbox" checked={f.assessment} onChange={e=>set('assessment',e.target.checked)}/> Incluir assessment de perfil</label>
        {f.assessment&&<div className="field" style={{marginTop:8}}><div className="flbl">Tipo</div>
          <select className="fsel" value={f.assessmentType} onChange={e=>set('assessmentType',e.target.value)}>
            <option value="">Selecione...</option>
            <option value="DISC / Thomas PPA">DISC / Thomas PPA</option>
            <option value="Gallup CliftonStrengths">Gallup CliftonStrengths</option>
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
function AddShModal({tipo,currentCount,onSave,onClose}){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [role,setRole]=useState(tipo==='360'?SH_ROLES_360[2]:SH_ROLES_MS[2]);
  const roles=tipo==='360'?SH_ROLES_360:SH_ROLES_MS;
  const atLimit=currentCount>=15;
  const save=()=>{
    if(!name.trim()||atLimit)return;
    onSave({id:Date.now(),name:name.trim(),email:email.trim(),role,initials:ini(name),status:'pending',validatedByLeader:false,invalid:false,leaderMsg:'',feedback:null});
  };
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-sm">
        <div className="modal-title">Novo Stakeholder</div>
        <div className="modal-sub">{tipo==='360'?'Avaliação 360°':'Mini-survey'} · {currentCount}/15 cadastrados</div>
        {atLimit?<div className="warn-box">Limite de 15 stakeholders atingido.</div>:<>
          <div className="field"><div className="flbl">Nome completo</div><input className="finp" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)}/></div>
          <div className="field"><div className="flbl">E-mail</div><input className="finp" type="email" placeholder="email@empresa.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div className="field"><div className="flbl">Tipo de relacionamento</div>
            <select className="fsel" value={role} onChange={e=>setRole(e.target.value)}>
              {roles.map(r=><option key={r}>{r}</option>)}
            </select>
          </div>
        </>}
        <div className="modal-foot">
          <button className="btn btn-g" onClick={onClose}>{atLimit?'Fechar':'Cancelar'}</button>
          {!atLimit&&<button className="btn btn-p" onClick={save} disabled={!name.trim()}>Adicionar</button>}
        </div>
      </div>
    </Overlay>
  );
}

// ─── INVALIDATE MODAL (LEADER) ────────────────────────────────────────────────
function InvalidateModal({sh,onConfirm,onClose}){
  const [msg,setMsg]=useState('');
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-sm">
        <div className="modal-title">Invalidar stakeholder</div>
        <div className="modal-sub">Envie uma mensagem ao coachee explicando a solicitação.</div>
        <div style={{background:'#FEF2F2',border:'1px solid #FCD4D4',borderRadius:8,padding:'10px 14px',marginBottom:16,fontSize:13,color:'#DC2626'}}>
          Stakeholder: <strong>{sh.name}</strong> ({sh.role})
        </div>
        <div className="field">
          <div className="flbl">Mensagem para o coachee</div>
          <textarea className="finp" rows={3} placeholder="Ex: Sugiro substituir por alguém com mais interação recente..." value={msg} onChange={e=>setMsg(e.target.value)}/>
        </div>
        <div className="modal-foot">
          <button className="btn btn-g" onClick={onClose}>Cancelar</button>
          <button className="btn btn-d" onClick={()=>onConfirm(msg)} disabled={!msg.trim()}>Invalidar e notificar</button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── SUGGEST MODAL (LEADER) ───────────────────────────────────────────────────
function SuggestModal({onConfirm,onClose}){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [role,setRole]=useState(SH_ROLES_360[2]);
  const [msg,setMsg]=useState('');
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-sm">
        <div className="modal-title">Sugerir novo nome</div>
        <div className="modal-sub">O coachee receberá a sugestão como notificação.</div>
        <div className="field"><div className="flbl">Nome</div><input className="finp" placeholder="Nome completo" value={name} onChange={e=>setName(e.target.value)}/></div>
        <div className="field"><div className="flbl">E-mail</div><input className="finp" type="email" placeholder="email@empresa.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <div className="field"><div className="flbl">Tipo de relacionamento</div>
          <select className="fsel" value={role} onChange={e=>setRole(e.target.value)}>
            {SH_ROLES_360.map(r=><option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="field"><div className="flbl">Motivo da sugestão</div>
          <textarea className="finp" rows={2} placeholder="Por que esta pessoa seria relevante?" value={msg} onChange={e=>setMsg(e.target.value)}/>
        </div>
        <div className="modal-foot">
          <button className="btn btn-g" onClick={onClose}>Cancelar</button>
          <button className="btn btn-p" onClick={()=>onConfirm({name,email,role,msg})} disabled={!name.trim()}>Enviar sugestão</button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── VIEW FEEDBACK MODAL ──────────────────────────────────────────────────────
function ViewFeedbackModal({sh,onClose}){
  const f=sh.feedback;
  if(!f)return null;
  const secs=[
    {label:"Pontos positivos",items:[[f.pos1,f.pos1ex],[f.pos2,f.pos2ex],[f.pos3,f.pos3ex]]},
    {label:"Continuar fazendo",items:[[f.cont1,f.cont1ex],[f.cont2,f.cont2ex],[f.cont3,f.cont3ex]]},
    {label:"Parar de fazer",items:[[f.par1,f.par1ex],[f.par2,f.par2ex],[f.par3,f.par3ex]]},
    {label:"Começar a fazer",items:[[f.inic1,f.inic1ex],[f.inic2,f.inic2ex],[f.inic3,f.inic3ex]]},
  ];
  return (
    <Overlay onClose={onClose}>
      <div className="modal modal-lg">
        <div className="modal-title">{sh.name}</div>
        <div className="modal-sub">{sh.role} · {f.tipo}</div>
        {secs.map(sec=>(
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

// ─── COACH DASHBOARD ──────────────────────────────────────────────────────────
function Dashboard({engs,onSelect,onCreate,onOpenCoachee}){
  const [showNew,setShowNew]=useState(false);
  return (
    <>
      {showNew&&<NewEngModal onSave={e=>{onCreate(e);setShowNew(false);}} onClose={()=>setShowNew(false)}/>}
      <div className="stats">
        <div className="stat"><div className="stat-lbl">Processos Ativos</div><div className="stat-val" style={{color:'#4169FF'}}>{engs.length}</div><div className="stat-sub">em andamento</div></div>
        <div className="stat"><div className="stat-lbl">Sessões Registradas</div><div className="stat-val">{engs.reduce((s,e)=>s+e.sessions.length,0)}</div><div className="stat-sub">histórico total</div></div>
        <div className="stat"><div className="stat-lbl">Com Pendências</div><div className="stat-val" style={{color:'#D97706'}}>{engs.filter(e=>currentStatus(e)==='pending').length}</div><div className="stat-sub">requerem atenção</div></div>
        <div className="stat"><div className="stat-lbl">Mini-Surveys</div><div className="stat-val" style={{color:'#10B981'}}>{engs.reduce((s,e)=>s+e.miniSurveys.length,0)}</div><div className="stat-sub">aplicados</div></div>
      </div>
      <div className="sec"><span className="sec-lbl">Processos ({engs.length})</span><button className="btn btn-p" onClick={()=>setShowNew(true)}>+ Novo Processo</button></div>
      <div className="grid">
        {engs.map(e=>(
          <div key={e.id} className="eng-card" onClick={()=>onSelect(e.id)}>
            <div className="ec-top">
              <div className="ec-av" style={{background:e.coachee.color+'18',border:`1px solid ${e.coachee.color}35`}}>
                <span style={{color:e.coachee.color}}>{e.coachee.initials}</span>
              </div>
              <div style={{flex:1}}>
                <div className="ec-name">{e.coachee.name}</div>
                <div className="ec-role">{e.coachee.role} · {e.coachee.company}</div>
              </div>
              <button className="btn btn-g btn-xs" style={{flexShrink:0}} onClick={ev=>{ev.stopPropagation();onOpenCoachee(e.id);}}>Portal coachee ↗</button>
            </div>
            <StageBar eng={e}/>
            {e.competencias.length>0&&<div className="ec-comps">{e.competencias.map((c,i)=><span key={i} className="ec-comp">{c.nome}</span>)}</div>}
            <div className="ec-meta"><StatusBadge status={currentStatus(e)}/><span className="ec-info">{STAGES[e.phase-1]} · {e.cadence}</span></div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── ROADMAP TAB ──────────────────────────────────────────────────────────────
function RoadmapTab({eng,onUpdate}){
  const [selStage,setSelStage]=useState(eng.phase-1);
  const [showEditProfile,setShowEditProfile]=useState(false);
  const [profileDraft,setProfileDraft]=useState({});
  const stages=[
    {id:'diagnostico',label:'Diagnóstico',phase:1,actions:[
      {id:'onboarding',label:'Onboarding do coachee',who:'coach',status:eng.phase>=1?'done':'idle'},
      {id:'cronograma',label:'Cronograma gerado',who:'app',status:eng.phase>=1?'done':'idle'},
      {id:'assessment',label:`Assessment de perfil${eng.hasAssessment?' ('+eng.assessmentType+')':' (não aplicável)'}`,who:'coach',status:eng.hasAssessment&&eng.assessmentFile?'done':eng.hasAssessment?'pending':'done'},
      {id:'lista360',label:'Coachee cadastra stakeholders 360°',who:'coachee',status:eng.stakeholders360.length>0?'done':'pending'},
      {id:'valida360',label:'Líder(es) validam a lista 360°',who:'lider',status:eng.stakeholders360.every(s=>s.validatedByLeader)?'done':'pending'},
      {id:'envia360',label:'Formulário 360° enviado',who:'app',status:eng.stakeholders360.length>0?'active':'idle'},
      {id:'coleta360',label:'Stakeholders respondem 360°',who:'stk',status:eng.stakeholders360.filter(s=>s.status==='done').length>0?'active':'idle'},
      {id:'relatorio360',label:'Coach aprova relatório 360°',who:'coach',status:eng.report?.approved?'done':eng.report?'pending':'idle'},
      {id:'devolutiva',label:'Devolutiva do relatório ao coachee',who:'coach',status:eng.report?.approved?'active':'idle'},
    ]},
    {id:'setup',label:'Setup',phase:2,actions:[
      {id:'competencias',label:'Competências prioritárias definidas',who:'coachee',status:eng.competencias.length>0?'done':'pending'},
      {id:'listams',label:'Coachee cadastra stakeholders mini-survey',who:'coachee',status:eng.stakeholdersMS.length>0?'done':'pending'},
      {id:'validams',label:'Líder(es) validam lista mini-survey',who:'lider',status:eng.stakeholdersMS.every(s=>s.validatedByLeader)?'done':'pending'},
      {id:'alinhamento',label:'Alinhamento com liderança',who:'coach',status:eng.phase>=2?'done':'idle'},
      {id:'planoacao',label:'Plano de ação elaborado',who:'coachee',status:eng.phase>=2?'done':'idle'},
      {id:'engajamento',label:'Reunião de engajamento com stakeholders',who:'coachee',status:eng.phase>=2?'done':'idle'},
    ]},
    {id:'processo',label:'Processo',phase:3,actions:[
      {id:'sessoes1a5',label:'Sessões 1 a 5 + reuniões mensais',who:'coach',status:eng.phase>=3?'active':'idle'},
      {id:'minisurvey1',label:'Mini-survey de meio de processo',who:'coach',status:eng.miniSurveys.length>0?'done':'idle'},
      {id:'sessoes6a10',label:'Sessões 6 a 10 + reuniões mensais',who:'coach',status:eng.phase>=3?'active':'idle'},
    ]},
    {id:'encerramento',label:'Encerramento',phase:4,actions:[
      {id:'msf',label:'Mini-survey final enviado',who:'coach',status:'idle'},
      {id:'resultado',label:'Coach compila e apresenta resultado',who:'coach',status:'idle'},
      {id:'apresentacao',label:'Coachee apresenta síntese ao líder',who:'coachee',status:'idle'},
      {id:'depoimentos',label:'Líder(es) e RH registram depoimentos',who:'lider',status:'idle'},
    ]},
  ];
  const whoLabel={coach:'Coach',app:'App',coachee:'Coachee',lider:'Líder',stk:'Stakeholder'};
  const sel=stages[selStage];

  return (
    <div style={{marginTop:20}}>
      {showEditProfile&&(
        <Overlay onClose={()=>setShowEditProfile(false)}>
          <div className="modal">
            <div className="modal-title">Editar Perfil do Cliente</div>
            <div className="modal-sub">Atualize as informações do coachee e do processo</div>
            <div className="frow">
              <div className="field"><div className="flbl">Nome</div><input className="finp" value={profileDraft.name} onChange={e=>setProfileDraft(p=>({...p,name:e.target.value}))}/></div>
              <div className="field"><div className="flbl">E-mail</div><input className="finp" type="email" value={profileDraft.email} onChange={e=>setProfileDraft(p=>({...p,email:e.target.value}))}/></div>
            </div>
            <div className="frow">
              <div className="field"><div className="flbl">Cargo</div><input className="finp" value={profileDraft.role} onChange={e=>setProfileDraft(p=>({...p,role:e.target.value}))}/></div>
              <div className="field"><div className="flbl">Empresa</div><input className="finp" value={profileDraft.company} onChange={e=>setProfileDraft(p=>({...p,company:e.target.value}))}/></div>
            </div>
            <div className="field"><div className="flbl">Objetivo do processo</div><textarea className="finp" rows={2} value={profileDraft.goal} onChange={e=>setProfileDraft(p=>({...p,goal:e.target.value}))}/></div>
            <div className="frow">
              <div className="field"><div className="flbl">Início</div><input className="finp" type="date" value={profileDraft.startDate} onChange={e=>setProfileDraft(p=>({...p,startDate:e.target.value}))}/></div>
              <div className="field"><div className="flbl">Encerramento (previsto)</div><input className="finp" type="date" value={profileDraft.endDate} onChange={e=>setProfileDraft(p=>({...p,endDate:e.target.value}))}/></div>
            </div>
            <div className="field"><div className="flbl">Cadência</div>
              <select className="fsel" value={profileDraft.cadence} onChange={e=>setProfileDraft(p=>({...p,cadence:e.target.value}))}>
                <option value="semanal">Semanal</option><option value="quinzenal">Quinzenal</option>
              </select>
            </div>
            <div className="modal-foot">
              <button className="btn btn-g" onClick={()=>setShowEditProfile(false)}>Cancelar</button>
              <button className="btn btn-p" onClick={()=>{
                onUpdate({coachee:{...eng.coachee,name:profileDraft.name,email:profileDraft.email,role:profileDraft.role,company:profileDraft.company,initials:ini(profileDraft.name)},goal:profileDraft.goal,startDate:profileDraft.startDate,endDate:profileDraft.endDate,cadence:profileDraft.cadence});
                setShowEditProfile(false);
              }}>Salvar</button>
            </div>
          </div>
        </Overlay>
      )}
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:10}}>
        <button className="btn btn-g btn-sm" onClick={()=>{setProfileDraft({name:eng.coachee.name,email:eng.coachee.email||'',role:eng.coachee.role,company:eng.coachee.company,goal:eng.goal,startDate:eng.startDate,endDate:eng.endDate,cadence:eng.cadence});setShowEditProfile(true);}}>Editar perfil do cliente</button>
      </div>
      <div className="igrid">
        {[{l:'Início',v:eng.startDate},{l:'Encerramento (previsto)',v:eng.endDate},{l:'Cadência',v:eng.cadence},
          {l:'Assessment',v:eng.hasAssessment?eng.assessmentType:'Não aplicável'},
          {l:'Competências',v:eng.competencias.length>0?eng.competencias.length+' definida(s)':'A definir'},
          {l:'Mini-surveys',v:eng.miniSurveys.length+' aplicado(s)'}
        ].map(it=><div key={it.l} className="icard"><div className="ilbl">{it.l}</div><div className="ival">{it.v}</div></div>)}
      <div style={{background:'#F9FAFB',border:'1px dashed #D8DAE8',borderRadius:9,padding:'12px 16px',marginBottom:12,display:'flex',alignItems:'center',gap:10}}>
        <span style={{fontSize:13,color:'#A0A3B1'}}>📅 Cronograma automático do processo</span>
        <span style={{fontSize:11,fontWeight:600,color:'#BCC4F0',background:'#EEF1FF',padding:'3px 8px',borderRadius:4,marginLeft:'auto'}}>Em breve</span>
      </div>
      </div>

      {eng.hasAssessment&&(
        <div style={{background:'#fff',border:'1px solid #E4E6EF',borderRadius:9,padding:'12px 16px',marginBottom:16,display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:13,color:'#6B6E8E'}}>Assessment: <strong style={{color:'#1A1D2E'}}>{eng.assessmentType}</strong></span>
          {eng.assessmentFile
            ?<div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:12,color:'#059669'}}>✓ {eng.assessmentFile}</span>
                <span style={{fontSize:11,color:'#C8CAD6',padding:'3px 8px',border:'1px dashed #D8DAE8',borderRadius:4}}>Armazenamento — em breve</span>
              </div>
            :<div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8}}>
                <label style={{cursor:'pointer'}}><input type="file" style={{display:'none'}} onChange={e=>onUpdate({assessmentFile:e.target.files[0]?.name||''})}/><span className="btn btn-g btn-sm">Registrar nome do arquivo</span></label>
                <span style={{fontSize:11,color:'#C8CAD6',padding:'3px 8px',border:'1px dashed #D8DAE8',borderRadius:4}}>Upload real — em breve</span>
              </div>
          }
        </div>
      )}

      <CompEditor competencias={eng.competencias} onChange={comps=>onUpdate({competencias:comps})}/>

      <div className="sec-lbl" style={{marginBottom:12}}>Mapa da Jornada</div>
      <div className="roadmap">
        {stages.map((s,i)=>{
          const ss=stageStatus(eng,s.phase);
          return (
            <div key={s.id} className={`rm-box${selStage===i?' rm-active':''}`} onClick={()=>setSelStage(i)}>
              <div className="rm-num">Etapa {s.phase}</div>
              <div className="rm-title" style={{color:SC[s.phase-1]}}>{s.label}</div>
              <div className="rm-status"><span className={`sdot ${STATUS[ss].dot}`}/><span className={STATUS[ss].txt} style={{fontSize:11}}>{STATUS[ss].label}</span></div>
              <ul className="rm-items">
                {s.actions.slice(0,3).map((a,ai)=>(
                  <li key={ai} className="rm-li">
                    <span className="rm-idot" style={{background:a.status==='done'?'#10B981':a.status==='pending'?'#F59E0B':a.status==='active'?'#4169FF':'#D8DAE8'}}/>
                    <span>{a.label}</span>
                  </li>
                ))}
                {s.actions.length>3&&<li className="rm-li" style={{color:'#C8CAD6'}}>+{s.actions.length-3} mais...</li>}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="stage-panel">
        <div style={{fontSize:16,fontWeight:600,color:'#1A1D2E',marginBottom:4}}>{sel.phase}. {sel.label}</div>
        <div style={{fontSize:13,color:'#6B6E8E',marginBottom:16}}>Ações e responsáveis</div>
        <div className="action-list">
          {sel.actions.map(a=>(
            <div key={a.id} className={`action-item ${a.status==='pending'?'ai-pending':a.status==='done'?'ai-done':''}`}>
              <div className="ai-icon" style={{background:a.status==='done'?'rgba(16,185,129,.1)':a.status==='pending'?'rgba(245,158,11,.1)':a.status==='active'?'rgba(65,105,255,.1)':'#F4F5F7'}}>
                {a.status==='done'?'✓':a.status==='pending'?'⏳':a.status==='active'?'→':'○'}
              </div>
              <div className="ai-label"><div className="ai-title">{a.label}</div><div className="ai-meta">Responsável: {whoLabel[a.who]}</div></div>
              <span className={`ai-badge ${a.status==='done'?'ai-b-done':a.status==='pending'?'ai-b-pending':a.status==='active'?'ai-b-active':'ai-b-todo'}`}>
                {a.status==='done'?'Concluído':a.status==='pending'?'Pendente':a.status==='active'?'Em andamento':'A fazer'}
              </span>
            </div>
          ))}
        </div>
        {selStage===0&&(
          <div className="code-box">
            <div className="code-title">Códigos de acesso — compartilhe com cada pessoa</div>
            <div className="code-row"><span className="code-lbl">Coachee ({eng.coachee.name})</span><span className="code-val">CE-{eng.id}</span></div>
            {eng.leaders.map(l=><div key={l.id} className="code-row"><span className="code-lbl">{l.name} (Líder)</span><span className="code-val">LD-{eng.id}-{l.id}</span></div>)}
            {eng.stakeholders360.map(s=><div key={s.id} className="code-row"><span className="code-lbl">{s.name} (Stk 360°)</span><span className="code-val">ST-{eng.id}-{s.id}</span></div>)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EXCEL EXPORT ────────────────────────────────────────────────────────────
function exportMiniSurveyExcel(ms, eng) {
  const SCALE = ['-3','-2','-1','0','+1','+2','+3'];
  const rows = [];
  // Header
  rows.push(['Respondente','Tipo de Interação','Objetivos Compartilhados',
    ...ms.competencias.flatMap(c=>[`Frequência: ${c}`, `Score: ${c}`]),
    'Efetividade Geral','O que melhorou','Sugestões'
  ]);
  // Data rows
  ms.responses.forEach(r => {
    rows.push([
      r.name, r.role, r.objetivos||'',
      ...ms.competencias.flatMap((c,ci)=>[r.freq?.[ci]||'', r.scores[ci]??'']),
      r.overall??'', r.mudancas||'', r.sugestoes||''
    ]);
  });
  // Build CSV
  const csv = rows.map(row =>
    row.map(cell => '"'+String(cell).replace(/"/g,'""')+'"').join(',')
  ).join('\n');
  const bom = '\uFEFF';
  const blob = new Blob([bom+csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${eng.coachee.name} - ${ms.label}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── TAB STAKEHOLDERS (360° + Mini-Survey) ────────────────────────────────────
function TabStakeholders({eng,onUpdate}){
  const [section,setSection]=useState('360');
  const [showAdd360,setShowAdd360]=useState(false);
  const [showAddMS,setShowAddMS]=useState(false);
  const [viewSh,setViewSh]=useState(null);
  const [loading,setLoading]=useState(false);

  const done360=eng.stakeholders360.filter(s=>s.status==='done'&&s.feedback);

  const generateReport=async()=>{
    if(!done360.length)return;
    setLoading(true);
    const feedbacks=done360.map(s=>{
      const f=s.feedback;
      return `--- ${s.name} (${s.role}) ---
Pontos positivos: ${[f.pos1&&`${f.pos1} (ex: ${f.pos1ex})`,f.pos2&&`${f.pos2} (ex: ${f.pos2ex})`,f.pos3&&`${f.pos3} (ex: ${f.pos3ex})`].filter(Boolean).join('; ')}
Continuar: ${[f.cont1&&`${f.cont1} (ex: ${f.cont1ex})`,f.cont2&&`${f.cont2} (ex: ${f.cont2ex})`].filter(Boolean).join('; ')}
Parar: ${[f.par1&&`${f.par1} (ex: ${f.par1ex})`,f.par2&&`${f.par2} (ex: ${f.par2ex})`].filter(Boolean).join('; ')}
Começar: ${[f.inic1&&`${f.inic1} (ex: ${f.inic1ex})`,f.inic2&&`${f.inic2} (ex: ${f.inic2ex})`].filter(Boolean).join('; ')}
Prioridade: ${f.prior}`;
    }).join('\n\n');
    const prompt=`Especialista em coaching executivo MGSCC. Gere relatório de desenvolvimento em português brasileiro.
COACHEE: ${eng.coachee.name} | ${eng.coachee.role} | ${eng.coachee.company}
OBJETIVO: ${eng.goal}
COMPETÊNCIAS: ${eng.competencias.map(c=>c.nome).join(' / ')||'a definir'}
FEEDBACKS (${done360.length} respondentes):
${feedbacks}
ESTRUTURA (use ## para seções):
## Síntese do Perfil de Liderança
(2 parágrafos)
## Pontos Fortes Consolidados
(top 3, numerados, com evidências)
## Prioridades de Desenvolvimento
(top 3, numeradas)
## Plano de Ação
**Parar de fazer:**
**Começar a fazer:**
## Checklist Diário de Comportamentos
(5-7 itens com ☐)
Tom: profissional, orientado ao desenvolvimento.`;
    try{
      const res=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,max_tokens:1500})});
      const data=await res.json();
      if(data.error) throw new Error(data.error);
      const text=data.content?.[0]?.text;
      if(!text) throw new Error('Resposta vazia');
      onUpdate({report:{...eng.report,content:text,approved:false,sharedAt:null}});
      alert('Relatório 360° gerado! Acesse a aba Relatórios para revisar e aprovar.');
    }catch(e){alert("Erro ao gerar: "+e.message);}
    setLoading(false);
  };

  const createMiniSurvey=()=>{
    if(!eng.competencias.length){alert('Defina as competências na aba Jornada primeiro.');return;}
    const ms={id:Date.now(),label:`Mini-Survey ${eng.miniSurveys.length+1}`,period:'',sentAt:new Date().toISOString().split('T')[0],competencias:eng.competencias.map(c=>c.nome),responses:[],reportContent:'',reportApproved:false,reportFile:''};
    onUpdate({miniSurveys:[...eng.miniSurveys,ms]});
  };

  return (
    <div style={{marginTop:20}}>
      {showAdd360&&<AddShModal tipo="360" currentCount={eng.stakeholders360.length} onSave={sh=>{onUpdate({stakeholders360:[...eng.stakeholders360,sh]});setShowAdd360(false);}} onClose={()=>setShowAdd360(false)}/>}
      {showAddMS&&<AddShModal tipo="ms" currentCount={eng.stakeholdersMS.length} onSave={sh=>{onUpdate({stakeholdersMS:[...eng.stakeholdersMS,sh]});setShowAddMS(false);}} onClose={()=>setShowAddMS(false)}/>}
      {viewSh&&<ViewFeedbackModal sh={viewSh} onClose={()=>setViewSh(null)}/>}

      {/* Section switcher */}
      <div style={{display:'flex',gap:3,background:'#F4F5F7',borderRadius:9,padding:3,marginBottom:20,width:'fit-content'}}>
        {[{id:'360',l:'Avaliação 360°'},{id:'ms',l:'Mini-Surveys'}].map(s=>(
          <button key={s.id} className={`btn btn-sm ${section===s.id?'btn-p':'btn-g'}`} style={{border:'none'}} onClick={()=>setSection(s.id)}>{s.l}</button>
        ))}
      </div>

      {section==='360'&&(
        <>
          <div className="sec">
            <span className="sec-lbl">Stakeholders 360° ({eng.stakeholders360.filter(s=>s.status==='done').length}/{eng.stakeholders360.length} responderam)</span>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-g btn-sm" onClick={()=>alert('Envio por e-mail em breve. Compartilhe o código ST-{eng}-{id} manualmente.')}>Enviar formulário</button>
              <button className="btn btn-p btn-sm" onClick={()=>setShowAdd360(true)}>+ Adicionar</button>
            </div>
          </div>
          {eng.stakeholders360.length===0&&<div className="empty"><div className="ei">◌</div>Nenhum stakeholder cadastrado.</div>}
          <div className="sh-list" style={{marginBottom:16}}>
            {eng.stakeholders360.map(s=>(
              <div key={s.id} className={`sh-item ${s.invalid?'sh-invalid':''}`}>
                <div className="sh-av">{s.initials}</div>
                <div style={{flex:1}}>
                  <div className="sh-name" style={{textDecoration:s.invalid?'line-through':''}}>{s.name}</div>
                  <div className="sh-role">{s.role}{s.email?` · ${s.email}`:''}</div>
                  {s.invalid&&<div style={{fontSize:11,color:'#DC2626',marginTop:2}}>Invalidado: {s.leaderMsg}</div>}
                </div>
                <span className={`badge ${s.invalid?'b-invalid':s.status==='done'?'b-done':'b-pend'}`} style={{marginRight:8}}>
                  {s.invalid?'Invalidado':s.status==='done'?'Respondido':'Pendente'}
                </span>
                {s.status==='done'&&s.feedback&&<button className="btn btn-g btn-xs" style={{marginRight:6}} onClick={()=>setViewSh(s)}>Ver</button>}
                <button className="btn btn-d btn-xs" onClick={()=>onUpdate({stakeholders360:eng.stakeholders360.filter(x=>x.id!==s.id)})}>×</button>
              </div>
            ))}
          </div>
          {done360.length>0&&(
            <div style={{background:'#F9FAFB',border:'1px solid #E4E6EF',borderRadius:9,padding:'14px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{fontSize:13,color:'#6B6E8E'}}>{done360.length} resposta{done360.length!==1?'s':''} coletada{done360.length!==1?'s':''} — pronto para gerar relatório</div>
              <button className="btn btn-p btn-sm" onClick={generateReport} disabled={loading}>{loading?<Dots/>:'✦ Gerar Relatório 360°'}</button>
            </div>
          )}
          {eng.stakeholders360.length>0&&(
            <div className="code-box" style={{marginTop:12}}>
              <div className="code-title">Códigos de acesso — compartilhe com cada stakeholder</div>
              {eng.stakeholders360.map(s=><div key={s.id} className="code-row"><span className="code-lbl">{s.name} ({s.role})</span><span className="code-val">ST-{eng.id}-{s.id}</span></div>)}
            </div>
          )}
        </>
      )}

      {section==='ms'&&(
        <>
          <div className="sec">
            <span className="sec-lbl">Stakeholders Mini-Survey ({eng.stakeholdersMS.length}/15)</span>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-g btn-sm" onClick={()=>alert('Envio por e-mail em breve. Compartilhe os códigos ST- manualmente.')}>Enviar formulário</button>
              <button className="btn btn-p btn-sm" onClick={()=>setShowAddMS(true)}>+ Adicionar</button>
            </div>
          </div>
          {eng.stakeholdersMS.length===0&&<div className="empty"><div className="ei">◌</div>Nenhum stakeholder de mini-survey cadastrado.</div>}
          <div className="sh-list" style={{marginBottom:16}}>
            {eng.stakeholdersMS.map(s=>(
              <div key={s.id} className="sh-item">
                <div className="sh-av">{s.initials}</div>
                <div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}</div></div>
                <span className={`badge ${s.status==='done'?'b-done':'b-pend'}`}>{s.status==='done'?'Respondido':'Pendente'}</span>
              </div>
            ))}
          </div>
          {eng.stakeholdersMS.length>0&&(
            <div className="code-box" style={{marginBottom:16}}>
              <div className="code-title">Códigos de acesso — stakeholders mini-survey</div>
              {eng.stakeholdersMS.map(s=><div key={s.id} className="code-row"><span className="code-lbl">{s.name}</span><span className="code-val">ST-{eng.id}-{s.id}</span></div>)}
            </div>
          )}
          <div className="divider"/>
          <div className="sec">
            <span className="sec-lbl">Mini-Surveys criados ({eng.miniSurveys.length})</span>
            <button className="btn btn-p btn-sm" onClick={createMiniSurvey}>+ Criar novo Mini-Survey</button>
          </div>
          {eng.miniSurveys.length===0&&<div className="empty"><div className="ei">◌</div>Nenhum mini-survey criado ainda.</div>}
          {eng.miniSurveys.map((ms,i)=>(
            <div key={ms.id} style={{background:'#fff',border:'1px solid #E4E6EF',borderRadius:9,padding:'12px 16px',marginBottom:8,display:'flex',alignItems:'center',gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:'#1A1D2E'}}>{ms.label}</div>
                <div style={{fontSize:12,color:'#A0A3B1'}}>Criado em {ms.sentAt} · {ms.responses.length} resposta{ms.responses.length!==1?'s':''}</div>
              </div>
              <span className={`badge ${ms.responses.length>0?'b-done':'b-pend'}`}>{ms.responses.length>0?'Com respostas':'Aguardando'}</span>
              {ms.responses.length>0&&<button className="btn btn-g btn-xs" onClick={()=>exportMiniSurveyExcel(ms,eng)}>↓ Excel</button>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ─── TAB RELATÓRIOS ───────────────────────────────────────────────────────────
function TabRelatorios({eng,onUpdate}){
  const [section,setSection]=useState('360');
  const [editing360,setEditing360]=useState(false);
  const [draft360,setDraft360]=useState(eng.report?.content||'');
  const [selMS,setSelMS]=useState(eng.miniSurveys[0]||null);
  const [editingMS,setEditingMS]=useState(false);
  const [draftMS,setDraftMS]=useState('');

  const approve360=()=>onUpdate({report:{...eng.report,approved:true,sharedAt:new Date().toISOString().split('T')[0]}});
  const save360=()=>{onUpdate({report:{...eng.report,content:draft360}});setEditing360(false);};

  const updateMS=(patch)=>{
    const updated=eng.miniSurveys.map(ms=>ms.id===selMS.id?{...ms,...patch}:ms);
    onUpdate({miniSurveys:updated});
    setSelMS(prev=>({...prev,...patch}));
  };
  const approveMS=()=>updateMS({reportApproved:true,reportSharedAt:new Date().toISOString().split('T')[0]});
  const saveMS=()=>{updateMS({reportContent:draftMS});setEditingMS(false);};

  const handleUpload=(onContent)=>{
    const input=document.createElement('input');
    input.type='file';
    input.accept='.txt,.md';
    input.onchange=e=>{
      const file=e.target.files[0];
      if(!file)return;
      const reader=new FileReader();
      reader.onload=ev=>onContent(ev.target.result);
      reader.readAsText(file,'utf-8');
    };
    input.click();
  };

  return (
    <div style={{marginTop:20}}>
      {/* Section switcher */}
      <div style={{display:'flex',gap:3,background:'#F4F5F7',borderRadius:9,padding:3,marginBottom:20,width:'fit-content'}}>
        {[{id:'360',l:'Relatório 360°'},{id:'ms',l:`Relatórios Mini-Survey (${eng.miniSurveys.length})`}].map(s=>(
          <button key={s.id} className={`btn btn-sm ${section===s.id?'btn-p':'btn-g'}`} style={{border:'none'}} onClick={()=>setSection(s.id)}>{s.l}</button>
        ))}
      </div>

      {section==='360'&&(
        <>
          {!eng.report?(
            <div className="empty"><div className="ei">◌</div>Nenhum relatório 360° ainda.<br/>Gere na aba Stakeholders ou cole o conteúdo abaixo.<br/>
              <button className="btn btn-p btn-sm" style={{marginTop:12}} onClick={()=>{onUpdate({report:{content:'',approved:false,sharedAt:null}});setEditing360(true);}}>+ Criar relatório manualmente</button>
            </div>
          ):(
            <>
              {eng.report.approved&&<div className="approved-banner">✓ Aprovado e compartilhado em {eng.report.sharedAt} — coachee pode visualizar</div>}
              <div className="sec">
                <span className="sec-lbl">Relatório de Desenvolvimento — 360°</span>
                <div style={{display:'flex',gap:8}}>
                  {!eng.report.approved&&!editing360&&<button className="btn btn-p btn-sm" onClick={approve360}>✓ Aprovar e Compartilhar</button>}
                  {!editing360&&<button className="btn btn-g btn-sm" onClick={()=>{setDraft360(eng.report.content);setEditing360(true);}}>Editar</button>}
                  {!editing360&&<button className="btn btn-g btn-sm" onClick={()=>handleUpload(txt=>{onUpdate({report:{...eng.report,content:txt}});})}>↑ Upload .txt/.md</button>}
                  {!editing360&&<span style={{fontSize:11,color:'#C8CAD6',padding:'5px 8px',border:'1px dashed #D8DAE8',borderRadius:6,whiteSpace:'nowrap'}}>PDF/DOCX — em breve</span>}
                  {editing360&&<><button className="btn btn-g btn-sm" onClick={()=>setEditing360(false)}>Cancelar</button><button className="btn btn-p btn-sm" onClick={save360}>Salvar</button></>}
                </div>
              </div>
              {editing360
                ?<textarea className="report-editor" value={draft360} onChange={e=>setDraft360(e.target.value)}/>
                :<div className="report-view"><div className="report-text">{eng.report.content||'Relatório vazio — clique em Editar ou Upload para adicionar conteúdo.'}</div></div>
              }
            </>
          )}
        </>
      )}

      {section==='ms'&&(
        <>
          {eng.miniSurveys.length===0?(
            <div className="empty"><div className="ei">◌</div>Nenhum mini-survey criado ainda.<br/>Crie na aba Stakeholders.</div>
          ):(
            <>
              <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
                {eng.miniSurveys.map(ms=>(
                  <button key={ms.id} className={`btn btn-sm ${selMS?.id===ms.id?'btn-p':'btn-g'}`} onClick={()=>{setSelMS(ms);setEditingMS(false);setDraftMS(ms.reportContent||'');}}>
                    {ms.label}
                  </button>
                ))}
              </div>

              {selMS&&(
                <>
                  {/* Data view */}
                  <div style={{marginBottom:20}}>
                    <ProgressChart miniSurveys={[selMS]}/>
                    {selMS.responses.length>0&&(
                      <button className="btn btn-g btn-sm" style={{marginTop:10}} onClick={()=>exportMiniSurveyExcel(selMS,eng)}>↓ Baixar planilha Excel</button>
                    )}
                  </div>

                  <div className="divider"/>

                  {/* Narrative report */}
                  {selMS.reportApproved&&<div className="approved-banner">✓ Relatório aprovado em {selMS.reportSharedAt} — coachee pode visualizar</div>}
                  <div className="sec">
                    <span className="sec-lbl">Relatório narrativo — {selMS.label}</span>
                    <div style={{display:'flex',gap:8}}>
                      {!selMS.reportApproved&&!editingMS&&<button className="btn btn-p btn-sm" onClick={approveMS}>✓ Aprovar e Compartilhar</button>}
                      {!editingMS&&<button className="btn btn-g btn-sm" onClick={()=>{setDraftMS(selMS.reportContent||'');setEditingMS(true);}}>Editar</button>}
                      {!editingMS&&<button className="btn btn-g btn-sm" onClick={()=>handleUpload(txt=>{updateMS({reportContent:txt});})}>↑ Upload .txt/.md</button>}
                      {!editingMS&&<span style={{fontSize:11,color:'#C8CAD6',padding:'5px 8px',border:'1px dashed #D8DAE8',borderRadius:6,whiteSpace:'nowrap'}}>PDF/DOCX — em breve</span>}
                      {editingMS&&<><button className="btn btn-g btn-sm" onClick={()=>setEditingMS(false)}>Cancelar</button><button className="btn btn-p btn-sm" onClick={saveMS}>Salvar</button></>}
                    </div>
                  </div>
                  {editingMS
                    ?<textarea className="report-editor" value={draftMS} onChange={e=>setDraftMS(e.target.value)}/>
                    :<div className="report-view"><div className="report-text">{selMS.reportContent||'Relatório narrativo ainda não adicionado. Clique em Editar ou Upload para adicionar.'}</div></div>
                  }
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─── SESSIONS TAB ─────────────────────────────────────────────────────────────
function TabSessions({eng,onUpdate}){
  const [showNew,setShowNew]=useState(false);
  const [newSession,setNewSession]=useState({date:'',notes:''});
  const [expandedIdx,setExpandedIdx]=useState(null);
  const [editIdx,setEditIdx]=useState(null);
  const [editNotes,setEditNotes]=useState('');

  const saveNew=()=>{
    if(!newSession.date||!newSession.notes.trim())return;
    const num=eng.sessions.length+1;
    const d=new Date(newSession.date);
    const months=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    const dateStr=`${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    onUpdate({sessions:[{num,date:dateStr,notes:newSession.notes.trim()},...eng.sessions]});
    setNewSession({date:'',notes:''});setShowNew(false);
  };

  const saveEdit=(i)=>{
    const updated=eng.sessions.map((s,idx)=>idx===i?{...s,notes:editNotes}:s);
    onUpdate({sessions:updated});setEditIdx(null);
  };

  return (
    <div style={{marginTop:20}}>
      <div className="sec">
        <span className="sec-lbl">Sessões ({eng.sessions.length})</span>
        <button className="btn btn-p btn-sm" onClick={()=>setShowNew(p=>!p)}>+ Registrar sessão</button>
      </div>

      {showNew&&(
        <div style={{background:'#EEF1FF',border:'1px solid #D0D8F8',borderRadius:10,padding:16,marginBottom:16}}>
          <div className="field"><div className="flbl">Data da sessão</div><input className="finp" type="date" value={newSession.date} onChange={e=>setNewSession(p=>({...p,date:e.target.value}))}/></div>
          <div className="field">
            <div className="flbl">Anotações da sessão</div>
            <textarea className="finp" rows={5} placeholder="Registre os principais pontos discutidos, insights do coachee, ações definidas, observações para próximas sessões..." value={newSession.notes} onChange={e=>setNewSession(p=>({...p,notes:e.target.value}))}/>
            <div style={{fontSize:11,color:'#A0A3B1',marginTop:4}}>Estas anotações poderão ser usadas pela IA para gerar recomendações para o coach.</div>
          <div style={{marginTop:10,padding:'10px 12px',background:'#F9FAFB',border:'1px dashed #D8DAE8',borderRadius:8,display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:13,color:'#A0A3B1'}}>📎 Upload de transcrição</span>
            <span style={{fontSize:11,color:'#C8CAD6',flex:1}}>.txt · .docx · .pdf</span>
            <span style={{fontSize:11,fontWeight:600,color:'#BCC4F0',background:'#EEF1FF',padding:'3px 8px',borderRadius:4}}>Em breve</span>
          </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-g btn-sm" onClick={()=>setShowNew(false)}>Cancelar</button>
            <button className="btn btn-p btn-sm" onClick={saveNew} disabled={!newSession.date||!newSession.notes.trim()}>Salvar</button>
          </div>
        </div>
      )}

      {eng.sessions.length===0?<div className="empty"><div className="ei">◌</div>Nenhuma sessão registrada.</div>
      :eng.sessions.map((s,i)=>{
        const parts=s.date.split(' ');
        const day=parts[0]; const m=parts[1]||'';
        const months={Jan:'JAN',Fev:'FEV',Mar:'MAR',Abr:'ABR',Mai:'MAI',Jun:'JUN',Jul:'JUL',Ago:'AGO',Set:'SET',Out:'OUT',Nov:'NOV',Dez:'DEZ'};
        return (
          <div key={i} style={{borderBottom:'1px solid #E4E6EF'}}>
            <div style={{display:'flex',gap:14,padding:'14px 0',cursor:'pointer'}} onClick={()=>setExpandedIdx(expandedIdx===i?null:i)}>
              <div style={{minWidth:44,textAlign:'center',background:'#fff',border:'1px solid #E4E6EF',borderRadius:8,padding:'7px 5px',flexShrink:0}}>
                <div style={{fontSize:18,fontWeight:700,color:'#1A1D2E',lineHeight:1}}>{day}</div>
                <div style={{fontSize:9,color:'#A0A3B1',letterSpacing:'1px',textTransform:'uppercase',marginTop:2}}>{months[m]||m}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:600,color:'#A0A3B1',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:4}}>Sessão {s.num}</div>
                <div style={{fontSize:14,color:'#6B6E8E',lineHeight:1.5,overflow:'hidden',whiteSpace:expandedIdx===i?'pre-wrap':'nowrap',textOverflow:'ellipsis'}}>{s.notes}</div>
              </div>
              <span style={{fontSize:12,color:'#A0A3B1',flexShrink:0,paddingTop:4}}>{expandedIdx===i?'▲':'▼'}</span>
            </div>
            {expandedIdx===i&&(
              <div style={{paddingBottom:14}}>
                {editIdx===i?(
                  <div>
                    <textarea className="finp" rows={6} value={editNotes} onChange={e=>setEditNotes(e.target.value)} style={{marginBottom:8}}/>
                    <div style={{display:'flex',gap:8}}>
                      <button className="btn btn-g btn-sm" onClick={()=>setEditIdx(null)}>Cancelar</button>
                      <button className="btn btn-p btn-sm" onClick={()=>saveEdit(i)}>Salvar</button>
                    </div>
                  </div>
                ):(
                  <div style={{display:'flex',gap:8}}>
                    <button className="btn btn-g btn-sm" onClick={()=>{setEditIdx(i);setEditNotes(s.notes);}}>Editar anotação</button>
                    <button className="btn btn-d btn-sm" onClick={()=>{if(window.confirm('Apagar esta sessão?')){onUpdate({sessions:eng.sessions.filter((_,idx)=>idx!==i)});}}}>Apagar</button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── ENGAGEMENT DETAIL ────────────────────────────────────────────────────────
function EngDetail({id,engs,onBack,onUpdate,onDelete}){
  const [tab,setTab]=useState('roadmap');
  const eng=engs.find(e=>e.id===id);
  if(!eng)return null;
  const upd=patch=>onUpdate(id,patch);
  const pendingStk=eng.stakeholders360.some(s=>s.status==='pending')||eng.stakeholdersMS.some(s=>s.status==='pending');
  const TABS=[
    {id:'roadmap',label:'Jornada'},
    {id:'stk',label:`Stakeholders${pendingStk?' ⚠':''}` },
    {id:'relatorios',label:`Relatórios${eng.report?.approved?' ✓':eng.report?' (rascunho)':''}` },
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
            <StatusBadge status={currentStatus(eng)}/>
            <span style={{fontSize:12,color:'#A0A3B1'}}>{STAGES[eng.phase-1]} · {eng.cadence}</span>
            <button className="btn btn-d btn-xs" onClick={()=>{
              if(!window.confirm('Tem certeza que deseja apagar este processo?')) return;
              if(!window.confirm('Esta ação é irreversível. Confirma a exclusão de "'+eng.coachee.name+'"?')) return;
              const nome=window.prompt('Digite o nome do coachee para confirmar:');
              if(nome?.trim()===eng.coachee.name.trim()){onDelete(eng.id);onBack();}
              else alert('Nome incorreto. Processo não apagado.');
            }}>Apagar processo</button>
          </div>
        </div>
        <div className="tabs">{TABS.map(t=><div key={t.id} className={`tab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>{t.label}</div>)}</div>
      </div>
      <div className="scroll">
        {tab==='roadmap'&&<RoadmapTab eng={eng} onUpdate={upd}/>}
        {tab==='stk'&&<TabStakeholders eng={eng} onUpdate={upd}/>}
        {tab==='relatorios'&&<TabRelatorios eng={eng} onUpdate={upd}/>}
        {tab==='sessions'&&<TabSessions eng={eng} onUpdate={upd}/>}
      </div>
    </>
  );
}

// ─── 360° FORM ────────────────────────────────────────────────────────────────
function Form360({eng,sh,onSubmit}){
  const [tipo,setTipo]=useState('');
  const [f,setF]=useState({pos1:'',pos1ex:'',pos2:'',pos2ex:'',pos3:'',pos3ex:'',cont1:'',cont1ex:'',cont2:'',cont2ex:'',cont3:'',cont3ex:'',par1:'',par1ex:'',par2:'',par2ex:'',par3:'',par3ex:'',inic1:'',inic1ex:'',inic2:'',inic2ex:'',inic3:'',inic3ex:'',prior:''});
  const [done,setDone]=useState(false);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const valid=tipo&&f.pos1&&f.pos1ex&&f.pos2&&f.pos2ex&&f.cont1&&f.cont1ex&&f.cont2&&f.cont2ex&&f.par1&&f.par1ex&&f.par2&&f.par2ex&&f.inic1&&f.inic1ex&&f.inic2&&f.inic2ex&&f.prior;
  if(done) return <div className="done-page"><style>{CSS}</style><div className="done-icon">✓</div><div className="done-title">Obrigado!</div><div className="done-sub">Suas respostas foram registradas. Sua contribuição é fundamental para o desenvolvimento de {eng.coachee.name}.</div></div>;
  const QA=({label,id,req,ph})=>(
    <div className="q-block">
      <div className="q-label">{label}{req&&<span className="q-req">*</span>}</div>
      <textarea className="q-area" placeholder={ph||"Descreva..."} value={f[id]} onChange={e=>set(id,e.target.value)}/>
    </div>
  );
  return (
    <div className="form-page">
      <style>{CSS}</style>
      <div className="form-header"><div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div><div style={{fontSize:12,color:'#A0A3B1'}}>Avaliação 360° · Confidencial</div></div>
      <div className="form-body">
        <div className="form-hero">
          <div className="form-hero-title">Feedback para Desenvolvimento de Liderança</div>
          <div className="form-hero-sub">Avaliação de <strong style={{color:'#1A1D2E'}}>{eng.coachee.name}</strong> ({eng.coachee.role})<br/>Traga exemplos concretos. Tempo estimado: 15–20 min.<br/><span style={{fontSize:13,color:'#A0A3B1'}}>Confidencial — sua identidade não será revelada.</span></div>
        </div>
        <div className="q-block"><div className="q-label">Tipo de interação com a pessoa avaliada<span className="q-req">*</span></div>
          <select className="q-sel" value={tipo} onChange={e=>setTipo(e.target.value)}><option value="">Selecione...</option>{SH_ROLES_360.map(r=><option key={r}>{r}</option>)}</select>
        </div>
        <div className="q-sect-lbl">Pontos positivos (2 a 3)</div>
        <QA label="Ponto positivo 1" id="pos1" req ph="Ex: Proativo, conhecimento técnico..."/>
        <QA label="Exemplo para o ponto 1" id="pos1ex" req ph="Descreva uma situação..."/>
        <QA label="Ponto positivo 2" id="pos2" req ph="Ex: Bom relacionamento..."/>
        <QA label="Exemplo para o ponto 2" id="pos2ex" req ph="Descreva uma situação..."/>
        <QA label="Ponto positivo 3 (opcional)" id="pos3" ph="Opcional..."/>
        {f.pos3&&<QA label="Exemplo para o ponto 3" id="pos3ex" ph="Descreva uma situação..."/>}
        <div className="q-sect-lbl">Continuar fazendo (2 a 3)</div>
        <QA label="Continuar fazendo (1)" id="cont1" req ph="Verbo de ação..."/>
        <QA label="Exemplo (1)" id="cont1ex" req ph="Descreva uma situação..."/>
        <QA label="Continuar fazendo (2)" id="cont2" req ph="Verbo de ação..."/>
        <QA label="Exemplo (2)" id="cont2ex" req ph="Descreva uma situação..."/>
        <QA label="Continuar fazendo (3) (opcional)" id="cont3" ph="Opcional..."/>
        {f.cont3&&<QA label="Exemplo (3)" id="cont3ex" ph="Descreva uma situação..."/>}
        <div className="q-sect-lbl">Parar de fazer (2 a 3)</div>
        <QA label="Parar de fazer (1)" id="par1" req ph="Comportamento que atrapalha..."/>
        <QA label="Exemplo (1)" id="par1ex" req ph="Descreva uma situação..."/>
        <QA label="Parar de fazer (2)" id="par2" req ph="Comportamento que atrapalha..."/>
        <QA label="Exemplo (2)" id="par2ex" req ph="Descreva uma situação..."/>
        <QA label="Parar de fazer (3) (opcional)" id="par3" ph="Opcional..."/>
        {f.par3&&<QA label="Exemplo (3)" id="par3ex" ph="Descreva uma situação..."/>}
        <div className="q-sect-lbl">Começar a fazer (2 a 3)</div>
        <QA label="Começar a fazer (1)" id="inic1" req ph="Atitude que ajudaria..."/>
        <QA label="Exemplo (1)" id="inic1ex" req ph="Descreva uma situação..."/>
        <QA label="Começar a fazer (2)" id="inic2" req ph="Atitude que ajudaria..."/>
        <QA label="Exemplo (2)" id="inic2ex" req ph="Descreva uma situação..."/>
        <QA label="Começar a fazer (3) (opcional)" id="inic3" ph="Opcional..."/>
        {f.inic3&&<QA label="Exemplo (3)" id="inic3ex" ph="Descreva uma situação..."/>}
        <div className="q-sect-lbl">Priorização</div>
        <QA label="Dos pontos citados, qual deve ser priorizado?" id="prior" req ph="Indique o ponto mais importante..."/>
        <button className="login-btn" onClick={()=>{if(valid){onSubmit({...f,tipo});setDone(true);}}} disabled={!valid} style={{opacity:valid?1:.5,marginBottom:32}}>Enviar Avaliação</button>
      </div>
    </div>
  );
}

// ─── MINI SURVEY FORM ─────────────────────────────────────────────────────────
function FormMiniSurvey({eng,sh,ms,onSubmit}){
  const [tipo,setTipo]=useState('');
  const [objetivos,setObjetivos]=useState('');
  const [freq,setFreq]=useState(ms.competencias.map(()=>''));
  const [scores,setScores]=useState(ms.competencias.map(()=>null));
  const [overall,setOverall]=useState(null);
  const [mudancas,setMudancas]=useState('');
  const [sugestoes,setSugestoes]=useState('');
  const [done,setDone]=useState(false);
  const valid=tipo&&objetivos&&scores.every(s=>s!==null)&&overall!==null&&mudancas&&sugestoes;
  if(done) return <div className="done-page"><style>{CSS}</style><div className="done-icon">✓</div><div className="done-title">Obrigado!</div><div className="done-sub">Suas respostas foram registradas com sucesso.</div></div>;
  const SBtn=({k,val,onChange})=>{const n=parseInt(k);const cls=val===n?(n>0?'sp':n<0?'sn':'sz'):'';return <button className={`scale-btn ${cls}`} onClick={()=>onChange(n)}>{k}</button>;};
  return (
    <div className="form-page">
      <style>{CSS}</style>
      <div className="form-header"><div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div><div style={{fontSize:12,color:'#A0A3B1'}}>Pesquisa de Progresso · {ms.label}</div></div>
      <div className="form-body">
        <div className="form-hero">
          <div className="form-hero-title">Acompanhamento de Progresso</div>
          <div className="form-hero-sub">Avalie o progresso de <strong style={{color:'#1A1D2E'}}>{eng.coachee.name}</strong><br/><span style={{fontSize:13,color:'#A0A3B1'}}>Respostas confidenciais, compiladas anonimamente.</span></div>
        </div>
        <div className="q-block"><div className="q-label">Tipo de interação<span className="q-req">*</span></div><select className="q-sel" value={tipo} onChange={e=>setTipo(e.target.value)}><option value="">Selecione...</option>{SH_ROLES_MS.map(r=><option key={r}>{r}</option>)}</select></div>
        <div className="q-block"><div className="q-label">Os objetivos do coaching foram compartilhados com você?<span className="q-req">*</span></div><select className="q-sel" value={objetivos} onChange={e=>setObjetivos(e.target.value)}><option value="">Selecione...</option><option>Sim</option><option>Não</option></select></div>
        <div className="q-block">
          <div className="q-label">Frequência com que o/a líder pediu feedback sobre as competências<span className="q-req">*</span></div>
          {ms.competencias.map((c,i)=>(
            <div key={i} className="scale-row">
              <div className="scale-lbl">{c}</div>
              <select className="freq-sel" value={freq[i]} onChange={e=>{const n=[...freq];n[i]=e.target.value;setFreq(n);}}>
                <option value="">Selecione...</option>{FREQ_OPTS.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <div className="q-block">
          <div className="q-label">Progresso nas competências (-3 a +3)<span className="q-req">*</span></div>
          <div style={{fontSize:12,color:'#A0A3B1',marginBottom:10}}>-3 = Piorou muito · 0 = Sem mudança · +3 = Melhorou muito</div>
          {ms.competencias.map((c,i)=>(
            <div key={i} className="scale-row">
              <div className="scale-lbl">{c}</div>
              <div className="scale-btns">{SCALE.map(k=><SBtn key={k} k={k} val={scores[i]} onChange={v=>{const n=[...scores];n[i]=v;setScores(n);}}/>)}</div>
            </div>
          ))}
        </div>
        <div className="q-block">
          <div className="q-label">Efetividade geral de liderança (-3 a +3)<span className="q-req">*</span></div>
          <div className="scale-btns" style={{marginTop:6}}>{SCALE.map(k=><SBtn key={k} k={k} val={overall} onChange={setOverall}/>)}</div>
        </div>
        <div className="q-block"><div className="q-label">Mudanças de comportamento mais perceptíveis<span className="q-req">*</span></div><textarea className="q-area" placeholder="Descreva o que observou..." value={mudancas} onChange={e=>setMudancas(e.target.value)}/></div>
        <div className="q-block"><div className="q-label">Sugestões para os próximos meses<span className="q-req">*</span></div><textarea className="q-area" placeholder="Suas sugestões..." value={sugestoes} onChange={e=>setSugestoes(e.target.value)}/></div>
        <button className="login-btn" onClick={()=>{if(valid){onSubmit({shId:sh.id,name:sh.name,role:tipo,scores,overall,mudancas,sugestoes,freq,objetivos});setDone(true);}}} disabled={!valid} style={{opacity:valid?1:.5,marginBottom:32}}>Enviar Pesquisa</button>
      </div>
    </div>
  );
}

// ─── COACHEE PORTAL ───────────────────────────────────────────────────────────
function CoacheePortal({eng,onLogout,onUpdate,isCoachView,onBackToCoach}){
  const [tab,setTab]=useState('jornada');
  const [showAdd360,setShowAdd360]=useState(false);
  const [showAddMS,setShowAddMS]=useState(false);
  const c=eng.coachee;
  const notifs=eng.notifications||[];

  const TABS=[{id:'jornada',l:'Minha Jornada'},{id:'stk',l:`Stakeholders${notifs.length>0?` (${notifs.length})`:''}` },{id:'relatorios',l:'Relatórios'},{id:'progresso',l:'Progresso'}];

  return (
    <div className="portal-page">
      <style>{CSS}</style>
      {showAdd360&&<AddShModal tipo="360" currentCount={eng.stakeholders360.length} onSave={sh=>{onUpdate(eng.id,{stakeholders360:[...eng.stakeholders360,sh]});setShowAdd360(false);}} onClose={()=>setShowAdd360(false)}/>}
      {showAddMS&&<AddShModal tipo="ms" currentCount={eng.stakeholdersMS.length} onSave={sh=>{onUpdate(eng.id,{stakeholdersMS:[...eng.stakeholdersMS,sh]});setShowAddMS(false);}} onClose={()=>setShowAddMS(false)}/>}
      <div className="portal-header">
        <div><div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div><div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase'}}>Minha Jornada</div></div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          {isCoachView&&<button className="btn btn-p btn-sm" onClick={onBackToCoach}>← Voltar ao coach</button>}
          <div style={{textAlign:'right'}}><div style={{fontSize:14,fontWeight:600,color:'#1A1D2E'}}>{c.name}</div><div style={{fontSize:12,color:'#A0A3B1'}}>{c.role} · {c.company}</div></div>
          {!isCoachView&&<button className="btn btn-g btn-sm" onClick={onLogout}>Sair</button>}
        </div>
      </div>
      <div className="portal-body">
        <div className="portal-hero">
          <div className="portal-name">{c.name}</div>
          <div style={{fontSize:11,color:'#A0A3B1',letterSpacing:'1.5px',textTransform:'uppercase',margin:'4px 0 10px'}}>Processo de Desenvolvimento · MGSCC</div>
          <div style={{fontSize:11,color:'#A0A3B1',fontWeight:600,textTransform:'uppercase',letterSpacing:'1px',marginBottom:4}}>Objetivo principal do processo</div>
          <div style={{fontSize:14,color:'#3A3D58',lineHeight:1.6,marginBottom:eng.competencias.length>0?14:0}}>{eng.goal||'A definir'}</div>
          {eng.competencias.length>0&&(
            <div>
              <div style={{fontSize:11,color:'#A0A3B1',fontWeight:600,textTransform:'uppercase',letterSpacing:'1px',marginBottom:8}}>Competências em desenvolvimento</div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {eng.competencias.map((comp,i)=>(
                  <div key={i} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                    <span style={{fontSize:11,fontWeight:700,color:'#4169FF',background:'#EEF1FF',padding:'2px 8px',borderRadius:4,flexShrink:0}}>Competência {i+1}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:'#1A1D2E'}}>{comp.nome}</div>
                      {comp.detalhe&&<div style={{fontSize:11,color:'#6B6E8E'}}>{comp.detalhe}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="tabs">{TABS.map(t=><div key={t.id} className={`tab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>{t.l}</div>)}</div>
        <div style={{paddingTop:24}}>
          {tab==='jornada'&&(
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
              {[1,2,3,4].map(p=>{
                const ss=stageStatus(eng,p);
                const actions=[
                  ['Cadastrar stakeholders 360°','Formulário 360° respondido','Relatório disponível'],
                  ['Definir competências','Cadastrar stakeholders mini-survey','Reunião de engajamento'],
                  ['Sessões de coaching','Reuniões mensais com stakeholders','Mini-survey de progresso'],
                  ['Mini-survey final','Apresentação de resultados'],
                ];
                return (
                  <div key={p} style={{background:'#fff',border:`1px solid ${p===eng.phase?SC[p-1]+'55':'#E4E6EF'}`,borderRadius:10,padding:16}}>
                    <div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase',fontWeight:600,marginBottom:6}}>Etapa {p}</div>
                    <div style={{fontSize:13,fontWeight:700,textTransform:'uppercase',letterSpacing:'.4px',color:SC[p-1],marginBottom:8}}>{STAGES[p-1]}</div>
                    <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:10}}><span className={`sdot ${STATUS[ss].dot}`}/><span className={STATUS[ss].txt} style={{fontSize:11}}>{STATUS[ss].label}</span></div>
                    <ul style={{listStyle:'none'}}>
                      {actions[p-1].map((a,i)=><li key={i} style={{display:'flex',gap:6,fontSize:12,color:'#6B6E8E',marginBottom:5,alignItems:'flex-start',lineHeight:1.4}}><span style={{width:4,height:4,borderRadius:'50%',background:'#D8DAE8',flexShrink:0,marginTop:5}}/>{a}</li>)}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {tab==='stk'&&(
            <>
              {notifs.length>0&&(
                <div style={{marginBottom:20}}>
                  <div className="sec-lbl" style={{marginBottom:10}}>Notificações do Líder ({notifs.length})</div>
                  {notifs.map((n,i)=>(
                    <div key={i} className="notif">
                      <div className="notif-icon">⚠</div>
                      <div><div className="notif-text">{n.msg}</div><div className="notif-time">{n.date}</div></div>
                    </div>
                  ))}
                </div>
              )}
              <div className="sec"><span className="sec-lbl">Stakeholders escolhidos — Avaliação 360° ({eng.stakeholders360.length}/15)</span><button className="btn btn-p btn-sm" onClick={()=>setShowAdd360(true)}>+ Adicionar</button></div>
              {eng.stakeholders360.length===0?<div className="empty"><div className="ei">◌</div>Adicione as pessoas da sua avaliação 360°.</div>
              :<div className="sh-list" style={{marginBottom:20}}>
                {eng.stakeholders360.map(s=>(
                  <div key={s.id} className={`sh-item ${s.invalid?'sh-invalid':''}`}>
                    <div className="sh-av">{s.initials}</div>
                    <div style={{flex:1}}>
                      <div className="sh-name" style={{textDecoration:s.invalid?'line-through':''}}>{s.name}</div>
                      <div className="sh-role">{s.role}</div>
                      {s.invalid&&<div style={{fontSize:11,color:'#DC2626',marginTop:2}}>Solicitação do líder: {s.leaderMsg}</div>}
                    </div>
                    <span className={`badge ${s.invalid?'b-invalid':s.validatedByLeader?'b-done':'b-pend'}`}>{s.invalid?'Revisar':s.validatedByLeader?'Validado':'Aguardando líder'}</span>
                  </div>
                ))}
              </div>}
              <div className="sec"><span className="sec-lbl">Stakeholders escolhidos — Jornada de desenvolvimento ({eng.stakeholdersMS.length}/15)</span><button className="btn btn-p btn-sm" onClick={()=>setShowAddMS(true)}>+ Adicionar</button></div>
              {eng.stakeholdersMS.length===0?<div className="empty"><div className="ei">◌</div>Adicione as pessoas que acompanharão seu progresso.</div>
              :<div className="sh-list">
                {eng.stakeholdersMS.map(s=>(
                  <div key={s.id} className="sh-item">
                    <div className="sh-av">{s.initials}</div>
                    <div style={{flex:1}}><div className="sh-name">{s.name}</div><div className="sh-role">{s.role}</div></div>
                    <span className={`badge ${s.validatedByLeader?'b-done':'b-pend'}`}>{s.validatedByLeader?'Validado':'Aguardando líder'}</span>
                  </div>
                ))}
              </div>}
            </>
          )}

          {tab==='relatorios'&&(
            <>
              {!eng.report?.approved
                ?<div className="warn-box">Seu relatório de desenvolvimento está sendo preparado pelo coach. Ficará disponível aqui após a aprovação.</div>
                :<>
                  <div style={{background:'#F0FDF4',border:'1px solid #BBF7D0',borderRadius:9,padding:'12px 16px',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:'#059669'}}>✓ Relatório de Desenvolvimento disponível</div>
                      <div style={{fontSize:12,color:'#6B6E8E',marginTop:2}}>Aprovado em {eng.report.sharedAt}</div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button className="btn btn-g btn-sm" onClick={()=>window.print()}>Imprimir</button>
                      <button className="btn btn-g btn-sm" onClick={()=>{navigator.clipboard?.writeText(eng.report.content);alert('Conteúdo copiado!');}} >Copiar</button>
                      <span style={{fontSize:11,color:'#A0A3B1',padding:'5px 8px',border:'1px dashed #D8DAE8',borderRadius:6}}>Download PDF — em breve</span>
                    </div>
                  </div>
                  <div className="report-view"><div className="report-text">{eng.report.content}</div></div>
                </>
              }
            </>
          )}

          {tab==='progresso'&&<ProgressChart miniSurveys={eng.miniSurveys}/>}
        </div>
      </div>
    </div>
  );
}

// ─── LEADER PORTAL ────────────────────────────────────────────────────────────
function LeaderPortal({engId,liderId,engs,onLogout,onUpdate}){
  const [tab,setTab]=useState('visao');
  const [invalidModal,setInvalidModal]=useState(null);
  const [suggestModal,setSuggestModal]=useState(false);
  const [listType,setListType]=useState('360');
  const eng=engs.find(e=>e.id===engId);
  const lider=eng?.leaders.find(l=>l.id===liderId);
  if(!eng||!lider) return <div className="done-page"><style>{CSS}</style><div className="done-icon">⚠</div><div className="done-title">Acesso não encontrado</div></div>;

  const doInvalidate=(sh,tipo,msg)=>{
    const notif={msg:`Líder solicitou revisão de "${sh.name}" na lista de ${tipo==='360'?'Avaliação 360°':'Mini-survey'}. Mensagem: ${msg}`,date:new Date().toLocaleDateString('pt-BR')};
    if(tipo==='360'){
      onUpdate(eng.id,{
        stakeholders360:eng.stakeholders360.map(s=>s.id===sh.id?{...s,invalid:true,leaderMsg:msg}:s),
        notifications:[...(eng.notifications||[]),notif]
      });
    } else {
      onUpdate(eng.id,{
        stakeholdersMS:eng.stakeholdersMS.map(s=>s.id===sh.id?{...s,invalid:true,leaderMsg:msg}:s),
        notifications:[...(eng.notifications||[]),notif]
      });
    }
    setInvalidModal(null);
  };

  const doSuggest=(data)=>{
    const notif={msg:`Líder sugeriu adicionar "${data.name}" (${data.role}) à lista. Motivo: ${data.msg}`,date:new Date().toLocaleDateString('pt-BR')};
    onUpdate(eng.id,{notifications:[...(eng.notifications||[]),notif]});
    setSuggestModal(false);
    alert('Sugestão enviada ao coachee!');
  };

  const validateAll=(tipo)=>{
    if(tipo==='360') onUpdate(eng.id,{stakeholders360:eng.stakeholders360.map(s=>({...s,validatedByLeader:true}))});
    else onUpdate(eng.id,{stakeholdersMS:eng.stakeholdersMS.map(s=>({...s,validatedByLeader:true}))});
    alert('Lista validada!');
  };

  const TABS=[{id:'visao',l:'Visão Geral'},{id:'listas',l:'Listas de Stakeholders'},{id:'progresso',l:'Progresso'}];

  return (
    <div className="portal-page">
      <style>{CSS}</style>
      {invalidModal&&<InvalidateModal sh={invalidModal.sh} onConfirm={msg=>doInvalidate(invalidModal.sh,invalidModal.tipo,msg)} onClose={()=>setInvalidModal(null)}/>}
      {suggestModal&&<SuggestModal onConfirm={doSuggest} onClose={()=>setSuggestModal(false)}/>}
      <div className="portal-header">
        <div><div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div><div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase'}}>Portal do Líder</div></div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{textAlign:'right'}}><div style={{fontSize:14,fontWeight:600,color:'#1A1D2E'}}>{lider.name}</div><div style={{fontSize:12,color:'#A0A3B1'}}>Líder</div></div>
          <button className="btn btn-g btn-sm" onClick={onLogout}>Sair</button>
        </div>
      </div>
      <div className="portal-body">
        <div className="portal-hero">
          <div style={{fontSize:12,color:'#A0A3B1',marginBottom:4}}>Processo de coaching</div>
          <div className="portal-name">{eng.coachee.name}</div>
          <div style={{fontSize:13,color:'#6B6E8E',marginTop:4}}>{eng.coachee.role} · {eng.coachee.company}</div>
          <div style={{marginTop:10,display:'flex',alignItems:'center',gap:8}}>
            <span className={`sdot ${STATUS[currentStatus(eng)].dot}`}/>
            <span style={{fontSize:13,color:'#6B6E8E',fontWeight:500}}>{STAGES[eng.phase-1]} · {STATUS[currentStatus(eng)].label}</span>
          </div>
        </div>
        <div className="tabs">{TABS.map(t=><div key={t.id} className={`tab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>{t.l}</div>)}</div>
        <div style={{paddingTop:24}}>
          {tab==='visao'&&(
            <>
              <div style={{background:'#fff',border:'1px solid #E4E6EF',borderRadius:9,padding:'14px 18px',marginBottom:16,display:'flex',gap:24}}>
                <div><div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:600,marginBottom:4}}>Sessão atual</div><div style={{fontSize:22,fontWeight:600,color:'#4169FF'}}>{eng.sessions.length}<span style={{fontSize:13,color:'#A0A3B1',fontWeight:400}}>/10</span></div></div>
                <div><div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:600,marginBottom:4}}>Etapa atual</div><div style={{fontSize:15,fontWeight:600,color:'#1A1D2E'}}>{STAGES[eng.phase-1]}</div></div>
                <div><div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:600,marginBottom:4}}>Cadência</div><div style={{fontSize:15,fontWeight:600,color:'#1A1D2E',textTransform:'capitalize'}}>{eng.cadence}</div></div>
                <div><div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:600,marginBottom:4}}>Mini-Surveys</div><div style={{fontSize:15,fontWeight:600,color:'#1A1D2E'}}>{eng.miniSurveys.length} aplicado{eng.miniSurveys.length!==1?'s':''}</div></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
                {[1,2,3,4].map(p=>{
                  const ss=stageStatus(eng,p);
                  return <div key={p} style={{background:'#fff',border:`1px solid ${p===eng.phase?SC[p-1]+'50':'#E4E6EF'}`,borderRadius:9,padding:'14px 16px'}}>
                    <div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:4}}>Etapa {p}</div>
                    <div style={{fontSize:13,fontWeight:600,color:SC[p-1],marginBottom:8}}>{STAGES[p-1]}</div>
                    <div style={{display:'flex',alignItems:'center',gap:5}}><span className={`sdot ${STATUS[ss].dot}`}/><span className={STATUS[ss].txt} style={{fontSize:11}}>{STATUS[ss].label}</span></div>
                  </div>;
                })}
              </div>
            </>
          )}
          {tab==='listas'&&(
            <>
              <div style={{display:'flex',gap:8,marginBottom:20}}>
                <button className={`btn ${listType==='360'?'btn-p':'btn-g'}`} onClick={()=>setListType('360')}>Avaliação 360°</button>
                <button className={`btn ${listType==='ms'?'btn-p':'btn-g'}`} onClick={()=>setListType('ms')}>Mini-Survey</button>
                <button className="btn btn-y btn-sm" style={{marginLeft:'auto'}} onClick={()=>setSuggestModal(true)}>+ Sugerir nome</button>
                <button className="btn btn-p btn-sm" onClick={()=>validateAll(listType)}>✓ Validar lista</button>
              </div>
              {(listType==='360'?eng.stakeholders360:eng.stakeholdersMS).length===0
                ?<div className="empty"><div className="ei">◌</div>Aguardando coachee cadastrar a lista.</div>
                :<div className="sh-list">
                  {(listType==='360'?eng.stakeholders360:eng.stakeholdersMS).map(s=>(
                    <div key={s.id} className={`sh-item ${s.invalid?'sh-invalid':''}`}>
                      <div className="sh-av">{s.initials}</div>
                      <div style={{flex:1}}>
                        <div className="sh-name" style={{textDecoration:s.invalid?'line-through':''}}>{s.name}</div>
                        <div className="sh-role">{s.role}</div>
                      </div>
                      <span className={`badge ${s.invalid?'b-invalid':s.validatedByLeader?'b-done':'b-pend'}`} style={{marginRight:8}}>
                        {s.invalid?'Invalidado':s.validatedByLeader?'Validado':'Pendente'}
                      </span>
                      {!s.invalid&&<button className="btn btn-d btn-xs" onClick={()=>setInvalidModal({sh:s,tipo:listType})}>Invalidar</button>}
                    </div>
                  ))}
                </div>
              }
              <div style={{fontSize:12,color:'#A0A3B1',marginTop:12}}>Limite: 15 stakeholders por lista</div>
            </>
          )}
          {tab==='progresso'&&<ProgressChart miniSurveys={eng.miniSurveys}/>}
        </div>
      </div>
    </div>
  );
}

// ─── RH PORTAL ────────────────────────────────────────────────────────────────
function RHPortal({company,engs,onLogout}){
  const compEngs=engs.filter(e=>e.coachee.company.toLowerCase().includes(company.toLowerCase())||company==='dimas');
  const [selId,setSelId]=useState(compEngs[0]?.id||null);
  const selEng=compEngs.find(e=>e.id===selId);

  return (
    <div className="portal-page">
      <style>{CSS}</style>
      <div className="portal-header">
        <div><div style={{fontWeight:700,fontSize:16,color:'#1A1D2E'}}>Lidehra</div><div style={{fontSize:10,color:'#A0A3B1',letterSpacing:'2px',textTransform:'uppercase'}}>Portal RH</div></div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{textAlign:'right'}}><div style={{fontSize:14,fontWeight:600,color:'#1A1D2E'}}>RH · {company}</div></div>
          <button className="btn btn-g btn-sm" onClick={onLogout}>Sair</button>
        </div>
      </div>
      <div className="portal-body" style={{maxWidth:900}}>
        <div style={{fontSize:22,fontWeight:600,color:'#1A1D2E',marginBottom:4}}>Visão Geral — Processos de Coaching</div>
        <div style={{fontSize:13,color:'#A0A3B1',marginBottom:24}}>Empresa: {company} · {compEngs.length} processo{compEngs.length!==1?'s':''} ativo{compEngs.length!==1?'s':''}</div>
        {compEngs.length===0?<div className="empty"><div className="ei">◌</div>Nenhum processo encontrado para esta empresa.</div>:(
          <>
            <div className="grid" style={{marginBottom:24}}>
              {compEngs.map(e=>(
                <div key={e.id} className="eng-card" onClick={()=>setSelId(e.id)} style={{border:selId===e.id?`2px solid ${e.coachee.color}`:'1px solid #E4E6EF'}}>
                  <div className="ec-top">
                    <div className="ec-av" style={{background:e.coachee.color+'18',border:`1px solid ${e.coachee.color}35`}}><span style={{color:e.coachee.color}}>{e.coachee.initials}</span></div>
                    <div style={{flex:1}}><div className="ec-name">{e.coachee.name}</div><div className="ec-role">{e.coachee.role}</div></div>
                  </div>
                  <StageBar eng={e}/>
                  <div style={{display:'flex',gap:12,marginBottom:8}}>
                    <span style={{fontSize:11,color:'#6B6E8E'}}>Sessão <strong style={{color:'#1A1D2E'}}>{e.sessions.length}</strong>/10</span>
                    <span style={{fontSize:11,color:'#6B6E8E'}}>{STAGES[e.phase-1]}</span>
                    <span style={{fontSize:11,color:'#6B6E8E'}}>{e.miniSurveys.length} mini-survey{e.miniSurveys.length!==1?'s':''}</span>
                  </div>
                  <div className="ec-meta"><StatusBadge status={currentStatus(e)}/><span className="ec-info">{e.cadence}</span></div>
                </div>
              ))}
            </div>
            {selEng&&(
              <div>
                <div style={{fontSize:16,fontWeight:600,color:'#1A1D2E',marginBottom:16}}>Progresso — {selEng.coachee.name}</div>
                <ProgressChart miniSurveys={selEng.miniSurveys}/>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  const [engs,setEngs]=useState([]);
  const [view,setView]=useState('dash');
  const [activeEng,setActiveEng]=useState(null);
  const [navItem,setNavItem]=useState('processos');
  const [loading,setLoading]=useState(true);
  const [saveErr,setSaveErr]=useState('');

  // Load session on mount
  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session){
        const u=session.user;
        const nm=u.user_metadata?.name||u.email;
        setUser({role:'coach',name:nm,initials:nm.split(' ').slice(0,2).map(w=>w[0].toUpperCase()).join('')});
        loadEngsFromDB();
      } else {
        setLoading(false);
      }
    });
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      if(!session){setUser(null);setEngs([]);setLoading(false);}
    });
    return ()=>subscription.unsubscribe();
  },[]);

  // Load engagements from Supabase
  const loadEngsFromDB=async()=>{
    setLoading(true);
    const{data,error}=await supabase.from('engagements').select('app_id,data').order('app_id',{ascending:true});
    if(!error&&data&&data.length>0){
      const fromDB=data.map(row=>({...row.data,id:row.app_id}));
      const dbIds=new Set(fromDB.map(e=>e.id));
      // Merge: DB data takes priority; INIT_ENGS fills in anything not yet saved
      const merged=[...fromDB, ...INIT_ENGS.filter(e=>!dbIds.has(e.id))];
      setEngs(merged.sort((a,b)=>a.id-b.id));
    } else {
      setEngs(INIT_ENGS);
    }
    setLoading(false);
  };

  // Save single engagement to Supabase
  const saveEngToDB=async(eng)=>{
    const{data:{session}}=await supabase.auth.getSession();
    if(!session) return;
    const{error}=await supabase.from('engagements').upsert(
      {app_id:eng.id, coach_id:session.user.id, data:eng},
      {onConflict:'app_id'}
    );
    if(error){setSaveErr('Erro ao salvar: '+error.message);console.error(error);}
    else setSaveErr('');
  };

  // Update engagement in state + Supabase
  const updateEng=(id,patch)=>{
    setEngs(prev=>prev.map(e=>{
      if(e.id!==id) return e;
      const merged={...e,...patch};
      saveEngToDB(merged);
      return merged;
    }));
  };

  // Add new engagement
  const addEng=async(e)=>{
    setEngs(prev=>[...prev,e]);
    await saveEngToDB(e);
  };

  // Logout
  const logout=async()=>{
    if(user?.role==='coach') await supabase.auth.signOut();
    setUser(null);setEngs([]);setView('dash');setActiveEng(null);
  };

  // Login handler
  const handleLogin=u=>{
    setUser(u);
    if(u.role==='coachee'){setView('coachee');setActiveEng(u.engId);}
    else if(u.role==='lider'){setView('lider');setActiveEng(u.engId);}
    else if(u.role==='rh'){setView('rh');}
    else if(u.role==='stk'){setView('stk');setActiveEng(u.engId);}
    else{setView('dash');loadEngsFromDB();}
  };

  if(loading) return (
    <div style={{minHeight:'100vh',background:'#F4F5F7',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,fontFamily:"'Poppins',sans-serif"}}>
      <style>{CSS}</style>
      <div style={{fontSize:22,fontWeight:700,color:'#1A1D2E'}}>Lidehra</div>
      <Dots/>
    </div>
  );

  if(!user) return <><style>{CSS}</style><Login onLogin={handleLogin}/></>;

  if(user.role==='coachee'){
    const eng=engs.find(e=>e.id===activeEng);
    if(!eng) return <div className="done-page"><style>{CSS}</style><div className="done-icon">⚠</div><div className="done-title">Processo não encontrado</div></div>;
    return <CoacheePortal eng={eng} onLogout={logout} onUpdate={updateEng} isCoachView={user.isCoachView} onBackToCoach={()=>{setUser({role:'coach',name:user._coachName,initials:user._coachInitials});setView('dash');setActiveEng(null);}}/>;
  }

  if(user.role==='lider'){
    return <LeaderPortal engId={activeEng} liderId={user.liderId} engs={engs} onLogout={logout} onUpdate={updateEng}/>;
  }

  if(user.role==='rh'){
    return <RHPortal company={user.company} engs={engs} onLogout={logout}/>;
  }

  if(user.role==='stk'){
    const eng=engs.find(e=>e.id===activeEng);
    const sh360=eng?.stakeholders360.find(s=>s.id===user.shId);
    const shMS=eng?.stakeholdersMS.find(s=>s.id===user.shId);
    if(!eng||(!(sh360||shMS))) return <div className="done-page"><style>{CSS}</style><div className="done-icon">⚠</div><div className="done-title">Acesso não encontrado</div></div>;
    const openMS=eng.miniSurveys.find(ms=>!ms.responses.find(r=>r.shId===user.shId));
    if(openMS&&shMS){
      return <FormMiniSurvey eng={eng} sh={shMS} ms={openMS} onSubmit={resp=>{
        const updated=eng.miniSurveys.map(ms=>ms.id===openMS.id?{...ms,responses:[...ms.responses,resp]}:ms);
        updateEng(eng.id,{miniSurveys:updated});
      }}/>;
    }
    if(sh360&&sh360.status!=='done'){
      return <Form360 eng={eng} sh={sh360} onSubmit={answers=>{
        updateEng(eng.id,{stakeholders360:eng.stakeholders360.map(s=>s.id===sh360.id?{...s,status:'done',feedback:answers}:s)});
      }}/>;
    }
    return <div className="done-page"><style>{CSS}</style><div className="done-icon">✓</div><div className="done-title">Avaliação concluída</div><div className="done-sub">Você já respondeu a avaliação para este processo. Obrigado pela contribuição!</div></div>;
  }

  // COACH
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
            <div className="sb-user"><div className="sb-av">{user.initials}</div><div><div className="sb-uname">{user.name}</div><div className="sb-urole">Executive Coach · MGSCC</div></div></div>
            <button className="sb-out" onClick={logout}>Sair da conta</button>
          </div>
        </div>
        <div className="main">
          {saveErr&&<div style={{background:'#FEF2F2',borderBottom:'1px solid #FCD4D4',padding:'8px 24px',fontSize:12,color:'#DC2626'}}>{saveErr}</div>}
          {view==='dash'&&navItem==='processos'&&(
            <>
              <div className="topbar"><div className="pg-title">Dashboard</div><div className="pg-sub">Processos ativos — {new Date().toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}</div><div className="divline"/></div>
              <div className="scroll">
                <Dashboard engs={engs} onSelect={id=>{setActiveEng(id);setView('eng');}} onCreate={addEng}
                  onOpenCoachee={id=>{
                    setUser(prev=>({role:'coachee',engId:id,isCoachView:true,_coachName:prev.name,_coachInitials:prev.initials}));
                    setView('coachee');setActiveEng(id);
                  }}/>
              </div>
            </>
          )}
          {view==='eng'&&activeEng&&(
            <EngDetail id={activeEng} engs={engs} onBack={()=>{setView('dash');setActiveEng(null);}} onUpdate={updateEng} onDelete={id=>{setEngs(prev=>prev.filter(e=>e.id!==id));supabase.from('engagements').delete().eq('app_id',id).then(()=>{});}} />
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
