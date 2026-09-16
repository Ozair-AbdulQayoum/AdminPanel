import { loginFooterData } from "./LoginFooterData";

export default function LoginFooter() {
  return (
    <footer className="mt-6 text-center">
      <p className="text-sm font-medium text-slate-600">
        {loginFooterData.text}
      </p>

      <p className="mt-1 text-xs text-slate-400">{loginFooterData.copyright}</p>
    </footer>
  );
}
