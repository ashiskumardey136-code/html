const config = window.ADH_AUTH_CONFIG || {};
const signInButton = document.querySelector('#agentid-sign-in');
const signOutButton = document.querySelector('#agentid-sign-out');
const authStatus = document.querySelector('#agentid-status');
const authIdentity = document.querySelector('#agentid-identity');

const configured = Boolean(
  config.supabaseUrl &&
  config.supabaseAnonKey &&
  !config.supabaseUrl.includes('YOUR_PROJECT_REF') &&
  !config.supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')
);

function setStatus(message, tone = 'neutral') {
  if (!authStatus) return;
  authStatus.textContent = message;
  authStatus.dataset.tone = tone;
}

function setSignedOutState() {
  signInButton?.removeAttribute('hidden');
  signOutButton?.setAttribute('hidden', '');
  authIdentity?.setAttribute('hidden', '');
}

function setSignedInState(user) {
  signInButton?.setAttribute('hidden', '');
  signOutButton?.removeAttribute('hidden');
  authIdentity?.removeAttribute('hidden');
  if (authIdentity) {
    authIdentity.textContent = user.email || user.user_metadata?.name || 'Verified AgentID identity';
  }
}

if (!configured) {
  setSignedOutState();
  setStatus('AgentID is ready to connect after Supabase configuration.', 'setup');
} else {
  import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
    .then(({ createClient }) => {
      const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

      const refreshAuthState = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          setSignedOutState();
          setStatus('Secure sign-in available.', 'neutral');
          return;
        }
        setSignedInState(data.user);
        setStatus('AgentID identity verified.', 'success');
      };

      signInButton?.addEventListener('click', async () => {
        signInButton.disabled = true;
        setStatus('Opening AgentID securely…', 'loading');
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'agentid',
          options: { redirectTo: window.location.href }
        });
        if (error) {
          signInButton.disabled = false;
          setStatus(`Sign-in could not start: ${error.message}`, 'error');
        }
      });

      signOutButton?.addEventListener('click', async () => {
        signOutButton.disabled = true;
        const { error } = await supabase.auth.signOut();
        signOutButton.disabled = false;
        if (error) {
          setStatus(`Sign-out failed: ${error.message}`, 'error');
          return;
        }
        setSignedOutState();
        setStatus('Signed out securely.', 'neutral');
      });

      supabase.auth.onAuthStateChange(() => refreshAuthState());
      refreshAuthState();
    })
    .catch(() => setStatus('Authentication service could not load. Please try again.', 'error'));
}
