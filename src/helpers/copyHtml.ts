export async function copyHtmlToClipboard(html: string) {
  const type = "text/html";
  const clipboardItemData = {
    [type]: html,
  };
  const clipboardItem = new ClipboardItem(clipboardItemData);

  await navigator.clipboard.write([clipboardItem]);
}
