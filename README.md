# 🛡️ Agentic DevSecOps Guard — MVP 0.2
### Zero-Trust In-Browser Multi-Agent Cloud Auditor & Federated Policy Mesh

**Live App:** https://shehrozali12-droid.github.io/open-agentic-devsecops/

**Scan Terraform in your browser. No server. No data leaves your device.**

## Problem
Developers deploy Terraform without checking: Port 22 / 0.0.0.0/0 open to internet, hardcoded secrets, oversized EC2 wasting ~40% spend. Old tools send your private code to a server. We fixed it in the browser.

## What It Does
- **security_auditor:** Finds 0.0.0.0/0, hardcoded secrets, IAM misconfig
- **cost_optimizer:** Finds oversized compute, suggests t3/t4g, saves ~42%
- **federated_peer_auditor:** Real HTTPS handshake with other agentic websites via agent-manifest.json

## Key Features
- 100% Client-Side Zero-Trust, No Backend, No Database
- Multi-Agent Delegation: security_auditor -> cost_optimizer
- Inter-Agent Federation LIVE, One-click Sync Mesh
- BYOK: Plug your own OpenAI-compatible key, stays in localStorage only
- Enterprise Dashboard: Security Score 0-100, CRITICAL / FINOPS Cards, Copy Fix
- Trust Boundary Consent before any execution

## System Architecture
User Paste Terraform -> Trust Boundary Consent -> security_auditor -> delegates -> cost_optimizer -> federated_peer_auditor -> External Website -> Observable Trace + Score + Fix Cards

## Files
- index.html = Dashboard + Federation Panel
- agent-manifest.json = MVP 0.2 Manifest
- devsecops-network.network.json = Multi-Agent Graph
- runtime.js = Engine + Federation Protocol

## How To Test Federation (30 sec)
Open Live App -> Scroll to Federation -> Click USE MY SITE -> Click Sync Mesh -> You will see SECURE_FEDERATION_ESTABLISHED

## Local Run
git clone https://github.com/muhammadshehrozali12-droid/open-agentic-devsecops.git
Open index.html

## Conformance
MVP 0.2 Conforming: Public manifest, network.json, runtime.js, UI for users + agents, BYOK UI, Can call / be called by other agents.

## Built For
Open Agentic Web Challenge - Cognizant, MIT NANDA, Mozilla Otari, AWS

## Author
Shehroz Ali - DevSecOps Practitioner | DIT Topper | Gujranwala, Pakistan
GitHub: @muhammadshehrozali12-droid

## License
MIT - Free to use, fork and build on top.
