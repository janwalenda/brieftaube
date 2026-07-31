import { Link } from "@/i18n/navigation";

export function AppFooter({ version }: { version: string }) {
  return (
    <footer className="w-full flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full">
        <p>
          <small>
            An app developed by{" "}
            <b>
              <Link href="https://www.janwalenda.de" className="link">
                Jan Walenda
              </Link>
            </b>
          </small>
        </p>
        <p>
          <small>
            <Link
              href="https://github.com/janwalenda/brieftaube/releases"
              className="link"
            >
              Version {version}
            </Link>
          </small>
        </p>
      </div>
    </footer>
  );
}
