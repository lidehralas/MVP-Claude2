Running build in Washington, D.C., USA (East) – iad1
Build machine configuration: 2 cores, 8 GB
Cloning github.com/lidehralas/MVP-Claude2 (Branch: main, Commit: 584c282)
Cloning completed: 430.000ms
Restored build cache from previous deployment (AX8PZERncAV53WfYpHYbCLr8JzTm)
Running "vercel build"
Vercel CLI 50.37.1
Installing dependencies...
up to date in 6s
7 packages are looking for funding
  run `npm fund` for details
Running "npm run build"
> lidehra-mvp@0.2.0 build
> vite build
vite v5.4.21 building for production...
transforming...
✓ 4 modules transformed.
x Build failed in 117ms
error during build:
[vite:esbuild] Transform failed with 1 error:
/vercel/path0/src/App.jsx:2235:70: ERROR: Expected ")" but found "\u200c"
file: /vercel/path0/src/App.jsx:2235:70
Expected ")" but found "\u200c"
2233|    const feedbacks = eng.stakeholders360.filter(s=>s.status==='done'&&s.feedback);
2234|    const [editPriorities,setEditPriorities]=useState(false);
2235|    const [draftPrio,setDraftPrio]=useState(eng.summary360Priorities||''‌);
   |                                                                        ^
2236|  
2237|    // Has structured data from stakeholders
    at failureErrorWithLog (/vercel/path0/node_modules/esbuild/lib/main.js:1472:15)
    at /vercel/path0/node_modules/esbuild/lib/main.js:755:50
    at responseCallbacks.<computed> (/vercel/path0/node_modules/esbuild/lib/main.js:622:9)
    at handleIncomingPacket (/vercel/path0/node_modules/esbuild/lib/main.js:677:12)
    at Socket.readFromStdout (/vercel/path0/node_modules/esbuild/lib/main.js:600:7)
    at Socket.emit (node:events:508:28)
    at addChunk (node:internal/streams/readable:563:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:514:3)
    at Readable.push (node:internal/streams/readable:394:5)
    at Pipe.onStreamRead (node:internal/stream_base_commons:189:23)
Error: Command "npm run build" exited with 1
