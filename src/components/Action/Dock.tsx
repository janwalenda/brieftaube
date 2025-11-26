"use client"
import { IoClipboard, IoCode, IoDownload, IoSave } from "react-icons/io5";
import { IoMdPaper } from "react-icons/io";
import { useRef, useState } from "react";
import { useField } from "../../hooks/useField";
import { useTranslate } from "@/hooks/useTranslate";
import { Button, InputForm, InputVariant, Modal, Dock } from "@/components/UI";


export default function ActionDock() {
  const [html, setHTML] = useState<string>("");
  const { renderHTML } = useField();
  const { t } = useTranslate();

  const htmlRef = useRef<HTMLDialogElement>(null);
  const previewRef = useRef<HTMLDialogElement>(null);
  const saveRef = useRef<HTMLDialogElement>(null);


  return (
    <>
      <Dock>
        <Button 
          variant={InputVariant.Primary}
          form={InputForm.Circle}
          onClick={handleHTMLClick}
          className="rounded-full"
          tooltip={t('dock.code')}
        >
          <IoCode className="size-4" />
        </Button>
        <Button
          variant={InputVariant.Primary}
          form={InputForm.Circle}
          onClick={handlePreviewClick}
          className="rounded-full"
          tooltip={t('dock.preview')}
        >
          <IoMdPaper className="size-4" />
        </Button>
        <Button 
          variant={InputVariant.Primary}
          form={InputForm.Circle}
          onClick={handleOpenSaveClick}
          className="rounded-full"
          tooltip={t('dock.save')}
          >
          <IoSave className="size-4" />
        </Button>
      </Dock>
      <Modal title={t('dock.copy.title')} ref={htmlRef}>
        <div className="flex flex-row gap-2 sticky w-full items-center justify-start mb-4">
          <Button variant={InputVariant.Primary}
            title={t('copy')}
            onClick={handleCopyClick}
            tooltip={t('copy')}
          >
            <IoClipboard />
          </Button>
          <Button variant={InputVariant.Secondary}
            title={t('download')}
            onClick={() => {
              const anchor = document.createElement('a');
              const emailBlob = new Blob([`data:message/rfc822 eml,\nSubject: Mail\nX-Unsent: 1\nContent-Type: text/html;charset="utf-8"\n\n${html}`], {
                type: 'message/rfc822'
              });
              const url = URL.createObjectURL(emailBlob);
              
              anchor.href = url;
              anchor.download = 'email.eml';

              document.body.appendChild(anchor);
            
              anchor.click();
              anchor.remove();
            }}
            tooltip={t('download')}
          >
            <IoDownload/>
          </Button>

        </div>
        <div className="mockup-code w-full mb-4">
          <div className="p-4 flex flex-row items-center justify-between">
            <code>
              {html}
            </code>
          </div>
        </div>
      </Modal>
      <Modal title={t('dock.preview.title')} ref={previewRef}>
        <div className="sm:mockup-window bg-base-100 sm:border border-base-200">
          <div className="sm:p-4">
            <iframe srcDoc={html} className="w-full h-[80vh] border-0" title="E-Mail Vorschau"></iframe>
          </div>
        </div>
      </Modal>
    </>
  )

  function handleCopyClick() {
    navigator.clipboard.writeText(html);
  }

  function handleHTMLClick() {
    const generatedHTML = renderHTML();
    setHTML(generatedHTML);

    if (htmlRef.current) {
      htmlRef.current.showModal();
    }
  }

  function handlePreviewClick() {
      const generatedHTML = renderHTML();
      setHTML(generatedHTML);

      if (previewRef.current) {
        previewRef.current.showModal();
      }

  }

  function handleOpenSaveClick() {
    if(saveRef.current) {
      saveRef.current.showModal()
    }
  }
}
