import LanguageDropdown from './LanguageDropdown';

export default function Topbar() {
  return (
    <header className="shadow bg-surface border-b border-theme">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-end">
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
} 