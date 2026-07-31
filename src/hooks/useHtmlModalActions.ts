export function useHtmlModalActions(html: string) {
  async function copyHtml() {
    const type = "text/html";
    const clipboardItemData = {
      [type]: html,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);

    await navigator.clipboard.write([clipboardItem]);
  }

  function handleCopyClick() {
    copyHtml().catch((error) => {
      console.error("Failed to copy HTML:", error);
    });
  }

  function handleDownloadClick() {
    const anchor = document.createElement("a");
    const emailBlob = new Blob(
      [
        `data:message/rfc822 eml,\nSubject: Mail\nX-Unsent: 1\nContent-Type: text/html;charset="utf-8"\n\n${html}`,
      ],
      {
        type: "message/rfc822",
      },
    );
    const url = URL.createObjectURL(emailBlob);

    anchor.href = url;
    anchor.download = "email.eml";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return { handleCopyClick, handleDownloadClick };
}
