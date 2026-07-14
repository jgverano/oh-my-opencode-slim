type AgentPermission = Record<
  string,
  'allow' | 'ask' | 'deny' | Record<string, 'allow' | 'ask' | 'deny'>
>;

/**
 * Strict read-only tool permissions for advisory agents.
 *
 * Start with wildcard deny so newly-added tools are unavailable by default,
 * then allow only inspection/search tools. Explicitly deny known mutating and
 * delegation tools to make the read-only boundary obvious in generated config.
 */
export function createReadOnlyAgentPermission(): AgentPermission {
  return {
    '*': 'deny',
    bash: 'deny',
    edit: 'deny',
    write: 'deny',
    apply_patch: 'deny',
    ast_grep_replace: 'deny',
    task: 'deny',
    question: 'deny',
    read: 'allow',
    glob: 'allow',
    grep: 'allow',
    lsp: 'allow',
    list: 'allow',
    codesearch: 'allow',
    ast_grep_search: 'allow',
  } as AgentPermission;
}

/**
 * Coordinator-only tool permissions for the orchestrator.
 *
 * The orchestrator must delegate all execution and is forbidden from doing raw
 * work itself: it has NO read, write, edit, shell, or exploration tools. It can
 * only delegate via the `task` tool (and ask questions / cancel tasks, which are
 * layered on later by `applyDefaultPermissions`). Wildcard deny ensures any
 * newly-added tools stay unavailable by default; read/write/search/shell tools
 * are denied explicitly to make the coordinator boundary obvious in config.
 */
export function createCoordinatorAgentPermission(): AgentPermission {
  return {
    '*': 'deny',
    bash: 'deny',
    read: 'deny',
    edit: 'deny',
    write: 'deny',
    apply_patch: 'deny',
    ast_grep_replace: 'deny',
    glob: 'deny',
    grep: 'deny',
    lsp: 'deny',
    list: 'deny',
    codesearch: 'deny',
    ast_grep_search: 'deny',
    task: 'allow',
  } as AgentPermission;
}
