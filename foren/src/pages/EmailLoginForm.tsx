import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { authenticateWithServer, registerWithServer } from "../lib/server-auth-utils";
import './AuthPage.css';

interface EmailLoginFormProps {
  onSuccess: (userId?: string) => void;
}



const EmailLoginForm = ({ onSuccess }: EmailLoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authenticateWithServer(loginEmail, loginPassword);
      if (response.success) {
        onSuccess(response.userId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerWithServer(registerEmail, registerPassword);
      if (response.success) {
        document.getElementById("login-tab")?.click();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Tabs defaultValue="login">
          <TabsList className="auth-tabs-list">
            <TabsTrigger id="login-tab" value="login" className="auth-tabs-trigger">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="auth-tabs-trigger">
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader className="auth-card-header">
                <CardTitle className="auth-card-title">Secure Login</CardTitle>
                <CardDescription className="auth-card-description">
                  Sign in to your account using email and password. Blockchain-backed security managed by organizations.
                </CardDescription>
              </CardHeader>

              <CardContent className="auth-card-content">
                <div className="auth-input-group">
                  <Label htmlFor="email" className="auth-label">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <div className="auth-label-row">
                    <Label htmlFor="password" className="auth-label">Password</Label>
                    <a href="/forgot-password" className="auth-link">Forgot password?</a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full solana-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Sign In"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardHeader className="auth-card-header">
                <CardTitle className="auth-card-title">Create an Account</CardTitle>
                <CardDescription className="auth-card-description">
                  Create an account with your organization mail to enjoy blockchain-backed security managed by trusted organizations.
                </CardDescription>
              </CardHeader>

              <CardContent className="auth-card-content">
                <div className="auth-input-group">
                  <Label htmlFor="register-email" className="auth-label">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="name@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <Label htmlFor="register-password" className="auth-label">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <Label htmlFor="confirm-password" className="auth-label">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full solana-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default EmailLoginForm;
