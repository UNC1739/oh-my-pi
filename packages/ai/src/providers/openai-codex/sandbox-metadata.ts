/**
 * Optional Codex turn metadata for hosts that already run omp inside an
 * externally enforced sandbox.
 *
 * This does not create a sandbox or approval reviewer. It only mirrors the
 * metadata Codex expects when another host owns that boundary, so models such
 * as `gpt-5.6-cyber` can distinguish a reviewed external sandbox from
 * unrestricted local execution.
 */

export interface CodexSandboxMetadata {
	readonly sandbox: "external";
	readonly sandboxMode: "external-sandbox";
}

const EXTERNAL_SANDBOX_METADATA: CodexSandboxMetadata = {
	sandbox: "external",
	sandboxMode: "external-sandbox",
};

/** Process-wide default for requests that leave `codexExternalSandbox` unset. */
let externalSandboxDefault = false;

/**
 * Set the process-wide default for requests that leave `codexExternalSandbox`
 * unset. Session requests can still opt out per call.
 */
export function configureCodexExternalSandbox(enabled: boolean): void {
	externalSandboxDefault = enabled;
}

/** Resolve the metadata bundle for one request. */
export function resolveCodexExternalSandbox(requested: boolean | undefined): CodexSandboxMetadata | undefined {
	return (requested ?? externalSandboxDefault) ? EXTERNAL_SANDBOX_METADATA : undefined;
}
