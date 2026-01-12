import { marked } from "marked";
import { Field } from "../types/Field";
import { FieldType } from "../types/FieldType";
import { TextBlockStyle } from "@/types/TextBlockStyle";

export default class Email {
  private document = document.implementation.createHTMLDocument();
  private body = this.document.body;
  private container = this.document.createElement("div");
  private primaryColor = "#ff0000"
  private roundedCorners = 0.25;

  private prepareBody() {
    this.body.style.fontFamily = "Arial, sans-serif";
    this.body.style.lineHeight = "1.6";
    this.body.style.color = "#333";
    this.body.style.margin = "0";
    this.body.style.padding = "0";
  }

  private static getContrastColor(color: string) {
    const rgb = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (!rgb) return "#000";
    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? "#000" : "#fff";
  }

  private prepareContainer() {
    this.container.style.fontSize = "1rem";
    this.container.style.maxWidth = "600px";
    this.container.style.margin = "20px auto";
    this.container.style.padding = "20px";
    this.container.style.border = "1px solid #ddd";
    this.container.style.borderRadius = `${this.roundedCorners}rem`;
    this.container.style.backgroundColor = "#fff";

    this.body.appendChild(this.container);
  }

  constructor(color: string, roundedCorners: number) {
    this.primaryColor = color;
    this.roundedCorners = roundedCorners;
    this.prepareBody();
    this.prepareContainer();
  }


  appendFields(fields: Field[]) {
    fields.forEach(field => {
      switch (field.type) {
        case FieldType.Image:
          this.appendImage(field.url, field.width);
          break;
        case FieldType.TextBlock:
          this.appendTextBlock(field.content, field.style);
          break;
        case FieldType.Button:
          this.appendButton(field.content, field.href);
          break;
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

  appendDivider() {
    const divider = this.document.createElement("hr");
    this.container.appendChild(divider);
  }

  appendButton(content: string = "", href: string = "#") {
    const button = this.document.createElement("a");
    button.href = href;
    button.style.backgroundColor = this.primaryColor;
    button.style.color = Email.getContrastColor(this.primaryColor);
    button.style.border = "none";
    button.style.borderRadius = `${this.roundedCorners}rem`;
    button.style.padding = "1rem 2rem";
    button.style.cursor = "pointer";
    button.innerHTML = content;

    this.container.appendChild(button);
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
      if (!(strong instanceof HTMLElement)) {
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
