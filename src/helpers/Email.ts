import { marked } from "marked";
import { Field } from "../types/Field";
import { FieldType } from "../types/FieldType";
import { TextBlockStyle } from "@/types/TextBlockStyle";

export default class Email {
  private document = document.implementation.createHTMLDocument();
  private body = this.document.body;
  private container = this.document.createElement("div");
  private primaryColor = "#ff0000"

  private prepareBody() {
    this.body.style.fontFamily = "Arial, sans-serif";
    this.body.style.lineHeight = "1.6";
    this.body.style.color = "#333";
    this.body.style.margin = "0";
    this.body.style.padding = "0";
  }

  private prepareContainer() {
    this.container.style.maxWidth = "600px";
    this.container.style.margin = "20px auto";
    this.container.style.padding = "20px";
    this.container.style.border = "1px solid #ddd";
    this.container.style.borderRadius = "8px";
    this.container.style.backgroundColor = "#fff";

    this.body.appendChild(this.container);
  }

  constructor(color: string) {
    this.prepareBody();
    this.prepareContainer();
    this.primaryColor = color;
  }


  appendFields(fields: Field[]) {
    fields.forEach(field => {
      switch (field.type) {
        case FieldType.Image:
          this.appendImage(field.url, field.width);
          break;
        case FieldType.TextBlock:
          this.appendTextBlock(field.content, field.style);
      }
    });
  }

  appendImage(url: string = '', width: string = "6rem") {
    const image = new Image();

    image.src = url;
    image.style.width = width;
    image.alt = "Logo Image"

    image.onerror = function () {
      // Fallback for broken images
      this.onerror = null;
      this.src =
        "https://placehold.co/600x150/cccccc/000000?text=Bild+nicht+verfügbar";
      this.alt = "Bild nicht verfügbar";
    };

    this.container.appendChild(image);
  }

  appendTextBlock(content: string = "", style: TextBlockStyle = TextBlockStyle.Default) {
    console.log("Appending TextBlock with style:", style);
    const article = this.document.createElement("article");
  
    article.innerHTML = marked.parse(content, {
      breaks: true,
    }) as string;

    switch (style) {
      case TextBlockStyle.Signature: {
        article.style.marginTop = "20px";
        article.style.fontSize = "0.9em";
        article.style.color = "#777";
        article.style.borderTop = "1px solid #eee";
        article.style.paddingTop = "10px";

        break;
      }

      case TextBlockStyle.Disclaimer: {
        article.style.marginTop = "20px";
        article.style.fontSize = "0.9em";
        article.style.color = "#777";
        article.style.textAlign = "center";
        article.style.borderTop = "1px solid #eee";
        article.style.paddingTop = "10px";

        break
      }

      case TextBlockStyle.Default:
      default: {
        article.style.marginBottom = "15px";

        break;
      }
    }
    
    article.querySelectorAll('strong,h1,h2,h3,h4,h5,h6,a').forEach((strong) => {
      if(!(strong instanceof HTMLElement)) {
        return;
      }

      strong.style.color = this.primaryColor;
    });
  
    return this.container.appendChild(article);
  }

  render(): string {
    return `${this.document.documentElement.outerHTML}`
  }
}
