import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Avatar, LinearProgress, Tabs, Tab, Checkbox, FormControlLabel, Link, Grid, Divider, IconButton, InputAdornment, Alert } from '@mui/material';
import { LockOutlined, Email, PersonAdd, Visibility, VisibilityOff, Google, Facebook, Apple } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { login, signup, socialLogin } = useAuth();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    // Simple password strength calculation
    let strength = 0;
    if (value.length > 5) strength += 1;
    if (value.length > 8) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[^A-Za-z0-9]/.test(value)) strength += 1;
    setPasswordStrength(strength * 20); // Convert to percentage
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        if (!captchaChecked) {
          setError('Please verify the captcha.');
          return;
        }
        await login({ email, password });
        setSuccess('Login successful!');
      } else if (mode === 'signup') {
        if (!acceptTerms) {
          setError('Please accept the terms and conditions.');
          return;
        }
        if (!captchaChecked) {
          setError('Please verify the captcha.');
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await signup({ email, password });
        setSuccess('Account created successfully! Please check your email to verify your account.');
      } else if (mode === 'forgot') {
        // In a real app, you would call your forgot password API here
        console.log('Password reset email sent to:', email);
        setSuccess('Password reset link sent to your email if an account exists.');
      }
    } catch (error) {
      setError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    socialLogin(provider);
  };

  return (
    <Container component="main" maxWidth="xs" className="auth-container">
      <Box className="auth-paper">
        <Avatar className="auth-avatar">
          {mode === 'login' ? <LockOutlined /> : mode === 'signup' ? <PersonAdd /> : <Email />}
        </Avatar>
        <Typography component="h1" variant="h5" className="auth-title">
          {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Forgot Password'}
        </Typography>

        <Tabs
          value={mode}
          onChange={(_, val) => {
            setMode(val);
            setCaptchaChecked(false);
            setAcceptTerms(false);
            setError('');
            setSuccess('');
          }}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          className="auth-tabs"
        >
          <Tab label="Login" value="login" className="auth-tab" />
          <Tab label="Sign Up" value="signup" className="auth-tab" />
          <Tab label="Forgot" value="forgot" className="auth-tab" />
        </Tabs>

        {(mode === 'login' || mode === 'signup') && (
          <Box className="auth-social-login">
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  className="auth-social-button"
                  startIcon={<Google />}
                  onClick={() => handleSocialLogin('google')}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  className="auth-social-button"
                  startIcon={<Facebook />}
                  onClick={() => handleSocialLogin('facebook')}
                >
                  Facebook
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  className="auth-social-button"
                  startIcon={<Apple />}
                  onClick={() => handleSocialLogin('apple')}
                >
                  Apple
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {(mode === 'login' || mode === 'signup') && (
          <Divider className="auth-divider">OR</Divider>
        )}

        {error && (
          <Alert severity="error" className="auth-alert">
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" className="auth-alert">
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} className="auth-form">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            className="auth-textfield"
          />
          {mode !== 'forgot' && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              className="auth-textfield"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      className="auth-password-toggle"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          {mode === 'signup' && passwordStrength > 0 && (
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              className="auth-password-strength"
              color={
                passwordStrength < 40
                  ? 'error'
                  : passwordStrength < 70
                  ? 'warning'
                  : 'success'
              }
            />
          )}
          {mode === 'signup' && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              className="auth-textfield"
            />
          )}

          {mode === 'signup' && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" className="auth-terms-text">
                  I accept the{' '}
                  <Link href="/terms" className="auth-link">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="auth-link">
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
          )}

          {(mode === 'signup' || mode === 'login') && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={captchaChecked}
                  onChange={(e) => setCaptchaChecked(e.target.checked)}
                  color="primary"
                />
              }
              label="I am not a robot"
            />
          )}

          {loading && <LinearProgress />}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="auth-submit-button"
            disabled={loading}
          >
            {mode === 'login'
              ? 'Login'
              : mode === 'signup'
              ? 'Create Account'
              : 'Send Reset Link'}
          </Button>

          <Grid container justifyContent="flex-end" className="auth-footer-links">
            <Grid item>
              {mode === 'login' ? (
                <>
                  <Link
                    href="#"
                    variant="body2"
                    className="auth-link"
                    onClick={() => setMode('forgot')}
                  >
                    Forgot password?
                  </Link>
                  <span className="auth-footer-link">
                    <Link
                      href="#"
                      variant="body2"
                      className="auth-link"
                      onClick={() => setMode('signup')}
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </span>
                </>
              ) : mode === 'signup' ? (
                <Link
                  href="#"
                  variant="body2"
                  className="auth-link"
                  onClick={() => setMode('login')}
                >
                  Already have an account? Login
                </Link>
              ) : (
                <Link
                  href="#"
                  variant="body2"
                  className="auth-link"
                  onClick={() => setMode('login')}
                >
                  Back to login
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthPage;