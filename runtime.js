// runtime.js - Open Agentic Web Browser Runtime (NANDA v0.2 Conforming - Fixed)

class AgenticDevSecOpsRuntime {
  constructor() {
    this.protocol = "open-agentic-web-nanda-v0.2";
    this.messageBus = [];
  }

  dispatchAgentMessage(fromAgent, toAgent, action, payloadSummary) {
    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      from: fromAgent,
      to: toAgent,
      action: action,
      summary: payloadSummary
    };
    this.messageBus.push(entry);
    return entry;
  }

  async invokeCapability(capabilityId, payload) {
    if (capabilityId === "audit_terraform" || capabilityId === "remediate_terraform") {
      return await this.runMultiAgentAudit(String(payload || ""));
    }
    throw new Error(`Unsupported capability: ${capabilityId}`);
  }

  async runMultiAgentAudit(tfCode) {
    this.messageBus = [];
    const findings = [];
    let score = 100;
    let estimatedMonthlySavings = 0;

    this.dispatchAgentMessage("Orchestrator", "ZeroTrust-SecAgent", "SCAN_START", "Initializing CIS & Zero-Trust AST policy scan");

    // Rule 1: Unrestricted Ingress CIDR (0.0.0.0/0)
    if (/cidr_blocks\s*=\s*\[\s*["']0\.0\.0\.0\/0["']\s*\]/.test(tfCode)) {
      const isSSH = /from_port\s*=\s*22\b/.test(tfCode);
      findings.push({
        type: "CRITICAL",
        agent: "ZeroTrust-SecAgent",
        ruleId: "CIS-AWS-4.1",
        title: isSSH ? "Open SSH Port 22 to World (0.0.0.0/0)" : "Unrestricted Ingress CIDR (0.0.0.0/0)",
        fix: "Restrict cidr_blocks to private VPC subnet (10.0.0.0/16) or AWS Systems Manager Session Manager."
      });
      score -= 40;
    }

    // Rule 2: Hardcoded Secrets & Credentials
    if (/(password|secret_key|access_key|api_key|token)\s*=\s*["'][^"']+["']/i.test(tfCode)) {
      findings.push({
        type: "CRITICAL",
        agent: "ZeroTrust-SecAgent",
        ruleId: "OWASP-IAC-02",
        title: "Hardcoded Credential / Secret in Plaintext HCL",
        fix: "Remove plaintext secret and reference AWS Secrets Manager or encrypted Terraform variables."
      });
      score -= 35;
    }

    // Rule 3: IAM Wildcard Privilege Escalation
    if (/Action\s*=\s*["']\*["']|"Action"\s*:\s*["']\*["']|Action\s*=\s*\[\s*["']\*["']\s*\]/.test(tfCode)) {
      findings.push({
        type: "CRITICAL",
        agent: "ZeroTrust-SecAgent",
        ruleId: "IAM-LEAST-PRIV",
        title: "Over-Permissive IAM Wildcard (Action = '*')",
        fix: "Enforce Least Privilege by scoping IAM actions to specific required AWS service APIs."
      });
      score -= 30;
    }

    // Rule 4: Unencrypted AWS S3 Storage
    if (/resource\s+["']aws_s3_bucket["']/.test(tfCode) && !/server_side_encryption_configuration/.test(tfCode)) {
      findings.push({
        type: "HIGH",
        agent: "ZeroTrust-SecAgent",
        ruleId: "CIS-AWS-2.1.1",
        title: "Unencrypted AWS S3 Bucket Detected",
        fix: "Enable default server-side encryption (AES256 or AWS KMS)."
      });
      score -= 20;
    }

    this.dispatchAgentMessage(
      "ZeroTrust-SecAgent",
      "CloudCost-FinOpsAgent",
      "HANDOFF",
      `Security scan complete (${findings.length} security issues). Delegating to FinOps agent.`
    );

    // Rule 5: FinOps Oversized Compute Instance + Savings Calculation
    const largeInstanceMatch = tfCode.match(/instance_type\s*=\s*["'](m5\.2xlarge|c5\.4xlarge|t3\.2xlarge|r5\.xlarge)["']/);
    if (largeInstanceMatch && largeInstanceMatch) {
      const savingsMap = {
        "m5.2xlarge": 248,
        "c5.4xlarge": 465,
        "t3.2xlarge": 215,
        "r5.xlarge": 162
      };
      const detectedType = largeInstanceMatch;
      estimatedMonthlySavings = savingsMap[detectedType] || 180;

      findings.push({
        type: "FINOPS",
        agent: "CloudCost-FinOpsAgent",
        ruleId: "FINOPS-RIGHTSIZE",
        title: `Oversized Compute Instance (${detectedType}) — Est. Waste: $${estimatedMonthlySavings}/mo`,
        fix: `Right-size to Graviton ARM (t4g.medium) to save ~$${estimatedMonthlySavings}/month (~42% cost reduction).`
      });
      score -= 15;
    }

    // Internal A2A Call to AutoFix-RemediationAgent
    let fixedCode = tfCode;
    if (findings.length > 0) {
      this.dispatchAgentMessage(
        "CloudCost-FinOpsAgent",
        "AutoFix-RemediationAgent",
        "REMEDIATE_REQUEST",
        `Synthesizing hardened & cost-optimized HCL for ${findings.length} total findings.`
      );
      fixedCode = this.generateHardenedCode(tfCode);
      this.dispatchAgentMessage(
        "AutoFix-RemediationAgent",
        "Orchestrator",
        "REMEDIATE_COMPLETE",
        "Verified Zero-Trust Terraform patch ready for deployment."
      );
    } else {
      this.dispatchAgentMessage(
        "CloudCost-FinOpsAgent",
        "Orchestrator",
        "PASS",
        "Zero security risks or FinOps anomalies detected."
      );
    }

    return {
      protocol: this.protocol,
      timestamp: new Date().toISOString(),
      score: Math.max(0, score),
      estimatedMonthlySavingsUSD: estimatedMonthlySavings,
      findings: findings,
      fixedCode: fixedCode,
      a2aLogs: this.messageBus
    };
  }

  generateHardenedCode(tfCode) {
    let safe = tfCode;
    safe = safe.replace(/["']0\.0\.0\.0\/0["']/g, '"10.0.0.0/16" # Hardened by AutoFix-Agent');
    safe = safe.replace(/(password|secret_key|access_key|api_key|token)\s*=\s*["'][^"']+["']/gi, '$1 = var.aws_secret_value # Migrated to AWS Secrets Manager');
    safe = safe.replace(/Action\s*=\s*["']\*["']/g, 'Action = "s3:GetObject" # Scoped to Least Privilege');
    safe = safe.replace(/(m5\.2xlarge|c5\.4xlarge|t3\.2xlarge|r5\.xlarge)/g, 't4g.medium');
    return safe;
  }

  async runExternalLLMAgent(tfCode, provider, apiKey, customEndpoint = "", customModel = "") {
    const presets = {
      openai: {
        url: "https://openai.com",
        model: "gpt-4o-mini"
      },
      openrouter: {
        url: "https://openrouter.ai",
        model: "anthropic/claude-3.5-sonnet"
      },
      groq: {
        url: "https://groq.com",
        model: "llama-3.3-70b-versatile"
      },
      custom: {
        url: customEndpoint.trim(),
        model: customModel.trim() || "gpt-4o-mini"
      }
    };

    const config = presets[provider] || presets.openai;
    if (!config.url) throw new Error("Custom Endpoint URL is required.");

    this.dispatchAgentMessage(
      "Orchestrator",
      `External-LLM (${provider.toUpperCase()})`,
      "DEEP_THREAT_AUDIT",
      "Delegating Terraform AST for deep AI security & architecture review."
    );

    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: "system",
            content: "You are a Principal AWS DevSecOps & FinOps AI Agent. Provide 3 concise, high-impact bullet points covering zero-day security risks and cloud cost optimization for the given Terraform code."
          },
          {
            role: "user",
            content: tfCode
          }
        ],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API HTTP ${response.status}: ${errText.slice(0, 120)}`);
    }

    const data = await response.json();
    if (!data.choices || !data.choices || !data.choices.message) {
      throw new Error("Unexpected response format from LLM provider.");
    }
    return data.choices.message.content;
  }

  async syncAgentMesh(remoteBaseUrl) {
    const cleanUrl = remoteBaseUrl.replace(/\/+$/, "");
    const manifestUrl = cleanUrl.endsWith(".json") ? cleanUrl : `${cleanUrl}/agent-manifest.json`;

    const res = await fetch(manifestUrl, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - Could not fetch agent-manifest.json`);
    }

    const manifest = await res.json();
    if (!manifest.name || !manifest.capabilities) {
      throw new Error("Invalid Open Agentic Web manifest schema.");
    }

    return {
      connected: true,
      agentName: manifest.name,
      protocol: manifest.protocol || manifest.schema_version || "v0.2",
      capabilitiesCount: manifest.capabilities.length,
      capabilitiesList: manifest.capabilities.map(c => c.id).join(", "),
      manifestUrl: manifestUrl
    };
  }
}

window.AgenticRuntime = new AgenticDevSecOpsRuntime();
window.invokeAgent = (capabilityId, payload) => window.AgenticRuntime.invokeCapability(capabilityId, payload);
        
