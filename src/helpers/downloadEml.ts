export function downloadEml(html: string, filename: string = "email.eml") {
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
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
