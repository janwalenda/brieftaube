"use client"
import { IoClipboard, IoCode, IoDownload, IoSave } from "react-icons/io5";
import Button from "../../Base/components/Button";
import { InputVariant } from "../../Base/types/InputVariant";
import { IoMdPaper } from "react-icons/io";
import Modal from "../../Base/components/Modal";
import { useRef, useState } from "react";
import { useField } from "../../../hooks/useField";
import { usePreset } from "../../../hooks/usePreset";
import { Input } from "@/components/Base"
import { useTranslate } from "@/hooks/useTranslate";
import { InputForm } from "@/components/Base/types/InputForm";

export default function Dock() {
  const [html, setHTML] = useState<string>("");
  const { renderHTML, mail } = useField();
  const [presetName, setPresetName] = useState(mail.title);
  const { addPreset } = usePreset();
  const { t } = useTranslate();

  const htmlRef = useRef<HTMLDialogElement>(null);
  const previewRef = useRef<HTMLDialogElement>(null);
  const saveRef = useRef<HTMLDialogElement>(null);


  return (
    <>
      <nav className="fixed bottom-4 left-1/2 transform-[translate(-50%,0)] flex flex-row gap-2 bg-base-100/30 backdrop-blur-lg rounded-full items-center p-2 hover:opacity-100 justify-center border border-primary">
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
      </nav>
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
              const emailBlob = new Blob([`data:message/rfc822 eml,\nSubject: ${mail.title}\nX-Unsent: 1\nContent-Type: text/html;charset="utf-8"\n\n${html}`], {
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
      <Modal title={t('dock.save.title')} ref={saveRef} className="[&>.modal-box]:w-auto">
        <Input variant={InputVariant.Primary} defaultValue={presetName} onChange={(e) => {
          setPresetName(e.target.value);
        }} />
        <form method="dialog" className="modal-action">
          <Button variant={InputVariant.Primary}
            onClick={handleSavePreset}
          >Speichern</Button>
          <Button>Abbrechen</Button>
        </form>
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

  function handleSavePreset() {
    addPreset(presetName);
  }
}
