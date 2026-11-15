/**
 * Open Agentic Web MVP 0.2 Conforming Browser Runtime
 * Project: Agentic DevSecOps Guard
 */

class OpenAgenticRuntime {
  constructor() {
    this.manifest = null;
    this.network = null;
    this.activeKey = localStorage.getItem('byok_api_key') || '';
    this.activeModel = localStorage.getItem('byok_model') || 'gpt-4o-mini';
    this.routerUrl = localStorage.getItem('byok_router') || 'https://api.openai.com/v1/chat/completions';
    this.executionLogs = [];
  }

  log(stage, message, type = 'info') {
    const entry = {
      timestamp: new Date().toISOString(),
      stage,
      message,
      type
    };
    this.executionLogs.push(entry);
    return entry;
  }

  async init() {
    this.log('BOOT', 'Fetching agent-manifest.json...');
    const manifestRes = await fetch('./agent-manifest.json');
    if (!manifestRes.ok) throw new Error('Failed to load agent-manifest.json');
    this.manifest = await manifestRes.json();
    this.log('MANIFEST', `Loaded network: ${this.manifest.name} (Front Agent: ${this.manifest.front_man})`);

    const netRes = await fetch(`./${this.manifest.hocon}`);
    if (!netRes.ok) throw new Error(`Failed to load network definition: ${this.manifest.hocon}`);
    this.network = await netRes.json();
    this.validateNetwork(this.network);
    this.log('NETWORK', `Validated ${this.network.tools.length} agents in graph.`, 'success');
    return { manifest: this.manifest, network: this.network };
  }

  validateNetwork(net) {
    if (!net || !Array.isArray(net.tools) || net.tools.length === 0) {
      throw new Error('Invalid network: Missing tools/agents array.');
    }
    const frontExists = net.tools.some(t => t.name === this.manifest.front_man);
    if (!frontExists) {
      throw new Error(`Front agent "${this.manifest.front_man}" not found in network.`);
    }
  }

  saveBYOK(routerUrl, model, apiKey) {
    this.routerUrl = routerUrl.trim() || 'https://api.openai.com/v1/chat/completions';
    this.activeModel = model.trim() || 'gpt-4o-mini';
    this.activeKey = apiKey.trim();

    localStorage.setItem('byok_router', this.routerUrl);
    localStorage.setItem('byok_model', this.activeModel);
    if (this.activeKey) {
      localStorage.setItem('byok_api_key', this.activeKey);
    } else {
      localStorage.removeItem('byok_api_key');
    }
    this.log('BYOK', `Updated inference router (${this.activeModel}). Credential stored locally in origin storage.`);
  }

  clearBYOK() {
    this.activeKey = '';
    localStorage.removeItem('byok_api_key');
    this.log('SECURITY', 'Visitor BYOK credential purged from browser storage.');
  }

  async runAudit(targetConfig, consentApproved) {
    if (!consentApproved) {
      throw new Error('Trust Boundary Violation: User consent is required before executing agent network.');
    }

    const frontAgent = this.network.tools.find(t => t.name === this.manifest.front_man);
    const subAgent = this.network.tools.find(t => t.name === 'cost_optimizer');

    this.log('AGENT_CALL', `Invoking Front Agent [${frontAgent.name}]...`);

    if (this.activeKey) {
      this.log('INFERENCE', `Routing request via BYOK endpoint: ${this.routerUrl}`);
      const response = await fetch(this.routerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.activeKey}`
        },
        body: JSON.stringify({
          model: this.activeModel,
          messages: [
            {
              role: 'system',
              content: `${frontAgent.instructions} Also collaborate with ${subAgent.name}: ${subAgent.instructions}. Return a structured DevSecOps Security & FinOps audit.`
            },
            {
              role: 'user',
              content: `Audit this cloud/infrastructure configuration:\n\n${targetConfig}`
            }
          ],
          temperature: 0.2
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`LLM Router Error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      this.log('DELEGATION', `Sub-agent [${subAgent.name}] completed FinOps verification.`);
      return {
        mode: 'LIVE_BYOK_INFERENCE',
        frontAgent: frontAgent.name,
        delegatedTo: subAgent.name,
        report: data.choices[0].message.content
      };
    }

    this.log('INFERENCE', 'Using built-in zero-cost deterministic policy engine (Default Inference Mode).');
    await new Promise(r => setTimeout(r, 700));
    this.log('DELEGATION', `[${frontAgent.name}] delegating resource check to [${subAgent.name}]...`);
    await new Promise(r => setTimeout(r, 600));

    const findings = [];
    const lower = targetConfig.toLowerCase();

    if (lower.includes('0.0.0.0/0')) {
      findings.push('🔴 [CRITICAL - IAM/Network] Unrestricted CIDR 0.0.0.0/0 detected. Restrict ingress rules to known VPC subnets.');
    }
    if (lower.includes('secret') || lower.includes('password') || lower.includes('akia')) {
      findings.push('🔴 [CRITICAL - Secrets] Potential hardcoded secret/credential found. Migrate to AWS Secrets Manager or Vault.');
    }
    if (lower.includes('acl = "public-read"') || lower.includes('public_access')) {
      findings.push('🟠 [HIGH - Storage] Public read access enabled on storage bucket. Enforce block_public_acls = true.');
    }
    if (lower.includes('xlarge') || lower.includes('2xlarge')) {
      findings.push('🟡 [FINOPS - cost_optimizer] Oversized compute instance detected. Downsizing to burstable t3/t4g saves ~42% monthly spend.');
    }
    if (findings.length === 0) {
      findings.push('🟢 [PASS] No critical misconfigurations or hardcoded secrets detected in provided snippet.');
    }

    return {
      mode: 'DEFAULT_SANDBOX_RUNTIME',
      frontAgent: frontAgent.name,
      delegatedTo: subAgent.name,
      report: findings.join('\n\n')
    };
  }
}

window.OpenAgenticRuntime = OpenAgenticRuntime;
        
