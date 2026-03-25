/**
 * Same-page transport branch: show one panel per selected radio (spec §5).
 */
export function initTransportBranch(root: HTMLElement): void {
  const sync = (): void => {
    const selected = root.querySelector<HTMLInputElement>(
      'input[name="transport-branch"]:checked',
    )?.value;
    root.querySelectorAll<HTMLElement>("[data-transport-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.transportPanel !== selected;
    });
  };

  root.querySelectorAll('input[name="transport-branch"]').forEach((input) => {
    input.addEventListener("change", sync);
  });
  sync();
}
