import { marked } from "marked";
import { Field } from "../components/Base/types/Field";
import { FieldType } from "../components/Base/types/FieldType";

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

  private prepareContainer(){
    this.container.style.maxWidth = "600px";
    this.container.style.margin = "20px auto";
    this.container.style.padding = "20px";
    this.container.style.border = "1px solid #ddd";
    this.container.style.borderRadius = "8px";
    this.container.style.backgroundColor = "#fff";

    this.body.appendChild(this.container);
  }

  constructor() {
    this.prepareBody();
    this.prepareContainer();
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

  appendMainTitle(title: string) {
    const titleElement = this.document.createElement('h1');

    titleElement.textContent = title;
    titleElement.style.color = "#ff0000";

    this.container.appendChild(titleElement);
  }

  appendGreeting(greeting: string) {
    const pGreeting = this.document.createElement("p");
    pGreeting.style.marginBottom = "15px";
    pGreeting.textContent = greeting;
    this.container.appendChild(pGreeting);
  }

  appendMainBody(mainBodyContent: string){
    const articleMainBody = this.document.createElement("article");
    articleMainBody.style.marginBottom = "15px";
    articleMainBody.innerHTML = marked.parse(mainBodyContent) as string;

    articleMainBody.querySelectorAll('strong').forEach((strong) => {
      strong.style.color = this.primaryColor;
    });

    this.container.appendChild(articleMainBody);
  }

  appendFields(fields: Field[]) {
    fields.forEach(field => {
      switch (field.type) {
        case FieldType.Image:
          this.appendImage(field.url, field.width);
          break;
        case FieldType.TextBlock:
          this.appendTextBlock(field.title, field.content)
      }
    });
  }

  appendTextBlock(title: string = "", content: string = "") {
    const h2Title = this.document.createElement('h2');
    h2Title.textContent = title;
    h2Title.style.color = this.primaryColor;

    const articleContent = this.document.createElement('article');
    articleContent.style.marginBottom = "15px";
    
    articleContent.innerHTML = marked.parse(content) as string;

    articleContent.querySelectorAll('strong').forEach((strong) => {
      strong.style.color = this.primaryColor;
    });

    this.container.appendChild(h2Title);
    this.container.appendChild(articleContent);
  }

  appendClosing(closing: string) {
    const pClosing = this.document.createElement("p");
    pClosing.style.marginTop = "20px";
    pClosing.textContent = closing;
    this.container.appendChild(pClosing);
  }

  appendSender(sender: string, role?: string) {
    const pSender = this.document.createElement("p");
    pSender.style.marginBottom = "0";
    pSender.textContent = sender;

    if (role) {
      pSender.appendChild(this.document.createElement("br"));
      pSender.appendChild(this.document.createTextNode(role));
    }

    this.container.appendChild(pSender);
  }

  appendDisclaimer(disclaimer: string) {
    const divFooter = this.document.createElement("div");
    divFooter.style.marginTop = "20px";
    divFooter.style.fontSize = "0.9em";
    divFooter.style.color = "#777";
    divFooter.style.textAlign = "center";
    divFooter.style.borderTop = "1px solid #eee";
    divFooter.style.paddingTop = "10px";
    divFooter.textContent = disclaimer;
    this.container.appendChild(divFooter);
  }

  render(): string {
    return `${this.document.body.innerHTML}`
  }
}
