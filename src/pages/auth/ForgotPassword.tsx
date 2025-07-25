import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a password reset email
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-theme">
              {t('auth.checkEmail')}
            </h2>
            <p className="mt-2 text-sm text-secondary">
              {t('auth.resetEmailSent')}
            </p>
            <div className="mt-4">
              <Link
                to="/auth/signin"
                className="text-primary hover:text-primary-dark"
              >
                {t('auth.backToSignIn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-theme">
            {t('auth.forgotPassword')}
          </h2>
          <p className="mt-2 text-center text-sm text-secondary">
            {t('auth.forgotPasswordDescription')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              {t('auth.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input relative block w-full px-3 py-2 border border-theme placeholder-gray-500 text-theme rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder={t('auth.email')}
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {t('auth.sendResetLink')}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/auth/signin"
              className="text-primary hover:text-primary-dark text-sm"
            >
              {t('auth.backToSignIn')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 